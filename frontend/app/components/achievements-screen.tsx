import {
  ChevronLeft,
  Trophy,
  Star,
  Lock,
  Camera,
  BookOpen,
} from "lucide-react";
import { useSettings } from "../contexts/AudioContext";

// Types
export interface AchievementData {
  id: number;
  title: string;
  description: string;
  currentProgress: number;
  targetValue: number;
  isCompleted: boolean;
  rewardPoints: number;
}

// UPDATE 1: Change props to accept the fetched data
interface AchievementsScreenProps {
  achievements: AchievementData[];
  isLoading: boolean;
  error: string | null;
  onBack: () => void;
  onRetry: () => void; // Added so we can trigger a refetch from the parent
}

export function AchievementsScreen({
  achievements,
  isLoading,
  error,
  onBack,
  onRetry,
}: AchievementsScreenProps) {
  const getIcon = (title: string, isCompleted: boolean) => {
    if (!isCompleted)
      return (
        <Lock className="w-6 h-6 text-[#2C2C2C] opacity-50" strokeWidth={3} />
      );
    if (title.toLowerCase().includes("scan"))
      return <Camera className="w-6 h-6 text-[#2C2C2C]" strokeWidth={3} />;
    if (title.toLowerCase().includes("story"))
      return <BookOpen className="w-6 h-6 text-[#2C2C2C]" strokeWidth={3} />;
    return <Star className="w-6 h-6 text-[#2C2C2C]" strokeWidth={3} />;
  };
  const { playClickSound } = useSettings();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full bg-[#E8F5E9] relative overflow-hidden">
        {/* Retro Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#2C2C2C 2px, transparent 2px), linear-gradient(90deg, #2C2C2C 2px, transparent 2px)",
            backgroundSize: "20px 20px",
          }}
        />
        <p className="font-['Press_Start_2P'] text-[#754F26] animate-pulse text-sm relative z-10 drop-shadow-[2px_2px_0_rgba(255,255,255,1)]">
          LOADING...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-full bg-[#E8F5E9] px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#2C2C2C 2px, transparent 2px), linear-gradient(90deg, #2C2C2C 2px, transparent 2px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="border-4 border-[#2C2C2C] bg-white p-6 rounded-none shadow-[6px_6px_0_0_#2C2C2C] relative z-10">
          <p className="font-['Press_Start_2P'] text-sm text-[#FF4757] mb-4">
            GAME OVER
          </p>
          <p className="font-['Nunito'] font-bold text-[#2C2C2C] text-sm mb-6">
            {error}
          </p>
          <button
            onClick={() => {
              playClickSound();
              onRetry();
            }}
            className="w-full bg-[#FFC800] border-4 border-[#2C2C2C] px-4 py-3 font-['Press_Start_2P'] text-[10px] text-[#2C2C2C] shadow-[4px_4px_0_0_#2C2C2C] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            RETRY
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#8B9BB4] relative overflow-hidden">
      {/* 8-bit Grid Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Chunky Header */}
      <div className="bg-[#E2D8C3] border-b-4 border-[#2C2C2C] px-4 py-4 sticky top-0 z-20 shadow-[0_4px_0_0_rgba(0,0,0,0.2)] relative">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => {
              playClickSound();
              onBack();
            }}
            className="w-12 h-12 bg-[#FF4757] border-4 border-[#2C2C2C] flex items-center justify-center shadow-[4px_4px_0_0_#2C2C2C] active:shadow-[0_0_0_0_#2C2C2C] active:translate-x-1 active:translate-y-1 transition-all"
          >
            <ChevronLeft className="w-8 h-8 text-white" strokeWidth={4} />
          </button>

          <div className="flex-1 flex justify-center items-center gap-3 pr-12">
            <img
              src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/achievement.png"
              alt="Trophy Icon"
              className="w-6 h-6 drop-shadow-[2px_2px_0_#2C2C2C]"
            />
            <h1 className="font-['Press_Start_2P'] text-[18px] text-[#2C2C2C] mt-1 drop-shadow-[2px_2px_0_rgba(255,255,255,0.8)]">
              BADGES
            </h1>
          </div>
        </div>
      </div>

      {/* Achievements List */}
      <div className="flex-1 overflow-y-auto px-4 py-6 relative z-10 pb-24">
        <div className="max-w-md mx-auto space-y-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative border-4 border-[#2C2C2C] p-4 transition-all ${
                achievement.isCompleted
                  ? "bg-[#F5F8F0] shadow-[6px_6px_0_0_#2C2C2C]"
                  : "bg-[#A9A9A9] shadow-[6px_6px_0_0_#555555] opacity-90 grayscale-[0.3]"
              }`}
            >
              <div className="absolute -top-4 -right-2 bg-[#FFC800] border-4 border-[#2C2C2C] px-3 py-1 flex items-center shadow-[4px_4px_0_0_#2C2C2C] z-10 transform rotate-3">
                <span className="font-['Press_Start_2P'] text-[10px] text-[#2C2C2C] pt-1">
                  +{achievement.rewardPoints} P
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className={`shrink-0 w-16 h-16 border-4 border-[#2C2C2C] flex items-center justify-center shadow-[inset_-4px_-4px_0_0_rgba(0,0,0,0.2)] ${
                    achievement.isCompleted ? "bg-[#00D66F]" : "bg-[#7A7A7A]"
                  }`}
                >
                  {getIcon(achievement.title, achievement.isCompleted)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <h2
                      className={`font-['Press_Start_2P'] text-[11px] leading-relaxed uppercase tracking-wider ${
                        achievement.isCompleted
                          ? "text-[#2C2C2C]"
                          : "text-[#4A4A4A]"
                      }`}
                    >
                      {achievement.title}
                    </h2>
                  </div>

                  <p
                    className={`font-['Nunito'] text-sm font-black mb-3 line-clamp-2 ${
                      achievement.isCompleted
                        ? "text-[#754F26]"
                        : "text-[#4A4A4A]"
                    }`}
                  >
                    {achievement.description}
                  </p>

                  <div className="space-y-2 mt-auto">
                    <div className="flex justify-end">
                      <span
                        className={`font-['Press_Start_2P'] text-[10px] ${
                          achievement.isCompleted
                            ? "text-[#00D66F] drop-shadow-[1px_1px_0_#2C2C2C]"
                            : "text-[#4A4A4A]"
                        }`}
                      >
                        {achievement.currentProgress}/{achievement.targetValue}
                      </span>
                    </div>

                    <div className="w-full h-4 bg-[#2C2C2C] p-[2px]">
                      <div
                        className={`h-full transition-all duration-500 ease-out ${
                          achievement.isCompleted
                            ? "bg-[#00D66F] shadow-[inset_0_-2px_0_rgba(0,0,0,0.3)]"
                            : "bg-[#555555]"
                        }`}
                        style={{
                          width: `${Math.min(
                            100,
                            (achievement.currentProgress /
                              Math.max(1, achievement.targetValue)) *
                              100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {achievements.length === 0 && (
            <div className="text-center py-16">
              <span className="text-6xl block mb-4 drop-shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
                👾
              </span>
              <p className="font-['Press_Start_2P'] text-[12px] text-white drop-shadow-[2px_2px_0_#2C2C2C] leading-loose mb-2">
                NO BADGES YET.
              </p>
              <p className="font-['Nunito'] text-sm font-black text-[#E2D8C3]">
                START EXPLORING TO EARN SOME!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
