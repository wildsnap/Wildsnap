import { Camera, Coins, Star } from "lucide-react";
import { PixelAvatar } from "./pixel-avatar";
import img8BitGraphicsPixelsSceneWithForest from "../images/8-bit-graphics-pixels-scene-with-forest.png";

interface HomeScreenProps {
  onScanClick: () => void;
  coins: number;
  username: string;
}

export function HomeScreen({ onScanClick, coins, username }: HomeScreenProps) {
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={img8BitGraphicsPixelsSceneWithForest.src as string}
          alt=""
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5F8F0]/60 to-[#F5F8F0]" />
      </div>

      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-['Press_Start_2P'] text-xl text-[#2C2C2C] drop-shadow-[2px_2px_0_#FFC800]">
              {username}
            </h1>
            <p className="font-['Nunito'] text-sm text-[#754F26] font-bold mt-1">
              Animal Explorer
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#FFC800] border-4 border-[#2C2C2C] rounded-full px-4 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)]">
            <Coins className="w-5 h-5 text-[#2C2C2C]" strokeWidth={3} />
            <span className="font-['Press_Start_2P'] text-sm text-[#2C2C2C]">
              {coins}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
        {/* Avatar */}
        <div className="relative mb-8 animate-[bounce_2s_ease-in-out_infinite]">
          <div className="absolute -inset-4 bg-gradient-to-b from-[#FFC800]/20 to-transparent rounded-full blur-xl" />
          <PixelAvatar className="w-48 h-36 relative z-10" />
        </div>

        {/* Quest Badge */}
        <div className="bg-white border-4 border-[#2C2C2C] rounded-xl p-4 mb-6 shadow-[6px_6px_0_0_rgba(0,0,0,0.25)] max-w-xs w-full">
          <div className="flex items-center gap-3">
            <div className="bg-[#00D66F] border-3 border-[#2C2C2C] rounded-lg p-2">
              <Star
                className="w-6 h-6 text-white"
                fill="white"
                strokeWidth={3}
              />
            </div>
            <div className="flex-1">
              <p className="font-['Nunito'] text-sm text-[#2C2C2C] font-bold">
                Daily Quest
              </p>
              <p className="font-['Nunito'] text-xs text-[#754F26]">
                Scan 3 animals
              </p>
            </div>
            <div className="font-['Press_Start_2P'] text-xs text-[#00D66F]">
              1/3
            </div>
          </div>
        </div>

        {/* Scan Button */}
        <button
          onClick={onScanClick}
          className="
            group relative
            bg-[#00D66F] 
            border-4 border-[#2C2C2C] 
            rounded-2xl 
            px-12 py-6
            shadow-[8px_8px_0_0_rgba(0,0,0,0.3)]
            active:shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]
            active:translate-x-1 active:translate-y-1
            transition-all duration-150
            hover:bg-[#00F47F]
          "
        >
          <div className="flex items-center gap-4">
            <Camera className="w-10 h-10 text-white" strokeWidth={3} />
            <div className="text-left">
              <span className="block font-['Press_Start_2P'] text-xl text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
                SCAN
              </span>
              <span className="block font-['Nunito'] text-sm text-white font-bold mt-1">
                Find an animal!
              </span>
            </div>
          </div>

          {/* Sparkle effect */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#FFC800] border-2 border-[#2C2C2C] rounded-full animate-ping" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#FFC800] border-2 border-[#2C2C2C] rounded-full" />
        </button>

        {/* Stats */}
        <div className="mt-8 flex gap-4">
          <div className="text-center">
            <div className="font-['Press_Start_2P'] text-2xl text-[#FF4757]">
              12
            </div>
            <div className="font-['Nunito'] text-xs text-[#754F26] font-bold mt-1">
              Found
            </div>
          </div>
          <div className="w-px bg-[#2C2C2C]/20" />
          <div className="text-center">
            <div className="font-['Press_Start_2P'] text-2xl text-[#00A3FF]">
              50
            </div>
            <div className="font-['Nunito'] text-xs text-[#754F26] font-bold mt-1">
              Total
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
