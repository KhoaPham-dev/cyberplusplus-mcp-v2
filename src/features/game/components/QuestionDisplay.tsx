import { useState } from 'react';
import { useGameStore } from '@/features/game/stores/game.store';
import { Question } from '@/features/game/types/question.types';

interface QuestionDisplayProps {
  question: Question;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const { selectAnswer, nextQuestion } = useGameStore();
  
  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      selectAnswer(question.id, index);
    }
  };
  
  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      nextQuestion();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{question.question}</h2>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                selectedAnswer === index 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleSelectAnswer(index)}
              disabled={selectedAnswer !== null}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border mr-3 flex items-center justify-center ${
                  selectedAnswer === index 
                    ? 'border-blue-500 bg-blue-500 text-white' 
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === index && (
                    <span className="text-xs">✓</span>
                  )}
                </div>
                <span className="text-gray-700">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {selectedAnswer !== null && (
        <div className="pt-4">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleNextQuestion}
          >
            {useGameStore.getState().currentQuestionIndex < useGameStore.getState().questions.length - 1 
              ? 'Next Question' 
              : 'Finish Game'}
          </button>
        </div>
      )}
    </div>
  );
};