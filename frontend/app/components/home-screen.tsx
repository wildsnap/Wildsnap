"use client";

import { Camera } from "lucide-react";
import { PixelAvatar } from "./pixel-avatar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

interface HomeScreenProps {
  onScanClick: () => void;
  username: string;
  lvl?: number;
  missionData: any;
}

const getRankTitle = (level: number = 1) => {
  if (level >= 4) return "Master Explorer";
  if (level >= 3) return "Pro Tracker";
  if (level >= 2) return "Junior Scout";
  return "Novice Ranger"; // Level 1 or below
};

export function HomeScreen({
  onScanClick,
  username,
  lvl,
  missionData,
}: HomeScreenProps) {
  const { userId: clerkId, isLoaded } = useAuth();

  const [stats, setStats] = useState({ unlocked: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    console.log(missionData);

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100";

        console.log("Fetching dashboard data from:", apiUrl);
        const animalsRes = await axios.get(`${apiUrl}/animals`);
        const totalAnimals = animalsRes.data.length;

        let unlockedAnimals = 0;

        if (clerkId) {
          try {
            const collectionRes = await axios.get(
              `${apiUrl}/collections/user/${clerkId}`,
            );
            unlockedAnimals = collectionRes.data.progress?.unlocked || 0;
          } catch (err) {
            console.error("Failed to fetch collection stats", err);
          }
        }

        setStats({ unlocked: unlockedAnimals, total: totalAnimals });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [clerkId, isLoaded]);

  return (
    <div className="flex flex-col min-h-full relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/home_bg.png"
          alt="Forest Background"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#F5F8F0] z-0" />
        <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(45deg,#000,#000_2px,transparent_2px,transparent_4px)] z-0" />
      </div>

      {/* Header: Player Status */}
      <header className="relative z-0 px-4 pt-5 pb-2">
        <div className="flex items-start justify-between">
          <div className="bg-black/40 border-2 border-white/20 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#FF4757] border-2 border-white rounded-md flex items-center justify-center shadow-inner">
              {/* 3. Inject the dynamic level here */}
              <span className="font-['Press_Start_2P'] text-[11px] text-white">
                Lv.{lvl}
              </span>
            </div>
            <div>
              <h1 className="font-['Press_Start_2P'] text-sm text-white drop-shadow-[2px_2px_0_#2C2C2C]">
                {username}
              </h1>
              {/* Optional: You could even change the "Explorer" title based on level later! */}
              <p className="font-['Nunito'] text-[11px] text-[#FFC800] font-black mt-0.5 uppercase tracking-widest drop-shadow-md">
                {getRankTitle(lvl)}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-0 flex-1 flex flex-col items-center px-4 pt-3 pb-24 mb-20">
        {/* Quest Badge */}
        <div className="bg-[#FFF9C4] border-4 border-[#2C2C2C] rounded-xl p-3 mb-5 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] max-w-xs w-full relative overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform">
          <div className="absolute top-2 left-2 w-2 h-2 bg-[#FF4757] border border-[#2C2C2C] rounded-full" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#FF4757] border border-[#2C2C2C] rounded-full" />

          {/* Fallback check in case missionData is null/loading */}
          {missionData && missionData.mission ? (
            <div className="flex items-center gap-3 relative z-10 pt-1">
              <div className="bg-[#FF9800] border-2 border-[#2C2C2C] rounded-lg p-1.5 shadow-inner">
                {/* Dynamically load the animal image, with a fallback to the star */}
                <img
                  src={
                    missionData.mission.animal?.imageUrl ||
                    "https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/star.png"
                  }
                  alt={missionData.mission.animal?.name || "Quest Target"}
                  className="w-8 h-8 object-contain drop-shadow-md brightness-0"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end mb-1">
                  {/* Wrapped the label and title in a column flex container */}
                  <div className="flex flex-col">
                    <span className="font-['Nunito'] text-[10px] text-[#754F26] font-extrabold uppercase tracking-widest mb-0.5">
                      Tutorial
                    </span>
                    <p className="font-['Press_Start_2P'] text-[14px] text-[#2C2C2C] leading-loose">
                      {missionData.mission.title || ""}
                    </p>
                  </div>

                  <span className="font-['Press_Start_2P'] text-[12px] text-[#00D66F]">
                    {missionData.currentProgress} /{" "}
                    {missionData.mission.targetValue}
                  </span>
                </div>

                <p className="font-['Nunito'] text-xs text-[#754F26] font-bold mb-1.5 line-clamp-2">
                  {missionData.mission.description}
                </p>

                <div className="w-full h-2.5 bg-[#E0E0E0] border-2 border-[#2C2C2C] rounded-full overflow-hidden">
                  {/* Dynamic Progress Bar */}
                  <div
                    className="h-full bg-gradient-to-r from-[#00D66F] to-[#00F47F] border-r-2 border-[#2C2C2C] transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.min(
                        100,
                        (missionData.currentProgress /
                          Math.max(1, missionData.mission.targetValue)) *
                          100,
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            // Loading state for the badge
            <div className="flex items-center justify-center h-16 relative z-10">
              <p className="font-['Nunito'] text-sm text-[#754F26] font-bold animate-pulse">
                Tutorial complete
              </p>
            </div>
          )}
        </div>

        {/* Avatar Character */}
        <div className="relative mb-10 mt-auto">
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black/20 rounded-[100%] blur-sm" />
          <div className="relative z-10 animate-[bounce_2s_ease-in-out_infinite]">
            <PixelAvatar className="w-36 h-28 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]" />
          </div>
        </div>

        {/* Scan Button */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#00D66F] rounded-2xl blur-xl opacity-50 animate-pulse" />

          <button
            onClick={onScanClick}
            className="
              relative z-10 group
              bg-gradient-to-b from-[#00F47F] to-[#00D66F]
              border-4 border-[#2C2C2C] 
              rounded-2xl 
              px-8 py-4 
              shadow-[0_6px_0_0_#008744,0_10px_0_0_#2C2C2C]
              active:shadow-[0_0px_0_0_#008744,0_4px_0_0_#2C2C2C]
              active:translate-y-2
              transition-all duration-150
            "
          >
            <div className="absolute top-1 left-2 right-2 h-2.5 bg-white/30 rounded-full" />

            <div className="flex items-center gap-4">
              <div className="bg-[#2C2C2C] p-2.5 rounded-xl group-active:scale-95 transition-transform">
                <Camera className="w-7 h-7 text-[#FFC800]" strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <span className="block font-['Press_Start_2P'] text-lg text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)] tracking-widest">
                  SCAN
                </span>
                <span className="block font-['Nunito'] text-sm text-[#2C2C2C] font-black mt-0.5 uppercase">
                  Discover Animals!
                </span>
              </div>
            </div>

            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#FFC800] border-2 border-[#2C2C2C] rounded-full flex items-center justify-center animate-bounce z-20">
              <span className="text-[10px]">✨</span>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
