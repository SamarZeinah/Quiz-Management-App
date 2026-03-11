import axios from "axios";
import { useState, useEffect } from "react";
import { Quizzes_URLS } from "../Services/Urls";
import type { Quiz } from "@/Interfaces/DashboardInterfaces";
import OrbitLoader from "../Shared_Components/OrbitLoader";
import type { QuizResultsResponse } from "@/Interfaces/QuizzesInterfaces";

const Results = () => {
  const [Results, setResults] = useState<QuizResultsResponse>([]);
  const [Quizzes, setQuizzes] = useState<Quiz[]>([]);

  const [loadingResults, setLoadingResults] = useState(true);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);

  const getAllResults = async () => {
    try {
      setLoadingResults(true);
      const res = await axios.get(Quizzes_URLS.GET_ALL_RESULTS, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setResults(res.data);
    } catch (error) {
      console.log("Error fetching quizzes:", error);
    } finally {
      setLoadingResults(false);
    }
  };
  const getAllQuizzes = async () => {
    try {
      setLoadingQuizzes(true);
      const res = await axios.get(Quizzes_URLS.GET_ALL_QUIZZES, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setQuizzes(res.data);
    } catch (error) {
      console.log("Error fetching quizzes:", error);
    } finally {
      setLoadingQuizzes(false);
    }
  };
  useEffect(() => {
    getAllResults();
    getAllQuizzes();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#111827]">All Result</h2>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden mt-4">
        <table className="w-full border border-gray-300 border-collapse table-fixed">
          <thead className="bg-black text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-4 text-left w-1/5">
                Quiz Title
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
              <th className="border border-gray-300 px-4 py-4 text-start w-1/5">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-4 text-start w-1/5">
                Duration
              </th>
              <th className="border border-gray-300 px-4 py-4 text-start w-1/5">
                Score/Q
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {loadingResults ? (
              <tr>
                <td colSpan={8}>
                  <div className="flex justify-start items-start h-64">
                    <OrbitLoader size={60} />
                  </div>
                </td>
              </tr>
            ) : (
              Results.map((item) => (
                <tr
                  key={item.quiz._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border border-gray-300 px-4 py-4 truncate">
                    {item.quiz.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-4 truncate">
                    {item.quiz.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        item.quiz.difficulty === "easy"
                          ? "bg-green-100 text-green-800"
                          : item.quiz.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.quiz.difficulty}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
                      {item.quiz.type}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-start">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        item.quiz.status === "open"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.quiz.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-start font-bold">
                    {item.quiz.duration} min
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-start font-bold">
                    {item.quiz.score_per_question} pts
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold my-4 text-[#111827]">All Quizzes</h2>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden mt-4">
        <table className="w-full border border-gray-300 border-collapse table-fixed">
          <thead className="bg-black text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-4 text-left w-1/5">
                Quiz Title
              </th>
              <th className="border border-gray-300 px-4 py-4 text-left w-1/5">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-4 text-left w-1/5">
                Difficulty
              </th>
              <th className="border border-gray-300 px-4 py-4 text-left w-1/5">
                Type
              </th>
              <th className="border border-gray-300 px-4 py-4 text-start w-1/5">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-4 text-start w-1/5">
                Schedule
              </th>
              <th className="border border-gray-300 px-4 py-4 text-start w-1/5">
                Duration
              </th>
              <th className="border border-gray-300 px-4 py-4 text-start w-1/5">
                Score/Q
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {loadingQuizzes ? (
              <tr>
                <td colSpan={7}>
                  <div className="flex justify-start items-start h-64">
                    <OrbitLoader size={60} />
                  </div>
                </td>
              </tr>
            ) : (
              Quizzes.map((quiz) => (
                <tr
                  key={quiz._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border border-gray-300 px-4 py-4 truncate">
                    {quiz.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-4 truncate">
                    {quiz.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        quiz.difficulty === "easy"
                          ? "bg-green-100 text-green-800"
                          : quiz.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {quiz.difficulty}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
                      {quiz.type}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-start">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        quiz.status === "open"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {quiz.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-start ">
                    {new Date(quiz.schadule).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-start font-bold">
                    {quiz.duration} min
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-start font-bold">
                    {quiz.score_per_question} pts
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;
