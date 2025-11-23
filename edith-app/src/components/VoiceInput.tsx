import { motion } from 'framer-motion';
import { useState } from 'react';
import { useEdithStore } from '../store/edithStore';
import { soundEffects } from '../utils/soundEffects';

const VoiceInput = () => {
  const [isListening, setIsListening] = useState(false);
  const { processCommand } = useEdithStore();

  const handleVoiceClick = () => {
    if (!isListening) {
      soundEffects.listening();
      setIsListening(true);
      startVoiceRecognition();
    }
  };

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser. Please use Chrome or Edge.');
      setIsListening(false);
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log('Voice recognition started');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log('Heard:', transcript);
      processCommand(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Voice recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="glass rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6">
      {/* Voice Button */}
      <motion.button
        className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl flex-shrink-0 ${
          isListening ? 'bg-red-600' : 'bg-red-500'
        }`}
        onClick={handleVoiceClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: isListening
            ? '0 0 40px rgba(220, 20, 60, 0.8)'
            : '0 0 20px rgba(220, 20, 60, 0.4)',
        }}
      >
        {isListening && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-red-400"
            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
        🎤
      </motion.button>

      {/* Input Display */}
      <div className="flex-1 w-full">
        <motion.div
          className="bg-white/5 rounded-xl p-3 md:p-4 border border-white/10"
          animate={isListening ? { borderColor: 'rgba(220, 20, 60, 0.5)' } : {}}
        >
          <p className="text-sm md:text-base text-gray-300 text-center md:text-left">
            {isListening ? (
              <span className="flex items-center justify-center md:justify-start gap-2">
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Listening...
                </motion.span>
              </span>
            ) : (
              <span>
                Click the microphone to speak
              </span>
            )}
          </p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 flex-shrink-0">
        {[
          { emoji: '💡', action: null },
          { emoji: '🔍', action: null },
          { emoji: '⚙️', action: 'settings' }
        ].map((item, i) => (
          <motion.button
            key={i}
            onClick={() => {
              soundEffects.click();
              item.action === 'settings' && (window as any).openSettings?.();
            }}
            className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-lg md:text-xl hover:bg-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.emoji}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default VoiceInput;
