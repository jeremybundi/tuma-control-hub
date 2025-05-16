import React, { useState } from "react";
import Image from "next/image";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useRouter } from "next/navigation";

import "@fontsource/poppins";

function VerifyAccount() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const validateOTP = async (e: any) => {
    e.preventDefault();
    console.log(otp);

    // const dataToSend = {
    //   email: localStorage.getItem("username"),
    //   confirmationCode: otp,
    // };
    // console.log(dataToSend);
    // console.log(JSON.stringify(dataToSend))
    // setLoading(true);
    // try {
    //   const response = await fetch(
    //     'https://app.madfun-adventures.com/api/v3/auth/confirm',
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(dataToSend), // Send form data without cpassword
    //     }
    //   );

    //   if (!response.ok) {
    //     setLoading(false);
    //     const result = await response.json();
    //     console.log(result);

    //     toast({
    //       variant: "destructive",
    //       title: "Warning",
    //       description: "Invalid OTP. Please try again",
    //     });

    //   }

    //   const result = await response.json();
    //   console.log('User verified successfully:', result);

    //   toast({
    //     variant: "default",
    //     title: "Success",
    //     description: "Account verification completed.",
    //   });

    //   router.push('/login')
    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    //   if (error instanceof Error) {
    //     console.log(error.message);
    //   } else {
    //     console.log('An unknown error occurred.');
    //   }
    // }
  };
  return (
    <div className="flex flex-wrap ">
      <div className="pointer-events-none relative hidden h-screen select-none  md:block md:w-1/2">
        <img
          src="/bg.png"
          alt="Background"
          className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
        />
      </div>
      <div className="flex w-full flex-col md:w-1/2 p-16">
        <div className="w-full mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <img
            src="/promitto_logo.png"
            alt="Logo"
            className="w-20 h-20 px-2 py-2"
          />
          <p className="text-left text-3xl font-bold py-6">OTP Verification</p>
          <p className="whitespace-nowrap text-gray-600">
            Enter the Verification code we just sent to your phone number /
            email
          </p>
          <hr className="my-6" />
          <div className="flex flex-col justify-start w-full">
            <form className="items-center ">
              <div className="mb-1 sm:mb-2 ">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  className="items-center text-black "
                >
                  <InputOTPGroup>
                    <InputOTPSlot
                      className="mr-2 border rounded-[6px] h-16 w-16 text-xl"
                      index={0}
                    />
                    <InputOTPSlot
                      className="mx-2 border rounded-[6px] h-16 w-16 text-xl"
                      index={1}
                    />
                    <InputOTPSlot
                      className="mx-2 border rounded-[6px] h-16 w-16 text-xl"
                      index={2}
                    />
                    <InputOTPSlot
                      className="mx-2 border rounded-[6px] h-16 w-16 text-xl"
                      index={3}
                    />
                    <InputOTPSlot
                      className="mx-2 border rounded-[6px] h-16 w-16 text-xl"
                      index={4}
                    />
                    <InputOTPSlot
                      className="mx-2 border rounded-[6px] h-16 w-16 text-xl"
                      index={5}
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="mt-6 mb-2 sm:mb-4">
                <button
                  onClick={validateOTP}
                  //disabled
                  // type="submit"
                  className="inline-flex w-full py-3 items-center justify-center rounded-lg  dark:bg-gray-900 font-medium tracking-wide text-white dark:text-white shadow-md ring-gray-200 transition duration-200 hover:bg-gray-700 focus:outline-none focus:ring"
                >
                  Verify
                </button>
              </div>
            </form>
            <h1 className="mt-4 md:mt-6 text-lg font-normal text-center font-poppins text-gray-400 ">
              Didn't Receive the code?
              <button className="text-yellow-500 font-semibold font-poppins mx-2">
                Resend
              </button>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount;
