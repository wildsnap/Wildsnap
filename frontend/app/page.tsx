"use client";
import Image from "next/image";
import { useState } from 'react';
import { BottomNavigation } from './components/bottom-navigation';
import { HomeScreen } from './components/home-screen';
import { CollectionScreen } from './components/collection-screen';
import { ScanScreen } from './components/scan-screen';
import { RewardModal } from './components/reward-modal';
import { AvatarScreen } from './components/avatar-screen';
import { ShopScreen } from './components/shop-screen';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'scan' | 'collection' | 'avatar' | 'shop'>('scan');
  const [showScanScreen, setShowScanScreen] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [coins, setCoins] = useState(300);

  const handleScanClick = () => {
    setShowScanScreen(true);
  };

  const handleAnimalDetected = () => {
    setShowScanScreen(false);
    // Add coins and show reward
    setCoins(prev => prev + 50);
    setShowRewardModal(true);
  };

  const handleAnimalClick = (id: number) => {
    // Handle animal detail view
    console.log('Animal clicked:', id);
  };

  const handlePurchase = (itemId: number) => {
    console.log('Purchase item:', itemId);
    // Handle purchase logic
  };

  return (
    <div className="relative w-full h-screen max-w-md mx-auto bg-[#F5F8F0] overflow-hidden font-['Nunito']">
      {/* Main Content */}
      <div className="h-full">
        {activeTab === 'scan' && (
          <HomeScreen 
            onScanClick={handleScanClick}
            coins={coins}
            username="Explorer"
          />
        )}
        {activeTab === 'collection' && (
          <CollectionScreen onAnimalClick={handleAnimalClick} />
        )}
        {activeTab === 'avatar' && (
          <AvatarScreen 
            username="Explorer"
            level={5}
            totalAnimals={12}
            achievements={8}
          />
        )}
        {activeTab === 'shop' && (
          <ShopScreen 
            userCoins={coins}
            onPurchase={handlePurchase}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

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
        animalName="Bear"
        coinsEarned={50}
        funFact="Bears can run surprisingly fast, up to 35 miles per hour!"
      />
    </div>
  );
}
