"use client";

import SignupButton from "@/components/buttons/signupButton";
import { useAuth } from "@/authContexts/context";
import { useState } from "react";
import PasswordStrength from "@/utils/passwordStrength";
import Link from "next/link";
import  Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

export default function SignUp() {

  const {
    setFormData,
    formData,
    errors,
    setPasswordFocus,
    passwordFocus
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
 
  return (
    <div className="flex min-h-screen  bg-white ">

      <div className=" md:w-1/2 w-full flex justify-center items-center ">
        {/**Left */}
        <div className=" px-10 py-8">
        <form className="">
          {/* Header */}
          <div>
            <p className="lg:text-3xl md:text-3xl text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent tracking-wide text-center ">
              Welcome to Tekcify 
            </p>
            <p className="text-center font-bold text-2xl mt-2">Create an Account</p>
            <p className="mx-auto bg-purple-800 h-1 w-[50px]"></p>
          </div>

          {/* ====== Input Fields ====== */}
          <div className="flex flex-col mt-6">
            {/* First Name */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                First Name
              </label>
              <input
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                name="firstName"
                className={`w-full px-4 py-3 text-black bg-white border-gray-300 border rounded-xl outline-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${errors.firstName && "outline-none ring-2 ring-red-500 transition-colors"} `}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Last Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="lastName"
                className={`w-full px-4 py-3 text-black bg-white border-gray-300 border rounded-xl outline-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${errors.lastName && "outline-none ring-2 ring-red-500 transition-colors"} `}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <input
                value={formData.username}
                onChange={handleChange}
                type="text"
                name="username"
                className={`w-full px-4 py-3 text-black bg-white border-gray-300 border rounded-xl outline-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${errors.username && "outline-none ring-2 ring-red-500 transition-colors"} `}
                placeholder="BigJ"
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-2 ">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                className={`w-full px-4 py-3 text-black bg-white border-gray-300 border rounded-xl outline-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${errors.email && "outline-none ring-2 ring-red-500 transition-colors"} `}
                placeholder="johndoe@gmail.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                   value={formData.password}
                   onChange={handleChange}
                   onFocus={() => setPasswordFocus(true)}
                   onBlur={() => setPasswordFocus(false)}
                   type={showPassword ? "text" : "password"}
                   name="password"
                   className={`w-full px-4 py-3 text-black bg-white border-gray-300 border rounded-xl outline-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${errors.password && "outline-none ring-2 ring-red-500 transition-colors"} `}
                   placeholder="••••••••"
                />
                <FontAwesomeIcon
                   icon={showPassword ? faEyeSlash : faEye}
                   onClick={() => setShowPassword((prev) => !prev)}
                   className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}

              {/* Password Strength */}
              {passwordFocus && 
                  <PasswordStrength />
              }

              
            </div>
          </div>

          {/* ====== Submit Button ====== */}
          <div className="flex items-center justify-center mt-4">
            <SignupButton/>
          </div>


          <div className="flex flex-col items-center mt-2 justify-center text-xs text-gray-400" >
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <input
                id="terms"
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="h-4 w-4 rounded border-purple-500/20 bg-black/50 text-purple-600 focus:ring-purple-500/50"
                
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                I agree to the{' '}
                <Link href="#" className="text-purple-400 hover:text-purple-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-purple-400 hover:text-purple-300">
                  Privacy Policy
                </Link>
              </label>
            </div>
              <div>
              {errors.acceptTerms && (
                <p className="mt-1 text-xs text-red-500">{errors.acceptTerms}</p>
              )}
              </div>
            </div>
            <div className="flex mt-2 space-x-1" >
                <p className="flex cursor-pointer">Already have an account? </p>
                <Link href="/auth/logIn">
                   <span className="text-purple-400 hover:text-purple-300 underline">Login</span>
                </Link>
            </div>
            
          </div>
        </form>
        </div>

        {/**Right features column*/}
        <div className="hidden lg:block w-1/2 fixed top-0 right-0 h-screen">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/80 z-[1]" />
          <Image
            src="/images/signup-bg.jpg"
            alt="Signup Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative h-full py-15 z-10 flex flex-col justify-between items-center p-16">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Join the Future of AI Development
            </h2>
            <p className="text-xl text-white/80">
              Get access to cutting-edge AI tools and a thriving community
            </p>
          </div>
          <button className="text-white text-lg bg-purple-800 px-12 rounded-3xl py-3 cursor-pointer">Go back Home</button>
        </div>
      </div>
      </div>
    </div>
  );
}
