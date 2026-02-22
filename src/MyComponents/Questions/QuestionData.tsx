// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Book, ChevronDown, Settings } from "lucide-react";
// import { useState } from "react";
// import type { QuestionDataProps } from "@/Interfaces/QuestionsInterfaces";
// import { Questions_URLS } from "../Services/Urls";
// import axios from "axios";
// import { toast } from "@/hooks/use-toast";

// const QuestionData = ({
//   openQuestionData,
//   setOpenQuestionData,
//   selectedQuestion,
//   onClose,
// }: QuestionDataProps) => {
//   const [questionTitle, setQuestionTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const [choices, setChoices] = useState({
//     A: "",
//     B: "",
//     C: "",
//     D: "",
//   });

//   const [correctAnswer, setCorrectAnswer] = useState("");
//   const [category, setCategory] = useState("");
//   const [difficulty, setDifficulty] = useState("");
//   const [isSaving, setIsSaving] = useState(false);
//   const handleChoiceChange = (option: "A" | "B" | "C" | "D", value: string) => {
//     setChoices((prev) => ({ ...prev, [option]: value }));
//   };

//   //CreateQuestion
//   const CreateQuestion = async () => {
//     setIsSaving(true);

// const payload = {
//   title: questionTitle,
//   description: description,
//   options: {
//     A: choices.A,
//     B: choices.B,
//     C: choices.C,
//     D: choices.D,
//   },
//   answer: correctAnswer,
//   difficulty: difficulty,
//   type: category,
// };
// console.log("payload",payload)
//     try {
//       await axios.post(Questions_URLS.CREATE_QUESTION, payload, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       toast({
//         title: "Question Created Successfully",
//         variant: "success",
//         duration: 1500,
//       });
//       onClose?.();
//       setOpenQuestionData(false);
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error?.response?.data?.message || "Something went wrong",
//         variant: "destructive",
//         duration: 1500,
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <Dialog open={openQuestionData} onOpenChange={setOpenQuestionData}>
//       <DialogContent className="max-h-[650px] overflow-y-auto scrollbar-thin">
//         <DialogHeader>
//           <DialogTitle>Create Question</DialogTitle>
//           <DialogDescription>
//             Fill in the information below to create a question
//           </DialogDescription>
//         </DialogHeader>

//         <div className="flex flex-col gap-4">
//           {/* Question Title */}
//           <div>
//             <label htmlFor="questionTitle" className="text-sm font-medium">
//               Question Title
//             </label>
//             <input
//               id="questionTitle"
//               placeholder="Enter Question Title"
//               value={questionTitle}
//               onChange={(e) => setQuestionTitle(e.target.value)}
//               className="w-full border rounded px-2 py-1"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label htmlFor="description" className="text-sm font-medium">
//               Description
//             </label>
//             <textarea
//               id="description"
//               placeholder="Enter Your Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full border rounded px-2 py-1"
//             />
//           </div>

//           {/* Options */}
//           <div className="flex flex-col gap-3">
//             <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
//               <Book className="w-5 h-5 text-blue-600" />
//               Answer Options
//             </h3>

//             {/* Row 1 */}
//             <div className="flex gap-4">
//               <div className="flex-1">
//                 <label className="text-sm font-medium">Option A</label>
//                 <input
//                   type="text"
//                   placeholder="Enter Option A"
//                   value={choices.A}
//                   onChange={(e) => handleChoiceChange("A", e.target.value)}
//                   className="w-full border rounded px-2 py-1"
//                 />
//               </div>

//               <div className="flex-1">
//                 <label className="text-sm font-medium">Option B</label>
//                 <input
//                   type="text"
//                   placeholder="Enter Option B"
//                   value={choices.B}
//                   onChange={(e) => handleChoiceChange("B", e.target.value)}
//                   className="w-full border rounded px-2 py-1"
//                 />
//               </div>
//             </div>

//             {/* Row 2 */}
//             <div className="flex gap-4">
//               <div className="flex-1">
//                 <label className="text-sm font-medium">Option C</label>
//                 <input
//                   type="text"
//                   placeholder="Enter Option C"
//                   value={choices.C}
//                   onChange={(e) => handleChoiceChange("C", e.target.value)}
//                   className="w-full border rounded px-2 py-1"
//                 />
//               </div>

