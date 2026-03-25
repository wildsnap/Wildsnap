"use client";

import { Camera, HelpCircle } from "lucide-react";
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

  const [mysteryAnimal, setMysteryAnimal] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100";

        const animalsRes = await axios.get(`${apiUrl}/animals`);
        const allAnimals = animalsRes.data;
        const totalAnimals = allAnimals.length;

        let unlockedAnimals = 0;
        let unlockedIds: number[] = [];

        if (clerkId) {
          try {
            const collectionRes = await axios.get(
              `${apiUrl}/collections/user/${clerkId}`,
            );

            if (collectionRes.data.collections) {
              unlockedIds = collectionRes.data.collections.map(
                (c: any) => c.animalId,
              );
            }
            unlockedAnimals = collectionRes.data.progress?.unlocked || 0;
          } catch (err) {
            console.error("Failed to fetch collection stats", err);
          }
        }

        setStats({ unlocked: unlockedAnimals, total: totalAnimals });

        const undiscoveredAnimals = allAnimals.filter(
          (a: any) => !unlockedIds.includes(a.id),
        );

        if (undiscoveredAnimals.length > 0) {
          const randomAnimal =
            undiscoveredAnimals[
              Math.floor(Math.random() * undiscoveredAnimals.length)
            ];
          setMysteryAnimal(randomAnimal.imageUrl);
        } else {
          setMysteryAnimal(null);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [clerkId, isLoaded]);

  return (
    <div className="flex flex-col min-h-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/home_bg.png"
          alt="Forest Background"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#F5F8F0] z-10" />
        <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(45deg,#000,#000_2px,transparent_2px,transparent_4px)] z-10" />
      </div>

      {/* Header: Player Status */}
      <header className="relative z-10 px-4 pt-5 pb-2">
        <div className="flex items-start justify-between">
          <div className="bg-black/40 border-2 border-white/20 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#FF4757] border-2 border-white rounded-md flex items-center justify-center shadow-inner">
              <span className="font-['Press_Start_2P'] text-[7px] text-white">Lv.{lvl}</span>
            </div>
            <div>
              <h1 className="font-['Press_Start_2P'] text-sm text-white drop-shadow-[2px_2px_0_#2C2C2C]">
                {username}
              </h1>
              <p className="font-['Nunito'] text-[11px] text-[#FFC800] font-black mt-0.5 uppercase tracking-widest drop-shadow-md">
                {getRankTitle(lvl)}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-4 pt-3 pb-24 mb-20">
        {/* Quest Badge */}
        <div className="bg-[#FFF9C4] border-4 border-[#2C2C2C] rounded-xl p-3 mb-5 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] max-w-xs w-full relative overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform">
          <div className="absolute top-2 left-2 w-2 h-2 bg-[#FF4757] border border-[#2C2C2C] rounded-full" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#FF4757] border border-[#2C2C2C] rounded-full" />

          {missionData && missionData.mission ? (
            <div className="flex items-center gap-3 relative z-10 pt-1">
              <div className="bg-[#FF9800] border-2 border-[#2C2C2C] rounded-lg p-1.5 shadow-inner">
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
                  <div className="flex flex-col">
                    <span className="font-['Press_Start_2P'] text-[10px] text-[#754F26] font-extrabold uppercase tracking-widest mb-0.5">
                      Tutorial
                    </span>
                    <p className="font-['Press_Start_2P'] text-[10px] text-[#2C2C2C] leading-loose">
                      {missionData.mission.title || ""}
                    </p>
                  </div>

                  <span className="font-['Press_Start_2P'] text-[8px] text-[#00D66F]">
                    {missionData.currentProgress} /{" "}
                    {missionData.mission.targetValue}
                  </span>
                </div>

                <p className="font-['Press_Start_2P'] text-[8px] text-[#754F26] font-bold mb-1.5 line-clamp-2">
                  {missionData.mission.description}
                </p>

                <div className="w-full h-2.5 bg-[#E0E0E0] border-2 border-[#2C2C2C] rounded-full overflow-hidden">
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
            <div className="flex items-center justify-center h-16 relative z-10">
              <p className="font-['Nunito'] text-sm text-[#754F26] font-bold animate-pulse">
                Tutorial complete
              </p>
            </div>
          )}
        </div>

        <div
          className="relative mb-10 mt-auto flex flex-col items-center group cursor-pointer"
          onClick={onScanClick}
        >
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/30 rounded-[100%] blur-md transition-all duration-500 group-hover:w-28 group-hover:bg-black/40" />

          <div className="relative z-10 animate-[bounce_3s_ease-in-out_infinite] group-hover:animate-none group-hover:-translate-y-2 transition-transform duration-300">
            {isLoading ? (
              <div className="w-36 h-36 border-4 border-dashed border-[#2C2C2C]/20 rounded-xl flex items-center justify-center">
                <span className="font-['Press_Start_2P'] text-[#2C2C2C]/30 text-[10px] animate-pulse">
                  LOADING...
                </span>
              </div>
            ) : mysteryAnimal ? (
              <img
                src={mysteryAnimal}
                alt="Mystery Animal"
                className="w-36 h-36 object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] brightness-0 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:brightness-0"
              />
            ) : (
              <div className="w-36 h-36 flex flex-col items-center justify-center">
                <span className="text-6xl drop-shadow-xl mb-2 animate-pulse">
                  👑
                </span>
                <span className="font-['Press_Start_2P'] text-[#754F26] text-[8px] text-center">
                  ALL FOUND!
                </span>
              </div>
            )}
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
                <span className="block font-['Press_Start_2P'] text-[10px] text-[#2C2C2C] font-black mt-0.5 uppercase">
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
