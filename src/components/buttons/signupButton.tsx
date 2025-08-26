"use client";
import validateSignup from "@/utils/validateSignup";
import { useAuth } from "@/authContexts/context";
import { getPassedRules } from "@/utils/authConfig";


const SignupButton = () => {
  
  const { setErrors, formData, passwordChecks , resetForm } = useAuth();
  const passedRules = getPassedRules(passwordChecks);
  const strongEnough = passedRules >= 5;



  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the SignUp.
    const validateErrors = validateSignup(formData);
    setErrors(validateErrors);
    
    // Check if any errors exist
    
    const hasErrors = (Object.keys(validateErrors) as (keyof typeof validateErrors)[])
    .some(key => validateErrors[key] !== "");
    if (hasErrors) {
      alert("Please fill all required fields correctly!");
      return;
    }

    if (!strongEnough) {
      alert("Password is too weak!");
      return;
    }
    resetForm(true)
    // Everything passed
   
    alert("You have successfully signed up.");
    console.log("Form submitted successfully!");
  };

  return (
    <button
      className="font-bold text-md bg-gradient-to-r from-purple-500 to-purple-700 px-20 py-3 text-white rounded-3xl cursor-pointer"
      type="submit"
      onClick={handleSignup}
    >
      Sign Up
    </button>
  );
};

export default SignupButton;
