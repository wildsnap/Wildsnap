"use client";

import { useState } from 'react';
import { HomeScreen } from "../../components/HomeScreen";
import { CameraScreen } from '../../components/CameraScreen';
import { ResultScreen } from '../../components/ResultScreen';
import { CollectionScreen } from '../../components/CollectionScreen';
import { ShopScreen } from '../../components/ShopScreen';
import { ProfileScreen } from '../../components/ProfileScreen';
import { BottomNav } from '../../components/BottomNav';
import { ANIMALS, SHOP_ITEMS, ACHIEVEMENTS, Animal, ShopItem } from '../../data/mockData';
import { toast, Toaster } from 'sonner';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showCamera, setShowCamera] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [animals, setAnimals] = useState(ANIMALS);
  const [userLevel, setUserLevel] = useState(5);
  const [userXP, setUserXP] = useState(250);
  const [coins, setCoins] = useState(450);

  const discoveredAnimals = animals.filter((a) => a.discovered);
  const totalAnimals = animals.length;
  const featuredAnimal = discoveredAnimals[0] || animals[0];
  const rareCount = discoveredAnimals.filter(
    (a) => a.rarity === 'rare' || a.rarity === 'legendary'
  ).length;

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
    if (screen === 'camera') {
      setShowCamera(true);
    }
  };

  const handleScanClick = () => {
    setShowCamera(true);
  };

  const handleCameraClose = () => {
    setShowCamera(false);
    setCurrentScreen('home');
  };

  const handleCapture = () => {
    // Simulate AI detection - randomly select an animal
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    setSelectedAnimal(randomAnimal);
    setShowCamera(false);
    setShowResult(true);
  };

  const handleResultClose = () => {
    setShowResult(false);
    setSelectedAnimal(null);
    setCurrentScreen('home');
  };

  const handleAddToCollection = () => {
    if (selectedAnimal && !selectedAnimal.discovered) {
      // Mark animal as discovered
      setAnimals((prev) =>
        prev.map((a) =>
          a.id === selectedAnimal.id ? { ...a, discovered: true } : a
        )
      );

      // Add XP and coins
      setUserXP((prev) => {
        const newXP = prev + 50;
        if (newXP >= (userLevel + 1) * 100) {
          setUserLevel((lvl) => lvl + 1);
          toast.success(`Level Up! You are now level ${userLevel + 1}! 🎉`);
        }
        return newXP;
      });
      setCoins((prev) => prev + 25);

      toast.success(`${selectedAnimal.name} added to collection! +50 XP, +25 coins`);
    }

    setTimeout(() => {
      setShowResult(false);
      setSelectedAnimal(null);
      setCurrentScreen('collection');
    }, 500);
  };

  const handleAnimalClick = (animal: Animal) => {
    setSelectedAnimal(animal);
    setShowResult(true);
  };

  const handlePurchase = (item: ShopItem) => {
    if (coins >= item.price) {
      setCoins((prev) => prev - item.price);
      toast.success(`Purchased ${item.name}! 🎉`);
    } else {
      toast.error('Not enough coins!');
    }
  };

  return (
    <div className="relative max-w-md mx-auto bg-white min-h-screen overflow-hidden">
      <Toaster position="top-center" />
      
      {/* Main Screens */}
      {!showCamera && !showResult && (
        <>
          {currentScreen === 'home' && (
            <HomeScreen
              discoveredCount={discoveredAnimals.length}
              totalCount={totalAnimals}
              featuredAnimal={featuredAnimal}
              onScanClick={handleScanClick}
              onFeaturedClick={() => handleAnimalClick(featuredAnimal)}
              userLevel={userLevel}
              userXP={userXP}
              coins={coins}
            />
          )}

          {currentScreen === 'collection' && (
            <CollectionScreen
              animals={animals}
              onAnimalClick={handleAnimalClick}
            />
          )}

          {currentScreen === 'shop' && (
            <ShopScreen
              items={SHOP_ITEMS}
              coins={coins}
              onPurchase={handlePurchase}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              userLevel={userLevel}
              userXP={userXP}
              discoveredCount={discoveredAnimals.length}
              rareCount={rareCount}
              achievements={ACHIEVEMENTS}
            />
          )}

          {/* Bottom Navigation */}
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
          />
        </>
      )}

      {/* Camera Overlay */}
      {showCamera && (
        <CameraScreen onClose={handleCameraClose} onCapture={handleCapture} />
      )}

      {/* Result Overlay */}
      {showResult && selectedAnimal && (
        <ResultScreen
          animal={selectedAnimal}
          isNewDiscovery={!selectedAnimal.discovered}
          onClose={handleResultClose}
          onAddToCollection={handleAddToCollection}
        />
      )}
    </div>
  );
}