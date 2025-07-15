import React, { useState, useRef } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showpassword, Setshowpassword] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const passwordHandler = () => {
    Setshowpassword(!showpassword);
  };

  const submitLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5055/users/login", {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });

      if (res.status === 200) {
        const { token  } : any  = res.data;
        localStorage.setItem("authToken", `Bearer ${token}`);
        alert("Login successfully");
        navigate("/Homepage");
      } else {
        alert("Wrong credentials! Please check again.");
      }
    } catch (error: any) {
      console.error("Failed to login: ", error.message);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex items-center justify-center font-sans px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-screen-lg grid md:grid-cols-2 gap-6 p-6 md:p-10">
      
        <div className="hidden md:flex items-center justify-center">
          <img
            src="/frontPic.jpg"
            alt="Hotel"
            className="w-full max-h-[460px] object-cover rounded-lg shadow"
          />
        </div>

      
        <div className="flex flex-col justify-center w-full">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Welcome to <span className="text-orange-500 font-bold">Spinix</span>
            <div className="text-base font-normal mt-1 text-gray-500">Login to continue</div>
          </h2>

          <form onSubmit={submitLoginForm} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">Username</label>
              <input
                ref={usernameRef}
                type="text"
                placeholder="Enter username"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative flex items-center">
                <input
                  ref={passwordRef}
                  type={showpassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 pr-10 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                  onClick={passwordHandler}
                >
                  {showpassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-blue-500 text-sm hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 text-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/Signup")}
              className="text-blue-600 underline hover:text-blue-800"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
