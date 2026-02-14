import { useEffect, useState } from "react";
import { Students_URLS } from "../Services/Urls";
import axios from "axios";
import { CircleCheckBig, CircleX, LayoutGrid, List } from "lucide-react";
import PacmanLoader from "react-spinners/PacmanLoader";
import type {Student} from "@/Interfaces/StudentsInterfaces";
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


const Students = () => {
  const [studentsGroup, setStudentsGroup] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(6);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
const [searchValue,setSearchValue]=useState<string>("");
// filteredStudents dedend on name
const filteredStudents = studentsGroup.filter((student) => {
  const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
  return fullName.includes(searchValue.toLowerCase());
});

// pagination on filtered data
const indexOfLastStudent = currentPage * studentsPerPage;
const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

// calculate total pages based on filtered students
const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
  className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${
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
                  ? "border rounded-lg p-6 text-center shadow hover:shadow-lg transition bg-white"
                  : "border rounded-lg p-4 flex items-center gap-4 shadow hover:shadow-lg transition bg-white"
              }
            >
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
                  Group: {student.group.name}
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
    </div>
  );
};

export default Students;
