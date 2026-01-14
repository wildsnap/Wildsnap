"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Focus } from "lucide-react";
import { useState, useEffect } from "react";

interface CameraScreenProps {
  onClose: () => void;
}

export function CameraScreen({ onClose }: CameraScreenProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<{
    label: string;
    confidence: number;
  } | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleCapture = () => {
    if (isScanning) return;
    document.getElementById("demo-upload")?.click();
  };

  const uploadAndPredict = async (file: File) => {
    try {
      setIsScanning(true);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:3001/ai/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "success") {
        setResult({
          label: data.class_name,
          confidence: data.confidence / 100,
        });
        setShowResult(true);
      }
    } catch (error) {
      console.error(error);
      alert("Analysis failed");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-blue-900 opacity-80" />

      <div className="relative flex-1 flex flex-col z-10">
        {/* Top bar */}
        <div className="p-6 flex justify-between items-center">
          <button
            onClick={onClose}
            className="bg-white/10 backdrop-blur-md text-white rounded-full p-3 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">AI Active</span>
          </div>
        </div>

        {/* Center scanning frame */}
        <div className="flex-1 flex flex-col items-center justify-center px-10">
          <motion.div
            className="mb-8 z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 text-white px-6 py-2.5 rounded-full shadow-2xl">
              {isScanning
                ? "Identifying animal..."
                : "Upload an image to scan"}
            </div>
          </motion.div>

          {/* Scanning box */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80">
            <motion.div
              className="absolute inset-0 border-2 border-white/20 rounded-3xl overflow-hidden bg-black/20"
              animate={
                isScanning ? { borderColor: "rgba(74, 222, 128, 0.6)" } : {}
              }
            >
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className={`w-full h-full object-cover transition-opacity duration-500 ${isScanning ? "opacity-60" : "opacity-100"}`}
                />
              )}

              {/* Animated scanning line */}
              {isScanning && (
                <motion.div
                  className="absolute left-0 right-0 h-[2px] bg-green-400 shadow-[0_0_15px_rgba(74,222,128,1)] z-10"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>

            {/* Corner indicators */}
            <div className="absolute -top-2 -left-2 w-10 h-10 border-t-4 border-l-4 border-green-400 rounded-tl-2xl" />
            <div className="absolute -top-2 -right-2 w-10 h-10 border-t-4 border-r-4 border-green-400 rounded-tr-2xl" />
            <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-4 border-l-4 border-green-400 rounded-bl-2xl" />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-4 border-r-4 border-green-400 rounded-br-2xl" />

            {!previewUrl && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Focus className="w-12 h-12 text-white/30" />
              </div>
            )}
          </div>
        </div>

        {/* Bottom capture button */}
        <div className="p-10 flex flex-col items-center gap-4">
          <motion.button
            onClick={handleCapture}
            disabled={isScanning}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center disabled:opacity-50 shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full" />
          </motion.button>
          <p className="text-white text-sm font-light">
            {isScanning ? "Processing AI..." : "Tap to upload image"}
          </p>
        </div>
      </div>

      <input
        id="demo-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadAndPredict(file);
        }}
      />

      {/* Result modal */}
      <AnimatePresence>
        {showResult && result && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
            >
              {previewUrl && (
                <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 shadow-inner">
                  <img
                    src={previewUrl}
                    className="w-full h-full object-cover"
                    alt="Captured animal"
                  />
                </div>
              )}

              <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">
                AI Detected
              </h2>
              <p className="text-3xl text-gray-900 font-bold mb-2 uppercase italic">
                {result.label}
              </p>

              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
                <span className="text-sm text-green-600 font-bold">
                  {(result.confidence * 100).toFixed(1)}%
                </span>
              </div>

              <button
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-colors"
                onClick={() => setShowResult(false)}
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// For Real Production Use
// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Zap, Focus, Loader2 } from "lucide-react";
// import { useState, useEffect, useRef } from "react";

// interface CameraScreenProps {
//   onClose: () => void;
//   onCapture: (image: Blob) => void;
// }

// export function CameraScreen({ onClose, onCapture }: CameraScreenProps) {
//   const [isScanning, setIsScanning] = useState(false);
//   const [isCameraReady, setIsCameraReady] = useState(false);

//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const frameRef = useRef<HTMLDivElement>(null);
//   const streamRef = useRef<MediaStream | null>(null);

//   useEffect(() => {
//     let currentStream: MediaStream | null = null;
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: {
//             facingMode: { ideal: "environment" },
//             width: { ideal: 1920 },
//             height: { ideal: 1080 },
//           },
//           audio: false,
//         });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           currentStream = stream;
//           streamRef.current = stream;
//           await videoRef.current.play();
//           setIsCameraReady(true);
//         }
//       } catch (err) {
//         console.error("Camera access denied:", err);
//       }
//     };
//     startCamera();
//     return () => currentStream?.getTracks().forEach((track) => track.stop());
//   }, []);

//   const handleCapture = () => {
//     if (
//       !videoRef.current ||
//       !canvasRef.current ||
//       !frameRef.current ||
//       isScanning
//     )
//       return;

//     setIsScanning(true);
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const frame = frameRef.current.getBoundingClientRect();

//     // Find the video element's size and position
//     const videoWidth = video.videoWidth;
//     const videoHeight = video.videoHeight;
//     const videoAspectRatio = videoWidth / videoHeight;

//     const screenWidth = window.innerWidth;
//     const screenHeight = window.innerHeight;
//     const screenAspectRatio = screenWidth / screenHeight;

//     let renderWidth,
//       renderHeight,
//       offsetX = 0,
//       offsetY = 0;

//     if (videoAspectRatio > screenAspectRatio) {
//       // Video size wider than screen (cropped left and right)
//       renderHeight = screenHeight;
//       renderWidth = screenHeight * videoAspectRatio;
//       offsetX = (renderWidth - screenWidth) / 2;
//     } else {
//       // Video taller than screen (cropped top and bottom)
//       renderWidth = screenWidth;
//       renderHeight = screenWidth / videoAspectRatio;
//       offsetY = (renderHeight - screenHeight) / 2;
//     }

//     // Calculate cropping coordinates
//     const scale = videoWidth / renderWidth;
//     const cropX = (frame.left + offsetX) * scale;
//     const cropY = (frame.top + offsetY) * scale;
//     const cropWidth = frame.width * scale;
//     const cropHeight = frame.height * scale;

//     canvas.width = cropWidth;
//     canvas.height = cropHeight;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.drawImage(
//       video,
//       cropX,
//       cropY,
//       cropWidth,
//       cropHeight,
//       0,
//       0,
//       cropWidth,
//       cropHeight
//     );

//     canvas.toBlob(
//       (blob) => {
//         if (blob) {
//           setTimeout(() => {
//             setIsScanning(false);
//             onCapture(blob);
//           }, 2000);
//         }
//       },
//       "image/jpeg",
//       0.9
//     );
//   };

//   return (
//     <div className="fixed inset-0 bg-black z-50 flex flex-col overflow-hidden">
//       {/* Layer 1: Camera (background) */}
//       <video
//         ref={videoRef}
//         className="absolute inset-0 w-full h-full object-cover"
//         playsInline
//         muted
//         autoPlay
//       />

//       <canvas ref={canvasRef} className="hidden" />

//       {/* Layer 2: UI & Mask (combined for accuracy) */}
//       <div className="relative z-20 flex-1 flex flex-col">
//         {/* Top Bar */}
//         <div className="p-6 flex justify-between items-center z-30">
//           <button
//             onClick={onClose}
//             className="bg-black/40 backdrop-blur-md text-white rounded-full p-3 border border-white/10"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Scan Frame Area (center of the screen) */}
//         <div className="flex-1 flex flex-col items-center justify-center relative">
//           <div
//             ref={frameRef}
//             className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] border-2 border-white/40"
//           >
//             {/* Corner Brackets */}
//             <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-green-400 rounded-tl-xl" />
//             <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-green-400 rounded-tr-xl" />
//             <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-green-400 rounded-bl-xl" />
//             <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-green-400 rounded-br-xl" />

//             {/* Scan Animation */}
//             <AnimatePresence>
//               {isScanning && (
//                 <motion.div
//                   className="absolute inset-x-0 h-1 bg-green-400 shadow-[0_0_15px_rgba(74,222,128,1)] z-30"
//                   initial={{ top: "0%" }}
//                   animate={{ top: "100%" }}
//                   transition={{
//                     duration: 1.5,
//                     repeat: Infinity,
//                     ease: "linear",
//                   }}
//                 />
//               )}
//             </AnimatePresence>

//             {/* Focus Icon */}
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <Focus
//                 className={`w-12 h-12 transition-all ${isScanning ? "text-green-400 scale-110" : "text-white/30"}`}
//               />
//             </div>
//           </div>

//           <motion.p className="mt-8 text-white font-medium bg-black/40 px-4 py-1 rounded-full backdrop-blur-sm z-30">
//             {isScanning ? "IDENTIFYING..." : "CENTER THE ANIMAL"}
//           </motion.p>
//         </div>

//         {/* Bottom Control */}
//         <div className="p-10 flex flex-col items-center z-30">
//           <motion.button
//             onClick={handleCapture}
//             disabled={isScanning || !isCameraReady}
//             className="w-20 h-20 bg-white rounded-full flex items-center justify-center disabled:opacity-50"
//             whileTap={{ scale: 0.9 }}
//           >
//             <div
//               className={`w-16 h-16 rounded-full border-4 border-black/5 ${isScanning ? "bg-green-500" : "bg-gray-100"}`}
//             />
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// }
