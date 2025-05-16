"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import useAuth from "../../../hooks/Auth"; 

interface DecodedToken {
  exp: number;
  [key: string]: unknown;
}

interface OtpVerificationResponse {
  accessToken: string;
  refreshToken: string;
}

const VerifyOTPContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const { post } = useAuth();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
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

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
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
    setError("");
    const verificationCode = otp.join("");

    if (verificationCode.length !== 6) {
      setError("Please enter a 6-digit OTP");
      setIsLoading(false);
      return;
    }

    try {
      const responseData = await post<OtpVerificationResponse>(
        "/auth/email",
        {
          email: email,
          verificationCode: verificationCode,
        }
      );

      if (responseData && responseData.accessToken) {
        const decodedToken = jwtDecode<DecodedToken>(responseData.accessToken);
        const tokenExpiry = decodedToken.exp * 1000;

      /*  console.log("Authentication successful. Tokens received:", {
          accessToken: responseData.accessToken,
          refreshToken: responseData.refreshToken,
          tokenExpiry: new Date(tokenExpiry),
        }); */
        
        // TODO: Implement token storage (e.g., localStorage, Context API)
        // localStorage.setItem('accessToken', responseData.accessToken);
        // localStorage.setItem('refreshToken', responseData.refreshToken);
        // localStorage.setItem('tokenExpiry', tokenExpiry.toString());

        setError("");
        router.push("/dashboard");
      } else {
        setError("Invalid OTP or unexpected response. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        if (typeof document !== "undefined") document.getElementById("otp-0")?.focus();
      }
    } catch (err: any) {
      let errorMessage = "Invalid OTP. Please try again.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setOtp(["", "", "", "", "", ""]);
      if (typeof document !== "undefined") document.getElementById("otp-0")?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendDisabled(true);
    setError("");
    try {
      await post<any>(`/send-otp/${encodeURIComponent(email)}`);
      if (typeof alert !== "undefined") alert("A new OTP has been sent to your email.");
    } catch (err: any) {
      let alertMessage = "Failed to resend OTP. Please try again.";
      if (err.response && err.response.data && err.response.data.message) {
        alertMessage = err.response.data.message;
      }
      if (typeof alert !== "undefined") alert(alertMessage);
      console.error("Resend OTP error:", err);
    } finally {
      setTimeout(() => {
        setResendDisabled(false);
      }, 30000);
    }
  };

  return (
    <div className="flex min-h-screen font-poppins items-center justify-center bg-gray-100">
      <div className="w-full max-w-full overflow-hidden flex">
        <div className="w-1/2 relative">
          <Image
            src="/user-access/images/lady.png"
            alt="Verification"
            width={500}
            height={500}
            className="h-screen w-full object-cover"
            priority
          />
        </div>

        <div className="w-1/2 mt-32 px-24 pr-40">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 flex items-center gap-4">
            <Image
              src="/user-access/images/logo.png"
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
                src="/user-access/images/pen.png"
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
                  autoComplete="off"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-6 bg-gray-800 text-white font-semibold text-xl py-3 rounded-lg transition duration-300 ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-gray-900"
              }`}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500 text-lg">
            Don't receive the code?
            <button
              onClick={handleResendOTP}
              disabled={resendDisabled}
              className="ml-2 text-blue-600 font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const VerifyOTP = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <VerifyOTPContent />
    </Suspense>
  );
};

export default VerifyOTP;