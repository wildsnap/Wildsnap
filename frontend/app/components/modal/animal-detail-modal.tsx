import { X, Star, MapPin, Sparkles, Coins, BookOpen } from "lucide-react";
import Image from "next/image";

interface AnimalDetailModalProps {
  animal: {
    id: number;
    name: string;
    scientificName?: string;
    description?: string;
    funFact?: string;
    habitat?: string;
    rarityLevel?: string;
    imageUrl?: string | null;
    pointsReward?: number;
  };
  onClose: () => void;
}

export function AnimalDetailModal({ animal, onClose }: AnimalDetailModalProps) {
  const getRarityTheme = (level: string = "COMMON") => {
    const upper = level.toUpperCase();
    if (upper === "UNCOMMON" || upper === "RARE") {
      return {
        gradient: "from-[#4CAF50] to-[#388E3C]",
        lightBg: "bg-[#E8F5E9]",
        stars: 2,
        textColor: "text-[#2E7D32]",
      };
    }
    if (upper === "EPIC") {
      return {
        gradient: "from-[#9C27B0] to-[#7B1FA2]",
        lightBg: "bg-[#F3E5F5]",
        stars: 3,
        textColor: "text-[#7B1FA2]",
      };
    }
    if (upper === "LEGENDARY") {
      return {
        gradient: "from-[#FFC800] to-[#FF9800]",
        lightBg: "bg-[#FFF8E1]",
        stars: 4,
        textColor: "text-[#E65100]",
      };
    }
    return {
      gradient: "from-[#9E9E9E] to-[#757575]",
      lightBg: "bg-[#F5F5F5]",
      stars: 1,
      textColor: "text-[#616161]",
    };
  };

  const rarityTheme = getRarityTheme(animal.rarityLevel);
  const rarityName = getMappedRarityName(animal.rarityLevel);
  console.log("Animal data in Modal:", animal);
  const scientificName = animal.scientificName || "Unknown species";
  const habitat = animal.habitat || "Unknown";
  const description =
    animal.description || "No description available for this animal yet.";
  const funFact =
    animal.funFact || "Did you know? Every animal has its own unique secrets!";
  const pointsReward = animal.pointsReward || 0;

  function getMappedRarityName(level: string = "COMMON") {
    const upper = level.toUpperCase();
    if (upper === "UNCOMMON") return "Rare";
    if (upper === "RARE") return "Rare";
    if (upper === "EPIC") return "Epic";
    if (upper === "LEGENDARY") return "Legendary";
    return "Common";
  }

  const getDirectDriveLink = (url: string | null) => {
    if (!url) return null;
    if (url.includes("drive.google.com/file/d/")) {
      const match = url.match(/\/d\/(.+?)\//);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }
    return url;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-[#F5F8F0] border-t-4 border-l-4 border-r-4 border-[#2C2C2C] rounded-t-[2.5rem] shadow-[0_-8px_0_0_rgba(0,0,0,0.3)] animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] max-h-[90vh] overflow-y-auto overflow-x-hidden pb-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 bg-[#FF4757] border-4 border-[#2C2C2C] rounded-full flex items-center justify-center shadow-[4px_4px_0_0_rgba(0,0,0,0.4)] active:scale-95 active:shadow-none active:translate-y-1 transition-all"
        >
          <X className="w-5 h-5 text-white" strokeWidth={4} />
        </button>

        {/* 1. Header Area */}
        <div
          className={`relative pt-8 pb-20 px-6 bg-gradient-to-br ${rarityTheme.gradient} border-b-4 border-[#2C2C2C] overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)]" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center justify-center gap-1 mb-3 bg-black/20 px-4 py-1.5 rounded-full border-2 border-white/20 backdrop-blur-sm">
              {Array.from({ length: rarityTheme.stars }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-[#FFC800] drop-shadow-md"
                  fill="#FFC800"
                  strokeWidth={0}
                />
              ))}
              <span className="font-['Press_Start_2P'] text-[10px] text-white ml-2 drop-shadow-md">
                {rarityName.toUpperCase()}
              </span>
            </div>

            <h2 className="font-['Press_Start_2P'] text-2xl text-white text-center drop-shadow-[4px_4px_0_rgba(0,0,0,0.4)] leading-snug mb-2">
              {animal.name}
            </h2>
            <p className="font-['Nunito'] text-white/90 text-center font-bold italic text-base drop-shadow-md">
              {scientificName}
            </p>
          </div>
        </div>

        {/* 2. Image Area */}
        <div className="relative flex justify-center -mt-16 px-6 z-10">
          <div
            className={`relative ${rarityTheme.lightBg} border-4 border-[#2C2C2C] rounded-3xl p-4 shadow-[0_8px_0_0_rgba(0,0,0,0.2)] w-40 h-40 flex items-center justify-center`}
          >
            <div className="w-full h-full relative animate-[bounce_3s_ease-in-out_infinite]">
              {animal.imageUrl ? (
                <Image
                  src={getDirectDriveLink(animal.imageUrl) as string}
                  alt={animal.name}
                  fill
                  className="object-contain drop-shadow-[0_8px_8px_rgba(0,0,0,0.4)]"
                  unoptimized
                />
              ) : (
                <svg
                  viewBox="0 0 64 64"
                  className="w-full h-full drop-shadow-md"
                >
                  <rect x="16" y="8" width="8" height="8" fill="#754F26" />
                  <rect x="40" y="8" width="8" height="8" fill="#754F26" />
                  <rect x="16" y="16" width="32" height="24" fill="#AA7A41" />
                  <rect x="16" y="40" width="8" height="16" fill="#754F26" />
                  <rect x="40" y="40" width="8" height="16" fill="#754F26" />
                  <rect x="20" y="20" width="4" height="4" fill="#2C2C2C" />
                  <rect x="40" y="20" width="4" height="4" fill="#2C2C2C" />
                  <rect x="28" y="28" width="8" height="4" fill="#2C2C2C" />
                </svg>
              )}
            </div>

            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#FFC800] border-4 border-[#2C2C2C] rounded-full px-5 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] whitespace-nowrap">
              <span className="font-['Press_Start_2P'] text-sm text-[#2C2C2C]">
                #{animal.id.toString().padStart(3, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Information Content */}
        <div className="px-6 pt-12 pb-6 space-y-5">
          {/* Stats Grid (Habitat & Points Reward) */}
          <div className="grid grid-cols-2 gap-4">
            {/* Habitat Card */}
            <div className="bg-white border-4 border-[#2C2C2C] rounded-2xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.15)] relative overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="absolute -right-4 -top-4 opacity-10">
                <MapPin className="w-20 h-20" />
              </div>
              <div className="flex items-center gap-2 mb-2 relative z-10">
                <div className="bg-[#E8F5E9] p-1.5 rounded-md border-2 border-[#2C2C2C]">
                  <MapPin className="w-4 h-4 text-[#4CAF50]" strokeWidth={3} />
                </div>
                <span className="font-['Press_Start_2P'] text-[10px] text-[#754F26]">
                  HABITAT
                </span>
              </div>
              <p className="font-['Nunito'] text-[15px] text-[#2C2C2C] font-black relative z-10 leading-tight">
                {habitat}
              </p>
            </div>

            {/* Reward Points Card (แทนที่ Diet) */}
            <div className="bg-white border-4 border-[#2C2C2C] rounded-2xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.15)] relative overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="absolute -right-4 -top-4 opacity-10">
                <Coins className="w-20 h-20" />
              </div>
              <div className="flex items-center gap-2 mb-2 relative z-10">
                <div className="bg-[#FFF8E1] p-1.5 rounded-md border-2 border-[#2C2C2C]">
                  <Coins className="w-4 h-4 text-[#FFC800]" strokeWidth={3} />
                </div>
                <span className="font-['Press_Start_2P'] text-[10px] text-[#754F26]">
                  REWARD
                </span>
              </div>
              <p className="font-['Nunito'] text-[15px] text-[#2C2C2C] font-black relative z-10 leading-tight">
                +{pointsReward} Pts
              </p>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white border-4 border-[#2C2C2C] rounded-2xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.15)]">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-[#00D66F]" strokeWidth={3} />
              <h3 className="font-['Press_Start_2P'] text-[10px] text-[#2C2C2C]">
                DESCRIPTION
              </h3>
            </div>
            <p className="font-['Nunito'] text-[14px] text-[#5C3D1F] font-bold leading-relaxed">
              {description}
            </p>
          </div>

          {/* Fun Fact Note */}
          <div className="relative bg-[#FFF9C4] border-4 border-[#2C2C2C] rounded-2xl p-5 shadow-[4px_4px_0_0_rgba(0,0,0,0.15)]">
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#FF4757] border-2 border-[#2C2C2C] rounded-full shadow-sm z-10" />
            <div className="flex items-center gap-2 mb-3 border-b-2 border-[#2C2C2C]/10 pb-2">
              <Sparkles className="w-5 h-5 text-[#FF9800]" />
              <h3 className="font-['Press_Start_2P'] text-[11px] text-[#2C2C2C]">
                FUN FACT
              </h3>
            </div>
            <p className="font-['Nunito'] text-sm text-[#5C3D1F] font-bold leading-relaxed italic">
              "{funFact}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
