import React, { useState } from "react";

import Link from "next/link";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import "@fontsource/poppins";

function VerifyAccount() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

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
      alert("Login successful (placeholder logic).");
      setFormData({ username: "", password: "" });
    }, 2000);
  };

  return (
    <div className=" flex  flex-wrap p-0">
      <div className="pointer-events-none relative hidden h-screen select-none  md:block md:w-1/2">
        <img
          src="/bg.png"
          alt="Background"
          className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
        />
      </div>
      <div className="flex w-3/4 flex-col md:w-1/2 p-16">
        <div className="lg:w-full mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <div className="mx-4">
            <img
              src="/promitto_logo.png"
              alt="Logo"
              className="w-20 h-20 px-2 py-2"
            />
            <p className="text-left text-3xl font-bold py-6">
              Forgot your password?
            </p>
            <p className="whitespace-nowrap text-lg text-gray-600">
              Please provide your phone number / email for password reset
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col pt-3 md:pt-8 mx-4"
          >
            <div className="grid gap-3 md:grid-cols-1">
              <div className="flex-1">
                <label className="block text-sm text-gray-400">
                  PHONE NUMBER / EMAIL<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border bg-white px-2 py-3 dark:text-black outline-none ring-gray-400 focus:ring-1"
                  placeholder=""
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 dark:bg-[#050505] px-4 py-3 mt-4 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 flex items-center justify-center"
            >
              Login
            </button>
          </form>
          <h1 className="mt-4 md:mt-6 text-lg font-normal text-center font-poppins text-gray-400 ">
            Already have an account?
          </h1>
          <span>
            <div className="py-6 text-center text-yellow-400">
              <Link
                href="/forgot-password"
                className="whitespace-nowrap  underline"
              >
                Login
              </Link>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount;
