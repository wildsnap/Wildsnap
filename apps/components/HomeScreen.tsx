// import { motion } from 'motion/react';
import { motion } from "framer-motion";
import { Sparkles, ChevronRight } from 'lucide-react';
import { Animal } from '../data/mockData';

interface HomeScreenProps {
  discoveredCount: number;
  totalCount: number;
  featuredAnimal: Animal;
  onScanClick: () => void;
  onFeaturedClick: () => void;
  userLevel: number;
  userXP: number;
  coins: number;
}

export function HomeScreen({
  discoveredCount,
  totalCount,
  featuredAnimal,
  onScanClick,
  onFeaturedClick,
  userLevel,
  userXP,
  coins,
}: HomeScreenProps) {
  const xpProgress = (userXP % 100) / 100 * 100;

  return (
    <div className="pb-20 bg-gradient-to-b from-green-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl mb-1">Animal Quest</h1>
            <p className="text-green-100 text-sm">Level {userLevel} Explorer</p>
          </div>
          <div className="bg-yellow-400 text-green-900 px-4 py-2 rounded-full flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            <span className="font-bold">{coins}</span>
          </div>
        </div>
        
        {/* XP Bar */}
        <div className="bg-green-400/30 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-yellow-400 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-green-100 text-xs mt-1">{userXP % 100}/100 XP to Level {userLevel + 1}</p>
      </div>

      {/* Progress Card */}
      <motion.div
        className="mx-4 mt-6 bg-white rounded-2xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="text-center">
          <h2 className="text-gray-600 mb-2">Animals Discovered</h2>
          <div className="text-5xl mb-2">
            <span className="text-green-600">{discoveredCount}</span>
            <span className="text-gray-400">/{totalCount}</span>
          </div>
          <div className="bg-green-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-green-500 h-full transition-all duration-500"
              style={{ width: `${(discoveredCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Featured Animal */}
      <motion.div
        className="mx-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg text-gray-700">Featured Animal</h3>
          <div className="bg-yellow-400 text-yellow-900 text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Daily</span>
          </div>
        </div>
        <button
          onClick={onFeaturedClick}
          className="w-full bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="relative h-48">
            <img
              src={featuredAnimal.image}
              alt={featuredAnimal.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h4 className="text-xl mb-1">{featuredAnimal.name}</h4>
              <p className="text-sm text-gray-200 italic">{featuredAnimal.scientificName}</p>
            </div>
            <ChevronRight className="absolute top-1/2 right-4 -translate-y-1/2 w-8 h-8 text-white" />
          </div>
        </button>
      </motion.div>

      {/* Scan Button */}
      <motion.div
        className="mx-4 mt-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={onScanClick}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl py-6 shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <span className="text-2xl">📸</span>
          <span className="text-xl">Scan an Animal</span>
        </button>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        className="mx-4 mt-6 mb-4 bg-blue-50 rounded-2xl p-4 border-2 border-blue-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="text-blue-900 mb-2 flex items-center gap-2">
          <span>💡</span>
          <span>Explorer Tip</span>
        </h4>
        <p className="text-blue-800 text-sm">
          Visit parks and nature areas to discover more animals! Rare animals appear during dawn and dusk.
        </p>
      </motion.div>
    </div>
  );
}
