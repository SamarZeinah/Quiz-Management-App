import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import type { StudentModalProps } from "@/Interfaces/StudentsInterfaces";
import { User, Users } from "lucide-react";
const StudentModal = ({
  openModal,
  setOpenModal,
  selectedStudent,
}: StudentModalProps) => {
 
  
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
    <DialogContent>
  <DialogHeader>
    <DialogTitle>Student Details</DialogTitle>
    <DialogDescription>  View student personal information and assigned group details below</DialogDescription>
  </DialogHeader>

  <div className="flex flex-col gap-4 mt-4">
    <div className="bg-gray-50 p-5 rounded-lg">
<h3 className="font-bold text-lg flex items-center gap-2 mb-4">
  <User className="w-5 h-5 " />
  Personal Information
</h3>      
<div className="grid grid-cols-2 gap-6">
  <div className="mb-2">
    <h4 className="text-gray-500 text-sm font-medium">Full Name</h4>
    <p className="text-black font-semibold">
      {selectedStudent?.first_name} {selectedStudent?.last_name}
    </p>
  </div>

  <div className="mb-2">
    <h4 className="text-gray-500 text-sm font-medium">Student ID</h4>
    <p className="text-black font-semibold">{selectedStudent?._id}</p>
  </div>

  <div className="mb-2">
    <h4 className="text-gray-500 text-sm font-medium">Email</h4>
    <p className="text-black font-semibold">{selectedStudent?.email}</p>
  </div>

  <div className="mb-2">
    <h4 className="text-gray-500 text-sm font-medium">Role</h4>
    <p className="text-black font-semibold">{selectedStudent?.role}</p>
  </div>
</div>

     
    </div>
 <div className="bg-green-50 p-5 rounded-lg">
<h3 className="font-bold text-lg flex items-center gap-2 mb-4">
  <Users className="w-5 h-5 " />
  Group Information
</h3>      
 <div className="my-2">
  <h4 className="text-gray-500 text-sm font-medium">Group Name</h4>
  <p className="text-black font-semibold">
    {selectedStudent?.group?.name || "No group assigned"}
  </p>
</div>

  
</div>

     
    </div>
    

  <DialogFooter>
    <button
      className="px-4 py-2 bg-gray-300 rounded hover:bg-red-500 hover:text-white transition"
      onClick={() => setOpenModal(false)}
    >
      Close
    </button>
  </DialogFooter>
</DialogContent>

    </Dialog>
  );
};

export default StudentModal;