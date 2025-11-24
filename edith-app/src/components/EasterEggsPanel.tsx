import { motion } from 'framer-motion';
import { useState } from 'react';
import { getRandomQuote, getRandomFact, MCUQuote, CharacterFact } from '../utils/mcuData';
import { soundEffects } from '../utils/soundEffects';

const EasterEggsPanel = () => {
  const [currentQuote, setCurrentQuote] = useState<MCUQuote | null>(null);
  const [currentFact, setCurrentFact] = useState<CharacterFact | null>(null);

  const showRandomQuote = () => {
    soundEffects.activate();
    setCurrentQuote(getRandomQuote());
    setCurrentFact(null);
  };

  const showRandomFact = () => {
    soundEffects.activate();
    setCurrentFact(getRandomFact());
    setCurrentQuote(null);
  };

  return (
    <motion.div
      className="glass rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold gradient-text mb-2">MCU Easter Eggs</h2>
        <p className="text-sm text-gray-400">Discover hidden quotes and character facts!</p>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <motion.button
          onClick={showRandomQuote}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          💬 Random Quote
        </motion.button>
        <motion.button
          onClick={showRandomFact}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎯 Character Fact
        </motion.button>
      </div>

      {/* Display Area */}
      <div className="min-h-48">
        {currentQuote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-xl p-6 border border-white/10"
          >
            <div className="text-4xl mb-4">💬</div>
            <blockquote className="text-lg text-white italic mb-4">
              "{currentQuote.text}"
            </blockquote>
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="text-red-400 font-semibold">{currentQuote.character}</p>
                <p className="text-gray-400">{currentQuote.movie}</p>
              </div>
            </div>
            {currentQuote.context && (
              <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-white/10">
                {currentQuote.context}
              </p>
            )}
          </motion.div>
        )}

        {currentFact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">🎯</div>
              <div>
                <h3 className="text-xl font-bold text-white">{currentFact.character}</h3>
                <span className="text-xs text-gray-400 uppercase">{currentFact.category}</span>
              </div>
            </div>
            <p className="text-base text-gray-200 leading-relaxed">
              {currentFact.fact}
            </p>
          </motion.div>
        )}

        {!currentQuote && !currentFact && (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <div className="text-6xl mb-4">🕷️</div>
            <p className="text-sm">Click a button to discover MCU secrets!</p>
          </div>
        )}
      </div>

      {/* Easter Egg Hints */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <h3 className="text-sm font-semibold text-red-400 mb-3">💡 Hidden Easter Eggs</h3>
        <p className="text-xs text-gray-400 mb-2">
          Try saying these phrases to E.D.I.T.H to unlock secret responses:
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
          <div>• "pizza time"</div>
          <div>• "with great power"</div>
          <div>• "i am iron man"</div>
          <div>• "i love you 3000"</div>
          <div>• "avengers assemble"</div>
          <div>• "wakanda forever"</div>
        </div>
      </div>
    </motion.div>
  );
};

export default EasterEggsPanel;
