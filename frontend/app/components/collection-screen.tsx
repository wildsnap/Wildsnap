"use client";

import { Lock, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { AnimalDetailModal } from "./modal/animal-detail-modal";
import { useSettings } from "../contexts/AudioContext";

interface Animal {
  id: number;
  name: string;
  scientificName?: string;
  description: string;
  funFact: string;
  habitat?: string;
  rarityLevel: string;
  imageUrl: string | null;
  isUnlocked: boolean;
  capturedAt?: string | null;
}

interface Progress {
  unlocked: number;
  total: number;
  percentage: number;
}

interface CollectionScreenProps {
  onAnimalClick: (id: number) => void;
  refreshTrigger?: number;
}

export function CollectionScreen({
  onAnimalClick,
  refreshTrigger = 0,
}: CollectionScreenProps) {
  const { userId: clerkId, isLoaded } = useAuth();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [progress, setProgress] = useState<Progress>({
    unlocked: 0,
    total: 0,
    percentage: 0,
  });
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { playClickSound } = useSettings();

  useEffect(() => {
    if (!isLoaded) return;

    const fetchCollection = async () => {
      try {
        setIsLoading(true);
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100";

        const allAnimalsResponse = await axios.get(`${apiUrl}/animals`);
        const masterAnimals = allAnimalsResponse.data;
        const totalAnimals = masterAnimals.length;

        if (!clerkId) {
          const lockedAnimals = masterAnimals.map((animal: any) => ({
            id: animal.id,
            name: "???",
            scientificName: "???",
            description: "Explore the wild to unlock this animal!",
            funFact: null,
            habitat: "Unknown",
            rarityLevel: animal.rarityLevel,
            isUnlocked: false,
            capturedAt: null,
            pointsReward: animal.pointsReward,
            imageUrl: animal.imageUrl,
          }));

          setAnimals(lockedAnimals);
          setProgress({
            unlocked: 0,
            total: totalAnimals,
            percentage: 0,
          });
        } else {
          const collectionResponse = await axios.get(
            `${apiUrl}/collections/user/${clerkId}`,
          );
          const userAnimals = collectionResponse.data.animals;
          const unlockedCount = collectionResponse.data.progress.unlocked;

          const mergedAnimals = masterAnimals.map((masterAnimal: any) => {
            const userUnlockedData = userAnimals.find(
              (ua: any) => ua.id === masterAnimal.id && ua.isUnlocked,
            );

            const isUnlocked = !!userUnlockedData;

            return {
              id: masterAnimal.id,
              name: isUnlocked ? masterAnimal.name : "???",
              scientificName: isUnlocked ? masterAnimal.scientificName : "???",
              description: isUnlocked
                ? masterAnimal.description
                : "Explore the wild to unlock this animal!",
              habitat: isUnlocked ? masterAnimal.habitat : "Unknown",
              rarityLevel: masterAnimal.rarityLevel,
              imageUrl: masterAnimal.imageUrl,
              isUnlocked: isUnlocked,
              capturedAt: isUnlocked ? userUnlockedData.capturedAt : null,
              funFact: masterAnimal.funFact,
              pointsReward: masterAnimal.pointsReward,
            };
          });

          setAnimals(mergedAnimals);
          setProgress({
            unlocked: unlockedCount,
            total: totalAnimals,
            percentage:
              totalAnimals > 0
                ? Math.round((unlockedCount / totalAnimals) * 100)
                : 0,
          });
        }

        setError(null);
      } catch (err) {
        console.error("Failed to fetch collection:", err);
        setError("ไม่สามารถดึงข้อมูลสมุดสะสมได้ กรุณาลองใหม่อีกครั้ง");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollection();
  }, [clerkId, isLoaded, refreshTrigger]);

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-[#F5F8F0] items-center justify-center pb-20">
        <Loader2 className="w-12 h-12 text-[#00D66F] animate-spin mb-4" />
        <p className="font-['Press_Start_2P'] text-sm text-[#754F26] animate-pulse">
          LOADING COLLECTION...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full bg-[#F5F8F0] items-center justify-center pb-20 px-4 text-center">
        <p className="font-['Nunito'] text-red-500 font-bold mb-4">{error}</p>
        <button
          onClick={() => {
            playClickSound();
            window.location.reload();
          }}
          className="bg-[#FFC800] border-4 border-[#2C2C2C] px-6 py-2 rounded-xl font-['Press_Start_2P'] text-xs shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none"
        >
          RETRY
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-linear-to-b from-[#F5F8F0] to-[#E8F5E9]">
      {/* Header */}
      <header className="bg-[#754F26] border-b-4 border-[#2C2C2C] px-4 py-6 shadow-[0_4px_0_0_rgba(0,0,0,0.2)] z-10">
        <h1 className="font-['Press_Start_2P'] text-xl text-[#FFC800] text-center drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
          ANIMAL DEX
        </h1>
        <div className="flex justify-center gap-2 mt-3">
          <div className="font-['Press_Start_2P'] text-white font-bold">
            {progress.unlocked}/{progress.total} Found
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-4 bg-[#513418] border-3 border-[#2C2C2C] rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-[#00D66F] to-[#00F47F] transition-all duration-1000 ease-out"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </header>

      {/* Collection Grid */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pb-20">
          {" "}
          {animals.map((animal) => (
            <button
              key={animal.id}
              onClick={() => {
                if (animal.isUnlocked) {
                  playClickSound();
                  setSelectedAnimal(animal);
                  onAnimalClick(animal.id);
                }
              }}
              disabled={!animal.isUnlocked}
              className={`
                relative flex flex-col items-center justify-between p-2 pt-3 pb-2 
                border-4 border-[#2C2C2C] rounded-2xl
                transition-all duration-200 h-40 w-full
                ${
                  !animal.isUnlocked
                    ? "bg-[#A3A3A3] cursor-not-allowed shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]"
                    : "bg-[#FFFDF5] hover:bg-[#FFF9E6] active:scale-95 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.25)]"
                }
              `}
            >
              <div className="relative flex-1 flex items-center justify-center w-full mb-1 overflow-hidden">
                {!animal.isUnlocked ? (
                  <>
                    <div className="absolute top-2 right-2">
                      <Lock
                        className="w-4 h-4 text-[#525252]"
                        strokeWidth={3}
                      />
                    </div>
                    {animal.imageUrl ? (
                      <Image
                        src={animal.imageUrl}
                        alt="Unknown"
                        width={56}
                        height={56}
                        className="object-contain brightness-0 opacity-70 drop-shadow-md"
                        unoptimized
                      />
                    ) : (
                      <div className="w-12 h-12 bg-[#757575] border-2 border-[#424242] rounded-lg opacity-50" />
                    )}
                  </>
                ) : (
                  <>
                    {animal.imageUrl ? (
                      <Image
                        src={animal.imageUrl}
                        alt={animal.name}
                        width={80}
                        height={80}
                        className="object-contain drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] transform transition-transform group-hover:scale-110 max-h-full"
                        unoptimized
                      />
                    ) : (
                      <div className="w-16 h-16 relative"></div>
                    )}
                  </>
                )}
              </div>

              <div className="w-full text-center mt-auto bg-black/5 rounded-lg py-1 px-1 overflow-hidden">
                <span className="font-['Press_Start_2P'] text-[9px] font-black text-[#2C2C2C]/60 block mb-0.5">
                  #{animal.id.toString().padStart(3, "0")}
                </span>

                {animal.isUnlocked && (
                  <span className="font-['Press_Start_2P'] text-[7px] font-bold text-[#5C3D1F] block leading-tight truncate">
                    {animal.name}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </main>

      {selectedAnimal && (
        <AnimalDetailModal
          animal={selectedAnimal}
          onClose={() => setSelectedAnimal(null)}
        />
      )}
    </div>
  );
}
