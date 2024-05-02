export interface QuizCard {
  id: string;
  image: string;
  title: string;
  type: 'frontend' | 'backend' | 'common';
}

export interface QuizItem {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}
