"use client";

import { X, Zap, ZoomIn, ZoomOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

interface ScanScreenProps {
  onClose: () => void;
  onAnimalDetected: (data?: any) => void;
}

export function ScanScreen({ onClose, onAnimalDetected }: ScanScreenProps) {
  const { userId: clerkId } = useAuth();
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomCapabilities, setZoomCapabilities] = useState<{
    min: number;
    max: number;
    step: number;
  } | null>(null);
  const trackRef = useRef<MediaStreamTrack | null>(null);

  // Setup Camera
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment", // บังคับใช้กล้องหลัง
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const videoTrack = stream.getVideoTracks()[0];
        trackRef.current = videoTrack;

        const capabilities = videoTrack.getCapabilities() as any;
        if (capabilities.zoom) {
          setZoomCapabilities({
            min: capabilities.zoom.min || 1,
            max: capabilities.zoom.max || 3, // 3x - 5x
            step: capabilities.zoom.step || 0.1,
          });
          setZoomLevel(capabilities.zoom.min || 1);
        }

        setCameraError(null);
      } catch (err) {
        console.error("Camera Error:", err);
        setCameraError("ไม่สามารถเข้าถึงกล้องได้ กรุณาตรวจสอบสิทธิ์การใช้งาน");
      }
    };

    startCamera();

    // Cleanup function: ปิดกล้องเมื่อออกจากหน้านี้
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleZoomChange = async (newZoom: number) => {
    setZoomLevel(newZoom);
    if (trackRef.current && zoomCapabilities) {
      try {
        await trackRef.current.applyConstraints({
          advanced: [{ zoom: newZoom } as any],
        });
      } catch (err) {
        console.warn("Zoom constraint failed", err);
      }
    }
  };

  const handleScan = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsScanning(true);

    try {
      // วาดภาพจาก Video ลง Canvas
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      if (!context) return;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const previewImage = canvas.toDataURL("image/jpeg", 0.8);

      // 2.2 แปลง Canvas เป็น Blob/File
      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            setIsScanning(false);
            return;
          }

          const file = new File([blob], "captured-animal.jpg", {
            type: "image/jpeg",
          });
          const formData = new FormData();
          formData.append("file", file);
          formData.append("clerkId", clerkId as string);

          try {
            // NestJS API
            const apiUrl =
              process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100";

            const response = await axios.post(
              `${apiUrl}/ai/predict`,
              formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
              },
            );

            const dataWithImage = {
              ...response.data,
              capturedImage: previewImage,
            };

            setTimeout(() => {
              setIsScanning(false);
              onAnimalDetected(dataWithImage);
              onClose(); // ปิดหน้า Scan
            }, 500);
          } catch (apiError) {
            console.error("API Error:", apiError);
            alert("เกิดข้อผิดพลาดในการวิเคราะห์ภาพ");
            setIsScanning(false);
          }
        },
        "image/jpeg",
        0.8,
      ); // Quality 0.8
    } catch (err) {
      console.error("Capture Error:", err);
      setIsScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <canvas ref={canvasRef} className="hidden" />

      <div className="relative flex-1 bg-black overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />

        {cameraError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-50 text-white p-4 text-center">
            <p>{cameraError}</p>
            <button
              onClick={onClose}
              className="mt-4 bg-red-500 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[280px] h-[280px]">
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#00D66F] rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#00D66F] rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#00D66F] rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#00D66F] rounded-br-lg" />

            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-[#00D66F] shadow-[0_0_10px_2px_rgba(0,214,111,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
            )}

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-8 h-8">
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#FFC800] -translate-y-1/2" />
                <div className="absolute inset-y-0 left-1/2 w-0.5 bg-[#FFC800] -translate-x-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Zoom Control Slider */}
        {zoomCapabilities && (
          <div className="absolute bottom-36 left-0 right-0 px-12 flex items-center justify-center gap-4 z-20">
            <ZoomOut className="w-5 h-5 text-white/80 drop-shadow-md" />
            <input
              type="range"
              min={zoomCapabilities.min}
              max={zoomCapabilities.max}
              step={zoomCapabilities.step}
              value={zoomLevel}
              onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#FFC800]"
            />
            <ZoomIn className="w-5 h-5 text-white/80 drop-shadow-md" />
          </div>
        )}

        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-6 z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="w-12 h-12 bg-[#FF4757] border-3 border-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <X className="w-6 h-6 text-white" strokeWidth={3} />
            </button>

            <div className="font-['Press_Start_2P'] text-sm text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
              {isScanning ? "ANALYZING..." : "READY"}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 pb-32 pointer-events-none">
          <div className="text-center">
            <p className="font-['Nunito'] text-white text-lg font-bold mb-2">
              Point camera at an animal
            </p>
            <p className="font-['Nunito'] text-white/80 text-sm">
              Tap the button to identify
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <button
          onClick={handleScan}
          disabled={isScanning || !!cameraError}
          className={`
            w-20 h-20 rounded-full border-4 border-white
            flex items-center justify-center
            transition-all duration-200
            ${
              isScanning
                ? "bg-[#FFC800] animate-pulse cursor-wait"
                : "bg-[#00D66F] active:scale-90 shadow-[0_0_20px_4px_rgba(0,214,111,0.6)]"
            }
            ${!!cameraError ? "opacity-50 grayscale cursor-not-allowed" : ""}
          `}
        >
          <Zap className="w-10 h-10 text-white" fill="white" strokeWidth={3} />
        </button>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0; }
          50% { top: calc(100% - 4px); }
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #FFC800;
          border: 3px solid #2C2C2C;
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
