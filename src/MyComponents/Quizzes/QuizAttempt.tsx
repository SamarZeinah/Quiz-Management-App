import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Quizzes_URLS } from "../Services/Urls";
import { toast } from "@/hooks/use-toast";
import OrbitLoader from "../Shared_Components/OrbitLoader";

interface Question {
  _id: string;
  title: string;
  options: Record<string, string>;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions_number: number;
  questions: Question[];
  duration: number;
  score_per_question: number;
  difficulty: string;
  type: string;
}

export default function QuizAttempt() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    score: number;
    totalScore: number;
  } | null>(null);

  // Fetch quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) return;
      setLoading(true);
      try {
        const res = await axios.get(
          Quizzes_URLS.GET_QUIZ_WITHOUT_ANSWERS(quizId),
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        setQuiz(res.data.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load quiz",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  // Handle option select
  const handleSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!quiz) return;
    const payload = {
      answers: Object.entries(answers).map(([question, answer]) => ({
        question,
        answer,
      })),
    };
    setSubmitting(true);
    try {
      const res = await axios.post(
        Quizzes_URLS.SUBMIT_QUIZ(quiz._id),
        payload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const score = res.data.data.score;
      const totalScore = quiz.questions.length * quiz.score_per_question;
      setQuizResult({ score, totalScore });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to submit quiz",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <OrbitLoader size={60} />
      </div>
    );
  }

  // Result Screen
  if (quizResult && quiz) {
    const { score, totalScore } = quizResult;
    const percentage = Math.round((score / totalScore) * 100);

    const getMessage = () => {
      if (percentage === 100) return "Excellent! Outstanding Performance!";
      if (percentage >= 80) return "Great job! You did very well!";
      if (percentage >= 50) return "Good effort! Keep practicing!";
      return "You can do better! Try again!";
    };

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md flex flex-col items-center gap-4 max-h-[90vh] overflow-y-auto">
          
          {/* Quiz Info */}
          <h1 className="text-2xl font-bold text-gray-800 text-center">{quiz.title}</h1>
          {quiz.description && (
            <p className="text-gray-600 text-center">{quiz.description}</p>
          )}

          {/* Score Section */}
          <div className="flex flex-col items-center gap-2 mt-4">
            <div className="text-5xl text-orange-600">🏆</div>
            <div className="text-3xl font-bold">{score} / {totalScore}</div>
            <div className="text-gray-600">{percentage}%</div>
            <p className="text-orange-700 font-medium text-center">{getMessage()}</p>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2 mb-4">
              <div
                className="h-2 bg-orange-600 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2 w-full">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate("/dashboard/quizzes")}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Join Another Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Questions
  if (!quiz) return <div>Quiz not found.</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
      <p className="mb-6 text-gray-500">
        {quiz.questions_number} Questions | Duration: {quiz.duration} min | Difficulty: {quiz.difficulty}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quiz.questions.map((q, index) => (
          <div key={q._id} className="p-4 border rounded-lg bg-gray-50">
            <h2 className="font-semibold mb-2">Q{index + 1}: {q.title}</h2>
            <div className="flex flex-col space-y-2">
              {Object.entries(q.options)
                .filter(([key]) => key !== "_id")
                .map(([key, value]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={q._id}
                      value={key}
                      checked={answers[q._id] === key}
                      onChange={() => handleSelect(q._id, key)}
                      className="accent-green-600"
                    />
                    <span className="text-gray-800 font-medium">{key}: {value}</span>
                  </label>
                ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className={`mt-6 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}