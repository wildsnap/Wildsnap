"use client";
import { useState } from "react";
import { BottomNavigation } from "./components/bottom-navigation";
import { HomeScreen } from "./components/home-screen";
import { CollectionScreen } from "./components/collection-screen";
import { ScanScreen } from "./components/scan-screen";
import { RewardModal } from "./components/reward-modal";
import { AvatarScreen } from "./components/avatar-screen";
import { ShopScreen } from "./components/shop-screen";

interface AnimalData {
  name: string;
  confidence: number;
  funFact?: string;
  imageUrl?: string;
  scientificName?: string;
  description?: string;
  habitat?: string;
  rarity?: string;
  coins?: number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "scan" | "collection" | "avatar" | "shop"
  >("scan");

  // State สำหรับ Modal และ Screen
  const [showScanScreen, setShowScanScreen] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);

  // State ข้อมูล
  const [coins, setCoins] = useState(300);
  const [currentAnimal, setCurrentAnimal] = useState<AnimalData | null>(null);

  const handleScanClick = () => {
    setShowScanScreen(true);
  };

  // รับ data จาก ScanScreen
  const handleAnimalDetected = (data: any) => {
    if (data.class_name === "Unknown") {
      alert("ไม่สามารถระบุชนิดสัตว์ได้ กรุณาลองถ่ายใหม่อีกครั้งให้ชัดเจนขึ้น");
      return;
    }

    const detectedAnimal: AnimalData = {
      name: data.class_name,
      confidence: data.confidence,
      funFact: data.fun_fact,
      imageUrl: data.imageUrl,
      scientificName: data.scientific_name,
      description: data.description,
      habitat: data.habitat,
      rarity: data.rarity,
      coins: data.points_reward,
    };

    setCurrentAnimal(detectedAnimal);
    setShowScanScreen(false);
    setCoins((prev) => prev + (detectedAnimal.coins || 50));
    setShowRewardModal(true);
  };

  const handleAnimalClick = (id: number) => {
    console.log("Animal clicked:", id);
  };

  const handlePurchase = (itemId: number) => {
    console.log("Purchase item:", itemId);
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] max-w-md mx-auto bg-[#F5F8F0] overflow-hidden font-['Nunito']">
      {/* Main Content */}
      <div className="h-full overflow-y-auto pb-20">
        {activeTab === "scan" && (
          <HomeScreen
            onScanClick={handleScanClick}
            coins={coins}
            username="Explorer"
          />
        )}
        {activeTab === "collection" && (
          <CollectionScreen onAnimalClick={handleAnimalClick} />
        )}
        {activeTab === "avatar" && (
          <AvatarScreen
            username="Explorer"
            level={5}
            totalAnimals={12}
            achievements={8}
          />
        )}
        {activeTab === "shop" && (
          <ShopScreen userCoins={coins} onPurchase={handlePurchase} />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Scan Screen Overlay */}
      {showScanScreen && (
        <ScanScreen
          onClose={() => setShowScanScreen(false)}
          onAnimalDetected={handleAnimalDetected}
        />
      )}

      {/* Reward Modal */}
      <RewardModal
        isOpen={showRewardModal}
        onClose={() => setShowRewardModal(false)}
        animalName={currentAnimal?.name || "Unknown"}
        confidence={currentAnimal?.confidence}
        capturedImage={currentAnimal?.imageUrl}
        funFact={currentAnimal?.funFact || "No fun fact available."}
        scientificName={currentAnimal?.scientificName}
        description={currentAnimal?.description}
        habitat={currentAnimal?.habitat}
        rarityLevel={currentAnimal?.rarity}
        coinsEarned={currentAnimal?.coins || 50}
      />
    </div>
  );
}
