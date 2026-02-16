import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { Eye, EyeOff, Key, Lock, Mail, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPasswordSchema } from "../Services/Validations";
import axios from "axios";
import { Auth_URLS } from "../Services/Urls";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const ResetFormikOBJ = useFormik({
    initialValues: { email: "", otp: "", password: "" },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
         await axios.post(Auth_URLS.RESET_PASSWORD, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast({
          title: "Password Reset Successfully",
          description:
            "Your password has been updated. You can now log in with your new password.",
          variant: "success",
          duration: 1500,
        });

        navigate("/login");
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
        setLoading(false);
      }
    },
  });

  return (
    <div className="w-full ">
      <form
        onSubmit={ResetFormikOBJ.handleSubmit}
        className="flex flex-col gap-4"
      >
        <div className="w-full">
          <label htmlFor="email" className="text-white font-medium mb-2 block">
            Email address
          </label>

          <div className="relative w-full">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-6 h-6 " />
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={ResetFormikOBJ.values.email}
              onChange={ResetFormikOBJ.handleChange}
              onBlur={ResetFormikOBJ.handleBlur}
              className="pl-10 py-4 border-[3px] w-full text-white"
            />
          </div>
        </div>

        {ResetFormikOBJ.touched.email && ResetFormikOBJ.errors.email && (
          <div className="text-red-500 text-sm">
            {ResetFormikOBJ.errors.email}
          </div>
        )}
        <div className="w-full ">
          <label htmlFor="otp" className="text-white font-medium mb-2 block">
            OTP
          </label>

          <div className="relative w-full ">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-6 h-6" />
            <Input
              id="otp"
              type="text"
              name="otp"
              placeholder="Enter your OTP"
              value={ResetFormikOBJ.values.otp}
              onChange={ResetFormikOBJ.handleChange}
              onBlur={ResetFormikOBJ.handleBlur}
              className="pl-10 py-4 border-[3px] w-full text-white"
            />
          </div>

          {ResetFormikOBJ.touched.otp && ResetFormikOBJ.errors.otp && (
            <div className="text-red-500 text-sm">
              {ResetFormikOBJ.errors.otp}
            </div>
          )}
        </div>
        <div className="w-full ">
          <label
            htmlFor="password"
            className="text-white font-medium mb-2 block"
          >
            Password
          </label>

          <div className="relative w-full">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-6 h-6" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={ResetFormikOBJ.values.password}
              onChange={ResetFormikOBJ.handleChange}
              onBlur={ResetFormikOBJ.handleBlur}
              className="pl-10 py-4 border-[3px] w-full text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
            >
              {showPassword ? (
                <EyeOff className="w-6 h-6" />
              ) : (
                <Eye className="w-6 h-6" />
              )}
            </button>
          </div>

          {ResetFormikOBJ.touched.password &&
            ResetFormikOBJ.errors.password && (
              <div className="text-red-500 text-sm">
                {ResetFormikOBJ.errors.password}
              </div>
            )}
        </div>
        <div className="flex items-center justify-between w-full mt-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-white text-black rounded-lg flex items-center justify-center gap-2 font-bold 
                    text-[16px] py-[14px] px-[18px] disabled:opacity-70 disabled:cursor-not-allowed hover:none"
          >
            {loading ? (
              <>
                Reset…
                <Send className="w-4 h-4 animate-pulse" />
              </>
            ) : (
              <>
                Reset
                <Send className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
