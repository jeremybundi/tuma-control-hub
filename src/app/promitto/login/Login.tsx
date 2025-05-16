"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import "@fontsource/poppins";

function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.username) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `https://auth.tuma-app.com/api/auth/send-otp/${formData.username}`
      );
      
      console.log("OTP sent successfully:", response.data);
      router.push(`/verify-otp?email=${encodeURIComponent(formData.username)}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || "Failed to send OTP. Please try again.";
        setError(errorMessage);
        console.error("OTP sending failed:", errorMessage);
      } else {
        setError("An unexpected error occurred");
        console.error("OTP sending error:", err);
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
      <div className="flex w-full flex-col md:w-1/2 p-16 pr-36">
        <div className="lg:w-full mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <div className="mx-4">
            <img
              src="/promitto_logo.png"
              alt="Logo"
              className="w-20 h-20 px-2 py-2"
            />
            <p className="text-left text-3xl font-bold py-6">
              Login to your account
            </p>
            <p className="whitespace-nowrap text-lg text-gray-600">
              No account?{" "}
              <Link
                href="/signup"
                className="underline-offset-4 font-semibold text-[#FFC300] underline"
              >
                Sign Up.
              </Link>
            </p>
            <hr className="my-6" />
          </div>

          {error && (
            <div className="mx-4 mb-4 text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col pt-3 md:pt-8 mx-4"
          >
            <div className="grid gap-3 md:grid-cols-1">
              <div className="flex-1">
                <label className="block text-[17px] mb-3 text-gray-400">
                  Enter Your Email
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border bg-white px-2 py-3 text-[20px] dark:text-black outline-none ring-gray-400 focus:ring-1"
                  placeholder="Please Enter Your Email"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-gray-900 dark:bg-[#050505] px-4 py-3 mt-10 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 flex items-center justify-center"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>

          <center>
            <div className="py-6 -mr-18 text-yellow-400">
              <Link
                href="/forgot-password"
                className="whitespace-nowrap underline"
              >
                Forgot password?
              </Link>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}

export default Login;