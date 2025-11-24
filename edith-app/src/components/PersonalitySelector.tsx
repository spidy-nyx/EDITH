import { motion } from 'framer-motion';
import { useEdithStore } from '../store/edithStore';
import { personalityInfo, PersonalityMode } from '../utils/personalities';

const PersonalitySelector = () => {
  const { personality, setPersonality } = useEdithStore();

  return (
    <motion.div
      className="glass rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-bold gradient-text mb-4">AI Personality</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {(Object.keys(personalityInfo) as PersonalityMode[]).map((mode) => {
          const info = personalityInfo[mode];
          const isActive = personality === mode;

          return (
            <motion.button
              key={mode}
              onClick={() => setPersonality(mode)}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                isActive
                  ? 'border-red-500 bg-red-500/20'
                  : 'border-white/10 bg-white/5 hover:border-white/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
              <div className="text-4xl mb-2">{info.icon}</div>
              <div className="text-sm font-semibold text-white mb-1">{info.name}</div>
              <div className="text-xs text-gray-400">{info.description}</div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PersonalitySelector;
