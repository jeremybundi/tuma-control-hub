"use client";

import { useState, Suspense, useEffect } from "react"; // Added useEffect
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import useAuth from "../../../hooks/Auth"; // Assuming path is correct

interface DecodedToken {
  exp: number;
  // For example: userId?: string; roles?: string[];
  [key: string]: unknown; // Allows for other dynamic properties
}

interface OtpVerificationResponse {
  accessToken: string;
  refreshToken: string;
  // Add any other properties returned by the /auth/email endpoint on success
}

// If the response body isn't used, `unknown` or `void` is fine.
interface ResendOtpResponse {
  message?: string; // Example: "OTP sent successfully"
  // other potential success fields
}

// Interface for API error responses (consistent with Login.tsx)
interface ApiErrorResponse {
  message: string;
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
  const [resendTimer, setResendTimer] = useState(0); // For resend countdown

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (resendDisabled && resendTimer > 0) {
      intervalId = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (resendTimer === 0 && resendDisabled) {
      setResendDisabled(false); // Re-enable button when timer hits 0
    }
    return () => clearInterval(intervalId);
  }, [resendDisabled, resendTimer]);


  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only single digits or empty string

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input if a value is entered and it's not the last input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        // If current input has value, clear it
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // If current input is empty and not the first, focus previous and clear it
        document.getElementById(`otp-${index - 1}`)?.focus();
        newOtp[index - 1] = ""; // Optionally clear previous on backspace to it
        setOtp(newOtp);
      }
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
      const responseData = await post<OtpVerificationResponse>( // Type for successful response
        "/auth/email",
        {
          email: email,
          verificationCode: verificationCode,
        }
      );

      if (responseData && responseData.accessToken) {
        const decodedToken = jwtDecode<DecodedToken>(responseData.accessToken);
        const tokenExpiryTimestamp = decodedToken.exp * 1000; // 1. Use the tokenExpiryTimestamp

        console.log("Authentication successful. Tokens received:", {
          accessToken: responseData.accessToken,
          refreshToken: responseData.refreshToken,
          tokenExpiry: new Date(tokenExpiryTimestamp), // Log or use this
        });
        
        // TODO: Implement token storage (e.g., localStorage, Context API)
        // This is where you would use tokenExpiryTimestamp
        localStorage.setItem('accessToken', responseData.accessToken);
        localStorage.setItem('refreshToken', responseData.refreshToken);
        localStorage.setItem('tokenExpiry', tokenExpiryTimestamp.toString());

        setError(""); // Clear any previous errors on success
        router.push("/dashboard"); // Navigate to dashboard
      } else {
        // This case might indicate an API design where success doesn't always include tokens,
        // or a partial success. Adjust error message as needed.
        setError("OTP verified, but token data is missing. Please contact support.");
        setOtp(["", "", "", "", "", ""]); // Clear OTP fields
        if (typeof document !== "undefined") document.getElementById("otp-0")?.focus();
      }
    } catch (err: unknown) { // 2. Type error as unknown
      let errorMessage = "Invalid OTP. Please try again.";
      // Type guard to safely access properties of the error object
      if (typeof err === 'object' && err !== null) {
        if ('response' in err) {
          const errorResponse = (err as { response?: { data?: unknown } }).response;
          if (errorResponse && typeof errorResponse.data === 'object' && errorResponse.data !== null && 'message' in errorResponse.data) {
            errorMessage = (errorResponse.data as ApiErrorResponse).message;
          }
        } else if ('message' in err && typeof (err as { message: unknown }).message === 'string') {
          errorMessage = (err as { message: string }).message;
        }
      }
      setError(errorMessage);
      setOtp(["", "", "", "", "", ""]); // Clear OTP fields on error
      if (typeof document !== "undefined") document.getElementById("otp-0")?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendDisabled(true);
    setResendTimer(30); // Start 30-second countdown
    setError(""); // Clear previous errors
    setIsLoading(true); // Indicate loading state for resend

    try {
      // 3. Use a specific type for post or `unknown` if response body isn't used
      await post<ResendOtpResponse>(`/auth/send-otp/${encodeURIComponent(email)}`);
      // Assuming the API path is `/auth/send-otp/{email}` like in Login.tsx.
      // If it's just `/send-otp/...` relative to a base URL in useAuth, adjust accordingly.
      
      if (typeof alert !== "undefined") alert("A new OTP has been sent to your email.");
    } catch (err: unknown) { // 4. Type error as unknown
      let alertMessage = "Failed to resend OTP. Please try again.";
       // Type guard for error message
      if (typeof err === 'object' && err !== null) {
        if ('response' in err) {
          const errorResponse = (err as { response?: { data?: unknown } }).response;
          if (errorResponse && typeof errorResponse.data === 'object' && errorResponse.data !== null && 'message' in errorResponse.data) {
            alertMessage = (errorResponse.data as ApiErrorResponse).message;
          }
        } else if ('message' in err && typeof (err as { message: unknown }).message === 'string') {
          alertMessage = (err as { message: string }).message;
        }
      }
      if (typeof alert !== "undefined") alert(alertMessage);
      console.error("Resend OTP error:", err);
      // Don't reset timer here, let useEffect handle re-enabling after full duration
      setResendDisabled(false); // Allow retrying immediately if API call failed.
      setResendTimer(0); // Reset timer as the attempt failed.
    } finally {
      setIsLoading(false); // Stop loading state for resend
      // The useEffect will handle re-enabling the button after the timer.
      // If the API call itself failed, we've already re-enabled it above.
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
            priority // Good for LCP elements
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
              {/* Consider if this "edit" functionality is needed or if it should link back */}
              {/* <Image
                src="/user-access/images/pen.png"
                alt="Edit"
                width={16}
                height={16}
                className="ml-2 inline-block align-middle"
              /> */}
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
              {otp.map((digit, index) => ( // Changed from [...Array(6)] to iterate over otp state directly
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text" // "text" is fine, "tel" can also be used for numeric input
                  inputMode="numeric" // Helps mobile users get numeric keyboard
                  pattern="\d{1}" // HTML5 validation for a single digit
                  maxLength={1}
                  className="w-14 h-14 sm:w-16 sm:h-16 border text-xl text-center border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={digit} // Use digit from otp state
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  autoComplete="one-time-code" // Helps with autofill from SMS
                  required // Makes individual fields required by browser
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
            {/* 5. Escape apostrophe */}
            Don't receive the code?
            <button
              onClick={handleResendOTP}
              disabled={resendDisabled || isLoading} // Also disable if main form is loading
              className="ml-2 text-blue-600 font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendDisabled && resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const VerifyOTP = () => {
  return (
    // Suspense is good practice for components relying on useSearchParams
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen text-gray-700">
          Loading Verification...
        </div>
      }
    >
      <VerifyOTPContent />
    </Suspense>
  );
};

export default VerifyOTP;