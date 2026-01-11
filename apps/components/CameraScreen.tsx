// import { motion } from 'motion/react';
"use client";
import { motion } from "framer-motion";
import { X, Zap, Focus } from 'lucide-react';
import { useState } from 'react';

interface CameraScreenProps {
  onClose: () => void;
  onCapture: () => void;
}

export function CameraScreen({ onClose, onCapture }: CameraScreenProps) {
  const [isScanning, setIsScanning] = useState(false);

  const handleCapture = () => {
    setIsScanning(true);
    // Simulate AI scanning
    setTimeout(() => {
      setIsScanning(false);
      onCapture();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Camera View (simulated with gradient) */}
      <div className="relative w-full h-full bg-gradient-to-br from-green-900 via-green-700 to-blue-900">
        {/* Animated scanning overlay */}
        {isScanning && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-64 h-64 border-4 border-green-400 rounded-3xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute w-full h-1 bg-green-400"
              animate={{
                y: [-150, 150],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </motion.div>
        )}

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
          <button
            onClick={onClose}
            className="bg-black/40 backdrop-blur-sm text-white rounded-full p-3"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">Boost Active</span>
          </div>
        </div>

        {/* Center Guide */}
        {!isScanning && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div className="w-64 h-64 border-4 border-white/50 rounded-3xl relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-green-400 rounded-tl-xl" />
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-4 border-r-4 border-green-400 rounded-tr-xl" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4 border-green-400 rounded-bl-xl" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-green-400 rounded-br-xl" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Focus className="w-12 h-12 text-white/70" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Hint Text */}
        <div className="absolute top-32 left-0 right-0 text-center">
          <motion.div
            className="bg-black/40 backdrop-blur-sm text-white px-6 py-3 rounded-full inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {isScanning ? (
              <span className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  🔍
                </motion.span>
                Identifying animal...
              </span>
            ) : (
              '📸 Center the animal in frame'
            )}
          </motion.div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 pb-8 px-4">
          <div className="max-w-md mx-auto">
            {/* Capture Button */}
            <motion.button
              onClick={handleCapture}
              disabled={isScanning}
              className="w-20 h-20 bg-white rounded-full mx-auto block shadow-2xl relative disabled:opacity-50"
              whileTap={{ scale: 0.9 }}
            >
              <div className="absolute inset-2 bg-gradient-to-br from-green-400 to-green-600 rounded-full" />
              {isScanning && (
                <motion.div
                  className="absolute inset-0 border-4 border-green-400 rounded-full"
                  animate={{ scale: [1, 1.3], opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.button>

            {/* Instruction Text */}
            <p className="text-white text-center mt-4 text-sm">
              {isScanning ? 'Please wait...' : 'Tap to scan'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
