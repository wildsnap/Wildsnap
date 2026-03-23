"use client";
import { useState, useEffect, useCallback } from "react";
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
import { AchievementToast } from "./components/achievement-toast";
import {
  AchievementsScreen,
  AchievementData,
} from "./components/achievements-screen";

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
  if (points >= 1200) return 4;
  if (points >= 700) return 3;
  if (points >= 200) return 2;
  return 1;
};

const calculateNextLevelTarget = (points: number) => {
  if (points >= 1200) return 9999;
  if (points >= 700) return 1200;
  if (points >= 200) return 700;
  return 200;
};

export default function Home() {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<"scan" | "collection" | "avatar" | "shop">("scan");
  const [profileView, setProfileView] = useState<"avatar" | "achievements">("avatar");

  const [showScanScreen, setShowScanScreen] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // New state for unlocked achievements queue
  const [unlockedAchievementsQueue, setUnlockedAchievementsQueue] = useState<any[]>([]);
  const [currentToast, setCurrentToast] = useState<any | null>(null);

  const [dbUser, setDbUser] = useState<any>(null);
  const [activeMission, setActiveMission] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [achievements, setAchievements] = useState<AchievementData[]>([]);
  const [isAchievementsLoading, setIsAchievementsLoading] = useState(true);
  const [achievementsError, setAchievementsError] = useState<string | null>(null);

  const { coins, setCoins } = useCoin();
  const [currentAnimal, setCurrentAnimal] = useState<AnimalData | null>(null);

  const fetchData = async () => {
    if (!clerkUser?.id) return;
    try {
      const headers = { "x-user-id": clerkUser.id };

      const [userRes, missionRes] = await Promise.all([
        fetch(`${API_BASE_URL}/users`, { headers }),
        fetch(`${API_BASE_URL}/quests/guided`, { headers }),
      ]);

      const userData = await userRes.json();
      setDbUser(userData);

      if (missionRes.ok) {
        const missionData = await missionRes.json();
        if (missionData && !missionData.isFinished) {
          setActiveMission(missionData);
        } else {
          setActiveMission(null);
        }
      }

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

  const fetchUserAchievements = useCallback(async () => {
    if (!dbUser?.id) return;

    try {
      setIsAchievementsLoading(true);
      setAchievementsError(null);

      const response = await fetch(`${API_BASE_URL}/achievement/user/${dbUser.id}`);

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const formattedData: AchievementData[] = data.map((item: any) => ({
        id: item.achievement.id,
        title: item.achievement.name,
        description: item.achievement.description,
        currentProgress: item.currentProgress,
        targetValue: item.achievement.targetValue,
        isCompleted: item.isCompleted,
        rewardPoints: item.achievement.rewardPoints,
      }));

      setAchievements(formattedData);
    } catch (err) {
      console.error("Failed to fetch achievements:", err);
      setAchievementsError("Could not load your badges. Please check your connection.");
    } finally {
      setIsAchievementsLoading(false);
    }
  }, [dbUser?.id]);

  useEffect(() => {
    fetchUserAchievements();
  }, [fetchUserAchievements]);

  // Handle Toast Queue
  useEffect(() => {
    if (!currentToast && unlockedAchievementsQueue.length > 0) {
      setCurrentToast(unlockedAchievementsQueue[0]);
      setUnlockedAchievementsQueue(prev => prev.slice(1));
    }
  }, [unlockedAchievementsQueue, currentToast]);

  const handleScanClick = () => setShowScanScreen(true);

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
    await fetchUserAchievements();

    if (data.isNewDiscovery) {
      setRefreshTrigger((prev) => prev + 1);
    }

    // Process new achievements from the API payload
    if (data.unlockedAchievements && data.unlockedAchievements.length > 0) {
      setUnlockedAchievementsQueue(prev => [...prev, ...data.unlockedAchievements]);
    }
  };

  const handlePurchaseSuccess = (newBalance: number) => {
    setCoins(newBalance);
    fetchData();
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

  const displayUsername = dbUser?.username || clerkUser?.firstName || "Explorer";

  if (!isClerkLoaded || isLoadingData) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F5F8F0]">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-64px)] max-w-md mx-auto bg-[#F5F8F0] overflow-hidden font-['Nunito']">
      
      {/* Toast Notification Layer */}
      <AchievementToast 
        achievement={currentToast} 
        onClose={() => setCurrentToast(null)} 
      />

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
        {profileView === "avatar" ? (
          <AvatarScreen
            username={displayUsername}
            level={calculateLevel(dbUser?.totalPointsEarned || 0)}
            totalAnimals={dbUser?._count?.collections || 0}
            achievements={dbUser?._count?.achievements || 0}
            currentExp={dbUser?.totalPointsEarned || 0}
            targetExp={calculateNextLevelTarget(dbUser?.totalPointsEarned || 0)}
            onAchievementsClick={() => setProfileView("achievements")}
          />
        ) : (
          <AchievementsScreen
            achievements={achievements}
            isLoading={isAchievementsLoading}
            error={achievementsError}
            onBack={() => setProfileView("avatar")}
            onRetry={fetchUserAchievements}
          />
        )}
      </div>

      <div className={activeTab === "shop" ? "block h-full" : "hidden"}>
        <ShopScreen
          userCoins={coins}
          onPurchaseSuccess={handlePurchaseSuccess}
        />
      </div>

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab !== "avatar") setProfileView("avatar");
        }}
      />

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