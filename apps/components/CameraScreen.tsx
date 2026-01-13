// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Zap, Focus } from 'lucide-react';
// import { useState } from 'react';

// interface CameraScreenProps {
//   onClose: () => void;
//   onCapture: () => void;
// }

// export function CameraScreen({ onClose, onCapture }: CameraScreenProps) {
//   const [isScanning, setIsScanning] = useState(false);

//   const handleCapture = () => {
//     setIsScanning(true);
//     setTimeout(() => {
//       setIsScanning(false);
//       onCapture();
//     }, 2000);
//   };

//   return (
//     <div className="fixed inset-0 bg-black z-50 flex flex-col overflow-hidden">
//       {/* 1. Background Layer */}
//       <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-blue-900 opacity-80" />

//       {/* 2. UI Overlay Layer */}
//       <div className="relative flex-1 flex flex-col z-10">

//         {/* Top Bar */}
//         <div className="p-6 flex justify-between items-center">
//           <button
//             onClick={onClose}
//             className="bg-white/10 backdrop-blur-md text-white rounded-full p-3 hover:bg-white/20 transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//           <div className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
//             <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
//             <span className="text-sm font-medium">Boost Active</span>
//           </div>
//         </div>

//         {/* Middle Section: Centered Frame & Hint */}
//         <div className="flex-1 flex flex-col items-center justify-center relative px-10">

//           {/* Hint Text - ปรับมาอยู่เหนือกรอบเล็กน้อยแบบสมส่วน */}
//           <motion.div
//             className="mb-8 z-20"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <div className="bg-black/40 backdrop-blur-xl border border-white/10 text-white px-6 py-2.5 rounded-full shadow-2xl">
//               {isScanning ? (
//                 <span className="flex items-center gap-3">
//                   Identifying animal...
//                 </span>
//               ) : (
//                 '📸 Center the animal in frame'
//               )}
//             </div>
//           </motion.div>

//           {/* Scanning Frame Container */}
//           <div className="relative w-72 h-72 sm:w-80 sm:h-80">
//             {/* Main Box */}
//             <motion.div
//               className="absolute inset-0 border-2 border-white/20 rounded-3xl overflow-hidden"
//               animate={isScanning ? { borderColor: "rgba(74, 222, 128, 0.5)" } : {}}
//             >
//               {/* Scanning Line Animation */}
//               {isScanning && (
//                 <motion.div
//                   className="absolute left-0 right-0 h-[2px] bg-green-400 shadow-[0_0_15px_rgba(74,222,128,1)] z-10"
//                   animate={{ top: ['0%', '100%', '0%'] }}
//                   transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                 />
//               )}
//             </motion.div>

//             {/* Corner Brackets */}
//             <div className="absolute -top-2 -left-2 w-10 h-10 border-t-4 border-l-4 border-green-400 rounded-tl-2xl" />
//             <div className="absolute -top-2 -right-2 w-10 h-10 border-t-4 border-r-4 border-green-400 rounded-tr-2xl" />
//             <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-4 border-l-4 border-green-400 rounded-bl-2xl" />
//             <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-4 border-r-4 border-green-400 rounded-br-2xl" />

//             {/* Center Focus Icon */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <Focus className={`w-12 h-12 transition-colors duration-500 ${isScanning ? 'text-green-400 opacity-100' : 'text-white/30'}`} />
//             </div>

//             {/* Pulse Effect when scanning */}
//             {isScanning && (
//               <motion.div
//                 className="absolute inset-0 bg-green-400/10 rounded-3xl"
//                 animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.3, 0.1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               />
//             )}
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="p-10 flex flex-col items-center gap-6">
//           <div className="relative">
//             <motion.button
//               onClick={handleCapture}
//               disabled={isScanning}
//               className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] disabled:opacity-50"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-4 border-black/5" />
//             </motion.button>

//             {/* Instruction Text */}
//             <p className="text-white text-center mt-4 text-sm">
//               {isScanning ? 'Please wait...' : 'Tap to scan'}
//             </p>
//           </div>

//           <p className="text-white/80 font-medium tracking-wide">
//             {isScanning ? 'ANALYZING...' : 'TAP TO SCAN'}
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Focus, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface CameraScreenProps {
  onClose: () => void;
  onCapture: (image: Blob) => void;
}

