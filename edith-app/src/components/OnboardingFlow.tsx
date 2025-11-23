import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { setCookie } from '../utils/cookies';
import { soundEffects } from '../utils/soundEffects';
import { getAvailableVoices } from '../store/edithStore';

interface OnboardingFlowProps {
  onComplete: (userName: string, apiKey: string) => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState<'eye' | 'hello' | 'setup'>('eye');
  const [userName, setUserName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<'groq' | 'gemini' | 'skip'>('groq');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      const availableVoices = getAvailableVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Auto-progress through intro animations
  useEffect(() => {
    if (step === 'eye') {
      const timer = setTimeout(() => {
        soundEffects.click();
        setStep('hello');
      }, 2500);
      return () => clearTimeout(timer);
    } else if (step === 'hello') {
      const timer = setTimeout(() => {
        soundEffects.success();
        setStep('setup');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleComplete = () => {
    if (!userName) return;
    
    soundEffects.success();
    // Save to cookies (persistent for 1 year)
    setCookie('USER_NAME', userName, 365);
    if (apiKey && provider !== 'skip') {
      setCookie(provider === 'groq' ? 'GROQ_API_KEY' : 'GEMINI_API_KEY', apiKey, 365);
    }
    if (selectedVoice) {
      setCookie('SELECTED_VOICE', selectedVoice, 365);
    }
    onComplete(userName, apiKey);
  };

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-60">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{
            background: 'linear-gradient(135deg, #ff0000 0%, #dc143c 100%)',
            top: '-200px',
            left: '-200px',
          }}
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ff0000 100%)',
            bottom: '-150px',
            right: '-150px',
          }}
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {/* Phase 1: Eye Blink */}
        {step === 'eye' && (
          <motion.div
            key="eye"
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <svg
              className="w-[300px] h-[180px] md:w-[400px] md:h-[240px]"
              viewBox="0 0 200 120"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(255, 0, 0, 0.8)) drop-shadow(0 0 60px rgba(255, 0, 0, 0.5))',
              }}
            >
              <motion.path
                d="M 20 60 Q 20 20, 60 20 Q 80 20, 85 60 Q 80 100, 60 100 Q 20 100, 20 60 Z"
                fill="white"
                stroke="#ff0000"
                strokeWidth="3"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                style={{ transformOrigin: 'center' }}
              />
              <motion.path
                d="M 115 60 Q 120 20, 140 20 Q 180 20, 180 60 Q 180 100, 140 100 Q 120 100, 115 60 Z"
                fill="white"
                stroke="#ff0000"
                strokeWidth="3"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                style={{ transformOrigin: 'center' }}
              />
            </svg>
          </motion.div>
        )}

        {/* Phase 2: HEY THERE / THIS IS */}
        {step === 'hello' && (
          <motion.div
            key="hello"
            className="relative z-10 text-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center flex-wrap gap-6 mb-8">
              <motion.span
                className="text-7xl md:text-9xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #ff0000 0%, #ff6b6b 50%, #dc143c 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradient-shift 3s ease infinite',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                HEY THERE
              </motion.span>
            </div>
            <div className="flex justify-center flex-wrap gap-4">
              <motion.span
                className="text-4xl md:text-5xl font-medium"
                style={{
                  background: 'linear-gradient(135deg, #ff0000 0%, #ff6b6b 50%, #dc143c 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradient-shift 3s ease infinite',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                THIS IS
              </motion.span>
            </div>
          </motion.div>
        )}

        {/* Phase 3: Complete Setup Form */}
        {step === 'setup' && (
          <motion.div
            key="setup"
            className="relative z-10 w-full max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass rounded-2xl p-4 md:p-6 lg:p-8 max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2"
                style={{
                  background: 'linear-gradient(135deg, #ff0000 0%, #ff6b6b 50%, #dc143c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                E.D.I.T.H
              </h2>
              <p className="text-center text-sm md:text-base text-gray-400 mb-6 md:mb-8">Even Dead, I'm The Hero</p>

              <div className="space-y-4 md:space-y-6">
                {/* Hero Selection */}
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2 md:mb-3">
                    🕷️ Choose Your Hero Identity
                  </label>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <button
                      onClick={() => {
                        soundEffects.click();
                        setUserName('SPIDERMAN');
                      }}
                      className={`p-3 md:p-4 rounded-xl border-2 transition-all ${
                        userName === 'SPIDERMAN'
                          ? 'border-red-500 bg-red-500/20'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="text-3xl md:text-4xl mb-1 md:mb-2">🕷️</div>
                      <div className="text-sm md:text-lg font-bold">SPIDER-MAN</div>
                      <div className="text-xs md:text-sm text-gray-400">Peter Parker</div>
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.click();
                        setUserName('SPIDERWOMAN');
                      }}
                      className={`p-3 md:p-4 rounded-xl border-2 transition-all ${
                        userName === 'SPIDERWOMAN'
                          ? 'border-red-500 bg-red-500/20'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="text-3xl md:text-4xl mb-1 md:mb-2">🕸️</div>
                      <div className="text-sm md:text-lg font-bold">SPIDER-WOMAN</div>
                      <div className="text-xs md:text-sm text-gray-400">Gwen Stacy</div>
                    </button>
                  </div>
                </div>

                {/* AI Provider Selection */}
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2 md:mb-3">
                    🤖 AI Provider (All FREE!)
                  </label>
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    <button
                      onClick={() => {
                        soundEffects.click();
                        setProvider('groq');
                      }}
                      className={`p-2 md:p-3 rounded-lg border-2 transition-all ${
                        provider === 'groq'
                          ? 'border-red-500 bg-red-500/20'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="text-xl md:text-2xl mb-1">⚡</div>
                      <div className="text-xs md:text-sm font-bold">Groq</div>
                      <div className="text-[10px] md:text-xs text-gray-400">Fastest</div>
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.click();
                        setProvider('gemini');
                      }}
                      className={`p-2 md:p-3 rounded-lg border-2 transition-all ${
                        provider === 'gemini'
                          ? 'border-red-500 bg-red-500/20'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="text-xl md:text-2xl mb-1">🤖</div>
                      <div className="text-xs md:text-sm font-bold">Gemini</div>
                      <div className="text-[10px] md:text-xs text-gray-400">Google</div>
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.click();
                        setProvider('skip');
                      }}
                      className={`p-2 md:p-3 rounded-lg border-2 transition-all ${
                        provider === 'skip'
                          ? 'border-red-500 bg-red-500/20'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="text-xl md:text-2xl mb-1">⏭️</div>
                      <div className="text-xs md:text-sm font-bold">Skip</div>
                      <div className="text-[10px] md:text-xs text-gray-400">Demo</div>
                    </button>
                  </div>
                </div>

                {/* API Key Input */}
                {provider !== 'skip' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2">
                      🔑 {provider === 'groq' ? 'Groq' : 'Gemini'} API Key
                    </label>
                    <input
                      type="text"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder={provider === 'groq' ? 'gsk_...' : 'AIzaSy...'}
                      className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                    />
                    <p className="text-[10px] md:text-xs text-gray-500 mt-2">
                      Get FREE key:{' '}
                      <a
                        href={provider === 'groq' ? 'https://console.groq.com/keys' : 'https://aistudio.google.com/app/apikey'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-400 hover:text-red-300 underline break-all"
                      >
                        {provider === 'groq' ? 'console.groq.com/keys' : 'aistudio.google.com'}
                      </a>
                    </p>
                  </motion.div>
                )}

                {/* Voice Selection */}
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2">
                    🎤 AI Voice (Optional)
                  </label>
                  <select
                    value={selectedVoice}
                    onChange={(e) => {
                      soundEffects.click();
                      setSelectedVoice(e.target.value);
                    }}
                    className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="">Default Voice</option>
                    {voices.map((voice) => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Activate Button */}
                <motion.button
                  onClick={handleComplete}
                  disabled={!userName || (provider !== 'skip' && !apiKey)}
                  className={`w-full py-3 md:py-4 rounded-xl font-bold text-base md:text-xl ${
                    userName && (provider === 'skip' || apiKey)
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                  whileHover={userName && (provider === 'skip' || apiKey) ? { scale: 1.02 } : {}}
                  whileTap={userName && (provider === 'skip' || apiKey) ? { scale: 0.98 } : {}}
                >
                  {provider === 'skip' ? 'START IN DEMO MODE' : 'ACTIVATE E.D.I.T.H'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OnboardingFlow;
