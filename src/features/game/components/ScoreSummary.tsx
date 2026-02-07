import { useGameStore } from '@/features/game/stores/game.store';

interface ScoreSummaryProps {}

export const ScoreSummary: React.FC<ScoreSummaryProps> = () => {
  const { questions, answers } = useGameStore();
  
  // Calculate score
  const correctAnswers = questions.filter(q => 
    answers[q.id] === q.correctAnswer
  ).length;
  
  const scorePercentage = questions.length > 0 
    ? Math.round((correctAnswers / questions.length) * 100) 
    : 0;

  return (
    <div className="text-center max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Game Completed!</h2>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <div className="text-5xl font-bold text-blue-600 mb-2">
          {scorePercentage}%
        </div>
        <div className="text-gray-600 mb-4">
          You answered {correctAnswers} out of {questions.length} questions correctly
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-blue-600 h-4 rounded-full" 
            style={{ width: `${scorePercentage}%` }}
          ></div>
        </div>
        
        <div className="mt-6">
          {scorePercentage >= 80 ? (
            <p className="text-green-600 font-semibold">Excellent work! You have strong cybersecurity knowledge.</p>
          ) : scorePercentage >= 60 ? (
            <p className="text-yellow-600 font-semibold">Good job! Review the materials to improve further.</p>
          ) : (
            <p className="text-red-600 font-semibold">Keep learning! Review the cybersecurity training materials.</p>
          )}
        </div>
      </div>
      
      <button 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        onClick={() => window.location.reload()}
      >
        Play Again
      </button>
    </div>
  );
};