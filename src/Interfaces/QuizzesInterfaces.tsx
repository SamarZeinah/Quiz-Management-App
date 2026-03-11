export interface QuizOption {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}
// QuestionsInterfaces.ts
export interface Question {
    description: string;
    answer: string;
    status: "active" | "inactive";
    instructor: string;
    difficulty: "easy" | "medium" | "hard";
    points: number;
    type: "BE" | "FE" | "DO";
  _id: string;
  title: string;
  options: QuizOption;
}
export interface Quiz {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: "open" | "closed" ;
  instructor: string;
  group: string;
  questions_number: number;
  questions: Question[]; 
  schadule: string; 
  duration: number;
  score_per_question: number;
  type: "FE" | "BE" | "DO";
  difficulty: "easy" | "medium" | "hard" ;
  updatedAt: string;
  createdAt: string;
  __v: number;
  closed_at: string;
  participants: number;
}
export type QuizResponse = Quiz[];

export interface QuizDataProps {
  openQuizData: boolean;
  setOpenQuizData: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
  refreshQuizzes:()=>void;
  
}
export interface QuizModalProps  {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedQuiz: Quiz | null;
  onClose?: () => void;
};
