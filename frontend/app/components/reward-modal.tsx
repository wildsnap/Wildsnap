import { X, Coins, Star, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  animalName: string;
  coinsEarned: number;
  funFact: string;
}

export function RewardModal({ isOpen, onClose, animalName, coinsEarned, funFact }: RewardModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 10 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative w-full max-w-sm"
      >
        {/* Celebration stars */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            <Star className="w-16 h-16 text-[#FFC800]" fill="#FFC800" />
          </motion.div>
        </div>

        {/* Modal Content */}
        <div className="bg-white border-4 border-[#2C2C2C] rounded-2xl shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00D66F] to-[#00F47F] border-b-4 border-[#2C2C2C] px-6 py-4 relative overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                backgroundSize: '200% 200%',
              }}
            />
            
            <div className="relative">
              <h2 className="font-['Press_Start_2P'] text-xl text-white text-center drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
                SUCCESS!
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Sparkles className="w-5 h-5 text-white" />
                <p className="font-['Nunito'] text-white font-bold text-lg">
                  New {animalName} Found!
                </p>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>

            <button
              onClick={onClose}
              className="absolute top-2 right-2 w-8 h-8 bg-[#FF4757] border-2 border-white rounded-full flex items-center justify-center active:scale-95 transition-transform"
            >
              <X className="w-4 h-4 text-white" strokeWidth={3} />
            </button>
          </div>

          {/* Rewards */}
          <div className="p-6 space-y-4">
            {/* Coins Earned */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="bg-[#FFC800] border-3 border-[#2C2C2C] rounded-xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white border-2 border-[#2C2C2C] rounded-full flex items-center justify-center">
                    <Coins className="w-7 h-7 text-[#FFC800]" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="font-['Nunito'] text-sm text-[#2C2C2C] font-bold">
                      Coins Earned
                    </p>
                    <p className="font-['Press_Start_2P'] text-lg text-[#2C2C2C]">
                      +{coinsEarned}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  <Star className="w-8 h-8 text-white" fill="white" strokeWidth={2} />
                </motion.div>
              </div>
            </motion.div>

            {/* Fun Fact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#E8F5E9] border-3 border-[#2C2C2C] rounded-xl p-4"
            >
              <div className="flex items-start gap-2 mb-2">
                <div className="bg-[#00D66F] border-2 border-[#2C2C2C] rounded-lg p-1.5 mt-0.5">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-['Nunito'] font-bold text-[#2C2C2C]">
                  Fun Fact!
                </h3>
              </div>
              <p className="font-['Nunito'] text-sm text-[#2C2C2C] leading-relaxed pl-8">
                {funFact}
              </p>
            </motion.div>

            {/* Continue Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={onClose}
              className="
                w-full
                bg-[#00D66F] 
                border-4 border-[#2C2C2C] 
                rounded-xl 
                py-4
                shadow-[6px_6px_0_0_rgba(0,0,0,0.3)]
                active:shadow-[3px_3px_0_0_rgba(0,0,0,0.3)]
                active:translate-x-1 active:translate-y-1
                transition-all duration-150
                hover:bg-[#00F47F]
              "
            >
              <span className="font-['Press_Start_2P'] text-white text-sm drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
                AWESOME!
              </span>
            </motion.button>
          </div>
        </div>

        {/* Floating sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#FFC800] rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
