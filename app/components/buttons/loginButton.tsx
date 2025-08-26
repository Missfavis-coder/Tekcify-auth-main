"use client"
import { useAuth } from "../../../authContexts/context";
import validateLogin from "../../../utils/validatelogin";
import Image from "next/image";
import Asset2 from "../../../assets/favicon.ico";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  
  const{setErrors, formData, resetForm} = useAuth();
  const router  = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

     // Validate the Login
     const validateErrors = validateLogin(formData);
     setErrors(validateErrors);

     

     if (Object.keys(validateErrors).length === 0) {
      //Redirect to Confirm passcode page
       router.push("/auth/confirmPwd")
      console.log("Login successful");
      const code = {
        email: formData.email,
        password: formData.password,
        username: formData.username
      }

      console.log("output", code);
       resetForm(true)
    }
     
    //trial
  };

  return (
    <button
      className="font-bold flex space-x-2 md:text-md text-smm bg-gradient-to-r from-purple-500 to-purple-700 px-16 py-3 text-white rounded-3xl cursor-pointer"
      type="button"
      onClick={handleLogin}
    >
     <p>Login with Tekcify</p>
      <div className=" ">
          <Image
          src={Asset2}
          alt="#"
          width={20}
          height={20}
          />
        </div>
    </button>
  );
}



