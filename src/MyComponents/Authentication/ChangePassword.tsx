import { useFormik } from "formik";
import { changePasswordSchema } from "../Services/Validations";
import { Eye, EyeOff, Lock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Auth_URLS } from "../Services/Urls";
import { toast } from "@/hooks/use-toast";

const ChangePassword = () => {
  // const token = localStorage.getItem("authToken") || "";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODE4ZjUwOGYyZDMyMWQ3ZWE2MTVhZjkiLCJlbWFpbCI6InNhbWFyemVpbmFoQGdtYWlsLmNvbSIsInJvbGUiOiJJbnN0cnVjdG9yIiwiaWF0IjoxNzY1Mjc1MjU2LCJleHAiOjE3Njg4NzUyNTZ9.TkYOMZ3R_evIZlflpfMhTPdrV_4D_29ATUSi09ATX_A";
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const ChangeFormikOBJ = useFormik({
    initialValues: { password: "", password_new: "" },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      try {
        const res = await axios.post(Auth_URLS.CHANGE_PASSWORD, values, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        toast({
          title: "Password Changed Successfully",
          description: "Your password has been updated successfully.",
          variant: "success",
          duration: 1500,
        });
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
    <div className="w-full">
      <form
        onSubmit={ChangeFormikOBJ.handleSubmit}
        className="flex flex-col gap-4"
      >
        <div className="w-full">
          <label
            htmlFor="password"
            className="text-white font-medium mb-2 block"
          >
            Old Password
          </label>
          <div className="w-full relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-6 h-6" />
            <Input
              id="password"
              type={showOldPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Your Old Password"
              value={ChangeFormikOBJ.values.password}
              onChange={ChangeFormikOBJ.handleChange}
              onBlur={ChangeFormikOBJ.handleBlur}
              className="pl-10 py-4 border-[3px] w-full text-white"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
            >
              {showOldPassword ? (
                <EyeOff className="w-6 h-6" />
              ) : (
                <Eye className="w-6 h-6" />
              )}
            </button>
          </div>
          {ChangeFormikOBJ.touched.password &&
            ChangeFormikOBJ.errors.password && (
              <div className="text-red-500 text-sm">
                {ChangeFormikOBJ.errors.password}
              </div>
            )}
        </div>

        <div className="w-full">
          <label
            htmlFor="password_new"
            className="text-white font-medium mb-2 block"
          >
            New Password
          </label>
          <div className="w-full relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-6 h-6" />
            <Input
              id="password_new"
              type={showNewPassword ? "text" : "password"}
              name="password_new"
              placeholder="Enter Your Password"
              value={ChangeFormikOBJ.values.password_new}
              onChange={ChangeFormikOBJ.handleChange}
              onBlur={ChangeFormikOBJ.handleBlur}
              className="pl-10 py-4 border-[3px] w-full text-white"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
            >
              {showNewPassword ? (
                <EyeOff className="w-6 h-6" />
              ) : (
                <Eye className="w-6 h-6" />
              )}
            </button>
          </div>
          {ChangeFormikOBJ.touched.password_new &&
            ChangeFormikOBJ.errors.password_new && (
              <div className="text-red-500 text-sm">
                {ChangeFormikOBJ.errors.password_new}
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
                Changing…
                <Send className="w-4 h-4 animate-pulse" />
              </>
            ) : (
              <>
                Change
                <Send className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
