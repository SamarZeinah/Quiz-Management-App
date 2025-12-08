import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { Mail, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { forgetPasswordSchema } from "../Services/Validations";
import axios from "axios";
import { Auth_URLS } from "../Services/Urls";
import { useToast } from "@/hooks/use-toast";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const ForgetFormikOBJ = useFormik({
    initialValues: { email: "" },
    validationSchema: forgetPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post(Auth_URLS.FORGET_PASSWORD, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast({
          title: "Email Sent Successfully",
          description: "Please check your inbox to reset your password.",
          variant: "success",
        });
        navigate("/resetpassword");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Axios Error:", error.response?.data);
          toast({
            title: "Error",
            description:
              error.response?.data?.message || "Something went wrong",
            variant: "destructive",
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
        onSubmit={ForgetFormikOBJ.handleSubmit}
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
              value={ForgetFormikOBJ.values.email}
              onChange={ForgetFormikOBJ.handleChange}
              onBlur={ForgetFormikOBJ.handleBlur}
              className="pl-10 py-4 border-[3px] w-full text-white"
            />
          </div>
        </div>

        {ForgetFormikOBJ.touched.email && ForgetFormikOBJ.errors.email && (
          <div className="text-red-500 text-sm">
            {ForgetFormikOBJ.errors.email}
          </div>
        )}

        <div className="flex items-center justify-between w-full mt-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-white text-black rounded-lg flex items-center justify-center gap-2 font-bold 
                    text-[16px] py-[14px] px-[18px] disabled:opacity-70 disabled:cursor-not-allowed hover:none"
          >
            {loading ? (
              <>
                Sending…
                <Send className="w-4 h-4 animate-pulse" />
              </>
            ) : (
              <>
                Send email
                <Send className="w-4 h-4" />
              </>
            )}
          </Button>

          <span className="text-white font-medium">
            Login?
            <span
              onClick={() => navigate("/login")}
              className="text-[#C5D86D] cursor-pointer font-semibold ml-1"
            >
              Click here
            </span>
          </span>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
