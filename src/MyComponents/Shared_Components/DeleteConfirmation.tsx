
// "use client"

// import DeleteIcon from "@/assets/DeleteIcon.png"
// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog"
// import { useState } from "react"

// interface DeleteConfirmationProps {
//   trigger?: React.ReactNode
//   title?: string
//   description?: string
//   confirmText?: string
//   cancelText?: string
//   onConfirm: () => Promise<void>
// }


// export function DeleteConfirmation({
//   trigger,
//   title,
//   description ,
//   confirmText,
//   cancelText,
//   onConfirm,
// }: DeleteConfirmationProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   return (
//     <AlertDialog>
//       {trigger && (
//         <AlertDialogTrigger asChild>
//           {trigger}
//         </AlertDialogTrigger>
//       )}

//       <AlertDialogContent>
//         <AlertDialogHeader className="border-b">
//           <AlertDialogTitle className="font-bold text-red-700 text-lg bg-red-50 p-6 rounded">
//             {title}
//           </AlertDialogTitle>
//         </AlertDialogHeader>

//         <div className="flex flex-col items-center justify-center text-center p-6 gap-4">
//           <AlertDialogDescription className="text-lg font-bold text-black">
//             {description}
//           </AlertDialogDescription>

//           <div className="flex items-center justify-center h-32 w-32">
//             <img src={DeleteIcon} alt="Delete Icon" />
//           </div>
//         </div>

//         <AlertDialogFooter className="p-6">
//           <AlertDialogCancel>{cancelText}</AlertDialogCancel>
//           <AlertDialogAction
//             onClick={onConfirm}
//             disabled={isLoading}
//             className="bg-red-600 hover:bg-red-700"
//           >
//             {/* {confirmText} */}
//                         {isLoading ? "Deleting..." : confirmText}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   )
// }


"use client"

import DeleteIcon from "@/assets/DeleteIcon.png"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { useState } from "react"

interface DeleteConfirmationProps {
  trigger?: React.ReactNode
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => Promise<void>
}

export function DeleteConfirmation({
  trigger,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
}: DeleteConfirmationProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      await new Promise(resolve => setTimeout(resolve, 5000));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      {trigger && (
        <AlertDialogTrigger asChild>
          {trigger}
        </AlertDialogTrigger>
      )}

      <AlertDialogContent>
        <AlertDialogHeader className="border-b">
          <AlertDialogTitle className="font-bold text-red-700 text-lg bg-red-50 p-6 rounded">
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex flex-col items-center justify-center text-center p-6 gap-4">
          <AlertDialogDescription className="text-lg font-bold text-black">
            {description}
          </AlertDialogDescription>

          <div className="flex items-center justify-center h-32 w-32">
            <img src={DeleteIcon} alt="Delete Icon" />
          </div>
        </div>

        <AlertDialogFooter className="p-6">
          <AlertDialogCancel disabled={isLoading}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleClick}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? "Deleting..." : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
