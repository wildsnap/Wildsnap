"use client";
import { useState } from "react";
import { BottomNavigation } from "./components/bottom-navigation";
import { HomeScreen } from "./components/home-screen";
import { CollectionScreen } from "./components/collection-screen";
import { ScanScreen } from "./components/scan-screen";
import { RewardModal } from "./components/reward-modal";
import { AvatarScreen } from "./components/avatar-screen";
import { ShopScreen } from "./components/shop-screen";
import { UnlockAnimation } from "./components/animations/unlock-animation";
import { useCoin } from "./components/providers/CoinContext"

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
  capturedImage?: string;
  isNewDiscovery?: boolean;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"scan" | "collection" | "avatar" | "shop">("scan");

  // State for UI Visibility
  const [showScanScreen, setShowScanScreen] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Data State
  const { coins, setCoins } = useCoin();
  const [currentAnimal, setCurrentAnimal] = useState<AnimalData | null>(null);

  const handleScanClick = () => {
    setShowScanScreen(true);
  };

  // Logic for Scanning/Detecting Animals
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
      capturedImage: data.capturedImage,
      isNewDiscovery: data.isNewDiscovery,
    };

    setCurrentAnimal(detectedAnimal);
    setShowScanScreen(false);
    setCoins((prev) => prev + (detectedAnimal.coins || 0));

    if (data.isNewDiscovery) {
      setCoins((prev) => prev + (detectedAnimal.coins || 0));
      setRefreshTrigger((prev) => prev + 1);
    }

    setShowRewardModal(true);
  };

  // NEW: Logic to handle successful purchases from ShopScreen
  const handlePurchaseSuccess = (newBalance: number) => {
    console.log("Updating coins to:", newBalance);
    setCoins(newBalance);
  };

  const handleAnimalClick = (id: number) => {
    console.log("Animal clicked:", id);
  };

  const handleRewardModalClose = () => {
    setShowRewardModal(false);
    if (currentAnimal?.isNewDiscovery) {
      setShowUnlockAnimation(true);
    } else {
      setCurrentAnimal(null);
    }
  };

  const handleUnlockComplete = () => {
    setShowUnlockAnimation(false);
    setCurrentAnimal(null);
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] max-w-md mx-auto bg-[#F5F8F0] overflow-hidden font-['Nunito']">
      
      {/* Screens Controlled by Tabs */}
      <div className={activeTab === "scan" ? "block h-full" : "hidden"}>
        <HomeScreen onScanClick={handleScanClick} username="Explorer" />
      </div>

      <div className={activeTab === "collection" ? "block h-full" : "hidden"}>
        <CollectionScreen
          onAnimalClick={handleAnimalClick}
          refreshTrigger={refreshTrigger}
        />
      </div>

      <div className={activeTab === "avatar" ? "block h-full" : "hidden"}>
        <AvatarScreen
          username="Explorer"
          level={5}
          totalAnimals={12}
          achievements={8}
        />
      </div>

      {/* UPDATED: Shop Screen implementation */}
      <div className={activeTab === "shop" ? "block h-full" : "hidden"}>
        <ShopScreen 
          userCoins={coins} 
          onPurchaseSuccess={handlePurchaseSuccess} 
        />
      </div>

      {/* Navigation Overlay */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modals & Animations */}
      {showScanScreen && (
        <ScanScreen
          onClose={() => setShowScanScreen(false)}
          onAnimalDetected={handleAnimalDetected}
        />
      )}

      <RewardModal
        isOpen={showRewardModal}
        onClose={handleRewardModalClose}
        animalName={currentAnimal?.name || "Unknown"}
        confidence={currentAnimal?.confidence}
        capturedImage={currentAnimal?.capturedImage}
        funFact={currentAnimal?.funFact || "No fun fact available."}
        scientificName={currentAnimal?.scientificName}
        description={currentAnimal?.description}
        habitat={currentAnimal?.habitat}
        rarityLevel={currentAnimal?.rarity}
        coinsEarned={currentAnimal?.coins || 0}
        isNewDiscovery={currentAnimal?.isNewDiscovery}
        imageUrl={currentAnimal?.imageUrl}
      />

      <UnlockAnimation
        isOpen={showUnlockAnimation}
        onComplete={handleUnlockComplete}
        animalName={currentAnimal?.name || "Unknown"}
        rarityLevel={(currentAnimal?.rarity as any) || "Common"}
        imageUrl={currentAnimal?.imageUrl}
      />
    </div>
  );
}