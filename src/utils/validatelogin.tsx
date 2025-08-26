import { FormErrors, FormData } from "../types/userTypes";

export default function validateLogin(formData: FormData): FormErrors {
  const newErrors: FormErrors = {};

  if (!formData.email || formData.email.trim() === "") {
    newErrors.email = "Enter your email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!formData.password || formData.password.trim() === "" ) {
    newErrors.password = "Enter your password";
  } 
  


  return newErrors;
}
