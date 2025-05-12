"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import DashboardModal from "./DashboardModal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import {jwtDecode} from "jwt-decode"; // Make sure to install this package

interface DecodedToken {
  exp: number;
  [key: string]: unknown;
}

const VerifyOTPContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP
  const [error, setError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const verificationCode = otp.join("");
  
    if (verificationCode.length !== 6) {
      setError("Please enter a 6-digit OTP");
      setIsLoading(false);
      return;
    }
  
    try {
      console.log("Sending OTP verification request...");
      const response = await axios.post(
        "https://auth.tuma-app.com/api/auth/email",
        {
          email: email,
          verificationCode: verificationCode
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
  
      console.log("API Response:", response.data);
  
      if (response.status === 200 && response.data.accessToken) {
        // Decode the token to get the expiration time
        const decodedToken = jwtDecode<DecodedToken>(response.data.accessToken);
        const tokenExpiry = decodedToken.exp * 1000; // Convert to milliseconds
  
        console.log("Decoded Token Data:", {
          rawToken: response.data.accessToken,
          decoded: decodedToken,
          expiryDate: new Date(tokenExpiry),
          currentTime: new Date(),
          expiresIn: Math.round((tokenExpiry - Date.now()) / 1000 / 60) + " minutes"
        });
  
        // Dispatch action to set credentials in Redux store
        dispatch(setCredentials({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          tokenExpiry: tokenExpiry
        }));
  
        console.log("Data dispatched to Redux store:", {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          tokenExpiry: tokenExpiry
        });
        
        setError("");
        setIsVerified(true);
        setIsModalOpen(true);
      } else {
        console.warn("Unexpected API response format:", response);
        setError("Invalid OTP. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        document.getElementById("otp-0")?.focus();
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      if (axios.isAxiosError(err)) {
        console.error("Axios error details:", {
          status: err.response?.status,
          data: err.response?.data,
          headers: err.response?.headers
        });
      }
      setError("Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      document.getElementById("otp-0")?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendDisabled(true);
    try {
      await axios.post(
        `https://auth.tuma-app.com/api/auth/send-otp/${encodeURIComponent(email)}`
      );
      alert("A new OTP has been sent to your email.");
    } catch (err) {
      alert("Failed to resend OTP. Please try again.");
      console.error("Resend OTP error:", err);
    } finally {
      setTimeout(() => {
        setResendDisabled(false);
      }, 30000); // 30 seconds cooldown
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/dashboard"); // Redirect after modal closes
  };

  return (
    <div className="flex min-h-screen font-poppins items-center justify-center bg-gray-100">
      {!isVerified ? (
        <div className="w-full max-w-full overflow-hidden flex">
          {/* Left Column: Image */}
          <div className="w-1/2 relative">
            <Image
              src="/images/lady.png"
              alt="Verification"
              width={500}
              height={500}
              className="h-screen w-full object-cover"
              priority
            />
          </div>

          {/* Right Column: OTP Form */}
          <div className="w-1/2 mt-32 px-24 pr-40">
            <h2 className="text-4xl font-bold text-gray-800 mb-12 flex items-center gap-4">
              <Image 
                src="/images/logo.png" 
                alt="Logo" 
                width={40} 
                height={35} 
              />
              Control Hub
            </h2>
            
            <h1 className="text-2xl text-gray-800 font-semibold mb-8">
              OTP Verification
            </h1>
            
            <p className="text-gray-400 font-medium text-lg mb-7">
              Enter the verification code we just sent to <br />
              <span className="font-medium text-gray-900 flex items-center">
                {email}          
                <Image 
                  src="/images/pen.png" 
                  alt="Edit" 
                  width={16} 
                  height={16} 
                  className="ml-2 inline-block align-middle"
                />
              </span>
            </p>

            <div className="w-full border-t border-gray-300 mb-10"></div>

            {error && (
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4 text-center">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex justify-between">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    className="w-16 h-16 border text-xl text-center border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={otp[index] || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full mt-6 bg-gray-800 text-white font-semibold text-xl py-3 rounded-lg transition duration-300 ${
                  isLoading ? "opacity-70" : "hover:bg-gray-900"
                }`}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-500 text-lg">
            Don&apos;t receive the code? 
              <button 
                onClick={handleResendOTP} 
                disabled={resendDisabled} 
                className="ml-2 text-blue-600 font-semibold hover:underline disabled:opacity-50"
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      ) : null}

      <DashboardModal 
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

const VerifyOTP = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
};

export default VerifyOTP;