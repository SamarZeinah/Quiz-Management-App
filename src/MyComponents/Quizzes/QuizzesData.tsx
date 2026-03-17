import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { QuizDataProps } from "@/Interfaces/QuizzesInterfaces";
import { Check, ChevronDown, CircleCheck, Clipboard } from "lucide-react";
import axios from "axios";
import { Groups_URLS, Quizzes_URLS } from "../Services/Urls";
import { useEffect, useState } from "react";
import type { GroupData } from "@/Interfaces/GroupInterfaces";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
const QuizzesData = ({
  openQuizData,
  setOpenQuizData,
  refreshQuizzes,
}: QuizDataProps) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      description: "",
      group: "",
      questions_number: 0,
      difficulty: "",
      type: "",
      schadule: "",
      duration: "",
      score_per_question: 0,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Quiz title is required"),
      description: Yup.string().required("Description is required"),
      group: Yup.string().required("Select Group Name"),
      questions_number: Yup.number().required("Question Number is required"),
      difficulty: Yup.string().required("Select difficulty"),
      type: Yup.string().required("Select category"),
      duration: Yup.number().required("duration is required"),
      score_per_question: Yup.number().required("score is required"),
    }),
    onSubmit: async (values) => {
      console.log("values", values);
      setIsSaving(true);
      try {
        
        const res = await axios.post(Quizzes_URLS.CREATE_QUIZ, values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        refreshQuizzes();
        toast({
          title: "Success",
          description: "Quiz created successfully",
          variant: "success",
          duration: 1500,
        });
        console.log("Created Quiz:", res.data);
        setOpenQuizData(false);
        setCreatedQuizCode(res.data.data.code);

        setShowSuccessModal(true);

        setOpenQuizData(false);

        formik.resetForm();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Axios Error:", error.response?.data);
          toast({
            title: "Error",
            description:
              error.response?.data?.message || "Something went wrong",
            variant: "destructive",
            duration: 1500,
          });
        } else {
          console.log("Unexpected Error:", error);
        }
      } finally {
        setIsSaving(false);
      }
    },
  });
  const [groups, setGroups] = useState<GroupData[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  const [time, setTime] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [createdQuizCode, setCreatedQuizCode] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const fetchGroupData = async () => {
    try {
      // setLoading(true);
      const res = await axios.get(Groups_URLS.GET_GROUPS, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setGroups(res.data);
      // setLoading(false);
      console.log("Groups Data:", res.data);
    } catch (error) {
      console.error("Failed to fetch groups:", error);
    }
  };
  useEffect(() => {
    fetchGroupData();
  }, []);
  return (
    <Dialog open={openQuizData} onOpenChange={setOpenQuizData}>
      <DialogContent className="max-h-[650px] overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle>Create Quize</DialogTitle>
          <DialogDescription>
            Fill in the information below to create a quiz
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium">
              Quiz Title
            </label>
            <input
              id="title"
              name="title"
              placeholder="Enter Question Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded px-2 py-1"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-sm">{formik.errors.title}</div>
            )}
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter Your Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded px-2 py-1"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm">
                {formik.errors.description}
              </div>
            )}
          </div>
          {/* Group Name  */}
          <div className="flex-1 flex flex-col">
            <label className="text-sm font-medium mb-1">Group Name</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex justify-between"
                >
                  {formik.values.group || "Select Group Name"}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                <DropdownMenuItem
                  key="placeholder"
                  onClick={() => formik.setFieldValue("group", "")}
                >
                  Select Group Name
                </DropdownMenuItem>
                {groups.map((group) => (
                  <DropdownMenuItem
                    key={group._id}
                    onClick={() => formik.setFieldValue("group", group.name)}
                  >
                    {group.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {formik.touched.group && formik.errors.group && (
              <div className="text-red-500 text-sm">{formik.errors.group}</div>
            )}
          </div>
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <label htmlFor="questions_number" className="text-sm font-medium">
                Questions Number
              </label>
              <input
                id="questions_number"
                name="questions_number"
                type="number"
                placeholder="Enter Number of Questions"
                value={formik.values.questions_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border rounded px-2 py-1"
              />
              {formik.touched.questions_number &&
                formik.errors.questions_number && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.questions_number}
                  </div>
                )}
            </div>
            {/* Difficulty */}
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium mb-1">Difficulty</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between"
                  >
                    {formik.values.difficulty || "Select Difficulty"}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                  <DropdownMenuItem
                    key="placeholder"
                    onClick={() => formik.setFieldValue("difficulty", "")}
                  >
                    Select difficulty
                  </DropdownMenuItem>

                  {["easy", "medium", "hard"].map((item) => (
                    <DropdownMenuItem
                      key={item}
                      onClick={() => formik.setFieldValue("difficulty", item)}
                    >
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {formik.touched.difficulty && formik.errors.difficulty && (
                <div className="text-red-500 text-sm">
                  {formik.errors.difficulty}
                </div>
              )}
            </div>
          </div>
          {/* Category */}
          <div className="flex-1 flex flex-col">
            <label className="text-sm font-medium mb-1">Quiz Type</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex justify-between"
                >
                  {formik.values.type || "Select Category"}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                {["BE", "FE", "DO"].map((item) => (
                  <DropdownMenuItem
                    key={item}
                    onClick={() => formik.setFieldValue("type", item)}
                  >
                    {item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {formik.touched.type && formik.errors.type && (
              <div className="text-red-500 text-sm">{formik.errors.type}</div>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Schedule</label>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {formik.values.schadule
                    ? new Date(formik.values.schadule).toLocaleString()
                    : "Pick a date"}
                  <CalendarIcon className="w-4 h-4" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    formik.values.schadule
                      ? new Date(formik.values.schadule)
                      : undefined
                  }
                  onSelect={(date) => {
                    if (!date) return;

                    const fullDate = new Date(date);
                    // خليه يحافظ على الوقت الحالي لو متسجل
                    if (formik.values.schadule) {
                      const currentTime = new Date(formik.values.schadule);
                      fullDate.setHours(currentTime.getHours());
                      fullDate.setMinutes(currentTime.getMinutes());
                    }
                    formik.setFieldValue("schadule", fullDate.toISOString());
                  }}
                />
                <input
                  type="time"
                  className="border rounded p-2 w-full mt-2"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                    if (!formik.values.schadule) return; // لو مفيش تاريخ محدد، متعملش حاجة
                    const [hours, minutes] = e.target.value.split(":");
                    const fullDate = new Date(formik.values.schadule);
                    fullDate.setHours(Number(hours));
                    fullDate.setMinutes(Number(minutes));
                    formik.setFieldValue("schadule", fullDate.toISOString());
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <label htmlFor="duration" className="text-sm font-medium">
                Duration (min)
              </label>
              <input
                id="duration"
                name="duration"
                type="number"
                placeholder="Enter duration"
                value={formik.values.duration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border rounded px-2 py-1"
              />
              {formik.touched.duration && formik.errors.duration && (
                <div className="text-red-500 text-sm">
                  {formik.errors.duration}
                </div>
              )}
            </div>

            <div className="flex-1">
              <label
                htmlFor="score_per_question"
                className="text-sm font-medium"
              >
                score
              </label>
              <input
                id="score_per_question"
                name="score_per_question"
                type="number"
                placeholder="Enter score_per_question"
                value={formik.values.score_per_question}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border rounded px-2 py-1"
              />
              {formik.touched.score_per_question &&
                formik.errors.score_per_question && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.score_per_question}
                  </div>
                )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenQuizData(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline"
              className="bg-green-600 text-white hover:bg-green-700 hover:text-white"
            >
              {isSaving ? "Create..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 md:p-12 rounded-2xl text-center shadow-xl relative max-w-md w-full">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
              <CircleCheck className="w-8 h-8 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Quiz Created Successfully!
            </h2>
            <p className="mb-6 text-gray-600 text-sm">
              Your quiz has been created. Share this code with participants:
            </p>

            <div className="flex items-center justify-between bg-gray-50 p-3 rounded border border-gray-200 mb-6">
              <span className="font-mono text-gray-800 select-all">
                {createdQuizCode}
              </span>
              <button
                className={`flex items-center gap-2 px-4 py-1 rounded-lg font-medium border shadow-lg transition-colors duration-200
          ${copied ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"}`}
                onClick={() => {
                  navigator.clipboard.writeText(createdQuizCode || "");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Clipboard className="w-4 h-4" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <button
              className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-md font-medium text-gray-700 transition-colors duration-200"
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default QuizzesData;
