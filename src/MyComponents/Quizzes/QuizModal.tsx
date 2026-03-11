import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { QuizModalProps } from "@/Interfaces/QuizzesInterfaces";
import {
  Award,
  BookOpen,
  CalendarIcon,
  Clock,
} from "lucide-react";
const QuizModal = ({
  openModal,
  setOpenModal,
  selectedQuiz,
}: QuizModalProps) => {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="max-h-[650px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Quiz Details</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4 bg-blue-600 text-white p-6 rounded-t-lg">
          <div className="flex gap-2 items-start  ">
            <BookOpen className="w-8 h-8 text-white mt-1" />

            <div>
              <h3 className="font-bold text-2xl ">{selectedQuiz?.title}</h3>
              <p className="text-md text-white mt-2">
                Quiz Code: {selectedQuiz?.code}
              </p>
            </div>
          </div>

          <p className="text-md text-white mt-2">{selectedQuiz?.description}</p>
        </div>
        <div className="flex gap-5 mt-4 justify-start px-10">
          <div className="flex items-center bg-blue-100 text-blue-700 p-5 rounded-lg shadow flex-1">
            <Clock className="w-6 h-6 mr-3" />
            <div>
              <p className="font-semibold text-sm">Duration</p>
              <p className="text-md font-bold">
                {selectedQuiz?.duration} minutes
              </p>
            </div>
          </div>

          <div className="flex items-center bg-green-100 text-green-700 p-5 rounded-lg shadow flex-1">
            <Award className="w-6 h-6 mr-3" />
            <div>
              <p className="font-semibold text-sm">Total Score</p>
              <p className="text-md font-bold">
                {selectedQuiz?.score_per_question &&
                selectedQuiz?.questions_number
                  ? selectedQuiz.score_per_question *
                    selectedQuiz.questions_number
                  : 0}
              </p>
            </div>
          </div>

          <div className="flex items-center bg-purple-100 text-purple-700 p-5 rounded-lg shadow flex-1">
            <BookOpen className="w-6 h-6 mr-3" />
            <div>
              <p className="font-semibold text-sm">Questions</p>
              <p className="text-md font-bold">
                {selectedQuiz?.questions_number}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4 px-10">
          {/* Oval 1 - Open */}
          <div className="flex items-center justify-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
            {selectedQuiz?.status}
          </div>

          {/* Oval 2 - Easy */}
          <div className="flex items-center justify-center px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
            {selectedQuiz?.difficulty}
          </div>

          {/* Oval 3 - FE */}
          <div className="flex items-center justify-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold">
            {selectedQuiz?.type}
          </div>
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow w-full max-w-md flex items-center gap-3 mx-10">
          <CalendarIcon className="w-6 h-6 text-gray-600" />
          <div>
            <p className="text-sm font-medium text-gray-600">
              Scheduled Date & Time
            </p>
            <p className="text-md font-bold text-gray-800">
              {selectedQuiz?.schadule
                ? new Date(selectedQuiz.schadule).toLocaleString()
                : "Not Scheduled"}{" "}
            </p>
          </div>
        </div>
        {/* Question Header */}
        <div className="flex justify-between items-center ">
          <p className="font-bold text-gray-700 text-xl">
            Questions ({selectedQuiz?.questions_number})
          </p>
        </div>
        <div className=" p-4 bg-white rounded-lg shadow w-full max-w-xl">
          {/* Options */}
          <div className="flex flex-col gap-6 mt-2">
            {selectedQuiz?.questions.map((question, index) => (
              <div
                key={question._id}
                className="p-4 bg-gray-100 rounded shadow"
              >
                <div className="flex items-center gap-2 mb-2 text-gray-800 font-semibold">
                  <span className="bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-white font-semibold">
                    {index + 1}
                  </span>
                  <span>{question.title}</span>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  {Object.entries(question.options)
                    .filter(([key]) => key !== "_id")
                    .map(([key, value]) => (
                      <button
                        key={key}
                        className="text-left px-4 py-2 bg-white border border-gray-300 rounded hover:bg-blue-100 transition"
                      >
                        <span className="font-semibold mr-2">{key}.</span>{" "}
                        {value}
                      </button>
                    ))}
                </div>

                <p className="mt-2 text-gray-600 text-sm">
                  Points: {selectedQuiz.score_per_question}
                </p>
              </div>
            ))}
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

export default QuizModal;
