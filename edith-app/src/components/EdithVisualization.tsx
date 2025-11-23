import { motion } from 'framer-motion';
import { useEdithStore } from '../store/edithStore';

const EdithVisualization = () => {
  const { status } = useEdithStore();

  // Different states for the visualization
  const isListening = status === 'LISTENING';
  const isProcessing = status === 'PROCESSING';
  const isSpeaking = status === 'SPEAKING';

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Center core */}
      <motion.div
        className="absolute w-16 h-16 rounded-full"
        style={{
          background: 'radial-gradient(circle, #ff0000 0%, #dc143c 50%, transparent 70%)',
        }}
        animate={{
          scale: isListening ? [1, 1.3, 1] : isSpeaking ? [1, 1.2, 1] : 1,
          opacity: isListening || isSpeaking ? [0.8, 1, 0.8] : 0.6,
        }}
        transition={{
          duration: isListening ? 1 : isSpeaking ? 0.8 : 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Rotating rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2"
          style={{
            width: `${(i + 2) * 80}px`,
            height: `${(i + 2) * 80}px`,
            borderColor: `rgba(255, 0, 0, ${0.3 - i * 0.08})`,
          }}
          animate={{
            rotate: isListening || isSpeaking ? 360 : 0,
            scale: isProcessing ? [1, 1.1, 1] : 1,
          }}
          transition={{
            rotate: {
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear',
            },
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />
      ))}

      {/* Particle dots */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 360) / 12;
        const radius = 120;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-red-500"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: isListening || isSpeaking ? [0, x, 0] : 0,
              y: isListening || isSpeaking ? [0, y, 0] : 0,
              opacity: isListening || isSpeaking ? [0.3, 1, 0.3] : 0.5,
              scale: isSpeaking ? [1, 1.5, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* Waveform bars (when speaking) */}
      {isSpeaking && (
        <div className="absolute flex items-center gap-1">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-red-500 rounded-full"
              animate={{
                height: [20, 60, 20],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Pulse effect when listening */}
      {isListening && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute w-32 h-32 rounded-full border-2 border-red-500"
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 2.5],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}

      {/* Processing spinner */}
      {isProcessing && (
        <motion.div
          className="absolute w-40 h-40 rounded-full"
          style={{
            border: '3px solid transparent',
            borderTopColor: '#ff0000',
            borderRightColor: '#ff0000',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </div>
  );
};

export default EdithVisualization;
