import axios from "axios";
import { Questions_URLS } from "../Services/Urls";
import { useEffect, useState } from "react";
import type { Question } from "../../Interfaces/QuestionsInterfaces";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  ChevronDown,
  CirclePlus,
  Eye,
  Plus,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
const QuestionsList = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  console.log(questions);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionPerPage, setQuestionsPerPage] = useState(6);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  const handleDifficultySelect = (value: string) => {
    setSelectedDifficulty(value); // حفظ القيمة
    setCurrentPage(1); // إعادة الصفحة الأولى بعد الفلترة
  };
  const handleTypeSelect = (value: string) => {
    setSelectedType(value);
    setCurrentPage(1);
  };

  // GetAllQuestions
  const getAllQuestions = async () => {
    try {
      const res = await axios.get(Questions_URLS.GET_All_QUESTIONS, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setQuestions(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(
          "Axios Error:",
          error.response?.data?.message || error.message,
        );
      } else {
        console.log("Unknown Error:", error);
      }
    }
  };
  useEffect(() => {
    getAllQuestions();
  }, []);
  // filteredStudents dedend on name
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.title.includes(searchValue.toLowerCase());
    const matchesDifficulty = selectedDifficulty
      ? question.difficulty === selectedDifficulty
      : true;
    const matchesType = selectedType ? question.type === selectedType : true;
    return matchesSearch && matchesDifficulty && matchesType;
  });
  // pagination on filtered data
  const indexOfLastStudent = currentPage * questionPerPage;
  const indexOfFirstStudent = indexOfLastStudent - questionPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  // calculate total pages based on filtered students
  const totalPages = Math.ceil(filteredQuestions.length / questionPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="container p-6 mx-auto">
        <div className="flex justify-between items-center bg-black px-4 py-[30px] rounded-lg shadow">
          <h2 className="text-white text-3xl font-bold">Bank Question</h2>

          <Button
            className="group flex items-center gap-3 bg-gray-800 text-white rounded-full px-6 py-6 text-lg font-semibold shadow-md shadow-gray-700
                   hover:bg-gray-700 hover:scale-105 transition-all duration-200"
          >
            <CirclePlus className="w-8 h-8 transition-transform duration-200 group-hover:rotate-90" />
            Add Question
          </Button>
        </div>
      </div>
      <div className="container p-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 bg-white p-4 rounded-lg shadow">
          {/* Search input */}
          <div className="flex-[2] flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Search by Title
            </label>
            <Input
              type="text"
              placeholder="Search Questions..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Dropdowns */}
          <div className="flex flex-1 gap-4 flex-col lg:flex-row">
            {/* Dropdown 1 */}
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Difficulty Level
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between h-[38px]"
                  >
                    {selectedDifficulty || "All Difficulties"}{" "}
                    <ChevronDown className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  <DropdownMenuItem
                    className="flex gap-3"
                    onClick={() => handleDifficultySelect("")}
                  >
                    All Difficulties
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex gap-3"
                    onClick={() => handleDifficultySelect("easy")}
                  >
                    easy
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex gap-3 "
                    onClick={() => handleDifficultySelect("hard")}
                  >
                    hard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex gap-3"
                    onClick={() => handleDifficultySelect("medium")}
                  >
                    medium
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Dropdown 2 */}
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Question Type
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between h-[38px]"
                  >
                    {selectedType || "All Types"}
                    <ChevronDown className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  <DropdownMenuItem
                    className="flex gap-3"
                    onClick={() => handleTypeSelect("")}
                  >
                    All Types
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex gap-3"
                    onClick={() => handleTypeSelect("BE")}
                  >
                    BE
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex gap-3 "
                    onClick={() => handleTypeSelect("FE")}
                  >
                    FE
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex gap-3"
                    onClick={() => handleTypeSelect("DO")}
                  >
                    DO
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full border border-gray-300 border-collapse table-fixed">
            <thead className="bg-black text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-4 text-left w-1/5">
                  Title
                </th>
                <th className="border border-gray-300 px-4 py-4 text-left w-1/5">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-4 text-left w-1/5">
                  Difficulty Level
                </th>
                <th className="border border-gray-300 px-4 py-4 text-left w-1/5">
                  Type
                </th>
                <th className="border border-gray-300 px-4 py-4 text-center w-1/5">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {currentQuestions.map((question) => (
                <tr
                  key={question._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border border-gray-300 px-4 py-4 truncate">
                    {question.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-4 truncate">
                    {question.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full  text-sm font-semibold ${
                        question.difficulty === "easy"
                          ? "bg-green-100 text-green-800"
                          : question.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : question.difficulty === "hard"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-500"
                      }`}
                    >
                      {question.difficulty}
                    </span>
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
                      {question.type}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="inline-flex items-center justify-center gap-4 w-full">
                      <Eye size={24} className="text-blue-600" />
                      <SquarePen size={24} className="text-yellow-600" />
                      <Trash2 size={24} className="text-red-600" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center text-gray-600 mt-4 italic">
          Showing {currentQuestions.length} of {filteredQuestions.length}{" "}
          questions
        </p>
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
                    <PaginationLink
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default QuestionsList;
