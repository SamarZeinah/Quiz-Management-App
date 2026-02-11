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
  const [studentsGroup, setStudentsGroup] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [availableStudents, setAvailableStudents] = useState<Student[]>([]);
  const [groupName, setGroupName] = useState(selectedGroup?.name || "");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch students not in any group
  const StudentswithOutGroup = async () => {
    try {
      const res = await axios.get(Students_URLS.GET_ALLWITHOUTGROUP, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setStudentsWithoutGroup(res.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  // Fetch all students
  const GetAllStudentsGroup = async () => {
    try {
      const res = await axios.get(Students_URLS.GET_ALL_STUDENTS, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setStudentsGroup(res.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  // Create new group
  const CreateGroup = async () => {
    if (selectedStudents.length === 0) {
    toast({
      title: "Error",
      description: "Please select at least one student",
      variant: "destructive",
      duration: 1500,
    });
    return;
  }
    setIsSaving(true);
    const payload = {
      name: groupName,
      students: selectedStudents.map((s) => s._id),
    };
    try {
      await axios.post(Groups_URLS.CREATE_GROUP, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast({
        title: "Group Created Successfully",
        variant: "success",
        duration: 1500,
      });
      onClose?.();
      setOpenModal(false);
      StudentswithOutGroup();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
        duration: 1500,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Update existing group
  const UpdateGroup = async () => {
    if (!selectedGroup) return;
    setIsSaving(true);
    const payload = {
      name: groupName,
      students: selectedStudents.map((s) => s._id),
    };
    try {
      await axios.put(Groups_URLS.UPDATE_GROUP(selectedGroup._id), payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast({
        title: "Group Updated Successfully",
        variant: "success",
        duration: 1500,
      });
      onClose?.();
      setOpenModal(false);
      GetAllStudentsGroup();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
        duration: 1500,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Load students when modal opens
  useEffect(() => {
    if (!openModal) return;

    const fetchData = async () => {
      try {
        // combine the two requests at the same time
        const [withoutGroupRes, allStudentsRes] = await Promise.all([
          axios.get(Students_URLS.GET_ALLWITHOUTGROUP, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(Students_URLS.GET_ALL_STUDENTS, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        const withoutGroup = withoutGroupRes.data as Student[];
        const allStudents = allStudentsRes.data as Student[];

        setStudentsWithoutGroup(withoutGroup);
        setStudentsGroup(allStudents);

        // Selected Students
        const selected = selectedGroup
          ? allStudents.filter((s: Student) =>
              selectedGroup.students.includes(s._id),
            )
          : [];
        setSelectedStudents(selected);

        // Students avilabel for Combobox
        const combined = selectedGroup
          ? [...withoutGroup, ...selected]
          : withoutGroup;
        setAvailableStudents(combined);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchData();
  }, [openModal, selectedGroup]);

  // Set selected students and available students after data loads
  useEffect(() => {
    if (openModal) {
      setGroupName(selectedGroup?.name || "");

      const selected = selectedGroup
        ? studentsGroup.filter((s) => selectedGroup.students.includes(s._id))
        : [];

      setSelectedStudents(selected);

      const combined = selectedGroup
        ? [
            ...studentsWithoutGroup,
            ...studentsGroup.filter((s) =>
              selectedGroup.students.includes(s._id),
            ),
          ]
        : studentsWithoutGroup;

      setAvailableStudents(combined);
    }
  }, [openModal, studentsWithoutGroup, studentsGroup, selectedGroup]);

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
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <label className="text-sm font-medium">Select Students</label>
          <ComboboxMultiple
            key={
              selectedGroup?._id +
              "-" +
              selectedStudents.map((s) => s._id).join("-")
            }
            items={availableStudents}
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
            onClick={selectedGroup ? UpdateGroup : CreateGroup}
          >
            {isSaving
              ? selectedGroup
                ? "Updating..."
                : "Saving..."
              : selectedGroup
                ? "Update"
                : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GroupModal;
