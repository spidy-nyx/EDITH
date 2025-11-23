import { motion } from 'framer-motion';
import { useState } from 'react';
import EdithVisualization from './EdithVisualization';
import VoiceInput from './VoiceInput';
import SettingsModal from './SettingsModal';
import { useEdithStore } from '../store/edithStore';
import { getCookie } from '../utils/cookies';

const MainInterface = () => {
  const { status, lastResponse, newsItems } = useEdithStore();
  const [showSettings, setShowSettings] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  // Expose settings function globally
  (window as any).openSettings = () => setShowSettings(true);

  return (
    <>
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      
      <motion.div
        className="w-full min-h-screen bg-gradient-to-br from-black via-red-950 to-black p-4 md:p-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <motion.header
          className="glass rounded-2xl p-4 md:p-6"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">E.D.I.T.H</h1>
              <p className="text-sm md:text-base text-gray-400">Even Dead, I'm The Hero</p>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex items-center gap-2">
                <motion.div
                  className={`w-3 h-3 rounded-full ${
                    status === 'LISTENING' ? 'bg-red-500' :
                    status === 'PROCESSING' ? 'bg-yellow-500' :
                    status === 'SPEAKING' ? 'bg-blue-500' :
                    'bg-green-500'
                  }`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs md:text-sm text-gray-400">{status}</span>
              </div>
              <span className="text-xs md:text-sm text-red-400 font-semibold">
                {getCookie('USER_NAME') || 'SPIDERMAN'}
              </span>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Activity Feed */}
          <motion.div
            className="glass rounded-2xl p-6 max-h-96 lg:max-h-none overflow-y-auto"
            variants={itemVariants}
          >
            <h2 className="text-xl font-semibold mb-4 text-red-400">Activity</h2>
            <div className="space-y-3">
              {newsItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 rounded-lg p-3 border border-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <p className="text-sm text-gray-300">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Center Panel - JARVIS */}
          <motion.div
            className="lg:col-span-2 glass rounded-2xl p-6 md:p-8 flex flex-col min-h-[500px]"
            variants={itemVariants}
          >
            {/* E.D.I.T.H Visualization */}
            <div className="flex-1 flex items-center justify-center py-8">
              <EdithVisualization />
            </div>

            {/* Response Display */}
            {lastResponse && (
              <motion.div
                className="mt-6 bg-white/5 rounded-xl p-4 md:p-6 border border-red-500/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                  {lastResponse}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Voice Input */}
        <motion.div variants={itemVariants}>
          <VoiceInput />
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="text-center text-sm text-gray-500"
          variants={itemVariants}
        >
          <p>E.D.I.T.H v1.0 • Built for SPIDERMAN</p>
        </motion.footer>
      </div>
    </motion.div>
    </>
  );
};

export default MainInterface;
