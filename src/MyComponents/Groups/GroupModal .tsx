import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import axios from "axios";
import { Groups_URLS, Students_URLS } from "../Services/Urls";
import { ComboboxMultiple } from "@/components/ui/ComboboxMultiple";
import { toast } from "@/hooks/use-toast";

type Student = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
};

type GroupData = {
  _id: string;
  name: string;
  status: "Active" | "Inactive";
  instructor: string;
  students: string[];
  max_students: number;
  footer: string;
};

type GroupModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedGroup: GroupData | null;
  onClose?: () => void;
};

const GroupModal = ({
  openModal,
  setOpenModal,
  selectedGroup,
  onClose,
}: GroupModalProps) => {
  const [studentsWithoutGroup, setStudentsWithoutGroup] = useState<Student[]>(
    [],
  );
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [groupName, setGroupName] = useState(selectedGroup?.name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // fetch students without group
  const StudentswithOutGroup = async () => {
    try {
      const res = await axios.get(Students_URLS.GET_ALLWITHOUTGROUP, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStudentsWithoutGroup(res.data);
      console.log("Students Data:", res.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };
  //CreateGroup
  const CreateGroup = async () => {
    setIsSaving(true);
    const payload = {
      name: groupName,
      students: selectedStudents.map((s) => s._id),
    };

    try {
      const res = await axios.post(Groups_URLS.CREATE_GROUP, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Group saved:", res.data);
      onClose?.();
      StudentswithOutGroup();
      setOpenModal(false);
      toast({
        title: "Group Created Successfully",
        description: "Your Group has been Created successfully.",
        variant: "success",
        duration: 1500,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios Error:", error.response?.data);
        toast({
          title: "Error",
          description: error.response?.data?.message || "Something went wrong",
          variant: "destructive",
          duration: 1500,
        });
      } else {
        console.log("Unexpected Error:", error);
      }
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (openModal) {
      StudentswithOutGroup();
    }
  }, [openModal]);

  const toggleStudent = (student: Student) => {
    const exists = selectedStudents.find((s) => s._id === student._id);
    if (exists) {
      setSelectedStudents(
        selectedStudents.filter((s) => s._id !== student._id),
      );
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };
  useEffect(() => {
    if (openModal) {
      setSelectedStudents([]);
      setGroupName(selectedGroup?.name || "");
    }
  }, [openModal, selectedGroup]);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedGroup ? "Edit Group" : "Add New Group"}
          </DialogTitle>
          <DialogDescription>
            {selectedGroup ? "Update group data below" : "Fill the data below"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Group Name</label>
          <Input
            placeholder="Group Name"
            defaultValue={selectedGroup?.name || ""}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <label className="text-sm font-medium">Select Students</label>

          <ComboboxMultiple
            key={selectedGroup?._id || "new"}
            items={studentsWithoutGroup}
            defaultValues={selectedStudents}
            onValueChange={(values) => setSelectedStudents(values)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>

          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={CreateGroup}
          >
            {isSaving ? "Saving..." : selectedGroup ? "Update" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GroupModal;
