import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Quizzes_URLS } from "../Services/Urls";
import { useNavigate } from "react-router-dom";

interface JoinQuizModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onJoined?: () => void; 
}

const JoinQuizModal = ({ isOpen, setIsOpen, onJoined }: JoinQuizModalProps) => {
  const [quizCode, setQuizCode] = useState("");
  const [loading, setLoading] = useState(false);
const Navigate = useNavigate();
 
const handleJoin = async () => {
  if (!quizCode.trim()) {
    toast({
      title: "Error",
      description: "Please enter a quiz code",
      variant: "destructive",
    });
    return;
  }

  setLoading(true);
  try {
    const res = await axios.post(
      Quizzes_URLS.JOIN_QUIZ,
      { code: quizCode },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    // جبت الـ quiz id من response
    const quizId = res.data.data.quiz;

    toast({
      title: "Joined Successfully",
      description: `You joined the quiz successfully!`,
      variant: "success",
    });

    // اقفل المودال ونظف الكود
    setIsOpen(false);
    setQuizCode("");
    onJoined?.();

    // روح مباشرة للصفحة اللي فيها الاسئلة
Navigate(`/dashboard/quiz/${quizId}`);
  } catch (error: any) {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Failed to join the quiz",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-white p-10 md:p-12 rounded-2xl w-80 sm:w-96 md:w-[500px] lg:w-[600px] mx-auto">
        <DialogHeader>
          <DialogTitle>Join Quiz</DialogTitle>
          <DialogDescription>
            Enter the quiz code to participate
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Input
            type="text"
            placeholder="Enter Quiz Code"
            value={quizCode}
            onChange={(e) => setQuizCode(e.target.value)}
            className="w-full p-4 md:p-5 rounded-md border border-gray-300 text-lg"
          />
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-4">
          <Button
            className="px-6 py-3 rounded-md bg-gray-300 text-gray-800 text-lg hover:bg-gray-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className={`px-6 py-3 rounded-md bg-green-600 text-white text-lg hover:bg-green-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleJoin}
            disabled={loading}
          >
            {loading ? "Joining..." : "Join"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JoinQuizModal;