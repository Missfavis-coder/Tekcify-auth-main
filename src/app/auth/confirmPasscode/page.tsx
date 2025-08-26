"use client"

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image"
import Link from "next/link";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { setInterval } from "timers";

export default function ConfirmPasscode(){
    const [timer, setTimer] = useState(30);
    const [disabled, setDisabled] = useState(true);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    
    //To start countdown
    useEffect(() => {
        if (disabled && timer > 0 && !intervalRef.current) {
          intervalRef.current = setInterval(() => {
            setTimer((prev) => {
              if (prev <= 1) {
                clearInterval(intervalRef.current!);
                intervalRef.current = null;
                setDisabled(false);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
    
        return () => {
          if (intervalRef.current) clearInterval(intervalRef.current);
        };
      }, [disabled, timer]);
    
      const handleResend = () => {
        console.log('Code resent!');
        setTimer(30);
        setDisabled(true);
      };

    const handleChange = (value: string, index:number) => {
        //allow only single character
        if (/^[0-9a-zA-Z]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp)
            //add trim so that the box wont take empty values.
        }

        //auto focus thhe next input

        if(value && index < 5) {{
            inputRefs.current[index + 1]?.focus();
        }}
    }

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if(e.key ===  "Backspace" && !otp[index] && index> 0){
            inputRefs.current[index - 1]?.focus();
        }
    }
    return(
        <div className="lg:px-2 px-6 pt-8 h-screen">
        <div className=" lg:px-10 md:mt-6 cursor-pointer">
            <div className="bg-purple-700 w-8 h-8 rounded-md  text-white font-bold flex items-center justify-center cursor-pointer">
            <Link href="/auth/logIn">
               <FontAwesomeIcon className="text-sm" icon={faArrowLeft}/>
            </Link> 
            </div>
        </div> 
        <div className=" flex flex-col h-screen justify-center items-center ">
            <div className="mb-6">
                <Image
                src="/images/favicon.png"
                alt="#"
                width={70}
                height={70}
                />
            </div>
            <div className="flex flex-col justify-center items-center">
                    <h1 className="font-bold text-2xl text-center mb-3">Check Your Email</h1>
                    <p className="text-sm"> We have sent a passcode to your email.{""} Please enter it below: </p>
                     <div className="flex justify-between my-8">
                        {otp.map((digit, index) => {
                            return (
                                <React.Fragment key={index}>
                                <input
                                type="text"
                                ref={((el) => {(inputRefs.current[index] = el)})}
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e.target.value.trim(), index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className={`w-12 h-12 not-first:ml-2 border border-gray-400 text-purple-700 text-center text-xl rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${otp[index] ? "border-purple-700": "border-gray-400"} `}
                                />
                                </React.Fragment>
                            )
                        })}
                     </div>

                     {/**Afterwards success page. */}
                    <button onClick={handleResend}
                     disabled={disabled}
                     className={`text-sm mt-4 transition-colors underline ${
                        disabled
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-purple-600 hover:text-purple-800 cursor-pointer'
                      }`}
                      >
                        {disabled ? `Resend in ${timer}s` : 'Resend Code'}

                      </button>
            </div>
        </div>
        </div>
    )
}