export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  category?: string;
  status?: 'draft' | 'published' | 'archived';
  createdAt?: string;
}