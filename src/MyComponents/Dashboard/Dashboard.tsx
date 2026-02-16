import type { QuizzesResponse } from "@/Interfaces/DashboardInterfaces";
import axios from "axios";
import { Quizzes_URLS, Students_URLS } from "../Services/Urls";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Student } from "@/Interfaces/StudentsInterfaces";
import OrbitLoader from "../Shared_Components/OrbitLoader";
import StudentModal from "../Students/StudentsModal";
export default function Dashboard() {
  const [FirstFiveIncommingQuizzes, setFirstFiveIncommingQuizzes] =
    useState<QuizzesResponse>([]);
  const [TopFiveStudents, setTopFiveStudents] = useState<Student[]>([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [openModal, setOpenModal] = useState(false);
const isTopFive = TopFiveStudents.some(s => s._id === selectedStudent?._id);
  const colors = [
    { bg: "bg-green-100", text: "text-green-800" },
    { bg: "bg-blue-100", text: "text-blue-800" },
    { bg: "bg-red-100", text: "text-red-800" },
    { bg: "bg-yellow-100", text: "text-yellow-800" },
    { bg: "bg-purple-100", text: "text-purple-800" },
  ];

  function getColor(index: number) {
    return colors[index % colors.length];
  }

  const Navigate = useNavigate();
  // getFirstFiveIncommingQuizzes
  const getFirstFiveIncommingQuizzes = async () => {
    try {
      setLoadingQuizzes(true);
      const response = await axios.get(
        Quizzes_URLS.GET_FIRSTFIVEINCOMMING_QUIZZES,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      setFirstFiveIncommingQuizzes(response.data);
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
      setLoadingQuizzes(false);
    }
  };
  // getTopFivestudents
  const getTopFiveStudents = async () => {
    setLoadingStudents(true);
    try {
      const response = await axios.get(Students_URLS.GET_TOP_FIVE_STUDENTS, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTopFiveStudents(response.data);
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
      setLoadingStudents(false);
    }
  };
  useEffect(() => {
    getFirstFiveIncommingQuizzes();
    getTopFiveStudents();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Left Side */}
      <div className="relative">
        <h2 className="text-xl font-semibold mb-4">Upcoming 5 Quizzes</h2>

        {loadingQuizzes ? (
          <div className="flex justify-center items-center h-40 bg-white shadow-md rounded-lg">
            <OrbitLoader size={40} />
          </div>
        ) : (
          <div className="space-y-4">
            {FirstFiveIncommingQuizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="bg-white shadow-md rounded-lg p-4 flex items-start justify-between
                     transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">{quiz.title}</h3>

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">
                      Scheduled:
                    </span>{" "}
                    Saturday, February 28, 2026 at 05:34 PM
                  </p>

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">
                      Enrolled:
                    </span>{" "}
                    {quiz.participants} students
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                  {quiz.status}
                </span>
              </div>
            ))}
          </div>
        )}

        <p
          className="text-lg italic font-semibold mb-4 flex items-center gap-2 mt-4 cursor-pointer group"
          onClick={() => Navigate("/dashboard/students")}
        >
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            View Quiz directory
          </span>
          <MoveRight className="transition-transform duration-300 group-hover:translate-x-2" />
        </p>
      </div>

      {/* Right Side */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Top 5 Students</h2>
        {loadingStudents ? (
          <div className="flex justify-center items-center h-40 bg-white shadow-md rounded-lg">
            <OrbitLoader size={40} />
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-4 space-y-3 ">
            {TopFiveStudents.map((student, index) => (
              <div
                key={student._id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-bold capitalize 
                    ${getColor(index).bg} ${getColor(index).text}`}
                  >
                    {student.first_name[0]}
                    {student.last_name[0]}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {student.first_name} {student.last_name}
                    </span>
                    <span className="text-sm text-gray-500">
                      Class rank:{" "}
                      {typeof student.group === "object"
                        ? student.group.name
                        : student.group}{" "}
                      | Average score:{(student.avg_score ?? 0).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="text-gray-400 cursor-pointer"
                onClick={() => {
                      setSelectedStudent(student);
                      setOpenModal(true);
                    }}>
                  <MoveRight className="bg-black rounded-full text-white p-1" />
                </div>
              </div>
            ))}
          </div>
        )}
        <p
          className="text-lg italic font-semibold mb-4 flex items-center gap-2 mt-4 cursor-pointer group"
          onClick={() => Navigate("/dashboard/students")}
        >
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            View All Students
          </span>
          <MoveRight className="transition-transform duration-300 group-hover:translate-x-2" />
        </p>
      </div>
      {/* StudentModal */}
      <StudentModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedStudent={selectedStudent}
          isTopFive={isTopFive}
      />
    </div>
    
  );
   
}
