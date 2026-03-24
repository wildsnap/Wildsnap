import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface UnlockAnimationProps {
  isOpen: boolean;
  onComplete: () => void;
  animalName: string;
  rarityLevel?: "Common" | "Rare" | "Epic" | "Legendary";
  imageUrl?: string;
  activeMission?: any;
  onFetchNextMission?: () => void;
  isQuestCompleted?: boolean; // NEW PROP
}

export function UnlockAnimation({
  isOpen,
  onComplete,
  animalName,
  rarityLevel = "Common",
  imageUrl,
  activeMission,
  onFetchNextMission,
  isQuestCompleted = false, // Default to false
}: UnlockAnimationProps) {
  const [phase, setPhase] = useState<"hidden" | "unlock" | "mission">("hidden");

  useEffect(() => {
    if (!isOpen) {
      setPhase("hidden");
      return;
    }

    // Phase 1: Show Unlock Animal (0.3s)
    const timer1 = setTimeout(() => {
      setPhase("unlock");
    }, 300);

    // Phase 2: Fade out Animal, show Mission Progress Bar IF quest was completed
    const timer2 = setTimeout(() => {
      // SMART CHECK: Only show mission phase if the quest was actually completed!
      if (activeMission && isQuestCompleted) {
        setPhase("mission");
        if (onFetchNextMission) onFetchNextMission();
      } else {
        // If not completed, just end the animation and close
        onComplete();
      }
    }, 3500);

    // Phase 3: End Animation entirely (6.5s)
    const timer3 = setTimeout(() => {
      if (activeMission && isQuestCompleted) {
        onComplete();
      }
    }, 6500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const rarityColors = {
    Common: "#9E9E9E",
    Rare: "#4CAF50",
    Epic: "#9C27B0",
    Legendary: "#FF9800",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      
      {/* --- PHASE 1: ANIMAL UNLOCK --- */}
      <AnimatePresence>
        {phase === "unlock" && (
          <motion.div
            key="unlock-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="absolute flex flex-col items-center justify-center"
          >
            <div className="relative w-64 h-64">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="w-48 h-48 flex items-center justify-center">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={animalName}
                      className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-blue-500 rounded-lg" />
                  )}
                </div>
              </motion.div>

              {/* Light Burst */}
              <motion.div
                className="absolute inset-0 bg-white rounded-full"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />

              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-2 h-32 origin-bottom"
                  style={{
                    background: `linear-gradient(to top, ${rarityColors[rarityLevel]}, transparent)`,
                    rotate: `${i * 45}deg`,
                    translateX: "-50%",
                    translateY: "-100%",
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              ))}
            </div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-6 h-6 text-[#FFC800]" />
                <h2 className="font-['Press_Start_2P'] text-2xl text-white drop-shadow-[3px_3px_0_rgba(0,0,0,0.5)] leading-relaxed">
                  UNLOCKED!
                </h2>
                <Sparkles className="w-6 h-6 text-[#FFC800]" />
              </div>
              <div className="inline-block bg-gradient-to-r from-[#00D66F] to-[#00F47F] border-3 border-white rounded-xl px-6 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]">
                <p className="font-['Nunito'] text-lg font-bold text-white">
                  {animalName}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PHASE 2: MISSION PROGRESS FILL --- */}
      <AnimatePresence>
        {phase === "mission" && activeMission && (
          <motion.div
            key="mission-phase"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="absolute z-50 w-full max-w-[300px] px-4 flex flex-col items-center"
          >
            <div className="bg-[#FFFDF5] border-4 border-[#2C2C2C] p-6 shadow-[8px_8px_0_0_#2C2C2C] text-center relative w-full rounded-xl">
              
              <Star className="absolute -top-4 -left-4 w-8 h-8 text-[#FFC800] fill-[#FFC800] animate-[spin_4s_linear_infinite]" />
              <Star className="absolute -bottom-4 -right-4 w-8 h-8 text-[#00D66F] fill-[#00D66F] animate-[spin_4s_linear_infinite_reverse]" />

              <h3 className="font-['Press_Start_2P'] text-[#A3A3A3] text-[9px] mb-3 leading-relaxed">
                QUEST UPDATE
              </h3>
              
              <p className="font-['Nunito'] font-black text-[#2C2C2C] text-base mb-4 line-clamp-2 leading-tight">
                {activeMission.mission?.title || "Scan your first animal"}
              </p>

              <div className="w-full h-6 bg-[#2C2C2C] p-1 mb-3 rounded-sm shadow-inner">
                <motion.div
                  className="h-full bg-[#00D66F] rounded-sm relative overflow-hidden"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                >
                  <motion.div 
                    className="absolute inset-0 w-8 bg-white/40 skew-x-[-20deg]"
                    initial={{ left: "-100%" }}
                    animate={{ left: "200%" }}
                    transition={{ duration: 1, delay: 1.5 }}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="flex items-center justify-center gap-2 text-[#00D66F]"
              >
                <Sparkles className="w-4 h-4" />
                <p className="font-['Press_Start_2P'] text-[10px] drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)] pt-1">
                  COMPLETED!
                </p>
                <Sparkles className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}