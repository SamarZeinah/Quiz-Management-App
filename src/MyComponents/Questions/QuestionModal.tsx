import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import type { QuestionModalProps } from "@/Interfaces/QuestionsInterfaces";
const QuestionModal = ({
  openModal,
  setOpenModal,
  selectedQuestion,
  isTopFive,
}: QuestionModalProps) => {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="max-h-[650px] overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle>Question Details</DialogTitle>
          {!isTopFive && (
            <DialogDescription>
              {" "}
              View question details and its options
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
              Question
            </h3>
            <div className="grid gap-6">
              <div className="mb-1">
                <h4 className="text-gray-500 text-md font-medium">
                  Title: {selectedQuestion?.title}
                </h4>
              </div>

              <div className="mb-1">
                <h4 className="text-gray-500 text-md font-medium">
                  Description: {selectedQuestion?.description}
                </h4>
              </div>
            </div>
          </div>

          <div className="bg-white px-5 rounded-lg">
            <h3 className="font-bold text-lg ">Options</h3>

            <div className="flex flex-col gap-3">
              {selectedQuestion?.options &&
                Object.entries(selectedQuestion.options)
                  .filter(([key]) => key !== "_id")
                  .map(([key, value], index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center p-3 rounded-lg border transition
              ${
                selectedQuestion.answer === key
                  ? "bg-green-100 border-green-400"
                  : "bg-gray-50"
              }`}
                    >
                      <div className="flex gap-3 items-center">
                        <span className="font-bold text-lg">{key}</span>
                        <span>{value}</span>
                      </div>

                      {selectedQuestion.answer === key && (
                        <span className="text-green-600 font-semibold text-sm">
                          Correct Answer
                        </span>
                      )}
                    </div>
                  ))}
            </div>
          </div>
          <div className="bg-green-50 p-5 rounded-lg">
            <div className="grid grid-cols-2 gap-6">
              <div className="mb-1">
                <h4 className="text-gray-500 text-sm font-medium">
                  Difficulty
                </h4>
                <p className="text-black font-semibold">
                  {selectedQuestion?.difficulty}
                </p>
              </div>

              <div className="mb-1">
                <h4 className="text-gray-500 text-sm font-medium">Points</h4>
                <p className="text-black font-semibold">
                  {selectedQuestion?.points}
                </p>
              </div>

              <div className="mb-1">
                <h4 className="text-gray-500 text-sm font-medium">Type</h4>
                <p className="text-black font-semibold">
                  {selectedQuestion?.type}
                </p>
              </div>

              <div className="mb-1">
                <h4 className="text-gray-500 text-sm font-medium">Status</h4>
                <p className="text-black font-semibold">
                  {selectedQuestion?.status}
                </p>
              </div>
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

export default QuestionModal;
