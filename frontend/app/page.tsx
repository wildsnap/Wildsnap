"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { BottomNavigation } from "./components/bottom-navigation";
import { HomeScreen } from "./components/home-screen";
import { CollectionScreen } from "./components/collection-screen";
import { ScanScreen } from "./components/scan-screen";
import { RewardModal } from "./components/reward-modal";
import { AvatarScreen } from "./components/avatar-screen";
import { ShopScreen } from "./components/shop-screen";
import { UnlockAnimation } from "./components/animations/unlock-animation";
import { useCoin } from "./components/providers/CoinContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100";

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

const calculateLevel = (points: number) => {
  if (points >= 950) return 5;
  if (points >= 600) return 4;
  if (points >= 250) return 3;
  if (points >= 100) return 2;
  return 1;
};

export default function Home() {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<
    "scan" | "collection" | "avatar" | "shop"
  >("scan");

  // State for UI Visibility
  const [showScanScreen, setShowScanScreen] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // DB Data State
  const [dbUser, setDbUser] = useState<any>(null);
  const [activeMission, setActiveMission] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const { coins, setCoins } = useCoin();
  const [currentAnimal, setCurrentAnimal] = useState<AnimalData | null>(null);

  const fetchData = async () => {
    if (!clerkUser?.id) return;
    try {
      const headers = { "x-user-id": clerkUser.id };

      // Fetch profile and next mission in parallel
      const [userRes, missionRes] = await Promise.all([
        fetch(`${API_BASE_URL}/users`, { headers }),
        fetch(`${API_BASE_URL}/quests/guided`, { headers }),
      ]);

      const userData = await userRes.json();

      setDbUser(userData);

      if (missionRes.ok) {
        const missionData = await missionRes.json();
        // Only set if it's a valid mission object (not the "All complete" message)
        if (missionData && !missionData.isFinished) {
          setActiveMission(missionData);
        } else {
          setActiveMission(null);
        }
      }

      // Sync global coin context with DB
      if (userData.currentPoints !== undefined) {
        setCoins(userData.currentPoints);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (isClerkLoaded && clerkUser) {
      fetchData();
    }
  }, [clerkUser, isClerkLoaded]);

  const handleScanClick = () => {
    setShowScanScreen(true);
  };

  const handleAnimalDetected = async (data: any) => {
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
      coins: data.points_reward || 0,
      capturedImage: data.capturedImage,
      isNewDiscovery: data.isNewDiscovery,
    };

    setCurrentAnimal(detectedAnimal);
    setShowScanScreen(false);
    setShowRewardModal(true);

    await fetchData();

    if (data.isNewDiscovery) {
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  const handlePurchaseSuccess = (newBalance: number) => {
    setCoins(newBalance);
    fetchData(); // Sync other user data
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

  // Safely grab display name
  const displayUsername =
    dbUser?.username || clerkUser?.firstName || "Explorer";

  if (!isClerkLoaded || isLoadingData) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F5F8F0]">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-64px)] max-w-md mx-auto bg-[#F5F8F0] overflow-hidden font-['Nunito']">
      {/* Screens Controlled by Tabs */}
      <div className={activeTab === "scan" ? "block h-full" : "hidden"}>
        <HomeScreen
          onScanClick={handleScanClick}
          username={displayUsername}
          lvl={calculateLevel(dbUser?.totalPointsEarned || 0)}
          missionData={activeMission}
        />
      </div>

      <div className={activeTab === "collection" ? "block h-full" : "hidden"}>
        <CollectionScreen
          onAnimalClick={(id) => console.log(id)}
          refreshTrigger={refreshTrigger}
        />
      </div>

      <div className={activeTab === "avatar" ? "block h-full" : "hidden"}>
        <AvatarScreen
          username={displayUsername}
          level={calculateLevel(dbUser?.totalPointsEarned || 0)}
          totalAnimals={dbUser?._count?.collections || 0}
          achievements={dbUser?._count?.achievements || 0}
        />
      </div>

      <div className={activeTab === "shop" ? "block h-full" : "hidden"}>
        <ShopScreen
          userCoins={coins}
          onPurchaseSuccess={handlePurchaseSuccess}
        />
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modals */}
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
        funFact={currentAnimal?.funFact || ""}
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
        rarityLevel={(currentAnimal?.rarity as any) || "COMMON"}
        imageUrl={currentAnimal?.imageUrl}
      />
    </div>
  );
}
