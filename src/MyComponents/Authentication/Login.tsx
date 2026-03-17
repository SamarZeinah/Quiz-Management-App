"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  KeySquare,
  CircleCheck,
  Eye,
  EyeOff,
  User,
  UserPlus,
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Auth_URLS } from "../Services/Urls";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

// Schemas
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const registerSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string().oneOf(["Student", "Instructor"], "Role is required"),
});

// Interfaces
interface LoginValues {
  email: string;
  password: string;
}

interface RegisterValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}

export default function AuthTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Tab state based on URL
  const [activeBox, setActiveBox] = useState<"login" | "register">(
    location.pathname.includes("register") ? "register" : "login"
  );
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (activeBox === "login") navigate("/login", { replace: true });
    else navigate("/register", { replace: true });
  }, [activeBox, navigate]);

  // Login Form
  const loginFormik = useFormik<LoginValues>({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post(Auth_URLS.LOGIN, values);
        const { accessToken, profile } = res.data.data;

        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(profile));
        login(accessToken, profile);

        toast({ title: "Login Successfully", duration: 1500 });
        navigate("/dashboard");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast({
            title: "Error",
            description: error.response?.data?.message || "Something went wrong",
            variant: "destructive",
            duration: 1500,
          });
        }
      } finally {
        setLoading(false);
      }
    },
  });

  // Register Form
  const registerFormik = useFormik<RegisterValues>({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.post(Auth_URLS.REGISTER, values);
        toast({ title: "Registered successfully", duration: 1500 });
        setActiveBox("login");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast({
            title: "Error",
            description: error.response?.data?.message || "Something went wrong",
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
    <div className="w-full ">
      {/* Tabs */}
      <div className="flex gap-6 mb-[30px]">
        <div
          onClick={() => setActiveBox("login")}
          className={`cursor-pointer flex flex-col items-center justify-center w-32 h-28 rounded-xl border-2 transition
          ${
            activeBox === "login"
              ? "border-[#C5D86D] text-[#C5D86D]"
              : "border-white text-white hover:border-[#C5D86D] hover:text-[#C5D86D]"
          }`}
        >
          <User className="w-8 h-8 mb-2" />
          <span className="font-semibold">Login</span>
        </div>

        <div
          onClick={() => setActiveBox("register")}
          className={`cursor-pointer flex flex-col items-center justify-center w-32 h-28 rounded-xl border-2 transition
          ${
            activeBox === "register"
              ? "border-[#C5D86D] text-[#C5D86D]"
              : "border-white text-white hover:border-[#C5D86D] hover:text-[#C5D86D]"
          }`}
        >
          <UserPlus className="w-8 h-8 mb-2" />
          <span className="font-semibold">Register</span>
        </div>
      </div>

      {/* Forms */}
      <div className="w-full">
        {activeBox === "login" ? (
          <form onSubmit={loginFormik.handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div className="w-full">
              <label className="text-white font-medium mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-6 h-6" />
                <Input
                  name="email"
                  placeholder="Email"
                  value={loginFormik.values.email}
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                  className={`pl-10 py-4 border-[3px] w-full text-white ${
                    loginFormik.touched.email && loginFormik.errors.email ? "border-red-500" : "border-white"
                  }`}
                />
              </div>
              {loginFormik.touched.email && loginFormik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{loginFormik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="w-full">
              <label className="text-white font-medium mb-2 block">Password</label>
              <div className="relative">
                <KeySquare className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-6 h-6" />
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={loginFormik.values.password}
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                  className={`pl-10 pr-10 py-4 border-[3px] w-full text-white ${
                    loginFormik.touched.password && loginFormik.errors.password ? "border-red-500" : "border-white"
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
              {loginFormik.touched.password && loginFormik.errors.password && (
                <p className="text-red-500 text-sm mt-1">{loginFormik.errors.password}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-white text-black rounded-lg flex items-center justify-center gap-2 font-bold text-[16px] py-[14px] px-[18px] disabled:opacity-70 disabled:cursor-not-allowed"
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
        ) : (
          <form onSubmit={registerFormik.handleSubmit} className="flex flex-col gap-4 w-full">
            {/* First + Last Name */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-white mb-2 block">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
                  <Input
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    value={registerFormik.values.first_name}
                    onChange={registerFormik.handleChange}
                    onBlur={registerFormik.handleBlur}
                    className="pl-10 py-4 border-[3px] w-full text-white border-white"
                  />
                </div>
                {registerFormik.touched.first_name && registerFormik.errors.first_name && (
                  <p className="text-red-500 text-sm mt-1">{registerFormik.errors.first_name}</p>
                )}
              </div>

              <div className="w-1/2">
                <label className="text-white mb-2 block">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
                  <Input
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    value={registerFormik.values.last_name}
                    onChange={registerFormik.handleChange}
                    onBlur={registerFormik.handleBlur}
                    className="pl-10 py-4 border-[3px] w-full text-white border-white"
                  />
                </div>
                {registerFormik.touched.last_name && registerFormik.errors.last_name && (
                  <p className="text-red-500 text-sm mt-1">{registerFormik.errors.last_name}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-white mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={registerFormik.values.email}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                  className="pl-10 py-4 border-[3px] w-full text-white border-white"
                />
              </div>
              {registerFormik.touched.email && registerFormik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{registerFormik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-white mb-2 block">Password</label>
              <div className="relative">
                <KeySquare className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={registerFormik.values.password}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                  className="pl-10 pr-10 py-4 border-[3px] w-full text-white border-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {registerFormik.touched.password && registerFormik.errors.password && (
                <p className="text-red-500 text-sm mt-1">{registerFormik.errors.password}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="text-white mb-2 block">Role</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full flex justify-between items-center py-4 px-4 border-[3px] border-white text-white">
                    <div className="flex items-center gap-2">
                      <User className="w-8 h-8 text-white" />
                      <span>{registerFormik.values.role || "Select Role"}</span>
                    </div>
                    <ChevronDown className="w-8 h-8 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                  {["Select Role", "Student", "Instructor"].map((role) => (
                    <DropdownMenuItem
                      key={role}
                      onClick={() =>
                        registerFormik.setFieldValue(
                          "role",
                          role === "Select Role" ? "" : role,
                        )
                      }
                    >
                      {role}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {registerFormik.touched.role && registerFormik.errors.role && (
                <p className="text-red-500 text-sm mt-1">{registerFormik.errors.role}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="bg-white text-black font-bold py-3 mt-2"
            >
              {loading ? "Creating..." : "Register"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}