export function CameraScreen({ onClose, onCapture }: CameraScreenProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null); // เพิ่ม ref สำหรับอ้างอิงตำแหน่งกรอบบนจอ
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let currentStream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          currentStream = stream;
          streamRef.current = stream;
          await videoRef.current.play();
          setIsCameraReady(true);
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    };
    startCamera();
    return () => currentStream?.getTracks().forEach((track) => track.stop());
  }, []);

  const handleCapture = () => {
    if (
      !videoRef.current ||
      !canvasRef.current ||
      !frameRef.current ||
      isScanning
    )
      return;

    setIsScanning(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const frame = frameRef.current.getBoundingClientRect();

    // 1. หาอัตราส่วนการขยายของ video (object-cover)
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const videoAspectRatio = videoWidth / videoHeight;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const screenAspectRatio = screenWidth / screenHeight;

    let renderWidth,
      renderHeight,
      offsetX = 0,
      offsetY = 0;

    if (videoAspectRatio > screenAspectRatio) {
      // วิดีโอกว้างกว่าจอ (โดนตัดซ้ายขวา)
      renderHeight = screenHeight;
      renderWidth = screenHeight * videoAspectRatio;
      offsetX = (renderWidth - screenWidth) / 2;
    } else {
      // วิดีโอสูงกว่าจอ (โดนตัดบนล่าง)
      renderWidth = screenWidth;
      renderHeight = screenWidth / videoAspectRatio;
      offsetY = (renderHeight - screenHeight) / 2;
    }

    // 2. คำนวณหาตำแหน่งของกรอบ UI บนความละเอียดของ Video จริง
    const scale = videoWidth / renderWidth;
    const cropX = (frame.left + offsetX) * scale;
    const cropY = (frame.top + offsetY) * scale;
    const cropWidth = frame.width * scale;
    const cropHeight = frame.height * scale;

    // 3. ตั้งค่า Canvas ให้เท่ากับขนาดกรอบที่ต้องการ
    canvas.width = cropWidth;
    canvas.height = cropHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 4. วาดเฉพาะส่วนที่อยู่ในกรอบ UI
    ctx.drawImage(
      video,
      cropX,
      cropY,
      cropWidth,
      cropHeight, // Source (จากวิดีโอ)
      0,
      0,
      cropWidth,
      cropHeight // Destination (ลงบน canvas)
    );

    canvas.toBlob(
      (blob) => {
        if (blob) {
          setTimeout(() => {
            setIsScanning(false);
            onCapture(blob);
          }, 2000);
        }
      },
      "image/jpeg",
      0.9
    );
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col overflow-hidden">
      {/* Layer 1: กล้อง (พื้นหลังสุด) */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        autoPlay
      />

      <canvas ref={canvasRef} className="hidden" />

      {/* Layer 2: UI & Mask (รวมไว้ด้วยกันเพื่อความแม่นยำ) */}
      <div className="relative z-20 flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="p-6 flex justify-between items-center z-30">
          <button
            onClick={onClose}
            className="bg-black/40 backdrop-blur-md text-white rounded-full p-3 border border-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scan Frame Area (กึ่งกลางจอ) */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* 🔥 จุดสำคัญ: 
             เราใช้ shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] 
             เพื่อสร้างหน้ากากสีดำแผ่ออกไปทั่วจอ โดยมีรูตรงกลางเท่ากับขนาดกรอบพอดี 
          */}
          <div
            ref={frameRef}
            className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] border-2 border-white/40"
          >
            {/* มุมกรอบ (Corner Brackets) */}
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-green-400 rounded-tl-xl" />
            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-green-400 rounded-tr-xl" />
            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-green-400 rounded-bl-xl" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-green-400 rounded-br-xl" />

            {/* Animation ขณะสแกน */}
            <AnimatePresence>
              {isScanning && (
                <motion.div
                  className="absolute inset-x-0 h-1 bg-green-400 shadow-[0_0_15px_rgba(74,222,128,1)] z-30"
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
            </AnimatePresence>

            {/* Focus Icon */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Focus
                className={`w-12 h-12 transition-all ${isScanning ? "text-green-400 scale-110" : "text-white/30"}`}
              />
            </div>
          </div>

          {/* ข้อความสถานะ */}
          <motion.p className="mt-8 text-white font-medium bg-black/40 px-4 py-1 rounded-full backdrop-blur-sm z-30">
            {isScanning ? "IDENTIFYING..." : "CENTER THE ANIMAL"}
          </motion.p>
        </div>

        {/* Bottom Control */}
        <div className="p-10 flex flex-col items-center z-30">
          <motion.button
            onClick={handleCapture}
            disabled={isScanning || !isCameraReady}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center disabled:opacity-50"
            whileTap={{ scale: 0.9 }}
          >
            <div
              className={`w-16 h-16 rounded-full border-4 border-black/5 ${isScanning ? "bg-green-500" : "bg-gray-100"}`}
            />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
