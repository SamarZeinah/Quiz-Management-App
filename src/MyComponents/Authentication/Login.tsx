import { useState } from "react";
import { Mail, KeySquare, CircleCheck, Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Auth_URLS } from "../Services/Urls";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "../Context/AuthContext";
import { loginSchema } from "../Services/Validations";
import { useNavigate } from "react-router-dom";

interface LoginValues {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  role: string;
}


export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const loginFormikOpj = useFormik<LoginValues>({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {

const res = await axios.post(Auth_URLS.LOGIN, values);

const { accessToken, profile } = res.data.data;


localStorage.setItem("token", accessToken);
localStorage.setItem("user", JSON.stringify(profile));

// ✅ تحديث الـ context
login(accessToken, profile);


        toast({
          title: "Login Successfully",
          duration: 1500,
        });

        navigate("/dashboard");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast({
            title: "Error",
            description:
              error.response?.data?.message || "Something went wrong",
            variant: "destructive",
            duration: 1500,
          });
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="w-full">
      <form onSubmit={loginFormikOpj.handleSubmit} className="flex flex-col gap-4">
        
        {/* Email */}
        <div className="w-full">
          <label htmlFor="email" className="text-white font-medium mb-2 block">
            Registered email address
          </label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-6 h-6" />
            <Input
              id="email"
              placeholder="Type your email"
              value={loginFormikOpj.values.email}
              onChange={loginFormikOpj.handleChange}
              onBlur={loginFormikOpj.handleBlur}
              className={`pl-10 py-4 border-[3px] w-full text-white ${
                loginFormikOpj.touched.email && loginFormikOpj.errors.email
                  ? "border-red-500"
                  : "border-white"
              }`}
            />
          </div>

          {loginFormikOpj.touched.email && loginFormikOpj.errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {loginFormikOpj.errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="w-full">
          <label htmlFor="password" className="text-white font-medium mb-2 block">
            Password
          </label>

          <div className="relative">
            <KeySquare className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-6 h-6" />

            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Type your password"
              value={loginFormikOpj.values.password}
              onChange={loginFormikOpj.handleChange}
              onBlur={loginFormikOpj.handleBlur}
              className={`pl-10 pr-10 py-4 border-[3px] w-full text-white ${
                loginFormikOpj.touched.password && loginFormikOpj.errors.password
                  ? "border-red-500"
                  : "border-white"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {loginFormikOpj.touched.password && loginFormikOpj.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {loginFormikOpj.errors.password}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-white text-black rounded-lg flex items-center justify-center gap-2 font-bold 
              text-[16px] py-[14px] px-[18px] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
            <CircleCheck />
          </Button>

          <div className="text-white cursor-pointer">
            Forgot password?
            <span
              onClick={() => navigate("/forgetpassword")}
              className="text-[#C5D86D] cursor-pointer font-semibold ml-1"
            >
              Click here
            </span>
          </div>
        </div>

      </form>
    </div>
  );
}
