import { useState, useEffect } from 'react';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import { useGameStore } from '@/features/game/stores/game.store';
import { QuestionDisplay } from '@/features/game/components/QuestionDisplay';
import { ScoreSummary } from '@/features/game/components/ScoreSummary';
import { GameLoader } from '@/features/game/components/GameLoader';
import { ErrorMessage } from '@/components/common/ErrorMessage';

interface GameLayoutProps {}

export const GameLayout: React.FC<GameLayoutProps> = () => {
  const { isAuthenticated, error } = useAuthStore();
  const { currentQuestionIndex, questions, gameCompleted } = useGameStore();
  
  // Responsive iframe handling
  const [iframeHeight, setIframeHeight] = useState('100vh');
  
  useEffect(() => {
    const handleResize = () => {
      // Adjust height based on viewport
      const height = window.innerHeight > 600 ? '600px' : `${window.innerHeight}px`;
      setIframeHeight(height);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full" style={{ height: iframeHeight }}>
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-full" style={{ height: iframeHeight }}>
        <GameLoader />
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="flex items-center justify-center h-full" style={{ height: iframeHeight }}>
        <ScoreSummary />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" style={{ minHeight: iframeHeight }}>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        {questions.length > 0 && currentQuestionIndex < questions.length ? (
          <QuestionDisplay question={questions[currentQuestionIndex]} />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No questions available</p>
          </div>
        )}
      </div>
    </div>
  );
};