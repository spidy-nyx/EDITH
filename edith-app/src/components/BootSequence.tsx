import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCookie } from '../utils/cookies';
import { soundEffects } from '../utils/soundEffects';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [phase, setPhase] = useState<'eye' | 'hello' | 'edith' | 'welcome'>('eye');
  
  const userName = getCookie('USER_NAME') || 'SPIDERMAN';

  useEffect(() => {
    if (phase === 'eye') {
      // Show eye for 2.5 seconds
      const timer = setTimeout(() => {
        soundEffects.click();
        setPhase('hello');
      }, 2500);
      return () => clearTimeout(timer);
    } else if (phase === 'hello') {
      // Show "HEY THERE" for 2.5 seconds
      const timer = setTimeout(() => {
        soundEffects.success();
        setPhase('edith');
      }, 2500);
      return () => clearTimeout(timer);
    } else if (phase === 'edith') {
      // Show "E.D.I.T.H" for 2.5 seconds
      const timer = setTimeout(() => {
        soundEffects.click();
        setPhase('welcome');
      }, 2500);
      return () => clearTimeout(timer);
    } else if (phase === 'welcome') {
      // Show "WELCOME SPIDERMAN" for 2 seconds then complete
      const timer = setTimeout(() => {
        soundEffects.bootup();
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-60">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{
            background: 'linear-gradient(135deg, #ff0000 0%, #dc143c 100%)',
            top: '-200px',
            left: '-200px',
          }}
          animate={{
            y: [0, 30, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ff0000 100%)',
            bottom: '-150px',
            right: '-150px',
          }}
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {/* Phase 1: Eye Blink */}
        {phase === 'eye' && (
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
              {/* Left Eye */}
              <motion.path
                d="M 20 60 Q 20 20, 60 20 Q 80 20, 85 60 Q 80 100, 60 100 Q 20 100, 20 60 Z"
                fill="white"
                stroke="#ff0000"
                strokeWidth="3"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut',
                }}
                style={{ transformOrigin: 'center' }}
              />

              {/* Right Eye */}
              <motion.path
                d="M 115 60 Q 120 20, 140 20 Q 180 20, 180 60 Q 180 100, 140 100 Q 120 100, 115 60 Z"
                fill="white"
                stroke="#ff0000"
                strokeWidth="3"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut',
                }}
                style={{ transformOrigin: 'center' }}
              />
            </svg>
          </motion.div>
        )}

        {/* Phase 2: HEY THERE / THIS IS */}
        {phase === 'hello' && (
          <motion.div
            key="hello"
            className="relative z-10 text-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {/* HEY THERE */}
            <div className="flex justify-center flex-wrap gap-6 mb-8">
              <motion.span
                className="text-7xl md:text-9xl font-black inline-block"
                style={{
                  background: 'linear-gradient(135deg, #ff0000 0%, #ff6b6b 50%, #dc143c 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                HEY
              </motion.span>
              <motion.span
                className="text-7xl md:text-9xl font-black inline-block"
                style={{
                  background: 'linear-gradient(135deg, #ff0000 0%, #ff6b6b 50%, #dc143c 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                THERE
              </motion.span>
            </div>

            {/* THIS IS */}
            <div className="flex justify-center flex-wrap gap-4">
              <motion.span
                className="text-4xl md:text-5xl font-medium inline-block"
                style={{
                  background: 'linear-gradient(135deg, #ff0000 0%, #ff6b6b 50%, #dc143c 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'gradient-shift 3s ease infinite',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                THIS
              </motion.span>
              <motion.span
                className="text-4xl md:text-5xl font-medium inline-block"
                style={{
                  background: 'linear-gradient(135deg, #ff0000 0%, #ff6b6b 50%, #dc143c 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'gradient-shift 3s ease infinite',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                IS
              </motion.span>
            </div>
          </motion.div>
        )}

        {/* Phase 3: E.D.I.T.H with subtitle */}
        {phase === 'edith' && (
          <motion.div
            key="edith"
            className="relative z-10 text-center px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <motion.h1
              className="text-8xl md:text-9xl font-black mb-6"
              style={{
                background: 'linear-gradient(135deg, #ff0000 0%, #ff6b6b 50%, #dc143c 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              E.D.I.T.H
            </motion.h1>
            
            <motion.p
              className="text-2xl md:text-3xl font-medium text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Even Dead, I'm The Hero
            </motion.p>
          </motion.div>
        )}

        {/* Phase 4: WELCOME / SPIDERMAN (two lines) */}
        {phase === 'welcome' && (
          <motion.div
            key="welcome"
            className="relative z-10 text-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {/* WELCOME */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span
                className="text-7xl md:text-9xl font-black inline-block"
                style={{
                  background: 'linear-gradient(135deg, #ff0000 0%, #ff6b6b 50%, #dc143c 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'gradient-shift 3s ease infinite',
                }}
              >
                WELCOME
              </span>
            </motion.div>

            {/* SPIDERMAN */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span
                className="text-7xl md:text-9xl font-black inline-block"
                style={{
                  background: 'linear-gradient(135deg, #ff0000 0%, #ff6b6b 50%, #dc143c 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'gradient-shift 3s ease infinite',
                }}
              >
                {userName}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BootSequence;