//               <div className="flex-1">
//                 <label className="text-sm font-medium">Option D</label>
//                 <input
//                   type="text"
//                   placeholder="Enter Option D"
//                   value={choices.D}
//                   onChange={(e) => handleChoiceChange("D", e.target.value)}
//                   className="w-full border rounded px-2 py-1"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Question Settings */}
//           <div>
//             <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
//               <Settings className="w-5 h-5 text-green-600" />
//               Question Settings
//             </h3>

//             <div className="flex gap-4">
//               {/* Correct Answer */}
//               <div className="flex-1 flex flex-col">
//                 <label className="text-sm font-medium mb-1">
//                   Correct Answer
//                 </label>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="outline"
//                       className="w-full flex justify-between"
//                     >
//                       {correctAnswer || "Select Correct Answer"}
//                       <ChevronDown className="w-4 h-4" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent>
//                     {["A", "B", "C", "D"].map((item) => (
//                       <DropdownMenuItem
//                         key={item}
//                         onClick={() => setCorrectAnswer(item)}
//                       >
//                         {item}
//                       </DropdownMenuItem>
//                     ))}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>

//               {/* Category */}
//               <div className="flex-1 flex flex-col">
//                 <label className="text-sm font-medium mb-1">Category</label>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="outline"
//                       className="w-full flex justify-between"
//                     >
//                       {category || "Select Category"}
//                       <ChevronDown className="w-4 h-4" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent>
//                     {["BE", "FE", "DO"].map((item) => (
//                       <DropdownMenuItem
//                         key={item}
//                         onClick={() => setCategory(item)}
//                       >
//                         {item}
//                       </DropdownMenuItem>
//                     ))}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>

