import { ChevronRight, Crown } from "lucide-react";
import img8BitGraphicsPixelsSceneWithForest from "../images/8-bit-graphics-pixels-scene-with-forest.png";
import { useState } from "react";
import { SettingsModal } from "./settings-modal";
import { useSettings } from "../contexts/AudioContext";

// Define the type so the component knows what 'inventory' looks like
import type { InventoryItem } from "../page";

const getRankTitle = (level: number = 1) => {
  if (level >= 4) return "Master Explorer";
  if (level >= 3) return "Pro Tracker";
  if (level >= 2) return "Junior Scout";
  return "Novice Ranger";
};

interface AvatarScreenProps {
  username: string;
  level: number;
  totalAnimals: number;
  achievements: number;
  currentExp: number;
  targetExp: number;
  inventory: InventoryItem[];
  onAchievementsClick: () => void;
  onEditAvatarClick: () => void;
}

export function AvatarScreen({
  username,
  level,
  totalAnimals,
  achievements,
  currentExp,
  targetExp,
  inventory,
  onAchievementsClick,
  onEditAvatarClick,
}: AvatarScreenProps) {
  const [showSettings, setShowSettings] = useState(false);
  const progressPercentage = Math.min(
    100,
    (currentExp / Math.max(1, targetExp)) * 100,
  );

  const equippedHead = inventory?.find(
    (i) => i.isEquipped && i.item.type === "HEAD",
  )?.item.imageUrl;
  const equippedBody = inventory?.find(
    (i) => i.isEquipped && i.item.type === "BODY",
  )?.item.imageUrl;
  const equippedLeg = inventory?.find(
    (i) => i.isEquipped && i.item.type === "LEG",
  )?.item.imageUrl;
  const { playClickSound } = useSettings();

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#F5F8F0] to-[#E8F5E9] pb-20">
      {/* Header Section */}
      <div className="relative bg-[#754F26] border-b-4 border-[#2C2C2C] overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-20">
          <img
            src={img8BitGraphicsPixelsSceneWithForest.src as string}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative px-4 sm:px-6 py-4 sm:py-6">
          
          {/* Level Badge */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#FFC800] border-3 border-[#2C2C2C] rounded-full w-10 h-10 sm:w-12 sm:h-12 flex flex-col items-center justify-center shadow-[3px_3px_0_0_rgba(0,0,0,0.3)] z-20">
            <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-[#2C2C2C]" fill="#2C2C2C" />
            <span className="font-['Press_Start_2P'] text-[6px] sm:text-[8px] text-[#2C2C2C] mt-0.5">
              LV.{level}
            </span>
          </div>

          <div className="flex justify-center mb-2 sm:mb-3">
            <div className="relative">
              <div className="absolute -inset-6 sm:-inset-8 bg-gradient-to-b from-[#FFC800]/40 to-transparent rounded-full blur-xl z-0" />

              {/* Avatar Container */}
              <div className="relative z-10 w-24 h-28 sm:w-28 sm:h-36 flex flex-col items-center justify-center">
                {!equippedHead && !equippedBody && !equippedLeg && (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black/20 border-4 border-dashed border-white/40 rounded-xl flex items-center justify-center">
                    <span className="text-xl sm:text-2xl">👤</span>
                  </div>
                )}

                {equippedHead && (
                  <img
                    src={equippedHead}
                    className="h-[35%] w-auto object-contain z-30 drop-shadow-md"
                    alt="Head"
                  />
                )}
                {equippedBody && (
                  <img
                    src={equippedBody}
                    className="h-[35%] w-auto object-contain z-20 drop-shadow-md -mt-1 sm:-mt-2"
                    alt="Body"
                  />
                )}
                {equippedLeg && (
                  <img
                    src={equippedLeg}
                    className="h-[40%] w-auto object-contain z-10 -mt-2 sm:-mt-4 drop-shadow-md"
                    alt="Legs"
                  />
                )}
              </div>
            </div>
          </div>

          <h1 className="font-['Press_Start_2P'] text-sm sm:text-lg text-white text-center drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)] mb-1 relative z-10">
            {username}
          </h1>
          <p className="font-['Press_Start_2P'] text-[8px] sm:text-[10px] text-[#FFC800] text-center font-bold relative z-10">
            {getRankTitle(level)}
          </p>

          {/* Level Progress Bar */}
          <div className="mt-4 sm:mt-5 max-w-[260px] mx-auto w-full relative z-10">
            <div className="flex justify-between items-end mb-1 px-1">
              <span className="font-['Press_Start_2P'] text-[8px] sm:text-[10px] text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
                LV {level}
              </span>
              <span className="font-['Press_Start_2P'] text-[8px] sm:text-[10px] text-[#FFC800] drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
                {currentExp} / {targetExp} P
              </span>
            </div>

            <div className="w-full h-2.5 sm:h-3 bg-[#2C2C2C] p-[2px] shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
              <div
                className="h-full bg-gradient-to-r from-[#00D66F] to-[#00F47F] shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)] transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div className="flex-1 overflow-y-auto px-4 py-4 sm:py-5">
        <div className="max-w-md mx-auto space-y-2.5 sm:space-y-3">
          {/* Achievements Button */}
          <button
            onClick={() => {
              playClickSound();
              onAchievementsClick();
            }}
            className="w-full bg-white border-4 border-[#2C2C2C] rounded-xl p-3 sm:p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] active:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#feefb8] border-3 border-[#2C2C2C] rounded-lg flex items-center justify-center">
                  <img
                    src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/achievement.png"
                    alt="Trophy Icon"
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-sm"
                  />
                </div>
                <div className="text-left">
                  <p className="font-['Press_Start_2P'] font-bold text-[#2C2C2C] text-[10px] sm:text-[12px]">
                    Achievements
                  </p>
                  <p className="font-['Press_Start_2P'] text-[#754F26] text-[8px] sm:text-[10px] mt-1">
                    View your badges
                  </p>
                </div>
              </div>
              <ChevronRight
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#2C2C2C]"
                strokeWidth={3}
              />
            </div>
          </button>

          {/* Edit Avatar */}
          <button
            onClick={() => {
              onEditAvatarClick();
              playClickSound();
            }}
            className="w-full bg-white border-4 border-[#2C2C2C] rounded-xl p-3 sm:p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] active:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#c3f8de] border-3 border-[#2C2C2C] rounded-lg flex items-center justify-center">
                  <img
                    src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/edit.png"
                    alt="Edit Icon"
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-sm"
                  />
                </div>
                <div className="text-left">
                  <p className="font-['Press_Start_2P'] font-bold text-[#2C2C2C] text-[10px] sm:text-[12px]">
                    Edit Avatar
                  </p>
                  <p className="font-['Press_Start_2P'] text-[8px] sm:text-[10px] text-[#754F26] mt-1">
                    Customize your look
                  </p>
                </div>
              </div>
              <ChevronRight
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#2C2C2C]"
                strokeWidth={3}
              />
            </div>
          </button>

          {/* Settings Button */}
          <button
            className="w-full bg-white border-4 border-[#2C2C2C] rounded-xl p-3 sm:p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] active:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            onClick={() => {
              playClickSound();
              setShowSettings(true);
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#a3cfe9] border-3 border-[#2C2C2C] rounded-lg flex items-center justify-center">
                  <img
                    src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/setting.png"
                    alt="Setting Icon"
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-sm"
                  />
                </div>
                <div className="text-left">
                  <p className="font-['Press_Start_2P'] font-bold text-[#2C2C2C] text-[10px] sm:text-[12px]">
                    Settings
                  </p>
                  <p className="font-['Press_Start_2P'] text-[8px] sm:text-[10px] text-[#754F26] mt-1">
                    Sound, language & more
                  </p>
                </div>
              </div>
              <ChevronRight
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#2C2C2C]"
                strokeWidth={3}
              />
            </div>
          </button>
        </div>
      </div>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}