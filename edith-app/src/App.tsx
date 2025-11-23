import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import OnboardingFlow from './components/OnboardingFlow';
import BootSequence from './components/BootSequence';
import MainInterface from './components/MainInterface';
import { useEdithStore } from './store/edithStore';
import { getCookie } from './utils/cookies';

function App() {
  const [phase, setPhase] = useState<'onboarding' | 'boot' | 'main'>('onboarding');
  const { initializeAI } = useEdithStore();

  useEffect(() => {
    // Check if user has already onboarded (using cookies)
    const userName = getCookie('USER_NAME');
    if (userName) {
      // User already onboarded, show boot animation
      setPhase('boot');
    }
    initializeAI();
  }, [initializeAI]);

  const handleOnboardingComplete = () => {
    // After first-time onboarding, go straight to main
    setPhase('main');
  };

  return (
    <div className="w-full h-full bg-black">
      <AnimatePresence mode="wait">
        {phase === 'onboarding' && (
          <OnboardingFlow key="onboarding" onComplete={handleOnboardingComplete} />
        )}
        {phase === 'boot' && (
          <BootSequence key="boot" onComplete={() => setPhase('main')} />
        )}
        {phase === 'main' && (
          <MainInterface key="main" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
