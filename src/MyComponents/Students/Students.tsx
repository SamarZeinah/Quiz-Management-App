import { useEffect, useState } from "react";
import { Students_URLS } from "../Services/Urls";
import axios, { AxiosError } from "axios";
import {
  ChevronRight,
  CircleCheckBig,
  CircleX,
  LayoutGrid,
  List,
  Trash2,
} from "lucide-react";
import PacmanLoader from "react-spinners/PacmanLoader";
import type { Student } from "@/Interfaces/StudentsInterfaces";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import StudentModal from "./StudentsModal";
import { DeleteConfirmation } from "../Shared_Components/DeleteConfirmation";
import { toast } from "@/hooks/use-toast";

const Students = () => {
  const [studentsGroup, setStudentsGroup] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(6);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchValue, setSearchValue] = useState<string>("");
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [deleteType, setDeleteType] = useState<"full" | "fromGroup">("full");
  // filteredStudents dedend on name
  const filteredStudents = studentsGroup.filter((student) => {
    const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
    return fullName.includes(searchValue.toLowerCase());
  });

  // pagination on filtered data
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  // calculate total pages based on filtered students
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDropdownChange = (id: string, open: boolean) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: open }));
  };

  const GetAllStudentsGroup = async () => {
    setLoading(true);
    try {
      const res = await axios.get(Students_URLS.GET_ALL_STUDENTS, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setStudentsGroup(res.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetAllStudentsGroup();
  }, []);
  // handleDeleteStudent
  const handleDeleteStudent = async (StudentId: string) => {
    console.log("Deleting student with ID:", StudentId);
    if (StudentId) {
      try {
        await axios.delete(Students_URLS.Delete_Student(StudentId), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        GetAllStudentsGroup();

        toast({
          title: `Student with ID ${StudentId} deleted successfully`,
          duration: 1500,
        });
      } catch (error) {
        let description = "Failed to delete Student";
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
      } finally {
        setOpenDelete(false);
      }
    }
  };
  //  const DeleteStudentFromGroup = async (StudentId: string,GroupId:string) => {

  //   if (StudentId&&GroupId) {
  //     try {
  //       await axios.delete(Students_URLS.Delete_Student_From_Group(GroupId,StudentId), {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });

  //       GetAllStudentsGroup();

  //       toast({
  //         title: `Student with ID ${StudentId} deleted successfully from group with ID ${GroupId}`,
  //         duration: 1500,
  //       });
  //     } catch (error) {
  //       let description = "Failed to delete Student from group";
  //       if (axios.isAxiosError(error)) {
  //         const axiosError = error as AxiosError<{ message: string }>;
  //         description = axiosError.response?.data?.message || description;
  //       }
  //       toast({
  //         title: "Error",
  //         description,
  //         variant: "destructive",
  //         duration: 1500,
  //       });
  //     } finally {
  //       setOpenDelete(false);
  //     }
  //   }
  // };
  const DeleteStudentFromGroup = async (
    StudentId: string,
    GroupId?: string,
  ) => {
    if (!StudentId) return;

    if (!GroupId) {
      toast({
        title: "Error",
        description: "This student is not assigned to any group",
        variant: "destructive",
        duration: 1500,
      });
      return;
    }

    try {
      await axios.delete(
        Students_URLS.Delete_Student_From_Group(GroupId, StudentId),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      GetAllStudentsGroup();

      toast({
        title: `Student removed successfully from group`,
        duration: 1500,
      });
    } catch (error) {
      let description = "Failed to delete Student from group";

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
    } finally {
      setOpenDelete(false);
    }
  };

  return (
    <div className="p-6 w-full min-h-full overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between mb-6 gap-4">
        {/* Search input */}
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search by name..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 flex-wrap">
          <div className="flex border rounded-full overflow-hidden shadow-sm">
            {[6, 12, 24].map((num) => (
              <button
                key={num}
                onClick={() => setStudentsPerPage(num)}
                className={`flex items-center justify-center px-5 py-2 text-sm font-medium transition ${
                  studentsPerPage === num
                    ? "bg-primary text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <div className="flex border rounded-full overflow-hidden shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-medium transition ${
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-medium transition ${
                viewMode === "list"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <List className="w-4 h-4" />
              List
            </button>
          </div>
        </div>
      </div>

      {/* Grid/List */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  ${
          viewMode === "grid" ? "gap-6" : "gap-4"
        }`}
      >
        {loading ? (
          <div className="col-span-full flex items-center justify-center min-h-[60vh]">
            <PacmanLoader color="#16a34a" size={40} />
          </div>
        ) : (
          currentStudents.map((student) => (
            <div
              key={student._id}
              className={
                viewMode === "grid"
                  ? "border rounded-lg p-6 text-center shadow hover:shadow-lg transition bg-white relative"
                  : "border rounded-lg p-4 flex items-center gap-4 shadow hover:shadow-lg transition bg-white relative"
              }
            >
              <DropdownMenu
                onOpenChange={(open) => handleDropdownChange(student._id, open)}
              >
                <DropdownMenuTrigger asChild>
                  <button className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition">
                    <ChevronRight
                      className={`w-5 h-5 transition-transform duration-300 ${
                        openDropdowns[student._id] ? "rotate-90" : "rotate-0"
                      }`}
                    />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem
                    className="flex gap-2"
                    onClick={() => {
                      setSelectedStudent(student);
                      setOpenModal(true);
                    }}
                  >
                    View Details
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="flex gap-2 text-red-500"
                    onClick={() => {
                      setSelectedStudent(student);
                      setDeleteType("full");
                      setOpenDelete(true);
                    }}
                  >
                    Delete Student
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="flex gap-2 text-red-500"
                    onClick={() => {
                      setSelectedStudent(student);
                      setDeleteType("fromGroup");
                      setOpenDelete(true);
                    }}
                  >
                    Remove From Group
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <img
                src={`https://api.dicebear.com/6.x/big-ears/svg?seed=${student.first_name}%20${student.last_name}`}
                alt={`${student.first_name} avatar`}
                className={
                  viewMode === "grid"
                    ? "w-32 h-32 mx-auto rounded-full border-4 border-gray-200 shadow-lg hover:shadow-2xl transition-shadow"
                    : "w-20 h-20 rounded-full border-4 border-gray-200 shadow-md"
                }
              />

              <div className={viewMode === "grid" ? "" : "text-left flex-1"}>
                <h2 className="text-xl font-semibold my-2">
                  {student.first_name} {student.last_name}
                </h2>
                <p className="text-sm text-gray-500">
                  Group: {student.group?.name || "No group"}
                </p>

                <p
                  className={`text-sm flex items-center gap-1 w-full ${viewMode === "grid" ? "justify-center" : "justify-start"}`}
                >
                  {student.status === "active" ? (
                    <span className="text-green-600 flex items-center gap-1">
                      Active <CircleCheckBig className="w-6 h-6" />
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1">
                      Inactive <CircleX className="w-5 h-5" />
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
              />
            </PaginationItem>

            {currentPage > 2 && (
              <>
                <PaginationItem>
                  <PaginationLink onClick={() => handlePageChange(1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            {[currentPage - 1, currentPage, currentPage + 1].map((page) =>
              page > 0 && page <= totalPages ? (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ) : null,
            )}

            {currentPage < totalPages - 1 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {/* StudentModal */}
      <StudentModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedStudent={selectedStudent}
      />
      {/* DeleteConfirmation */}

      <DeleteConfirmation
        open={openDelete}
        onOpenChange={setOpenDelete}
        title={deleteType === "full" ? "Delete Student" : "Remove From Group"}
        description={
          <span>
            Are you sure you want to{" "}
            <span className="text-red-600 font-bold">
              {deleteType === "full" ? "delete" : "remove"}{" "}
              {selectedStudent?.first_name} {selectedStudent?.last_name}
            </span>{" "}
            {deleteType === "full" ? "from the system?" : "from the group?"}
          </span>
        }
        confirmText={deleteType === "full" ? "Delete" : "Remove"}
        cancelText="Cancel"
        onConfirm={async () => {
          if (deleteType === "full") {
            await handleDeleteStudent(selectedStudent?._id || "");
          } else {
            if (!selectedStudent?.group?._id) {
              toast({
                title: "Error",
                description: "This student is not assigned to any group",
                variant: "destructive",
                duration: 1500,
              });
              return;
            }

            await DeleteStudentFromGroup(
              selectedStudent._id,
              selectedStudent.group._id,
            );
          }
        }}
      />
    </div>
  );
};

export default Students;
