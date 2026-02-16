export interface QuizOption {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}

export interface QuizQuestion {
  _id: string;
  title: string;
  options: QuizOption;
}

export type QuizStatus = "open" | "closed";
export type QuizDifficulty = "easy" | "medium" | "hard";
export type QuizType = "DO" | "UNDO";

export interface Quiz {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: QuizStatus;
  instructor: string;
  group: string;
  questions_number: number;
  questions: QuizQuestion[];
  schadule: string;
  duration: number;
  score_per_question: number;
  type: QuizType;
  difficulty: QuizDifficulty;
  updatedAt: string;
  createdAt: string;
  __v: number;
  participants: number;
}
export type QuizzesResponse = Quiz[];