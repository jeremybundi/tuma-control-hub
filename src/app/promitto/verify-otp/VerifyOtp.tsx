"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { jwtDecode } from "jwt-decode";
import "@fontsource/poppins";

interface DecodedToken {
  lastName: string;
  clientId: string;
  roles: string;
  iss: string;
  active: string;
  identityProvider: string;
  accountKey: string;
  aud: string;
  firstName: string;
  nbf: number;
  permissions: string[];
  name: string;
  exp: number;
  iat: number;
  jti: string;
  email: string;
}

function VerifyAccount() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      router.push("/");
    }
  }, [searchParams, router]);

  const validateOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const requestData = {
      email: email,
      verificationCode: otp
    };

   /* console.log("Data being sent to API:", {
      endpoint: "https://auth.tuma-app.com/api/auth/email",
      requestData: requestData,
      timestamp: new Date().toISOString()
    });*/

    try {
      const response = await axios.post(
        "https://auth.tuma-app.com/api/auth/email",
        requestData
      );

    /*  console.log("API Response:", {
        status: response.status,
        data: response.data,
        headers: response.headers,
        timestamp: new Date().toISOString()
      }); */

      if (response.data.accessToken) {
        // Decode the token to log its contents
        const decodedToken = jwtDecode<DecodedToken>(response.data.accessToken);
       // console.log("Decoded Token:", decodedToken);

        // Prepare the data to be sent to Redux store
        const authData = {
          token: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          user: {
            email: decodedToken.email,
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastName,
            roles: decodedToken.roles,
            permissions: decodedToken.permissions,
            name: decodedToken.name,
            clientId: decodedToken.clientId
          }
        };

       // console.log("Data being sent to Redux store:", authData);

        // Dispatch credentials to Redux store
        dispatch(setCredentials({
          token: response.data.accessToken,
          refreshToken: response.data.refreshToken
        }));

        setMessage({ type: "success", text: "OTP verified successfully!" });
          router.push("/dashboard");
      } else {
        setMessage({ 
          type: "error", 
          text: response.data.message || "Invalid OTP. Please try again." 
        });
      }
    } catch (err) {
      console.error("API Error:", {
        error: err,
        timestamp: new Date().toISOString()
      });

      if (axios.isAxiosError(err)) {
        console.error("Axios Error Details:", {
          message: err.message,
          code: err.code,
          config: err.config,
          response: err.response,
          isAxiosError: err.isAxiosError
        });

        const errorMessage = err.response?.data?.message || "Failed to verify OTP. Please try again.";
        setMessage({ type: "error", text: errorMessage });
      } else {
        setMessage({ type: "error", text: "An unexpected error occurred" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap">
      <div className="pointer-events-none relative hidden h-screen select-none md:block md:w-1/2">
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
          <p className="whitespace-nowrap text-gray-500">
            Enter the Verification code we just sent to <span className="text-gray-800 font-semibold">{email}</span> 
          </p>
          <hr className="my-6" />

          <div className="flex flex-col justify-start w-full">
            <form onSubmit={validateOTP}>
              <div className="mb-4">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  className="items-center text-black"
                >
                  <InputOTPGroup>
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        className="mx-4 border rounded-[6px] h-14 w-14 text-xl"
                        index={index}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {message && (
                <div
                  className={`my-4 px-4 py-3 text-sm font-medium rounded ${
                    message.type === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="mt-3 mb-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full py-3 items-center justify-center rounded-lg dark:bg-gray-900 font-medium tracking-wide text-white dark:text-white
                   shadow-md ring-gray-200 transition duration-200 hover:bg-gray-900 bg-gray-700 focus:outline-none focus:ring"
                >
                  {loading ? "Verifying..." : "Verify"}
                </button>
              </div>
            </form>

            <h1 className="mt-4 md:mt-6 text-lg font-normal text-center font-poppins text-gray-400">
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