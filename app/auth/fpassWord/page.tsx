"use client"
import { useAuth } from "../../../authContexts/context";
import PasswordStrength from "../../../utils/passwordStrength";
import Image from "next/image";
import Asset1 from "../../../assets/favicon.png";
import Link from "next/link";
import ResetButton from "../../components/buttons/resetButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
export default function ForgotPwd() {
    const {
        setFormData,
        errors,
        formData,
        setPasswordFocus,
        passwordFocus
      } = useAuth();
      
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        }));
      };
    return(
        <div className="flex flex-col justify-between h-screen max-w-4xl mx-auto md:py-8 py-4 px-4">
        <div className=" lg:px-10 mt-6 cursor-pointer">
            <div className="bg-purple-700 w-8 h-8 rounded-md  text-white font-bold flex items-center justify-center cursor-pointer">
            <Link href="/auth/logIn">
               <FontAwesomeIcon className="text-sm" icon={faArrowLeft}/>
            </Link> 
            </div>
        </div>
        <div className="flex flex-col justify-center items-center h-screen ">
            <div className="mb-12">
                <Image
                alt="#"
                src={Asset1}
                width={80}
                height={80}
                 />
            </div>
            <div className="w-[350px]" >
            <div>
                <div className="text-sm text-gray-400 mb-3">Reset your password</div>
                <input
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                type="password"
                name="password"
                className={`w-full px-4 py-3 text-black bg-white border-gray-300 border rounded-xl outline-none -2 mb-2  ${errors.password ? "outline-none ring-2 ring-red-500 transition-colors": "focus:ring-purple-500 transition-colors "} `}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}

              {/* Password Strength */}
              {passwordFocus && 
                  <PasswordStrength />
              }
            </div>
            <div className="flex justify-center items-center">
            <ResetButton/>
            </div>
        </div>
            
        </div>
        </div>
    )
}