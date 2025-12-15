import * as Yup from "yup";

const emailField = Yup.string()
  .email("Invalid email format")
  .required("Email is required");

const passwordField= Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required");
    
const otpField = Yup.string()
  .matches(/^\d{6}$/, "OTP must be exactly 6 digits") 
  .required("OTP is required");

export const forgetPasswordSchema = Yup.object({
  email: emailField,
});

export const resetPasswordSchema = Yup.object({
  otp:otpField,
  email: emailField,
  password: passwordField
});
export const changePasswordSchema = Yup.object({
  password: passwordField,
  password_new: passwordField
});
export const loginSchema = Yup.object({
  password: passwordField,
email: emailField,
});
