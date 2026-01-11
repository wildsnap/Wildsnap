// import { motion } from 'motion/react';
"use client";
import { motion } from "framer-motion";
import { Lock, Search } from 'lucide-react';
import { Animal } from '../data/mockData';
import { useState } from 'react';

interface CollectionScreenProps {
  animals: Animal[];
  onAnimalClick: (animal: Animal) => void;
}

export function CollectionScreen({ animals, onAnimalClick }: CollectionScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const discoveredCount = animals.filter((a) => a.discovered).length;
  const totalCount = animals.length;

  const filteredAnimals = animals.filter((animal) =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rarityColors = {
    common: 'from-gray-400 to-gray-500',
    uncommon: 'from-green-400 to-green-600',
    rare: 'from-blue-400 to-blue-600',
    legendary: 'from-purple-400 to-purple-600',
  };

  return (
    <div className="pb-20 bg-gradient-to-b from-blue-50 to-green-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl mb-4">My Collection</h1>
        
        {/* Progress */}
        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Discovery Progress</span>
            <span className="text-xl">
              {discoveredCount}/{totalCount}
            </span>
          </div>
          <div className="bg-white/30 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-yellow-400 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${(discoveredCount / totalCount) * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mx-4 mt-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search animals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white rounded-2xl pl-12 pr-4 py-3 shadow-lg border-2 border-gray-100 focus:border-blue-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Rarity Legend */}
      <div className="mx-4 mt-6 bg-white rounded-2xl p-4 shadow-lg">
        <h3 className="text-sm text-gray-600 mb-3">Rarity Guide</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(rarityColors).map(([rarity, gradient]) => (
            <div
              key={rarity}
              className={`bg-gradient-to-r ${gradient} text-white px-3 py-1 rounded-full text-xs capitalize`}
            >
              {rarity}
            </div>
          ))}
        </div>
      </div>

      {/* Animal Grid */}
      <div className="mx-4 mt-6 mb-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredAnimals.map((animal, index) => (
            <motion.button
              key={animal.id}
              onClick={() => animal.discovered && onAnimalClick(animal)}
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileTap={animal.discovered ? { scale: 0.95 } : {}}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-40">
                  {animal.discovered ? (
                    <>
                      <img
                        src={animal.image}
                        alt={animal.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-2 right-2">
                        <div className={`bg-gradient-to-r ${rarityColors[animal.rarity]} text-white px-2 py-1 rounded-full text-xs`}>
                          {animal.rarity === 'common' && '⭐'}
                          {animal.rarity === 'uncommon' && '⭐⭐'}
                          {animal.rarity === 'rare' && '⭐⭐⭐'}
                          {animal.rarity === 'legendary' && '👑'}
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-white text-sm">{animal.name}</h3>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <div className="text-center">
                        <Lock className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-600 text-xs">Not discovered</p>
                      </div>
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                  )}
                </div>
                
                {/* Animal Name (for undiscovered) */}
                {!animal.discovered && (
                  <div className="p-3 bg-gray-100">
                    <p className="text-gray-500 text-sm">???</p>
                  </div>
                )}
              </div>

              {/* Shine effect for discovered animals */}
              {animal.discovered && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 5,
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredAnimals.length === 0 && (
        <div className="mx-4 mt-8 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600">No animals found</p>
          <p className="text-gray-500 text-sm">Try a different search term</p>
        </div>
      )}
    </div>
  );
}
