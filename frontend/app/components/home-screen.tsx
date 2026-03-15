"use client";

import { Camera } from "lucide-react";
import { PixelAvatar } from "./pixel-avatar";
import img8BitGraphicsPixelsSceneWithForest from "../images/8-bit-graphics-pixels-scene-with-forest.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

interface HomeScreenProps {
  onScanClick: () => void;
  coins: number;
  username: string;
}

export function HomeScreen({ onScanClick, coins, username }: HomeScreenProps) {
  const { userId: clerkId, isLoaded } = useAuth();

  const [stats, setStats] = useState({ unlocked: 0, total: 0 });
  const [displayCoins, setDisplayCoins] = useState(coins);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100";

        const animalsRes = await axios.get(`${apiUrl}/animals`);
        const totalAnimals = animalsRes.data.length;

        let unlockedAnimals = 0;
        let userCoins = coins;

        if (clerkId) {
          try {
            const collectionRes = await axios.get(
              `${apiUrl}/collections/user/${clerkId}`,
            );
            unlockedAnimals = collectionRes.data.progress?.unlocked || 0;
          } catch (err) {
            console.error("Failed to fetch collection stats", err);
          }

          try {
            const userRes = await axios.get(`${apiUrl}/users/${clerkId}`);
            if (userRes.data && userRes.data.currentPoints !== undefined) {
              userCoins = userRes.data.currentPoints;
            }
          } catch (err) {
            console.error("Failed to fetch user coins", err);
          }
        }

        setStats({ unlocked: unlockedAnimals, total: totalAnimals });
        setDisplayCoins(userCoins);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [clerkId, isLoaded, coins]);

  return (
    <div className="flex flex-col min-h-full relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-[#87CEEB]">
        <img
          src={img8BitGraphicsPixelsSceneWithForest.src as string}
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
              <span className="font-['Press_Start_2P'] text-[11px] text-white">
                Lv.5
              </span>
            </div>
            <div>
              <h1 className="font-['Press_Start_2P'] text-sm text-white drop-shadow-[2px_2px_0_#2C2C2C]">
                {username}
              </h1>
              <p className="font-['Nunito'] text-[11px] text-[#FFC800] font-black mt-0.5 uppercase tracking-widest drop-shadow-md">
                Explorer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#FFFDF5] border-4 border-[#2C2C2C] rounded-full px-4 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
            <img
              src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/coin.png"
              alt="Coin"
              className="w-5 h-5 object-contain drop-shadow-sm animate-[pulse_2s_infinite]"
            />
            <span className="font-['Press_Start_2P'] text-sm text-[#2C2C2C]">
              {isLoading ? "..." : displayCoins.toLocaleString()}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-0 flex-1 flex flex-col items-center px-4 pt-3 pb-24">
        {/* Avatar Character */}
        <div className="relative mb-4 mt-auto">
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black/20 rounded-[100%] blur-sm" />
          <div className="relative z-10 animate-[bounce_2s_ease-in-out_infinite]">
            <PixelAvatar className="w-36 h-28 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]" />
          </div>
        </div>

        {/* Quest Badge */}
        <div className="bg-[#FFF9C4] border-4 border-[#2C2C2C] rounded-xl p-3 mb-5 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] max-w-xs w-full relative overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform">
          <div className="absolute top-2 left-2 w-2 h-2 bg-[#FF4757] border border-[#2C2C2C] rounded-full" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#FF4757] border border-[#2C2C2C] rounded-full" />

          <div className="flex items-center gap-3 relative z-10 pt-1">
            <div className="bg-[#FF9800] border-2 border-[#2C2C2C] rounded-lg p-1.5 shadow-inner">
              <img
                src="https://acsscfdgobrlzsvzefjs.supabase.co/storage/v1/object/public/items/screens/star.png"
                alt="Star"
                className="w-6 h-6 object-contain drop-shadow-md"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-end mb-1">
                <p className="font-['Press_Start_2P'] text-[9px] text-[#2C2C2C] leading-loose">
                  DAILY QUEST
                </p>
                <span className="font-['Press_Start_2P'] text-[9px] text-[#00D66F]">
                  1/3
                </span>
              </div>
              <p className="font-['Nunito'] text-xs text-[#754F26] font-bold mb-1.5">
                Scan 3 wild animals
              </p>
              <div className="w-full h-2.5 bg-[#E0E0E0] border-2 border-[#2C2C2C] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00D66F] to-[#00F47F] w-[33%] border-r-2 border-[#2C2C2C]" />
              </div>
            </div>
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

        {/* Stats HUD */}
        <div className="mt-6 mb-auto bg-white/90 backdrop-blur-md border-4 border-[#2C2C2C] rounded-xl px-5 py-3 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] flex items-center justify-between w-full max-w-[280px]">
          <div className="text-center flex-1">
            <div className="font-['Press_Start_2P'] text-xl text-[#FF4757] drop-shadow-sm">
              {isLoading ? "..." : stats.unlocked}
            </div>
            <div className="font-['Nunito'] text-[10px] text-[#2C2C2C] font-black mt-1 uppercase tracking-wider">
              Unlocked
            </div>
          </div>

          <div className="w-1 h-8 bg-[#2C2C2C] rounded-full opacity-20 mx-4" />

          <div className="text-center flex-1">
            {/* 🌟 แสดงจำนวนสัตว์ทั้งหมดในระบบ */}
            <div className="font-['Press_Start_2P'] text-xl text-[#00A3FF] drop-shadow-sm">
              {isLoading ? "..." : stats.total}
            </div>
            <div className="font-['Nunito'] text-[10px] text-[#2C2C2C] font-black mt-1 uppercase tracking-wider">
              Database
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
