import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import axios, { AxiosError } from "axios";
import { Quizzes_URLS } from "../Services/Urls";
import { toast } from "@/hooks/use-toast";
import type { Quiz } from "@/Interfaces/QuizzesInterfaces";
import {
  BookOpen,
  CircleCheckBig,
  ClipboardListIcon,
  ClockIcon,
  Eye,
  Plus,
  StarIcon,
  Trash2,
  Users,
  XCircleIcon,
} from "lucide-react";
import OrbitLoader from "../Shared_Components/OrbitLoader";
import { useNavigate } from "react-router-dom";
import QuizzesData from "./QuizzesData";
import { DeleteConfirmation } from "../Shared_Components/DeleteConfirmation";
import QuizModal from "./QuizModal";
import { useAuth } from "../Context/AuthContext";
import JoinQuizModal from "./JoinQuizModal";
const QuizzesList = () => {
  const { user } = useAuth();
  const userRole = user?.role || "";
  const [loadingCompleted, setLoadingCompleted] = useState(true);
  const [loadingIncoming, setLoadingIncoming] = useState(true);
  const [lastFiveCompleted, setlastFiveComplete] = useState<Quiz[]>([]);
  const [FirstFiveIncomming, setFirstFiveIncomming] = useState<Quiz[]>([]);
  const [openQuizData, setOpenQuizData] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const Navigate = useNavigate();
  console.log("lastFiveCompleted", lastFiveCompleted);
  // GetlastFiveCompleted
  const GetLastFiveCompleted = async () => {
    setLoadingCompleted(true);
    try {
      const res = await axios.get(Quizzes_URLS.LAST_FIVE_COMPELETE, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoadingCompleted(false);
      setlastFiveComplete(res.data);
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
    }
  };
  // GetfirstFiveIncomming
  const GetFirstFiveIncomming = async () => {
    setLoadingIncoming(true);
    try {
      const res = await axios.get(Quizzes_URLS.FIRST_FIVE_INCOMMING, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoadingIncoming(false);
      setFirstFiveIncomming(res.data);
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
    }
  };

  const hadeldeleteQuiz = async (quizId: string) => {
    console.log("Deleting Question with ID:", quizId);
    if (quizId) {
      try {
        await axios.delete(Quizzes_URLS.DELETE_QUIZ(quizId), {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setFirstFiveIncomming((prev) =>
          prev.filter((quiz) => quiz._id !== quizId),
        );

        toast({
          title: `Quiz of id ${quizId} deleted Successfully`,
          duration: 1500,
        });
      } catch (error) {
        let description = "Failed to delete Question";
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
        setDeleteOpen(false);
      }
    }
  };
  useEffect(() => {
    GetLastFiveCompleted();
    GetFirstFiveIncomming();
  }, []);
  return (
    <div className="container mx-auto p-7">
      <div className="flex gap-4 mb-4">
        {userRole !== "Student" ? (
          <>
            <div
              className="group w-48 h-44 bg-gray-800 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 hover:scale-105 hover:border hover:border-gray-600/50"
              onClick={() => setOpenQuizData(true)}
            >
              <div className="bg-gray-700/20 p-4 rounded-lg transition text-white group-hover:bg-gray-700/60">
                <Plus />
              </div>
              <h1 className="text-white font-bold text-md">Create New Quiz</h1>
              <p className="text-gray-300 text-sm">
                Set Up Interactive Quizzes
              </p>
            </div>

            <div
              className="group w-48 h-44 bg-gray-800 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 hover:scale-105 hover:border hover:border-gray-600/50 hover:cursor-pointer"
              onClick={() => Navigate("/dashboard/questions")}
            >
              <div className="bg-gray-700/20 p-4 rounded-lg transition text-white group-hover:bg-gray-700/60">
                <BookOpen />
              </div>
              <h1 className="text-white font-bold text-md">Question Bank</h1>
              <p className="text-gray-300 text-sm">Manage Your Questions</p>
            </div>
          </>
        ) : (
          <div
            className="group w-60 h-44 bg-gray-800 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 hover:scale-105 hover:border hover:border-gray-600/50 hover:cursor-pointer"
            onClick={() => setOpenJoinModal(true)}
          >
            <div className="bg-gray-700/20 p-4 rounded-lg transition text-white group-hover:bg-gray-700/60">
              <Users />
            </div>
            <h1 className="text-white font-bold text-lg">Join Quiz</h1>
            <p className="text-gray-300 text-sm">
              Enter a quiz code to participate
            </p>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-4 text-[#111827]">
        Completed Quizzes
      </h2>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-[300px]">
        {loadingCompleted ? (
          <div className="col-span-full flex justify-center items-center h-64 bg-white shadow-md rounded-lg">
            <OrbitLoader size={60} />
          </div>
        ) : (
          lastFiveCompleted.map((Quiz) => (
            <Card className="w-full bg-gray-800 text-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-xl">{Quiz.title}</p>

                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-900 border-2 border-red-700 text-[#f8b4b4] text-sm font-medium">
                    <CircleCheckBig className="w-4 h-4" />
                    {Quiz.status}
                  </div>
                </div>

                <div className="flex justify-start mt-1">
                  <div className="bg-gray-700 text-gray-300 rounded px-2 py-1 inline-block font-medium">
                    Code: {Quiz.code}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription>
                  <p className="text-gray-300 mb-3">{Quiz.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-gray-300">
                    {/* Duration */}
                    <div className="flex items-center gap-2  p-3 rounded">
                      <ClockIcon className="w-5 h-5 text-blue-600" />
                      <p className="font-medium">{Quiz.duration} minutes</p>
                    </div>

                    {/* Participants */}
                    <div className="flex items-center gap-2  p-3 rounded">
                      <Users className="w-5 h-5 text-green-600" />
                      <p className=" font-medium">
                        {Quiz.participants} participants
                      </p>
                    </div>

                    {/* Score per question */}
                    <div className="flex items-center gap-2  p-3 rounded">
                      <StarIcon className="w-5 h-5 text-yellow-600" />
                      <p className=" font-medium">
                        {Quiz.score_per_question} pts/question
                      </p>
                    </div>

                    {/* Questions number */}
                    <div className="flex items-center gap-2 p-3 rounded">
                      <ClipboardListIcon className="w-5 h-5 text-purple-600" />
                      <p className=" font-medium">
                        {Quiz.questions_number} questions
                      </p>
                    </div>
                  </div>
                </CardDescription>
                <div className="flex justify-between items-center mt-3">
                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium
                      ${
                        Quiz.difficulty === "easy"
                          ? "bg-green-900 border-green-700 text-green-200"
                          : Quiz.difficulty === "medium"
                            ? "bg-yellow-900 border-yellow-700 text-yellow-200"
                            : Quiz.difficulty === "hard"
                              ? "bg-red-900 border-red-700 text-red-200"
                              : "bg-gray-900 border-gray-700 text-gray-200"
                      }`}
                  >
                    {Quiz.difficulty}
                  </div>
                  <p className="font-light">Type:{Quiz.type}</p>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-1 text-sm text-left border-t border-gray-600 pt-2">
                <div className="flex items-center gap-1 justify-start w-full text-gray-400">
                  <ClockIcon className="w-4 h-4" />
                  <span className="font-semibold">Scheduled:</span>{" "}
                  {new Date(Quiz.schadule).toLocaleString()}
                </div>
                <div className="flex items-center gap-1 justify-start w-full text-gray-400">
                  <XCircleIcon className="w-4 h-4" />
                  <span className="font-semibold">Closed:</span>{" "}
                  {new Date(Quiz.closed_at).toLocaleString()}
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      {userRole !== "Student" && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-[#111827] mt-10">
            Incoming Quizzes
          </h2>
          <div className=" shadow-lg rounded-xl overflow-hidden">
            {loadingIncoming ? (
              <div className="flex justify-center items-center h-40 bg-white shadow-md rounded-lg">
                <OrbitLoader size={40} />
              </div>
            ) : (
              <table className="w-full border  border-collapse table-fixed text-white">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className=" px-4 py-4 text-left w-1/5">Title</th>
                    <th className=" px-4 py-4 text-left w-1/5">Description</th>
                    <th className=" px-4 py-4 text-left w-1/5">Code</th>
                    <th className=" px-4 py-4 text-left w-1/5">Status</th>
                    <th className=" px-4 py-4 text-left w-1/5">Difficulty</th>
                    <th className=" px-4 py-4 text-left w-1/5">Schedule</th>
                    <th className=" px-4 py-4 text-left w-1/5">Actions</th>
                  </tr>
                </thead>

                <tbody className="bg-gray-800 ">
                  {FirstFiveIncomming.map((quiz) => (
                    <tr key={quiz._id} className=" transition-colors">
                      <td className=" px-4 py-4 font-bold">{quiz.title}</td>
                      <td className=" px-4 py-4 text-sm">{quiz.description}</td>
                      <td className=" px-4 py-2 text-sm">{quiz.code}</td>
                      <td className="px-4 py-2 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-semibold ${
                            quiz.status === "open"
                              ? "bg-green-800 text-white"
                              : quiz.status === "closed"
                                ? "bg-red-800 text-white"
                                : "bg-gray-800 text-white"
                          }`}
                        >
                          {quiz.status}
                        </span>
                      </td>
                      {/* Difficulty with color */}
                      <td className=" px-4 py-2  text-sm">
                        <span
                          className={`px-2 py-1 rounded-full  text-sm font-semibold ${
                            quiz.difficulty === "easy"
                              ? "bg-green-800 text-white"
                              : quiz.difficulty === "medium"
                                ? "bg-yellow-800 text-white"
                                : quiz.difficulty === "hard"
                                  ? "bg-red-800 text-white"
                                  : "bg-gray-500"
                          }`}
                        >
                          {quiz.difficulty}
                        </span>
                      </td>

                      {/* Schedule */}
                      <td className=" px-4 py-2 text-sm">
                        {new Date(quiz.schadule).toLocaleString()}
                      </td>

                      {/* Actions */}
                      <td className=" px-4 py-2 ">
                        <div className="inline-flex  gap-4 w-full">
                          <Eye
                            size={24}
                            className="text-blue-600 cursor-pointer transition-all duration-200 hover:text-blue-800 hover:scale-110"
                            onClick={() => {
                              setSelectedQuiz(quiz);
                              setOpenModal(true);
                            }}
                          />
                          <Trash2
                            size={24}
                            className="text-red-600 cursor-pointer transition-all duration-200 hover:text-red-800 hover:scale-110"
                            onClick={() => {
                              setSelectedQuiz(quiz);
                              setDeleteOpen(true);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
      <QuizzesData
        openQuizData={openQuizData}
        setOpenQuizData={setOpenQuizData}
        refreshQuizzes={GetFirstFiveIncomming}
      />
      {/* DeleteConfirmation */}
      <DeleteConfirmation
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Quiz"
        description={`Are you sure you want to delete the Quiz "${selectedQuiz?.title}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={async () => {
          await hadeldeleteQuiz(selectedQuiz?._id || "");
        }}
      />
      {/* StudentModal */}
      <QuizModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedQuiz={selectedQuiz}
      />
      <JoinQuizModal
        isOpen={openJoinModal}
        setIsOpen={setOpenJoinModal}
        onJoined={() => console.log("Quiz joined!")}
      />
    </div>
  );
};

export default QuizzesList;
