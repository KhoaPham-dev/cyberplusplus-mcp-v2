import { create } from 'zustand';
import { Question } from '@/features/game/types/question.types';

interface GameState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, number>; // questionId -> selectedAnswerIndex
  gameCompleted: boolean;
  setQuestions: (questions: Question[]) => void;
  selectAnswer: (questionId: string, answerIndex: number) => void;
  nextQuestion: () => void;
  completeGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  gameCompleted: false,
  
  setQuestions: (questions) => set({ questions }),
  
  selectAnswer: (questionId, answerIndex) => set((state) => ({
    answers: { ...state.answers, [questionId]: answerIndex }
  })),
  
  nextQuestion: () => set((state) => {
    const nextIndex = state.currentQuestionIndex + 1;
    if (nextIndex >= state.questions.length) {
      return { gameCompleted: true };
    }
    return { currentQuestionIndex: nextIndex };
  })),
  
  completeGame: () => set({ gameCompleted: true }),
  
  resetGame: () => set({
    currentQuestionIndex: 0,
    answers: {},
    gameCompleted: false
  })
}));