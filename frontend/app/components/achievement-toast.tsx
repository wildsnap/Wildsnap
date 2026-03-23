"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X } from "lucide-react";
import { useEffect } from "react";

interface AchievementToastProps {
  achievement: { id: number; name: string; rewardPoints: number } | null;
  onClose: () => void;
}

export function AchievementToast({ achievement, onClose }: AchievementToastProps) {
  useEffect(() => {
    if (achievement) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Auto-hide after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none"
        >
          <div className="bg-[#FFC800] border-4 border-[#2C2C2C] p-3 shadow-[6px_6px_0_0_#2C2C2C] flex items-center gap-4 max-w-sm w-full pointer-events-auto relative overflow-hidden">
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-white/30 w-12 skew-x-[-20deg]"
              animate={{ left: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            />
            
            <div className="w-12 h-12 bg-white border-2 border-[#2C2C2C] flex items-center justify-center shrink-0">
              <Trophy className="w-8 h-8 text-[#FF4757] fill-[#FF4757]" />
            </div>
            
            <div className="flex-1 pr-6">
              <p className="font-['Press_Start_2P'] text-[9px] text-[#2C2C2C] mb-1">
                ACHIEVEMENT UNLOCKED!
              </p>
              <p className="font-['Nunito'] font-black text-sm text-[#754F26] leading-tight">
                {achievement.name}
              </p>
              <p className="font-['Press_Start_2P'] text-[8px] text-[#00D66F] mt-1 drop-shadow-[1px_1px_0_#2C2C2C]">
                +{achievement.rewardPoints} PTS
              </p>
            </div>

            <button 
              onClick={onClose}
              className="absolute top-2 right-2 active:scale-90"
            >
              <X className="w-4 h-4 text-[#2C2C2C]" strokeWidth={4} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}