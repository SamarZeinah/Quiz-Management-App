export interface Student  {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
};

export interface GroupData  {
  _id: string;
  name: string;
  status: "Active" | "Inactive";
  instructor: string;
  students: string[];
  max_students: number;
  footer: string;
};

export interface GroupModalProps  {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedGroup: GroupData | null;
  onClose?: () => void;
};

