"use client";

import LoginButton from "@/components/buttons/loginButton";
import { useAuth } from "../../../authContexts/context";
import Link from "next/link";
import Image from "next/image";


export default function LogIn() {
  const {
    setFormData,
    errors,
    formData
  } = useAuth();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  
  
  return (
     <div className="h-screen  flex justify-center px-6 py-8">
         <div className=" flex items-center w-full  p-8"> 
          {/**Right column features */}
          <div className="bg-red w-full lg:w-1/2 flex items-center justify-center ">
          <form className="max-w-4xl p-6">
          {/* Header */}
          <div>
            <p className="lg:text-3xl w-[350px] lg:w-[350px] md:text-3xl text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent tracking-wide text-center ">
              Welcome to Tekcify 
            </p>
            <p className="text-center font-bold text-2xl mt-2">Sign in</p>
            <p className="mx-auto bg-purple-800 h-1 w-[50px]"></p>
          </div>

          {/*  Input Fields */}
          <div className="flex flex-col mt-6">

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
            <div className="mb-2">
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
              <input
                value={formData.password}
                onChange={handleChange}
                type="password"
                name="password"
                className={`w-full px-4 py-3 text-black bg-white border-gray-300 border rounded-xl outline-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${errors.password && "outline-none ring-2 ring-red-500 transition-colors"} `}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}  
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-400 justify-between">
            <div className="flex items-center">
              
              <label className="ml-2 block ">
                Dont have an account{' '}
                <Link href="/auth/signUp" className="text-purple-400 hover:text-purple-300">
                  Sign Up
                </Link>
                
              </label>
            </div>
              <Link href="/auth/fpassWord" >
              Forgot password
              </Link>
          </div>

          <div className="mt-8 flex justify-center items-center">
               <LoginButton/>
          </div>
          </form>
          </div>
          {/**Left column features. */}
      <div className="hidden lg:block w-1/2 fixed top-0 right-0 h-screen">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/80 z-[1]" />
          <Image
            src="/images/login-bg.jpg"
            alt="Signup Background"
             fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center p-16">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Join the Future of AI Development
            </h2>
            <p className="text-xl text-white/80">
              Get access to cutting-edge AI tools and a thriving community
            </p>
          </div>
        </div>
      </div>

         </div>
     </div>
  );
}
