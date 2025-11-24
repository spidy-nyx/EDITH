import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getRandomTrivia, TriviaQuestion } from '../utils/mcuData';
import { AchievementManager } from '../utils/achievements';
import { soundEffects } from '../utils/soundEffects';

const TriviaGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadNewQuestion();
  }, []);

  const loadNewQuestion = () => {
    setCurrentQuestion(getRandomTrivia());
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    setQuestionsAnswered(prev => prev + 1);

    const isCorrect = index === currentQuestion?.correctAnswer;
    
    if (isCorrect) {
      soundEffects.success();
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      AchievementManager.incrementStat('triviaCorrect');
    } else {
      soundEffects.error();
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    soundEffects.click();
    loadNewQuestion();
  };

  if (!currentQuestion) {
    return (
      <div className="glass rounded-2xl p-6 text-center">
        <p className="text-gray-400">Loading trivia...</p>
      </div>
    );
  }

  const difficultyColors = {
    easy: 'text-green-400',
    medium: 'text-yellow-400',
    hard: 'text-red-400'
  };

  return (
    <motion.div
      className="glass rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold gradient-text">MCU Trivia</h2>
          <p className="text-sm text-gray-400">Test your Marvel knowledge!</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{score}/{questionsAnswered}</div>
          <div className="text-xs text-gray-400">Score</div>
        </div>
      </div>

      {/* Streak */}
      {streak > 0 && (
        <motion.div
          className="mb-4 text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <span className="text-orange-400 font-bold">
            🔥 {streak} Streak!
          </span>
        </motion.div>
      )}

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.question}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-semibold ${difficultyColors[currentQuestion.difficulty]}`}>
              {currentQuestion.difficulty.toUpperCase()}
            </span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-400">{currentQuestion.category}</span>
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-4">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-500/20'
                      : showWrong
                      ? 'border-red-500 bg-red-500/20'
                      : isSelected
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                  whileHover={!showResult ? { scale: 1.02 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white">{option}</span>
                    {showCorrect && <span className="text-green-400 text-xl">✓</span>}
                    {showWrong && <span className="text-red-400 text-xl">✗</span>}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Result */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          {selectedAnswer === currentQuestion.correctAnswer ? (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-4">
              <p className="text-green-400 font-semibold mb-2">🎉 Correct!</p>
              {currentQuestion.fact && (
                <p className="text-sm text-gray-300">{currentQuestion.fact}</p>
              )}
            </div>
          ) : (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4">
              <p className="text-red-400 font-semibold mb-2">❌ Incorrect</p>
              <p className="text-sm text-gray-300">
                The correct answer was: <span className="text-white font-semibold">
                  {currentQuestion.options[currentQuestion.correctAnswer]}
                </span>
              </p>
              {currentQuestion.fact && (
                <p className="text-sm text-gray-300 mt-2">{currentQuestion.fact}</p>
              )}
            </div>
          )}

          <button
            onClick={nextQuestion}
            className="w-full bg-gradient-to-r from-red-500 to-blue-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Next Question →
          </button>
        </motion.div>
      )}

      {/* Stats */}
      <div className="mt-6 pt-4 border-t border-white/10 flex justify-between text-xs text-gray-400">
        <span>Questions: {questionsAnswered}</span>
        <span>Accuracy: {questionsAnswered > 0 ? Math.round((score / questionsAnswered) * 100) : 0}%</span>
        <span>Best Streak: {streak}</span>
      </div>
    </motion.div>
  );
};

export default TriviaGame;
