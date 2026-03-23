import { ChevronRight, Crown, Settings } from "lucide-react";
import { PixelAvatar } from "./pixel-avatar";
import img8BitGraphicsPixelsSceneWithForest from "../images/8-bit-graphics-pixels-scene-with-forest.png";

const getRankTitle = (level: number = 1) => {
  if (level >= 4) return "Master Explorer";
  if (level >= 3) return "Pro Tracker";
  if (level >= 2) return "Junior Scout";
  return "Novice Ranger"; // Level 1 or below
};

interface AvatarScreenProps {
  username: string;
  level: number;
  totalAnimals: number;
  achievements: number;
  currentExp: number; 
  targetExp: number;
  onAchievementsClick: () => void;
}

export function AvatarScreen({
  username,
  level,
  totalAnimals,
  achievements,
  currentExp,
  targetExp,
  onAchievementsClick,
}: AvatarScreenProps) {
  // Prevent division by zero and calculate percentage
  const progressPercentage = Math.min(100, (currentExp / Math.max(1, targetExp)) * 100);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#F5F8F0] to-[#E8F5E9] pb-20">
      {/* Header with Background */}
      <div className="relative bg-[#754F26] border-b-4 border-[#2C2C2C] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={img8BitGraphicsPixelsSceneWithForest.src as string}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative px-6 py-8">
          <div className="absolute top-4 right-4 bg-[#FFC800] border-3 border-[#2C2C2C] rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
            <Crown className="w-6 h-6 text-[#2C2C2C]" fill="#2C2C2C" />
            <span className="font-['Press_Start_2P'] text-xs text-[#2C2C2C] mt-1">
              {level}
            </span>
          </div>

          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-b from-[#FFC800]/30 to-transparent rounded-full blur-2xl" />
              <PixelAvatar className="w-40 h-28 relative z-10" />
            </div>
          </div>

          <h1 className="font-['Press_Start_2P'] text-xl text-white text-center drop-shadow-[3px_3px_0_rgba(0,0,0,0.5)] mb-2">
            {username}
          </h1>
          <p className="font-['Nunito'] text-[#FFC800] text-center font-bold">
            {getRankTitle(level)}
          </p>

          <div className="flex justify-center gap-6 mt-6">
            <div className="text-center">
              <div className="font-['Press_Start_2P'] text-2xl text-[#FFC800] drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
                {totalAnimals}
              </div>
              <div className="font-['Nunito'] text-white text-xs font-bold mt-1">
                Animals
              </div>
            </div>
            <div className="w-px bg-white/30" />
            <div className="text-center">
              <div className="font-['Press_Start_2P'] text-2xl text-[#FFC800] drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
                {achievements}
              </div>
              <div className="font-['Nunito'] text-white text-xs font-bold mt-1">
                Achievements
              </div>
            </div>
          </div>

          {/* 2. New Level Progress Bar Added Here */}
          <div className="mt-8 max-w-[260px] mx-auto w-full relative z-10">
            <div className="flex justify-between items-end mb-1 px-1">
              <span className="font-['Press_Start_2P'] text-[14px] text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
                LV {level}
              </span>
              <span className="font-['Press_Start_2P'] text-[14px] text-[#FFC800] drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
                {currentExp} / {targetExp} P
              </span>
            </div>
            
            {/* The Bar Track */}
            <div className="w-full h-4 bg-[#2C2C2C] p-[2px] shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
              {/* The Bar Fill */}
              <div
                className="h-full bg-gradient-to-r from-[#00D66F] to-[#00F47F] shadow-[inset_0_-2px_0_rgba(0,0,0,0.3)] transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-md mx-auto space-y-3">
          {/* Achievements Button */}
          <button 
            onClick={onAchievementsClick}
            className="w-full bg-white border-4 border-[#2C2C2C] rounded-xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] active:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FFC800] border-3 border-[#2C2C2C] rounded-lg flex items-center justify-center">
                  <Crown className="w-6 h-6 text-[#2C2C2C]" strokeWidth={3} />
                </div>
                <div className="text-left">
                  <p className="font-['Nunito'] font-bold text-[#2C2C2C]">
                    Achievements
                  </p>
                  <p className="font-['Nunito'] text-xs text-[#754F26]">
                    View your badges
                  </p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-[#2C2C2C]" strokeWidth={3} />
            </div>
          </button>

          {/* Edit Avatar */}
          <button className="w-full bg-white border-4 border-[#2C2C2C] rounded-xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] active:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#00D66F] border-3 border-[#2C2C2C] rounded-lg flex items-center justify-center">
                  <span className="font-['Press_Start_2P'] text-lg text-white">✏️</span>
                </div>
                <div className="text-left">
                  <p className="font-['Nunito'] font-bold text-[#2C2C2C]">
                    Edit Avatar
                  </p>
                  <p className="font-['Nunito'] text-xs text-[#754F26]">
                    Customize your look
                  </p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-[#2C2C2C]" strokeWidth={3} />
            </div>
          </button>

          {/* Settings */}
          <button className="w-full bg-white border-4 border-[#2C2C2C] rounded-xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] active:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#00A3FF] border-3 border-[#2C2C2C] rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
                <div className="text-left">
                  <p className="font-['Nunito'] font-bold text-[#2C2C2C]">
                    Settings
                  </p>
                  <p className="font-['Nunito'] text-xs text-[#754F26]">
                    Sound, language & more
                  </p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-[#2C2C2C]" strokeWidth={3} />
            </div>
          </button>

          {/* Daily Streak */}
          <div className="bg-gradient-to-r from-[#FF4757] to-[#FF6B7A] border-4 border-[#2C2C2C] rounded-xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-['Nunito'] font-bold text-white text-lg">
                  🔥 Streak
                </p>
                <p className="font-['Nunito'] text-white/90 text-sm">
                  Keep it going!
                </p>
              </div>
              <div className="font-['Press_Start_2P'] text-3xl text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
                7
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}