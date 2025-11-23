import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { setCookie, getCookie, deleteCookie } from '../utils/cookies';
import { soundEffects } from '../utils/soundEffects';
import { useEdithStore, getAvailableVoices } from '../store/edithStore';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const [provider, setProvider] = useState<'groq' | 'gemini'>('groq');
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const { selectedVoice, setVoice } = useEdithStore();

  // Load existing settings when modal opens
  useEffect(() => {
    if (isOpen) {
      // Load existing API keys
      const groqKey = getCookie('GROQ_API_KEY');
      const geminiKey = getCookie('GEMINI_API_KEY');
      
      if (groqKey) {
        setProvider('groq');
        setApiKey(groqKey);
      } else if (geminiKey) {
        setProvider('gemini');
        setApiKey(geminiKey);
      }
    }
  }, [isOpen]);

  // Load voices when provider changes
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = getAvailableVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Update API key when provider changes
  useEffect(() => {
    const groqKey = getCookie('GROQ_API_KEY');
    const geminiKey = getCookie('GEMINI_API_KEY');
    
    if (provider === 'groq' && groqKey) {
      setApiKey(groqKey);
    } else if (provider === 'gemini' && geminiKey) {
      setApiKey(geminiKey);
    } else {
      setApiKey('');
    }
  }, [provider]);

  const handleSave = () => {
    if (!apiKey) return;
    
    soundEffects.success();
    // Save to cookies (persists across sessions)
    if (provider === 'groq') {
      setCookie('GROQ_API_KEY', apiKey, 365);
      deleteCookie('GEMINI_API_KEY');
    } else {
      setCookie('GEMINI_API_KEY', apiKey, 365);
      deleteCookie('GROQ_API_KEY');
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
      // Reload to apply new key
      window.location.reload();
    }, 1500);
  };

  const handleResetAll = () => {
    if (confirm('Are you sure you want to reset all settings? This will clear your API keys and preferences.')) {
      soundEffects.error();
      // Clear all cookies
      deleteCookie('USER_NAME');
      deleteCookie('GROQ_API_KEY');
      deleteCookie('GEMINI_API_KEY');
      deleteCookie('SELECTED_VOICE');
      
      // Reload to start fresh
      window.location.reload();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="glass rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-4">
                ⚙️ E.D.I.T.H Settings
              </h2>

              <div className="space-y-4 md:space-y-6">
                {/* API Provider Selection */}
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-3">
                    Choose AI Provider (All FREE!)
                  </label>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={() => {
                        soundEffects.click();
                        setProvider('groq');
                      }}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        provider === 'groq'
                          ? 'border-red-500 bg-red-500/20'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="text-lg mb-1">⚡</div>
                      <div className="text-sm font-semibold text-white">Groq</div>
                      <div className="text-xs text-gray-400">Fastest & FREE</div>
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.click();
                        setProvider('gemini');
                      }}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        provider === 'gemini'
                          ? 'border-red-500 bg-red-500/20'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="text-lg mb-1">🤖</div>
                      <div className="text-sm font-semibold text-white">Gemini</div>
                      <div className="text-xs text-gray-400">Google AI</div>
                    </button>
                  </div>
                </div>

                {/* API Key Input */}
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2">
                    {provider === 'groq' ? 'Groq API Key' : 'Google Gemini API Key'} (FREE)
                  </label>
                  <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={provider === 'groq' ? 'gsk_...' : 'AIzaSy...'}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                  />
                  <p className="text-[10px] md:text-xs text-gray-500 mt-2">
                    Get your FREE API key at:{' '}
                    <a
                      href={provider === 'groq' ? 'https://console.groq.com/keys' : 'https://aistudio.google.com/app/apikey'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-400 hover:text-red-300 underline break-all"
                    >
                      {provider === 'groq' ? 'console.groq.com/keys' : 'aistudio.google.com'}
                    </a>
                  </p>
                </div>

                {/* Voice Selection */}
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2">
                    🎤 AI Voice
                  </label>
                  <select
                    value={selectedVoice || ''}
                    onChange={(e) => {
                      soundEffects.click();
                      setVoice(e.target.value);
                    }}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-red-500"
                    style={{ color: 'white' }}
                  >
                    <option value="" style={{ background: '#1a1a1a', color: 'white' }}>Default Voice</option>
                    {voices.map((voice) => (
                      <option key={voice.name} value={voice.name} style={{ background: '#1a1a1a', color: 'white' }}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] md:text-xs text-gray-500 mt-2">
                    Voice changes take effect immediately (no reload needed)
                  </p>
                </div>

                {/* Current Status */}
                <div className="bg-white/5 rounded-lg p-3 md:p-4 border border-white/10">
                  <p className="text-xs md:text-sm text-gray-400">
                    <span className="font-semibold">Current Mode:</span>{' '}
                    {getCookie('GROQ_API_KEY') ? (
                      <span className="text-green-400">✓ Groq AI Active</span>
                    ) : getCookie('GEMINI_API_KEY') ? (
                      <span className="text-green-400">✓ Gemini AI Active</span>
                    ) : (
                      <span className="text-yellow-400">Demo Mode</span>
                    )}
                  </p>
                  <p className="text-xs md:text-sm text-gray-400 mt-2">
                    <span className="font-semibold">Voice:</span>{' '}
                    <span className="text-gray-300">{selectedVoice || 'Default'}</span>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                  <motion.button
                    onClick={handleSave}
                    disabled={!apiKey || saved}
                    className={`w-full py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base ${
                      saved
                        ? 'bg-green-600'
                        : apiKey
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-gray-600 cursor-not-allowed'
                    }`}
                    whileHover={apiKey && !saved ? { scale: 1.02 } : {}}
                    whileTap={apiKey && !saved ? { scale: 0.98 } : {}}
                  >
                    {saved ? '✓ Saved! Reloading...' : 'Save API Key & Reload'}
                  </motion.button>

                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => {
                        soundEffects.click();
                        onClose();
                      }}
                      className="flex-1 px-4 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base bg-white/10 hover:bg-white/20"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Close
                    </motion.button>

                    <motion.button
                      onClick={handleResetAll}
                      className="flex-1 px-4 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base bg-gray-700 hover:bg-gray-600 text-red-400"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      🔄 Reset All
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
