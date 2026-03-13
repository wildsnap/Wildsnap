import { motion } from "motion/react";
import { Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface UnlockAnimationProps {
  isOpen: boolean;
  onComplete: () => void;
  animalName: string;
  rarityLevel?: "Common" | "Rare" | "Epic" | "Legendary";
  imageUrl?: string;
}

export function UnlockAnimation({
  isOpen,
  onComplete,
  animalName,
  rarityLevel = "Common",
  imageUrl,
}: UnlockAnimationProps) {
  const [showUnlock, setShowUnlock] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowUnlock(false);
      // Start unlock animation after a brief delay
      const timer = setTimeout(() => {
        setShowUnlock(true);
      }, 300);

      // Complete animation after 3 seconds
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 3500);

      return () => {
        clearTimeout(timer);
        clearTimeout(completeTimer);
      };
    }
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  const rarityColors = {
    Common: "#9E9E9E",
    Rare: "#4CAF50",
    Epic: "#9C27B0",
    Legendary: "#FF9800",
  };

  // Simple pixel animal based on name
  const renderAnimalPixelArt = () => {
    return (
      <svg viewBox="0 0 64 64" className="w-full h-full">
        {/* Generic animal - can be customized per animal type */}
        <rect x="16" y="8" width="8" height="8" fill="#754F26" />
        <rect x="40" y="8" width="8" height="8" fill="#754F26" />
        <rect x="16" y="16" width="32" height="24" fill="#AA7A41" />
        <rect x="16" y="40" width="8" height="16" fill="#754F26" />
        <rect x="40" y="40" width="8" height="16" fill="#754F26" />
        <rect x="20" y="20" width="4" height="4" fill="#2C2C2C" />
        <rect x="40" y="20" width="4" height="4" fill="#2C2C2C" />
        <rect x="28" y="28" width="8" height="4" fill="#2C2C2C" />
      </svg>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative flex flex-col items-center">
        {/* Main Animal Container */}
        <div className="relative w-64 h-64">
          {/* Shadow Version */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: showUnlock ? 0 : 1,
              scale: showUnlock ? 1.1 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-48 h-48 relative flex items-center justify-center">
              {imageUrl ? (
                <>
                  <img
                    src={imageUrl}
                    className="absolute inset-0 w-full h-full object-contain opacity-50 blur-md"
                    style={{ filter: "brightness(0)" }}
                  />
                  <img
                    src={imageUrl}
                    className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
                    style={{ filter: "brightness(0)" }}
                  />
                </>
              ) : (
                <div className="w-32 h-32 bg-gray-700 rounded-lg animate-pulse" />
              )}

              {/* Lock icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 h-16 bg-[#2C2C2C] border-4 border-white rounded-lg flex items-center justify-center shadow-xl">
                  <span className="text-3xl">🔒</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Colored Version */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
            animate={{
              opacity: showUnlock ? 1 : 0,
              scale: showUnlock ? 1 : 0.8,
              rotateY: showUnlock ? 0 : 180,
            }}
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

          {/* Unlock Light Burst */}
          {showUnlock && (
            <>
              {/* Central flash */}
              <motion.div
                className="absolute inset-0 bg-white rounded-full"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />

              {/* Radial light rays */}
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

              {/* Sparkle particles */}
              {Array.from({ length: 20 }).map((_, i) => {
                const angle = (i / 20) * Math.PI * 2;
                const distance = 100 + Math.random() * 50;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                return (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{
                      x: x,
                      y: y,
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.3 + Math.random() * 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <Star
                      className="w-4 h-4"
                      fill={rarityColors[rarityLevel]}
                      color={rarityColors[rarityLevel]}
                    />
                  </motion.div>
                );
              })}
            </>
          )}
        </div>

        {/* Unlock Text */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: showUnlock ? 1 : 0,
            y: showUnlock ? 0 : 20,
          }}
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

          {/* Rarity indicator */}
          <motion.div
            className="mt-3 flex justify-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {Array.from({
              length:
                rarityLevel === "Common"
                  ? 1
                  : rarityLevel === "Rare"
                    ? 2
                    : rarityLevel === "Epic"
                      ? 3
                      : 4,
            }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
              >
                <Star
                  className="w-6 h-6"
                  fill={rarityColors[rarityLevel]}
                  color="white"
                  strokeWidth={2}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Confetti particles */}
        {showUnlock &&
          Array.from({ length: 30 }).map((_, i) => {
            const x = (Math.random() - 0.5) * 400;
            const y = -200 - Math.random() * 100;
            const rotation = Math.random() * 720 - 360;
            const colors = [
              "#FF4757",
              "#FFC800",
              "#00D66F",
              "#3742FA",
              "#FF6348",
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];

            return (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-sm"
                style={{ backgroundColor: color }}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                animate={{
                  x: x,
                  y: y,
                  opacity: 0,
                  rotate: rotation,
                }}
                transition={{
                  duration: 1.5 + Math.random() * 0.5,
                  delay: 0.3 + Math.random() * 0.3,
                  ease: "easeOut",
                }}
              />
            );
          })}
      </div>
    </div>
  );
}
