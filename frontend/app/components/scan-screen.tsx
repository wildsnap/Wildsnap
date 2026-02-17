"use client";

import { X, Zap } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface ScanScreenProps {
  onClose: () => void;
  onAnimalDetected: (data?: any) => void;
}

export function ScanScreen({ onClose, onAnimalDetected }: ScanScreenProps) {
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // 1. Setup Camera เมื่อ Component ถูกโหลด
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment', // บังคับใช้กล้องหลัง
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
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

  // 2. ฟังก์ชันถ่ายรูปและส่ง API
  const handleScan = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsScanning(true);

    try {
      // 2.1 วาดภาพจาก Video ลง Canvas
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (!context) return;
      
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 2.2 แปลง Canvas เป็น Blob/File
      canvas.toBlob(async (blob) => {
        if (!blob) {
          setIsScanning(false);
          return;
        }

        const file = new File([blob], "captured-animal.jpg", { type: "image/jpeg" });
        const formData = new FormData();
        formData.append('file', file);

        try {
          // 2.3 ส่งไปยัง NestJS API
          // TODO: เปลี่ยน URL นี้ให้เป็น IP เครื่องจริง หรือ Domain เมื่อ Deploy
          // ตัวอย่าง: 'https://api.yourdomain.com/ai/predict' หรือ 'http://192.168.1.xxx:3000/ai/predict'
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

          const response = await axios.post(`${apiUrl}/ai/predict`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          console.log("AI Response:", response.data);
          
          // รอ Animation เล่นให้จบนิดนึงเพื่อความสมูท (Optional)
          setTimeout(() => {
             setIsScanning(false);
             onAnimalDetected(response.data); // ส่งข้อมูลกลับไปหน้า Home
             onClose(); // ปิดหน้า Scan
          }, 500);

        } catch (apiError) {
          console.error("API Error:", apiError);
          alert("เกิดข้อผิดพลาดในการวิเคราะห์ภาพ");
          setIsScanning(false);
        }
      }, 'image/jpeg', 0.8); // Quality 0.8

    } catch (err) {
      console.error("Capture Error:", err);
      setIsScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Hidden Canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera View Simulation -> Real Camera Feed */}
      <div className="relative flex-1 bg-black overflow-hidden">
        
        {/* 1. Real Video Element */}
        {/* playsInline สำคัญมากสำหรับ iOS */}
        <video 
          ref={videoRef}
          autoPlay 
          playsInline 
          muted 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Error State */}
        {cameraError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-50 text-white p-4 text-center">
            <p>{cameraError}</p>
            <button onClick={onClose} className="mt-4 bg-red-500 px-4 py-2 rounded">Close</button>
          </div>
        )}

        {/* 2. Grid Overlay (Optional - ทำให้จางลงเพื่อให้เห็นกล้องชัดขึ้น) */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />
        
        {/* Scanning Frame (UI เดิมของคุณ) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[280px] h-[280px]">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#00D66F] rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#00D66F] rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#00D66F] rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#00D66F] rounded-br-lg" />
            
            {/* Scanning line animation */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-[#00D66F] shadow-[0_0_10px_2px_rgba(0,214,111,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
            )}
            
            {/* Center crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-8 h-8">
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#FFC800] -translate-y-1/2" />
                <div className="absolute inset-y-0 left-1/2 w-0.5 bg-[#FFC800] -translate-x-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Top Overlay */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-6 z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="w-12 h-12 bg-[#FF4757] border-3 border-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <X className="w-6 h-6 text-white" strokeWidth={3} />
            </button>
            
            <div className="font-['Press_Start_2P'] text-sm text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
              {isScanning ? 'ANALYZING...' : 'READY'}
            </div>
          </div>
        </div>

        {/* Bottom Instructions */}
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

      {/* Scan Button */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <button
          onClick={handleScan}
          disabled={isScanning || !!cameraError}
          className={`
            w-20 h-20 rounded-full border-4 border-white
            flex items-center justify-center
            transition-all duration-200
            ${isScanning 
              ? 'bg-[#FFC800] animate-pulse cursor-wait' 
              : 'bg-[#00D66F] active:scale-90 shadow-[0_0_20px_4px_rgba(0,214,111,0.6)]'
            }
            ${!!cameraError ? 'opacity-50 grayscale cursor-not-allowed' : ''}
          `}
        >
          <Zap 
            className="w-10 h-10 text-white" 
            fill="white" 
            strokeWidth={3}
          />
        </button>
      </div>

      {/* Custom scan animation */}
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0; }
          50% { top: calc(100% - 4px); }
        }
      `}</style>
    </div>
  );
}