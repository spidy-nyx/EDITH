import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AchievementManager, Achievement } from '../utils/achievements';

const AchievementsPanel = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = () => {
    setAchievements(AchievementManager.getAchievements());
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progress = Math.round((unlockedCount / totalCount) * 100);

  const visibleAchievements = showSecret 
    ? achievements 
    : achievements.filter(a => !a.secret || a.unlocked);

  return (
    <motion.div
      className="glass rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold gradient-text">Achievements</h2>
          <p className="text-sm text-gray-400">
            {unlockedCount} / {totalCount} Unlocked
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-white">{progress}%</div>
          <div className="text-xs text-gray-400">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Toggle Secret */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowSecret(!showSecret)}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          {showSecret ? 'Hide' : 'Show'} Secret Achievements
        </button>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
        {visibleAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            className={`p-4 rounded-lg border-2 ${
              achievement.unlocked
                ? 'border-yellow-500/50 bg-yellow-500/10'
                : 'border-white/10 bg-white/5 opacity-60'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: achievement.unlocked ? 1 : 0.6, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start gap-3">
              <div className={`text-3xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                {achievement.unlocked ? achievement.icon : '🔒'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white">
                    {achievement.unlocked || !achievement.secret ? achievement.title : '???'}
                  </h3>
                  {achievement.secret && (
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">
                      Secret
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400">
                  {achievement.unlocked || !achievement.secret ? achievement.description : 'Hidden achievement'}
                </p>
                {achievement.unlocked && achievement.unlockedAt && (
                  <p className="text-xs text-gray-500 mt-1">
                    Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-green-400">{unlockedCount}</div>
            <div className="text-xs text-gray-400">Unlocked</div>
          </div>
          <div>
            <div className="text-xl font-bold text-yellow-400">
              {achievements.filter(a => a.secret && a.unlocked).length}
            </div>
            <div className="text-xs text-gray-400">Secrets Found</div>
          </div>
          <div>
            <div className="text-xl font-bold text-blue-400">
              {totalCount - unlockedCount}
            </div>
            <div className="text-xs text-gray-400">Remaining</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementsPanel;
