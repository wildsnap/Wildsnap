"use client";

import { X, Camera, RefreshCcw } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

export function CameraModal({ isOpen, onClose, onSuccess }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
        },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตการใช้งานกล้อง");
      onClose();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const captureAndUpload = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsUploading(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const previewImage = canvas.toDataURL("image/jpeg", 0.8);

      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            setIsUploading(false);
            return;
          }

          const file = new File([blob], "captured-animal.jpg", {
            type: "image/jpeg",
          });
          // await uploadImage(file);
          await uploadImage(file, previewImage);
        },
        "image/jpeg",
        0.8,
      );
    }
  };

  const uploadImage = async (file: File, previewImage: string) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100";

      const response = await axios.post(`${apiUrl}/ai/predict`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const dataWithImage = {
        ...response.data,
        capturedImage: previewImage, // ยัดรูปภาพที่ถ่ายใส่ตัวแปรชื่อ capturedImage
      };

      onSuccess(dataWithImage);
      onClose();
    } catch (error) {
      console.error("Upload failed", error);
      alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      {/* Hidden Canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera Viewport */}
      <div className="relative w-full h-full flex flex-col">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />

        {/* UI Overlay */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start">
          <button
            onClick={onClose}
            className="bg-white/20 p-2 rounded-full backdrop-blur-sm"
          >
            <X className="text-white w-8 h-8" />
          </button>
        </div>

        {/* Capture Controls */}
        <div className="absolute bottom-0 left-0 w-full p-8 pb-12 flex justify-center items-center bg-gradient-to-t from-black/80 to-transparent">
          {isUploading ? (
            <div className="font-['Press_Start_2P'] text-white animate-pulse">
              ANALYZING...
            </div>
          ) : (
            <button
              onClick={captureAndUpload}
              className="w-20 h-20 bg-white rounded-full border-4 border-[#2C2C2C] flex items-center justify-center active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              <div className="w-16 h-16 bg-[#FFC800] rounded-full border-2 border-[#2C2C2C]" />
            </button>
          )}
        </div>

        {/* Frame Guide (Optional 8-bit style) */}
        <div className="absolute inset-0 pointer-events-none border-[30px] border-black/30 flex items-center justify-center">
          <div className="w-64 h-64 border-4 border-dashed border-white/50 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
