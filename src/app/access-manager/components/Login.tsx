"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Make API call to send OTP
      const response = await axios.post(
        `https://auth.tuma-app.com/api/auth/send-otp/${encodeURIComponent(email)}`
      );
  
      if (response.status === 200) {
        setNotification("An OTP has been sent to your email. Please verify.");
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
      console.error("OTP sending error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-poppins items-center justify-center bg-gray-100">
      <div className="w-full max-w-full overflow-hidden flex">
        {/* Left Column: Image */}
        <div className="w-1/2 relative">
          <Image
            src="/user-access/images/lady.png"
            alt="Lady"
            width={500}
            height={500}
            loading="lazy"
            className="h-screen w-full object-cover"
          />
        </div>

        {/* Right Column: Form */}
        <div className="w-1/2 mt-32 px-24 pr-36">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 flex items-center gap-4">
            <Image src="/user-access/images/logo.png" alt="Logo" width={40} height={35} />
            Control Hub
          </h2>
          <h1 className="text-2xl text-gray-800 font-semibold mb-8">Login to your account</h1>
          <p className="text-gray-400 font-medium text-lg mb-6">
          Don&apos;t have an account?{" "}
            <Link href="/" className="text-blue-600 underline">
              Request for Access
            </Link>
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4 text-center">
              {error}
            </div>
          )}

          {/* Notification Message */}
          {notification && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-center">
              {notification}
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-5 flex items-center text-gray-400">
                {/* Envelope Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                  <path d="M2 6l10 7 10-7" />
                </svg>
              </div>

              {/* Input Field */}
              <input
                type="email"
                className="w-full px-14 py-3 border text-lg border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-6 bg-gray-800 hover:bg-gray-900 text-white font-semibold text-xl py-3 rounded-lg transition duration-300 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Sending OTP..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;