import { X, Star, Sparkles, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSettings } from "../contexts/AudioContext";
import { useEffect } from "react";

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  animalName: string;
  scientificName?: string;
  description?: string;
  habitat?: string;
  diet?: string;
  rarityLevel?: string;
  coinsEarned: number;
  funFact: string;
  capturedImage?: string;
  imageUrl?: string | null;
  confidence?: number;
  isNewDiscovery?: boolean;
}

export function RewardModal({
  isOpen,
  onClose,
  animalName,
  scientificName,
  description,
  coinsEarned,
  capturedImage,
  imageUrl,
  isNewDiscovery = true,
  confidence = 0,
}: RewardModalProps) {
  const { playSuccessSound, playClickSound } = useSettings();

  useEffect(() => {
    if (isOpen && isNewDiscovery) {
      playSuccessSound();
    }
  }, [isOpen, isNewDiscovery, playSuccessSound]);

  if (!isOpen) return null;

  const renderAnimalPixelArt = () => {
    return (
      <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md">
      <div className="flex min-h-full items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 10 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-sm my-8"
        >
          {/* Celebration stars */}
          {isNewDiscovery && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <motion.div
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-16 h-16 text-[#FFC800]" fill="#FFC800" />
              </motion.div>
            </div>
          )}

          {/* Modal Content */}
          <div className="bg-[#F5F8F0] border-4 border-[#2C2C2C] rounded-2xl shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] overflow-hidden">
            <div
              className={`border-b-4 border-[#2C2C2C] px-6 py-4 relative overflow-hidden ${
                isNewDiscovery
                  ? "bg-gradient-to-b from-[#00D66F] to-[#00A855]"
                  : "bg-gradient-to-b from-[#A3A3A3] to-[#757575]"
              }`}
            >
              {isNewDiscovery && (
                <motion.div
                  className="absolute inset-0 opacity-30"
                  animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
                    backgroundSize: "200% 200%",
                  }}
                />
              )}

              <div className="relative">
                <h2 className="font-['Press_Start_2P'] text-xl text-white text-center drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)] leading-relaxed tracking-wider">
                  {isNewDiscovery ? "SUCCESS!" : "FOUND IT!"}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  {isNewDiscovery ? (
                    <>
                      <Sparkles className="w-5 h-5 text-white" />
                      <p className="font-['Press_Start_2P'] text-white font-black text-[12px] uppercase tracking-wider">
                        New Discovery!
                      </p>
                      <Sparkles className="w-5 h-5 text-white" />
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-white" />
                      <p className="font-['Press_Start_2P'] text-white font-black text-[12px] uppercase tracking-widest">
                        Already in dex
                      </p>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                className="absolute top-2 right-2 w-8 h-8 bg-[#FF4757] border-2 border-[#2C2C2C] rounded-full flex items-center justify-center active:scale-95 transition-transform hover:bg-[#ff6b79] shadow-inner"
              >
                <X className="w-4 h-4 text-white" strokeWidth={3} />
              </button>
            </div>

            {/* Animal Display Area */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="px-5 pt-6 pb-4"
            >
              {isNewDiscovery ? (
                // New Discovery
                <div className="bg-white border-4 border-[#2C2C2C] rounded-2xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                  <div className="bg-[#F0F0F0] border-2 border-[#E0E0E0] rounded-xl p-2 mb-4 flex items-center justify-center h-40 relative overflow-hidden">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-32 h-32 flex items-center justify-center relative z-10"
                    >
                      {capturedImage ? (
                        <div className="w-full h-full p-1 bg-white border-2 border-[#2C2C2C] shadow-sm rotate-2 rounded-lg overflow-hidden">
                          <img
                            src={capturedImage}
                            alt={animalName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        renderAnimalPixelArt()
                      )}
                    </motion.div>
                  </div>

                  <div className="flex justify-center -mt-8 relative z-20">
                    <div className="bg-[#FFC800] border-3 border-[#2C2C2C] rounded-xl px-5 py-2 shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]">
                      <p className="font-['Press_Start_2P'] text-sm text-[#2C2C2C] text-center drop-shadow-sm leading-relaxed truncate max-w-[200px]">
                        {animalName.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {confidence > 0 && (
                    <div className="mt-3 text-center">
                      <span className="bg-[#E8E8E8] text-[#757575] text-[10px] font-['Press_Start_2P'] px-3 py-1.5 rounded-md border border-[#D0D0D0]">
                        AI CONF: {confidence}%
                      </span>
                    </div>
                  )}
                  <p className="text-center font-['Press_Start_2P'] text-[9px] font-bold italic text-[#A3A3A3] mt-2">
                    {scientificName}
                  </p>
                </div>
              ) : (
                // Already Discovered
                <div className="flex flex-col items-center justify-center py-6 bg-white border-4 border-[#2C2C2C] rounded-2xl shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] relative">
                  <div className="absolute top-[120px] w-32 h-8 bg-black/10 rounded-[100%] blur-sm" />

                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative w-28 h-28 mb-6 flex items-center justify-center z-10"
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={animalName}
                        fill
                        className="object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
                        unoptimized
                      />
                    ) : (
                      <div className="w-20 h-20 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
                        {renderAnimalPixelArt()}
                      </div>
                    )}
                  </motion.div>

                  <div className="bg-[#E8E8E8] border-2 border-[#D0D0D0] rounded-lg px-4 py-2 mt-2">
                    <h3 className="font-['Press_Start_2P'] text-[10px] text-[#525252] text-center leading-relaxed max-w-[220px] truncate">
                      {animalName.toUpperCase()}
                    </h3>
                  </div>

                  {confidence > 0 && (
                    <p className="font-['Press_Start_2P'] text-[10px] font-black uppercase text-[#A3A3A3] mt-3">
                      Scan Confidence: {confidence}%
                    </p>
                  )}
                </div>
              )}
            </motion.div>

            {/* Description Card */}
            {isNewDiscovery && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="px-5 pb-2"
              >
                <div className="bg-white border-3 border-[#2C2C2C] rounded-xl p-3 shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5 border-b-2 border-dashed border-gray-200 pb-2">
                    <img
                      src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/book.png"
                      alt="Book"
                      className="w-5 h-5 object-contain"
                    />
                    <h3 className="font-['Press_Start_2P'] text-[12px] text-[#2C2C2C] pt-1">
                      INFO LOG
                    </h3>
                  </div>
                  <p className="font-['Press_Start_2P'] text-[10px] font-bold text-[#5C3D1F] leading-snug">
                    {description}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Rewards & Buttons Section */}
            <div className="px-5 pb-6 pt-2 space-y-4">
              {isNewDiscovery ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="bg-[#FFFDF5] border-3 border-[#2C2C2C] rounded-xl p-3 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFF3CC] border-2 border-[#FFC800] rounded-full flex items-center justify-center">
                      <img
                        src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/coin.png"
                        alt="Coin"
                        className="w-6 h-6 object-contain animate-bounce"
                      />
                    </div>
                    <div>
                      <p className="font-['Press_Start_2P'] text-[8px] text-[#A3A3A3] mb-1">
                        REWARD
                      </p>
                      <p className="font-['Press_Start_2P'] text-sm text-[#2C2C2C]">
                        +{coinsEarned}{" "}
                        <span className="text-[10px]">COINS</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="bg-[#F0F4F8] border-2 border-[#CBD5E1] rounded-xl p-3 flex items-center justify-center gap-3"
                >
                  <div className="w-8 h-8 opacity-40 grayscale">
                    <img
                      src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/coin.png"
                      alt="Coin"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-['Press_Start_2P'] text-[8px] text-[#94A3B8] mb-1">
                      REWARD
                    </p>
                    <p className="font-['Press_Start_2P'] text-sm text-[#64748B]">
                      +0 <span className="text-[10px]">COINS</span>
                    </p>
                  </div>
                </motion.div>
              )}

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                className={`
                  w-full border-4 border-[#2C2C2C] rounded-xl py-3.5
                  shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]
                  active:shadow-[0px_0px_0_0_rgba(0,0,0,0.3)]
                  active:translate-x-1 active:translate-y-1
                  transition-all duration-150 flex items-center justify-center gap-2
                  ${isNewDiscovery ? "bg-[#00D66F] hover:bg-[#00F47F]" : "bg-[#FFC800] hover:bg-[#FFD54F]"}
                `}
              >
                <span
                  className={`font-['Press_Start_2P'] text-sm drop-shadow-[1px_1px_0_rgba(0,0,0,0.4)] ${isNewDiscovery ? "text-white" : "text-[#2C2C2C]"}`}
                >
                  {isNewDiscovery ? "COLLECT!" : "CONTINUE"}
                </span>
              </motion.button>
            </div>
          </div>

          {/* Floating sparkles */}
          {isNewDiscovery &&
            [...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#FFC800] rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
        </motion.div>
      </div>
    </div>
  );
}
