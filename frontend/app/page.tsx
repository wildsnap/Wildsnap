"use client";
import { useState } from "react";
import { BottomNavigation } from "./components/bottom-navigation";
import { HomeScreen } from "./components/home-screen";
import { CollectionScreen } from "./components/collection-screen";
import { ScanScreen } from "./components/scan-screen";
import { RewardModal } from "./components/reward-modal";
import { AvatarScreen } from "./components/avatar-screen";
import { ShopScreen } from "./components/shop-screen";
// import { UserButton } from "@clerk/nextjs"; // ถ้าอยากเอาปุ่ม Logout มาไว้ในหน้า App

// สร้าง Interface สำหรับข้อมูลที่จะรับจาก API
interface AnimalData {
  name: string;
  confidence: number;
  funFact?: string; // ถ้า API ส่งเกร็ดความรู้มาด้วย
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

  // รับ data จาก ScanScreen (API Response)
  const handleAnimalDetected = (data: any) => {
    // 1. แปลงข้อมูลจาก API ให้เข้ากับ Interface ของเรา
    const detectedAnimal: AnimalData = {
      name: data.class_name || "Unknown Animal",
      confidence: data.confidence || 0,
      funFact: data.fun_fact || `Did you know? ${data.class_name} is amazing!`, // Mock ถ้า API ไม่มี
    };

    // 2. เก็บลง State
    setCurrentAnimal(detectedAnimal);

    // 3. ปิดกล้อง และ เปิดหน้า Reward
    setShowScanScreen(false);

    // 4. ให้รางวัล
    setCoins((prev) => prev + 50);
    setShowRewardModal(true);
  };

  const handleAnimalClick = (id: number) => {
    console.log("Animal clicked:", id);
  };

  const handlePurchase = (itemId: number) => {
    console.log("Purchase item:", itemId);
  };

  return (
    // เพิ่ม pt-16 หรือ height calculation เพื่อหลบ Header ของ Clerk ใน layout.tsx
    // หรือใช้ h-[calc(100vh-64px)] ถ้า Header สูง 64px
    <div className="relative w-full h-[calc(100vh-64px)] max-w-md mx-auto bg-[#F5F8F0] overflow-hidden font-['Nunito']">
      {/* Main Content */}
      <div className="h-full overflow-y-auto pb-20">
        {activeTab === "scan" && (
          <HomeScreen
            onScanClick={handleScanClick}
            coins={coins}
            username="Explorer" // คุณอาจจะดึงชื่อจาก Clerk user object ได้ที่นี่
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
          onAnimalDetected={handleAnimalDetected} // ส่ง function ที่รับ data ได้
        />
      )}

      {/* Reward Modal - ใช้ข้อมูลจริงจาก currentAnimal */}
      <RewardModal
        isOpen={showRewardModal}
        onClose={() => setShowRewardModal(false)}
        animalName={currentAnimal?.name || "Unknown"}
        coinsEarned={50}
        funFact={
          currentAnimal?.funFact || "Keep exploring to find more animals!"
        }
      />
    </div>
  );
}