//               {/* Difficulty */}
//               <div className="flex-1 flex flex-col">
//                 <label className="text-sm font-medium mb-1">Difficulty</label>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="outline"
//                       className="w-full flex justify-between"
//                     >
//                       {difficulty || "Select Difficulty"}
//                       <ChevronDown className="w-4 h-4" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent>
//                     {["easy", "medium", "hard"].map((item) => (
//                       <DropdownMenuItem
//                         key={item}
//                         onClick={() => setDifficulty(item)}
//                       >
//                         {item}
//                       </DropdownMenuItem>
//                     ))}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* <DialogFooter>
//           <button
//             className="px-4 py-2 bg-gray-300 rounded hover:bg-red-500 hover:text-white transition"
//             onClick={() => setOpenQuestionData(false)}
//           >
//             Close
//           </button>
//         </DialogFooter> */}
//         <DialogFooter>
//           <Button variant="outline" onClick={() => setOpenQuestionData(false)}>
//             Cancel
//           </Button>
//           <Button
//             className="bg-green-600 text-white hover:bg-green-700"
//             // onClick={selectedQuestion ? UpdateQuestion : CreateQuestion}
//             onClick={CreateQuestion}
//           >
//             {isSaving
//               ? selectedQuestion
//                 ? "Updating..."
//                 : "Saving..."
//               : selectedQuestion
//                 ? "Update"
//                 : "Save"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default QuestionData;

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
import { Book, ChevronDown, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import type { QuestionDataProps } from "@/Interfaces/QuestionsInterfaces";
import { Questions_URLS } from "../Services/Urls";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

const QuestionData = ({
  openQuestionData,
  setOpenQuestionData,
  selectedQuestion,
  getAllQuestions,
  onClose,
}: QuestionDataProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: selectedQuestion?.title || "",
      description: selectedQuestion?.description || "",
      choices: {
        A: selectedQuestion?.options?.A || "",
        B: selectedQuestion?.options?.B || "",
        C: selectedQuestion?.options?.C || "",
        D: selectedQuestion?.options?.D || "",
      },
      answer: selectedQuestion?.answer || "",
      type: selectedQuestion?.type || "",
      difficulty: selectedQuestion?.difficulty || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Question title is required"),
      description: Yup.string().required("Description is required"),
      choices: Yup.object({
        A: Yup.string().required("Option A is required"),
        B: Yup.string().required("Option B is required"),
        C: Yup.string().required("Option C is required"),
        D: Yup.string().required("Option D is required"),
      }),
      answer: Yup.string().required("Select correct answer"),
      type: Yup.string().required("Select category"),
      difficulty: Yup.string().required("Select difficulty"),
    }),
    onSubmit: async (values) => {
      if (selectedQuestion) {
        await UpdateQuestionFormik(values);
      } else {
        await CreateQuestionFormik(values);
      }
    },
  });

  const CreateQuestionFormik = async (values: typeof formik.values) => {
    setIsSaving(true);
    try {
      await axios.post(
        Questions_URLS.CREATE_QUESTION,
        {
          title: values.title,
          description: values.description,
          options: values.choices,
          answer: values.answer,
          difficulty: values.difficulty,
          type: values.type,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      toast({ title: "Question Created Successfully", variant: "success" });
      setOpenQuestionData(false);
      getAllQuestions();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const UpdateQuestionFormik = async (values: typeof formik.values) => {
    setIsSaving(true);
    try {
      await axios.put(
        Questions_URLS.UPDATE_QUESTION(selectedQuestion?._id || ""),
        {
          title: values.title,
          description: values.description,
          options: values.choices,
          answer: values.answer,
          difficulty: values.difficulty,
          type: values.type,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      toast({ title: "Question Updated Successfully", variant: "success" });
      setOpenQuestionData(false);
      getAllQuestions();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={openQuestionData} onOpenChange={setOpenQuestionData}>
      <DialogContent className="max-h-[650px] overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle>
            {selectedQuestion ? "Update Question" : "Create Question"}
          </DialogTitle>
          <DialogDescription>
            Fill in the information below to create a question
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          {/* Question Title */}
          <div>
            <label htmlFor="title" className="text-sm font-medium">
              Question Title
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

          {/* Description */}
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

          {/* Options */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
              <Book className="w-5 h-5 text-blue-600" />
              Answer Options
            </h3>

            {/* Row 1 */}
            <div className="flex gap-4">
              {["A", "B"].map((opt) => (
                <div className="flex-1" key={opt}>
                  <label className="text-sm font-medium">Option {opt}</label>
                  <input
                    type="text"
                    name={`choices.${opt}`}
                    placeholder={`Enter Option ${opt}`}
                    value={
                      formik.values.choices[
                        opt as keyof typeof formik.values.choices
                      ]
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full border rounded px-2 py-1"
                  />
                  {formik.touched.choices?.[
                    opt as keyof typeof formik.values.choices
                  ] &&
                    formik.errors.choices?.[
                      opt as keyof typeof formik.values.choices
                    ] && (
                      <div className="text-red-500 text-sm">
                        {
                          formik.errors.choices[
                            opt as keyof typeof formik.values.choices
                          ]
                        }
                      </div>
                    )}
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex gap-4">
              {["C", "D"].map((opt) => (
                <div className="flex-1" key={opt}>
                  <label className="text-sm font-medium">Option {opt}</label>
                  <input
                    type="text"
                    name={`choices.${opt}`}
                    placeholder={`Enter Option ${opt}`}
                    value={
                      formik.values.choices[
                        opt as keyof typeof formik.values.choices
                      ]
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full border rounded px-2 py-1"
                  />
                  {formik.touched.choices?.[
                    opt as keyof typeof formik.values.choices
                  ] &&
                    formik.errors.choices?.[
                      opt as keyof typeof formik.values.choices
                    ] && (
                      <div className="text-red-500 text-sm">
                        {
                          formik.errors.choices[
                            opt as keyof typeof formik.values.choices
                          ]
                        }
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>

          {/* Question Settings */}
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-green-600" />
              Question Settings
            </h3>

            <div className="flex gap-4">
              {/* Correct Answer */}
              <div className="flex-1 flex flex-col">
                <label className="text-sm font-medium mb-1">
                  Correct Answer
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex justify-between"
                    >
                      {formik.values.answer || "Select Correct Answer"}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {["A", "B", "C", "D"].map((item) => (
                      <DropdownMenuItem
                        key={item}
                        onClick={() => formik.setFieldValue("answer", item)}
                      >
                        {item}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {formik.touched.answer && formik.errors.answer && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.answer}
                  </div>
                )}
              </div>

              {/* Category */}
              <div className="flex-1 flex flex-col">
                <label className="text-sm font-medium mb-1">Category</label>
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
                  <DropdownMenuContent>
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
                  <div className="text-red-500 text-sm">
                    {formik.errors.type}
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
                  <DropdownMenuContent>
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
          </div>

          {/* <DialogFooter>
            <Button variant="outline" onClick={() => setOpenQuestionData(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700"
              disabled={isSaving}
            >
              {isSaving
                ? selectedQuestion
                  ? "Updating..."
                  : "Saving..."
                : selectedQuestion
                  ? "Update"
                  : "Save"}
            </Button>
          </DialogFooter> */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenQuestionData(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700"
              disabled={isSaving}
            >
              {isSaving
                ? selectedQuestion
                  ? "Updating..."
                  : "Saving..."
                : selectedQuestion
                  ? "Update"
                  : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionData;
