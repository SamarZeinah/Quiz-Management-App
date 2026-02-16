export type Status = "active" | "inactive";

export interface Group {
  _id: string;
  name: string;
  status: Status;
  instructor: string;
  students: string[];
  max_students: number;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: Status;
  role: "Student" | "Instructor";
  group: Group ;
}
export interface StudentModalProps  {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStudent: Student | null;
  onClose?: () => void;
};
