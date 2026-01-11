// import { motion } from 'motion/react';
import { motion } from "framer-motion";
import { X, MapPin, Sparkles, Star } from 'lucide-react';
import { Animal } from '../data/mockData';

interface ResultScreenProps {
  animal: Animal;
  isNewDiscovery: boolean;
  onClose: () => void;
  onAddToCollection: () => void;
}

export function ResultScreen({
  animal,
  isNewDiscovery,
  onClose,
  onAddToCollection,
}: ResultScreenProps) {
  const rarityColors = {
    common: 'from-gray-400 to-gray-500',
    uncommon: 'from-green-400 to-green-600',
    rare: 'from-blue-400 to-blue-600',
    legendary: 'from-purple-400 to-purple-600',
  };

  const rarityEmojis = {
    common: '⭐',
    uncommon: '⭐⭐',
    rare: '⭐⭐⭐',
    legendary: '👑',
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-green-50 to-blue-50 z-50 overflow-y-auto">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg z-10"
      >
        <X className="w-6 h-6 text-gray-600" />
      </button>

      <div className="min-h-screen pb-8">
        {/* New Discovery Badge */}
        {isNewDiscovery && (
          <motion.div
            className="pt-8 text-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 0.8 }}
          >
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-full shadow-xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                <span className="text-xl">New Discovery!</span>
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Animal Image */}
        <motion.div
          className="mx-4 mt-6 rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-80 object-cover"
            />
            <div className="absolute top-4 right-4">
              <div className={`bg-gradient-to-r ${rarityColors[animal.rarity]} text-white px-4 py-2 rounded-full shadow-lg text-sm flex items-center gap-1`}>
                <span>{rarityEmojis[animal.rarity]}</span>
                <span className="capitalize">{animal.rarity}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Animal Name */}
        <motion.div
          className="mx-4 mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl text-gray-800 mb-2">{animal.name}</h1>
          <p className="text-gray-500 italic">{animal.scientificName}</p>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          className="mx-4 mt-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Habitat Card */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 rounded-full p-3">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-700 mb-1">Habitat</h3>
                <p className="text-gray-600">{animal.habitat}</p>
              </div>
            </div>
          </div>

          {/* Fun Fact Card */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 shadow-lg border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-3">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-blue-900 mb-1">Fun Fact</h3>
                <p className="text-blue-800">{animal.funFact}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        {isNewDiscovery ? (
          <motion.div
            className="mx-4 mt-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={onAddToCollection}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl py-4 shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-transform text-lg"
            >
              <span>✨</span>
              <span>Add to Collection</span>
              <span>+50 XP</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="mx-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4 text-center">
              <p className="text-yellow-800">
                🎯 Already in your collection! Keep exploring to find new animals.
              </p>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          className="mx-4 mt-6 grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-white rounded-xl p-4 text-center shadow">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-xs text-gray-600">Rarity</div>
            <div className="text-sm text-gray-800 capitalize">{animal.rarity}</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow">
            <div className="text-2xl mb-1">⭐</div>
            <div className="text-xs text-gray-600">XP Gained</div>
            <div className="text-sm text-gray-800">+50</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow">
            <div className="text-2xl mb-1">🪙</div>
            <div className="text-xs text-gray-600">Coins</div>
            <div className="text-sm text-gray-800">+25</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
