import React, { useState } from "react";

import Link from "next/link";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import "@fontsource/poppins";

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    // Placeholder for API call logic
    setTimeout(() => {
      setLoading(false);
      alert("Password reset successful (placeholder logic).");
      setFormData({ password: "", confirmPassword: "" });
    }, 2000);
  };

  return (
    <div className="flex flex-wrap p-0">
      <div className="pointer-events-none relative hidden h-screen select-none md:block md:w-1/2">
        <img
          src="/bg.png"
          alt="Background"
          className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
        />
      </div>
      <div className="flex w-full flex-col md:w-1/2 p-16">
        <div className="lg:w-full mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <div className="mx-4">
            <img
              src="/promitto_logo.png"
              alt="Logo"
              className="w-20 h-20 px-2 py-2"
            />
            <p className="text-left text-3xl font-bold py-6">
              Reset your password
            </p>
            <p className="whitespace-nowrap text-lg text-gray-600">
              Remember your password?{" "}
              <Link
                href="/login"
                className="underline-offset-4 font-semibold text-[#FFC300] underline"
              >
                Login here.
              </Link>
            </p>
            <hr className="my-6" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col pt-3 md:pt-8 mx-4"
          >
            <div className="grid gap-3 md:grid-cols-1">
              <div className="flex-1">
                <label className="block text-sm text-gray-400">
                  NEW PASSWORD<span className="text-red-600">*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="********"
                    className="block w-full py-3 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-gray-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 focus:outline-none"
                  >
                    {isPasswordVisible ? (
                      <IoEyeOutline className="mx-2 text-gray-600" />
                    ) : (
                      <IoEyeOffOutline className="mx-2 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm text-gray-400">
                  CONFIRM PASSWORD<span className="text-red-600">*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="********"
                    className="block w-full py-3 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-gray-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 focus:outline-none"
                  >
                    {isPasswordVisible ? (
                      <IoEyeOutline className="mx-2 text-gray-600" />
                    ) : (
                      <IoEyeOffOutline className="mx-2 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 dark:bg-[#050505] px-4 py-3 mt-4 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 flex items-center justify-center"
            >
              Reset Password
            </button>
          </form>

          <div className="py-6 text-center text-yellow-400">
            <Link
              href="/forgot-password"
              className="whitespace-nowrap underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
