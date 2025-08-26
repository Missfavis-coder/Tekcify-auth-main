"use client"
import { createContext, useState, ReactNode,useEffect, useContext, Dispatch, SetStateAction } from "react";
import { FormData,FormErrors } from "../types/userTypes";

type Passwordchecks = {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}
type authContextType = {
    errors: FormErrors;
    setErrors: Dispatch<SetStateAction<FormErrors>>;
    formData: FormData;
    setFormData: Dispatch<SetStateAction<FormData>>;
    passwordFocus:boolean;
    setPasswordFocus: Dispatch<SetStateAction<boolean>>;
    passwordChecks:Passwordchecks
    setPasswordChecks: Dispatch<SetStateAction<Passwordchecks>>;
    resetForm: (partial?: boolean) => void
  };
    

const AuthContext = createContext<authContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<FormData>({
      firstName: "",
      lastName: "",
      username:"",
      email: "",
      password:"",
      acceptTerms:false
    });
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [passwordChecks, setPasswordChecks] = useState<Passwordchecks>({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
  });

  const resetForm =(partial: boolean = false) => {
    if (partial) {
      setFormData((prev) => ({
        ...prev,
        email: "",
        password: "",
        username: "",
        acceptTerms: false,
      }));
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        acceptTerms: false,
      });
    }
    setErrors({});
  }
  

  useEffect(() => {
    const pwd = formData.password
    const newChecks: Passwordchecks = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };

    setPasswordChecks(newChecks);
    if (passwordFocus) {
      if (!pwd) {
        setErrors((prev) => ({ ...prev, password: "Password is required" }));
      } else if (!newChecks.length) {
        setErrors((prev) => ({ ...prev, password: "Password must be at least 8 characters" }));
      } else if (!newChecks.uppercase || !newChecks.lowercase) {
        setErrors((prev) => ({ ...prev, password: "Password must contain both upper and lowercase letters" }));
      } else if (!newChecks.number) {
        setErrors((prev) => ({ ...prev, password: "Password must contain at least one number" }));
      } else if (!newChecks.special) {
        setErrors((prev) => ({ ...prev, password: "Password must contain at least one special character" }));
      } else {
        // Clear password error if all rules pass
        setErrors((prev) => {
          const { password, ...rest } = prev;
          return rest;
        });
      }
    } 

  }, [formData.password, passwordFocus]);

  return (
    <AuthContext.Provider
      value={{errors, setErrors,resetForm, formData, setFormData, passwordChecks, passwordFocus, setPasswordChecks, setPasswordFocus  }}
    >
    {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
  }
