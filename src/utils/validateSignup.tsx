// utils/validateForm.ts
import { FormErrors, FormData } from "../types/userTypes";

export default function validateSignup(formData: FormData): FormErrors {
  const newErrors: FormErrors = {};

  if (!formData.firstName.trim()) {
    newErrors.firstName = "First name is required";
  }else{
    
  }
  if (!formData.lastName.trim()) {
    newErrors.lastName = "Last name is required";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!formData.password.trim()) {
    newErrors.password = "Password is required";
  } 
  if (!formData.username) {
    newErrors.username = "Username is required";
  } 
  if (!formData.acceptTerms) {
    newErrors.acceptTerms = "You must accept the terms and conditions";
  }


  return newErrors;
}
