import { X, Coins, Star, Sparkles, MapPin } from "lucide-react";
import { motion } from "motion/react";

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
  confidence?: number;
}

export function RewardModal({
  isOpen,
  onClose,
  animalName,
  scientificName,
  description,
  habitat,
  diet = "unknown",
  rarityLevel = "Common",
  coinsEarned,
  funFact,
  capturedImage,
  confidence = 0,
}: RewardModalProps) {
  if (!isOpen) return null;

  const getRarityConfig = (level: string) => {
    // แปลงเป็นตัวพิมพ์ใหญ่ให้หมด จะได้เทียบง่ายๆ
    const normalized = (level || "Common").toUpperCase();

    // Mapping ค่าสีตามระดับความหายาก
    const configs: Record<
      string,
      { gradient: string; text: string; stars: number }
    > = {
      COMMON: {
        gradient: "from-[#9E9E9E] to-[#757575]",
        text: "text-[#757575]",
        stars: 1,
      },

      // Map ทั้ง UNCOMMON และ RARE เข้ากลุ่มสีเขียว (หรือจะแยกก็ได้)
      UNCOMMON: {
        gradient: "from-[#4CAF50] to-[#388E3C]",
        text: "text-[#4CAF50]",
        stars: 2,
      },
      RARE: {
        gradient: "from-[#4CAF50] to-[#388E3C]",
        text: "text-[#4CAF50]",
        stars: 2,
      },

      EPIC: {
        gradient: "from-[#9C27B0] to-[#7B1FA2]",
        text: "text-[#9C27B0]",
        stars: 3,
      },
      LEGENDARY: {
        gradient: "from-[#FF9800] to-[#F57C00]",
        text: "text-[#FF9800]",
        stars: 4,
      },
    };

    // ถ้าหาไม่เจอ ให้ใช้ COMMON เป็นค่าเริ่มต้น (กันพัง)
    return configs[normalized] || configs.COMMON;
  };

  const rarityConfig = getRarityConfig(rarityLevel);

  const getDietConfig = (dietType: string) => {
    // แปลงเป็นตัวพิมพ์เล็กให้หมด
    const normalized = (dietType || "unknown").toLowerCase();

    const configs: Record<
      string,
      { icon: string; emoji: string; label: string }
    > = {
      herbivore: { icon: "🌿", emoji: "🥬", label: "Herbivore" },
      carnivore: { icon: "🥩", emoji: "🍖", label: "Carnivore" },
      omnivore: { icon: "🍽️", emoji: "🍴", label: "Omnivore" },
      unknown: { icon: "❓", emoji: "❓", label: "Unknown" },
    };

    return configs[normalized] || configs.unknown;
  };

  const dietConfig = getDietConfig(diet);

  // const rarityColors = {
  //   Common: { gradient: "from-[#9E9E9E] to-[#757575]", text: "text-[#757575]" },
  //   Rare: { gradient: "from-[#4CAF50] to-[#388E3C]", text: "text-[#4CAF50]" },
  //   Epic: { gradient: "from-[#9C27B0] to-[#7B1FA2]", text: "text-[#9C27B0]" },
  //   Legendary: {
  //     gradient: "from-[#FF9800] to-[#F57C00]",
  //     text: "text-[#FF9800]",
  //   },
  // };

  // const rarityStars = {
  //   Common: 1,
  //   Rare: 2,
  //   Epic: 3,
  //   Legendary: 4,
  // };

  // const dietInfo = {
  //   herbivore: { icon: "🌿", emoji: "🥬", label: "Herbivore" },
  //   carnivore: { icon: "🥩", emoji: "🍖", label: "Carnivore" },
  //   omnivore: { icon: "🍽️", emoji: "🍴", label: "Omnivore" },
  //   unknown: { icon: "❓", emoji: "❓", label: "Unknown" },
  // };

  const renderAnimalPixelArt = () => {
    return (
      <svg viewBox="0 0 64 64" className="w-full h-full">
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

  // const currentDiet = dietInfo[diet] || dietInfo["unknown"];

  return (
    // [แก้ไข 1] เปลี่ยนจาก fixed flex items-center เป็น fixed overflow-y-auto
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm">
      {/* [แก้ไข 2] เพิ่ม Container ชั้นนี้เพื่อจัดกึ่งกลางและรองรับการ Scroll */}
      <div className="flex min-h-full items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 10 }}
          transition={{ type: "spring", duration: 0.5 }}
          // [แก้ไข 3] เพิ่ม my-8 เพื่อให้มีพื้นที่หายใจด้านบนและล่างเวลา Scroll
          className="relative w-full max-w-sm my-8"
        >
          {/* Celebration stars */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Star className="w-16 h-16 text-[#FFC800]" fill="#FFC800" />
            </motion.div>
          </div>

          {/* Modal Content */}
          <div className="bg-white border-4 border-[#2C2C2C] rounded-2xl shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#00D66F] to-[#00F47F] border-b-4 border-[#2C2C2C] px-6 py-4 relative overflow-hidden">
              <motion.div
                className="absolute inset-0"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
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

              <div className="relative">
                <h2 className="font-['Press_Start_2P'] text-xl text-white text-center drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)] leading-relaxed">
                  SUCCESS!
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Sparkles className="w-5 h-5 text-white" />
                  <p className="font-['Nunito'] text-white font-bold text-lg">
                    New Discovery!
                  </p>
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>

              <button
                onClick={onClose}
                className="absolute top-2 right-2 w-8 h-8 bg-[#FF4757] border-2 border-white rounded-full flex items-center justify-center active:scale-95 transition-transform"
              >
                <X className="w-4 h-4 text-white" strokeWidth={3} />
              </button>
            </div>

            {/* Animal Display */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="px-6 pt-6 pb-4"
            >
              <div className="bg-gradient-to-b from-[#FFF9E6] to-[#FFF3CC] border-4 border-[#2C2C2C] rounded-2xl p-4 shadow-[6px_6px_0_0_rgba(0,0,0,0.25)]">
                {/* Animal Image Container */}
                <div className="bg-white border-3 border-[#2C2C2C] rounded-xl p-4 mb-4 flex items-center justify-center h-40">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
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

                {/* Animal Name Badge */}
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-[#00D66F] to-[#00B85C] border-3 border-[#2C2C2C] rounded-xl px-6 py-3 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                    <p className="font-['Press_Start_2P'] text-lg text-white text-center drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)] leading-relaxed">
                      {animalName.toUpperCase()}
                    </p>
                  </div>
                </div>

                {confidence > 0 && (
                  <div className="mt-2 bg-[#2C2C2C] text-white text-xs font-['Nunito'] font-bold px-3 py-1 rounded-full border-2 border-white shadow-sm">
                    AI Confidence: {confidence}%
                  </div>
                )}

                {/* Scientific Name */}
                <p className="text-center font-['Nunito'] text-sm italic text-[#754F26] mt-2">
                  {scientificName}
                </p>
              </div>
            </motion.div>

            {/* Animal Information Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="px-6 pb-4 space-y-3"
            >
              {/* Description */}
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

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Habitat */}
                <div className="bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] border-3 border-[#2C2C2C] rounded-xl p-3 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin
                      className="w-4 h-4 text-[#4CAF50]"
                      strokeWidth={3}
                    />
                    <span className="font-['Nunito'] text-xs font-bold text-[#2C2C2C]">
                      Habitat
                    </span>
                  </div>
                  <p className="font-['Nunito'] text-sm text-[#2C2C2C] font-bold">
                    {habitat}
                  </p>
                </div>

                {/* Diet */}
                <div className="bg-gradient-to-br from-[#FFF9E6] to-[#FFE4B5] border-3 border-[#2C2C2C] rounded-xl p-3 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">{dietConfig.icon}</span>
                    <span className="font-['Nunito'] text-xs font-bold text-[#2C2C2C]">
                      Diet
                    </span>
                  </div>
                  <p className="font-['Nunito'] text-sm text-[#2C2C2C] font-bold">
                    {dietConfig.label}
                  </p>
                </div>
              </div>

              {/* Rarity Badge */}
              <div
                className={`bg-gradient-to-r ${rarityConfig.gradient} border-3 border-[#2C2C2C] rounded-xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star
                      className="w-5 h-5 text-white"
                      fill="white"
                      strokeWidth={0}
                    />
                    <span className="font-['Nunito'] font-bold text-white text-sm">
                      Rarity Level
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: rarityConfig.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-[#FFC800]"
                        fill="#FFC800"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                </div>
                <p className="font-['Press_Start_2P'] text-white text-xs mt-2 drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
                  {rarityLevel.toUpperCase()}
                </p>
              </div>
            </motion.div>

            {/* Rewards */}
            <div className="px-6 pb-6 space-y-4">
              {/* Coins Earned */}
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
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
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

              {/* Fun Fact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-[#E8F5E9] border-3 border-[#2C2C2C] rounded-xl p-4"
              >
                <div className="flex items-start gap-2 mb-2">
                  <div className="bg-[#00D66F] border-2 border-[#2C2C2C] rounded-lg p-1.5 mt-0.5">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-['Nunito'] font-bold text-[#2C2C2C]">
                    Fun Fact!
                  </h3>
                </div>
                <p className="font-['Nunito'] text-sm text-[#2C2C2C] leading-relaxed pl-8">
                  {funFact}
                </p>
              </motion.div>

              {/* Continue Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={onClose}
                className="
                  w-full
                  bg-[#00D66F] 
                  border-4 border-[#2C2C2C] 
                  rounded-xl 
                  py-4
                  shadow-[6px_6px_0_0_rgba(0,0,0,0.3)]
                  active:shadow-[3px_3px_0_0_rgba(0,0,0,0.3)]
                  active:translate-x-1 active:translate-y-1
                  transition-all duration-150
                  hover:bg-[#00F47F]
                "
              >
                <span className="font-['Press_Start_2P'] text-white text-sm drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
                  AWESOME!
                </span>
              </motion.button>
            </div>
          </div>

          {/* Floating sparkles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#FFC800] rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
