import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CircleCheckBig,
  CirclePlus,
  SquarePen,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { Groups_URLS } from "../Services/Urls";
import { DeleteConfirmation } from "../Shared_Components/DeleteConfirmation";
import { toast } from "@/hooks/use-toast";
import PacmanLoader from "react-spinners/PacmanLoader";
import GroupModal from "./GroupModal ";
import type { GroupData } from "@/Interfaces/GroupInterfaces";
const GroupsList = () => {
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
const [selectedGroup, setSelectedGroup] = useState<GroupData | null>(null);
const [deleteOpen, setDeleteOpen] = useState(false);
    // const navigate=useNavigate();

  // fetchGroupData
  const fetchGroupData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(Groups_URLS.GET_GROUPS, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setGroups(res.data);
      setLoading(false);
      console.log("Groups Data:", res.data);
    } catch (error) {
      console.error("Failed to fetch groups:", error);
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, []);
  // handleDeleteGroup
  const handleDeleteGroup = async (groupId: string) => {
    console.log("Deleting group with ID:", groupId);
    if (groupId) {
      try {
         await axios.delete(Groups_URLS.DELETE_GROUPS(groupId), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        fetchGroupData();
        toast({
          title: `Group of id ${groupId} delete Successfully`,
          duration: 1500,
        });
      } catch (error) {
        let description = "Failed to delete Group";
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string }>;
          description = axiosError.response?.data?.message || description;
        }
        toast({
          title: "Error",
          description,
          variant: "destructive",
          duration: 1500,
        });
      }
      finally {
      setDeleteOpen(false); 
    }
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Add Group Button */}
      <div className="flex justify-end mb-5">
        
        <Button
          className="flex items-center gap-2 rounded-full px-6 py-3"
          onClick={() => {
            setSelectedGroup(null); 
            setOpenModal(true);
          }}
        >
          <CirclePlus className="w-6 h-6" />
          Add Group
        </Button>

      </div>

      {/* Groups Grid */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-[300px]">
        {loading ? (
          <div className="col-span-full flex items-center justify-center">
            <PacmanLoader color="#16a34a" size={40} />
          </div>
        ) : (
          groups.map((group) => (
            <Card key={group._id} className="w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{group.name}</CardTitle>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 border-2 border-green-200 text-green-900 text-sm font-medium">
                    <CircleCheckBig className="w-4 h-4" />
                    {group.status}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col gap-2">
                <CardDescription className="flex gap-2 items-center">
                  <span className="flex items-center gap-1">
                    <User className="text-blue-600 w-4 h-4" />
                    Instructor:
                  </span>
                  <span>{group.instructor}</span>
                </CardDescription>

                <CardDescription className="flex gap-2 items-center">
                  <span className="flex items-center gap-1">
                    <Users className="text-green-600 w-4 h-4" />
                    Students:
                  </span>
                  <span>
                    {group.students.length}/{group.max_students}
                  </span>
                </CardDescription>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-2"
                    style={{
                      width: `${
                        (group.students.length / group.max_students) * 100
                      }%`,
                    }}
                  />
                </div>

                <span className="text-sm text-gray-600 text-right">
                  {Math.round(
                    (group.students.length / group.max_students) * 100
                  )}
                  % filled
                </span>
              </CardContent>

              <CardFooter className="flex flex-row gap-4 justify-end">
                <div className="flex items-center gap-1 text-blue-600">
                  <SquarePen className="w-4 h-4" />
                  <Button className="p-0 text-blue-600 bg-transparent border-0 shadow-none"
                  onClick={() => {
                      setSelectedGroup(group);
                      setOpenModal(true);
                    }}>
                    Edit
                  </Button>
                
                </div>
                    <Button className="p-0 text-red-600 bg-transparent border-0 shadow-none"
                    onClick={()=>{
                      setSelectedGroup(group);
                    setDeleteOpen(true);

                    }}>
                      <Trash2 className="w-4 h-4" /> Delete
                    </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    
 
<GroupModal
  openModal={openModal}
  setOpenModal={setOpenModal}
  selectedGroup={selectedGroup}
  onClose={() => fetchGroupData()}
  
/>
<DeleteConfirmation
        open={deleteOpen}                
        onOpenChange={setDeleteOpen}
      title="Delete Group"
      description={`Are you sure you want to delete ${selectedGroup?.name} Group?`}
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={async () => {
        await handleDeleteGroup(selectedGroup?._id || "");
      }}
    />

</div>
  );

};

export default GroupsList;
