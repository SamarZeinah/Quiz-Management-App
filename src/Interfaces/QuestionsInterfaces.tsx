export interface Option {
    A: string;
    B: string;
    C: string;
    D: string;
    _id: string;
}
export interface Question {
        _id:string,
        title:string,
        description: string,
        options:Option,
        answer: string,
        status: "active"| "inactive",
        instructor: string,
        difficulty: "easy"| "medium" | "hard",
        points: number,
        type: "BE"|"FE"|"DO"
    }
    export interface QuestionModalProps  {
      openModal: boolean;
      setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
      selectedQuestion: Question | null;
      onClose?: () => void;
      isTopFive?: boolean;
    };