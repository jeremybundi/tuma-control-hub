"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import DashboardModal from "./DashboardModal"; // Import the modal component

const VerifyOTPContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only a single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 4) {
      document.getElementById(`otp-${index + 1}`)?.focus(); // Move to next input
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus(); // Move to previous input
      const newOtp = [...otp];
      newOtp[index - 1] = ""; // Clear previous input
      setOtp(newOtp);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 5) {
      setError("Please enter a 5-digit OTP");
      return;
    }

    if (enteredOtp !== "12345") {
      setError("Invalid OTP. Please try again.");
      setOtp(["", "", "", "", ""]);
      document.getElementById("otp-0")?.focus();
      return;
    }

    // OTP verification success
    setError("");
    setTimeout(() => {
      setIsModalOpen(true); 
    }, 1500);
  };

  const handleResendOTP = () => {
    setResendDisabled(true);
    setTimeout(() => {
      setResendDisabled(false);
      alert("A new OTP has been sent to your email.");
    }, 3000);
  };

  return (
    <div className="flex min-h-screen font-poppins items-center justify-center bg-gray-100">
      <div className="w-full max-w-full overflow-hidden flex">
        {/* Left Column: Image */}
        <div className="w-1/2 relative">
          <Image
            src="/images/lady.png"
            alt="Lady"
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Column: OTP Verification */}
        <div className="w-1/2 mt-32 px-24 pr-40">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 flex items-center gap-4">
            <Image src="/images/logo.png" alt="Logo" width={40} height={35} />
            Control Hub
          </h2>
          <h1 className="text-2xl text-gray-800 font-semibold mb-8">OTP Verification</h1>
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

          {/* Horizontal Line */}
          <div className="w-full border-t border-gray-300 mb-10"></div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4 text-center">
              {error}
            </div>
          )}

          {/* OTP Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex justify-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  className="w-16 h-16 border text-xl text-center border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-gray-800 hover:bg-gray-900 text-white font-semibold text-xl py-3 rounded-lg transition duration-300"
            >
              Verify
            </button>
          </form>

          {/* Resend OTP */}
          <p className="mt-6 text-center text-gray-500 text-lg">
            Didn’t receive the code? 
            <button 
              onClick={handleResendOTP} 
              disabled={resendDisabled} 
              className="ml-2 text-blue-600 font-semibold hover:underline disabled:opacity-50">
              Resend
            </button>
          </p>
        </div>
      </div>

      {/* Dashboard Modal */}
      {isModalOpen && <DashboardModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

// Wrap in Suspense to avoid Next.js pre-rendering issues
const VerifyOTP = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
};

export default VerifyOTP;
