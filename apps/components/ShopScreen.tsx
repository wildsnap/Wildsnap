// import { motion } from 'motion/react';
import { motion } from "framer-motion";
import { Sparkles, Camera, MapPin, Palette, Award, Zap, Waves } from 'lucide-react';
import { ShopItem } from '../data/mockData';

interface ShopScreenProps {
  items: ShopItem[];
  coins: number;
  onPurchase: (item: ShopItem) => void;
}

const iconMap = {
  camera: Camera,
  'map-pin': MapPin,
  palette: Palette,
  award: Award,
  zap: Zap,
  waves: Waves,
};

export function ShopScreen({ items, coins, onPurchase }: ShopScreenProps) {
  const typeColors = {
    boost: 'from-yellow-400 to-orange-500',
    hint: 'from-blue-400 to-blue-600',
    skin: 'from-purple-400 to-pink-500',
    badge: 'from-green-400 to-green-600',
  };

  const typeEmojis = {
    boost: '⚡',
    hint: '💡',
    skin: '🎨',
    badge: '🏆',
  };

  return (
    <div className="pb-20 bg-gradient-to-b from-purple-50 to-pink-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl mb-4">Shop</h1>
        
        {/* Coin Balance */}
        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm flex items-center justify-between">
          <span className="text-sm">Your Coins</span>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-2xl">{coins}</span>
          </div>
        </div>
      </div>

      {/* Shop Banner */}
      <motion.div
        className="mx-4 mt-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎉</span>
          <div>
            <h3 className="text-white">Daily Deals!</h3>
            <p className="text-yellow-100 text-sm">Special items on sale today</p>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <div className="mx-4 mt-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Boosts', 'Hints', 'Skins', 'Badges'].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                category === 'All'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-600'
              } shadow`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Shop Items */}
      <div className="mx-4 mt-6 mb-4 space-y-4">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const canAfford = coins >= item.price;

          return (
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center p-4">
                {/* Icon */}
                <div
                  className={`bg-gradient-to-br ${typeColors[item.type]} rounded-2xl p-4 mr-4`}
                >
                  {Icon && <Icon className="w-8 h-8 text-white" />}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-800">{item.name}</h3>
                    <span className="text-lg">{typeEmojis[item.type]}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <span className="text-yellow-600">{item.price}</span>
                  </div>
                </div>

                {/* Buy Button */}
                <button
                  onClick={() => canAfford && onPurchase(item)}
                  disabled={!canAfford}
                  className={`px-6 py-3 rounded-xl transition-all ${
                    canAfford
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg active:scale-95'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {canAfford ? 'Buy' : 'Locked'}
                </button>
              </div>

              {/* Popular/New Tags */}
              {index < 2 && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs py-1 px-3 text-center">
                  {index === 0 ? '🔥 Popular' : '✨ New'}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Info Box */}
      <motion.div
        className="mx-4 mb-4 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="text-blue-900 mb-2 flex items-center gap-2">
          <span>💡</span>
          <span>How to Earn Coins</span>
        </h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Discover new animals (+25 coins)</li>
          <li>• Complete daily challenges (+50 coins)</li>
          <li>• Share discoveries with friends (+10 coins)</li>
        </ul>
      </motion.div>
    </div>
  );
}
