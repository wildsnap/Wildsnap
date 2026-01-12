// import { motion } from 'motion/react';
import { motion } from "framer-motion";
import { Star, Trophy, Eye, Crown, Award, Calendar, Camera } from 'lucide-react';
import { Achievement } from '../data/mockData';

interface ProfileScreenProps {
  userLevel: number;
  userXP: number;
  discoveredCount: number;
  rareCount: number;
  achievements: Achievement[];
}

const iconMap = {
  star: Star,
  eye: Eye,
  anchor: Award,
  trophy: Trophy,
  crown: Crown,
};

export function ProfileScreen({
  userLevel,
  userXP,
  discoveredCount,
  rareCount,
  achievements,
}: ProfileScreenProps) {
  const xpProgress = (userXP % 100) / 100 * 100;
  const unlockedAchievements = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="pb-20 bg-gradient-to-b from-green-50 to-blue-50 min-h-screen">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          {/* Avatar */}
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-4xl shadow-xl border-4 border-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            🦁
          </motion.div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-2xl mb-1">Explorer Alex</h1>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="text-lg">Level {userLevel}</span>
            </div>
            <p className="text-green-100 text-sm">Wildlife Enthusiast</p>
          </div>
        </div>

        {/* XP Progress */}
        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Experience Points</span>
            <span className="text-sm">{userXP % 100}/100 XP</span>
          </div>
          <div className="bg-white/30 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-yellow-400 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="text-green-100 text-xs mt-2">
            Next level in {100 - (userXP % 100)} XP
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mx-4 mt-6 grid grid-cols-3 gap-3">
        <motion.div
          className="bg-white rounded-2xl p-4 text-center shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Camera className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl text-gray-800 mb-1">{discoveredCount}</div>
          <div className="text-xs text-gray-600">Discovered</div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-4 text-center shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl text-gray-800 mb-1">{rareCount}</div>
          <div className="text-xs text-gray-600">Rare Finds</div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-4 text-center shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl text-gray-800 mb-1">{unlockedAchievements}</div>
          <div className="text-xs text-gray-600">Achievements</div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        className="mx-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg text-gray-700 mb-3">Recent Activity</h2>
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 shadow-lg flex items-center gap-3">
            <div className="bg-green-100 rounded-full p-3">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 text-sm">Discovered Red Fox</p>
              <p className="text-gray-500 text-xs">2 hours ago</p>
            </div>
            <span className="text-lg">🦊</span>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg flex items-center gap-3">
            <div className="bg-blue-100 rounded-full p-3">
              <Trophy className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 text-sm">Unlocked "Bird Watcher"</p>
              <p className="text-gray-500 text-xs">Yesterday</p>
            </div>
            <span className="text-lg">🏆</span>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg flex items-center gap-3">
            <div className="bg-purple-100 rounded-full p-3">
              <Star className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 text-sm">Reached Level {userLevel}</p>
              <p className="text-gray-500 text-xs">2 days ago</p>
            </div>
            <span className="text-lg">⭐</span>
          </div>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        className="mx-4 mt-6 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-lg text-gray-700 mb-3">Achievements</h2>
        <div className="space-y-3">
          {achievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon as keyof typeof iconMap] || Award;
            
            return (
              <motion.div
                key={achievement.id}
                className={`rounded-2xl p-4 shadow-lg flex items-center gap-3 ${
                  achievement.unlocked
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300'
                    : 'bg-white'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div
                  className={`rounded-full p-3 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-400'
                      : 'bg-gray-200'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      achievement.unlocked ? 'text-white' : 'text-gray-400'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className={`mb-1 ${
                      achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                    }`}
                  >
                    {achievement.name}
                  </h3>
                  <p
                    className={`text-xs ${
                      achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                    }`}
                  >
                    {achievement.description}
                  </p>
                </div>
                {achievement.unlocked ? (
                  <div className="text-2xl">✓</div>
                ) : (
                  <div className="text-2xl opacity-30">🔒</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Sign Out Button */}
      <div className="mx-4 mb-4">
        <button className="w-full bg-white text-gray-600 rounded-2xl py-3 shadow-lg border-2 border-gray-200 active:scale-95 transition-transform">
          Sign Out
        </button>
      </div>
    </div>
  );
}
