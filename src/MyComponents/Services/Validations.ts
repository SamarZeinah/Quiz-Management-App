import * as Yup from "yup";

export const forgetPasswordSchema  = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required")
});
