import { X, Coins, Star, Sparkles, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 10 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-sm my-8"
        >
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

          <div className="bg-white border-4 border-[#2C2C2C] rounded-2xl shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] overflow-hidden">
            <div
              className={`border-b-4 border-[#2C2C2C] px-6 py-4 relative overflow-hidden ${
                isNewDiscovery
                  ? "bg-gradient-to-r from-[#00D66F] to-[#00F47F]"
                  : "bg-gradient-to-r from-[#757575] to-[#9E9E9E]"
              }`}
            >
              {isNewDiscovery && (
                <motion.div
                  className="absolute inset-0"
                  animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
                    backgroundSize: "200% 200%",
                  }}
                />
              )}

              <div className="relative">
                <h2 className="font-['Press_Start_2P'] text-xl text-white text-center drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)] leading-relaxed">
                  {isNewDiscovery ? "SUCCESS!" : "FOUND IT!"}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  {isNewDiscovery ? (
                    <>
                      <Sparkles className="w-5 h-5 text-white" />
                      <p className="font-['Nunito'] text-white font-bold text-lg">
                        New Discovery!
                      </p>
                      <Sparkles className="w-5 h-5 text-white" />
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-white" />
                      <p className="font-['Nunito'] text-white font-bold text-sm">
                        Already in your collection
                      </p>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={onClose}
                className="absolute top-2 right-2 w-8 h-8 bg-[#FF4757] border-2 border-white rounded-full flex items-center justify-center active:scale-95 transition-transform"
              >
                <X className="w-4 h-4 text-white" strokeWidth={3} />
              </button>
            </div>

            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="px-6 pt-6 pb-4"
            >
              {isNewDiscovery ? (
                <div className="bg-gradient-to-b from-[#FFF9E6] to-[#FFF3CC] border-4 border-[#2C2C2C] rounded-2xl p-4 shadow-[6px_6px_0_0_rgba(0,0,0,0.25)]">
                  <div className="bg-white border-3 border-[#2C2C2C] rounded-xl p-4 mb-4 flex items-center justify-center h-40">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-32 h-32 flex items-center justify-center"
                    >
                      {capturedImage ? (
                        <div className="w-full h-full p-1 bg-white border-2 border-[#2C2C2C] shadow-sm rotate-3 rounded-lg overflow-hidden">
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
                  <div className="flex justify-center">
                    <div className="bg-gradient-to-r from-[#00D66F] to-[#00B85C] border-3 border-[#2C2C2C] rounded-xl px-4 py-3 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] max-w-full">
                      <p className="font-['Press_Start_2P'] text-sm sm:text-base text-white text-center drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)] leading-relaxed truncate">
                        {animalName.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  {confidence > 0 && (
                    <div className="mt-2 text-center">
                      <span className="bg-[#2C2C2C] text-white text-xs font-['Nunito'] font-bold px-3 py-1 rounded-full border-2 border-white shadow-sm">
                        AI Confidence: {confidence}%
                      </span>
                    </div>
                  )}
                  <p className="text-center font-['Nunito'] text-sm italic text-[#754F26] mt-2">
                    {scientificName}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4 bg-[#F5F5F5] border-4 border-[#2C2C2C] rounded-2xl p-4 shadow-inner">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative w-28 h-28 mb-4 flex items-center justify-center bg-white border-2 border-[#E0E0E0] rounded-xl p-2"
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={animalName}
                        fill
                        className="object-contain drop-shadow-md"
                        unoptimized
                      />
                    ) : (
                      <div className="w-20 h-20">{renderAnimalPixelArt()}</div>
                    )}
                  </motion.div>

                  <h3 className="font-['Press_Start_2P'] text-sm text-[#2C2C2C] text-center leading-relaxed px-2 break-words">
                    {animalName.toUpperCase()}
                  </h3>

                  {confidence > 0 && (
                    <p className="font-['Nunito'] text-xs font-bold text-gray-500 mt-2">
                      AI Confidence: {confidence}%
                    </p>
                  )}
                </div>
              )}
            </motion.div>

            {isNewDiscovery && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="px-6 pb-4 space-y-3"
              >
                <div className="bg-white border-3 border-[#2C2C2C] rounded-xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-xl">📝</span>
                    <h3 className="font-['Nunito'] font-bold text-[#2C2C2C] text-sm">
                      Description
                    </h3>
                  </div>
                  <p className="font-['Nunito'] text-sm text-[#754F26] leading-relaxed">
                    {description}
                  </p>
                </div>
              </motion.div>
            )}

            <div className="px-6 pb-6 space-y-4">
              {isNewDiscovery ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="bg-[#FFC800] border-3 border-[#2C2C2C] rounded-xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white border-2 border-[#2C2C2C] rounded-full flex items-center justify-center">
                        <Coins
                          className="w-7 h-7 text-[#FFC800]"
                          strokeWidth={3}
                        />
                      </div>
                      <div>
                        <p className="font-['Nunito'] text-sm text-[#2C2C2C] font-bold">
                          Coins Earned
                        </p>
                        <p className="font-['Press_Start_2P'] text-lg text-[#2C2C2C]">
                          +{coinsEarned}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      <Star
                        className="w-8 h-8 text-white"
                        fill="white"
                        strokeWidth={2}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="bg-[#E0E0E0] border-3 border-[#2C2C2C] rounded-xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]"
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 bg-white border-2 border-[#2C2C2C] rounded-full flex items-center justify-center opacity-50">
                      <img
                        src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/coin.png"
                        alt="Coin"
                        className="w-5 h-5 object-contain drop-shadow-sm animate-[pulse_2s_infinite]"
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-['Nunito'] text-sm text-[#757575] font-bold">
                        Already Discovered
                      </p>
                      <p className="font-['Press_Start_2P'] text-xs text-[#2C2C2C] mt-1">
                        +0 Coins
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={onClose}
                className={`
                  w-full border-4 border-[#2C2C2C] rounded-xl py-4
                  shadow-[6px_6px_0_0_rgba(0,0,0,0.3)]
                  active:shadow-[3px_3px_0_0_rgba(0,0,0,0.3)]
                  active:translate-x-1 active:translate-y-1
                  transition-all duration-150
                  ${isNewDiscovery ? "bg-[#00D66F] hover:bg-[#00F47F]" : "bg-[#FFC800] hover:bg-[#FFD54F]"}
                `}
              >
                <span
                  className={`font-['Press_Start_2P'] text-sm drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)] ${isNewDiscovery ? "text-white" : "text-[#2C2C2C]"}`}
                >
                  {isNewDiscovery ? "AWESOME!" : "CONTINUE"}
                </span>
              </motion.button>
            </div>
          </div>

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
