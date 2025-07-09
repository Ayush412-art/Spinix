import React,{ useState, useRef } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showpassword, Setshowpassword] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate: any = useNavigate();

  const passwordHandler = () => {
    if (!showpassword) {
      Setshowpassword(true);
    } else {
      Setshowpassword(false);
    }
  };
  const submitLoginForm = async (e: React.FormEvent<HTMLButtonElement>) => {

    e.preventDefault();
     //Enter the post Route for data saving!!
    try {
      const res: any = await axios.post(" ", {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });

      if (res.status == 200) {
        const {token} = res.data;
        localStorage.setItem("authToken" , `Bearer ${token}`)
        alert("login sucessfully");
        navigate("/Homepage")
      } else {
        alert("wrong credentials ! please check once again");
      }
    } catch (error: any) {
      console.error("Failed to login : ", error.message);
    }
  };
  return (
    <section className="bg-gray-300  h-screen w-full flex items-center justify-center">
      <div className=" bg-slate-100 shadow-lg flex items-center gap-32  mx-auto w-[70%]  ">
        <div className="w-1/2">
          <img
            className="h-[460px] w-[550px] shadow-sm shadow-gray-800"
            src="frontPic.jpg"
            alt="image_hotel"
          ></img>
        </div>
        <div className="grid space-y-2  ">
          <h2 className="font-medium text-center text-2xl mb-5">
            Welcome to Spinix!
            <br />
            <span className="text-orange-500">Login here</span>
          </h2>
          <form  className="grid space-y-2 ">
            <label>username : </label>
            <input
              ref={usernameRef}
              className="px-4 py-1 bg-transparent  border-[1px]"
              type="text"
              placeholder="username"
            ></input>
            <label>password : </label>
            <div className="relative flex items-center ">
              <input
                ref={passwordRef}
                className="px-4 pr-10 py-1  bg-transparent border-[1px]"
                type={showpassword ? "text" : "password"}
                placeholder="password"
              ></input>
              <span
                className="absolute right-3 cursor-pointer"
                onClick={passwordHandler}
              >
                {showpassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <a href="" className="text-blue-600  text-sm">
              forget password?
            </a>

            <button
              onClick={() => submitLoginForm}
              className="w-25 px-2 py-1 text-lg bg-red-600 hover:bg-red-700 rounded-lg text-white"
            >
              login
            </button>
          </form>
          <span>
            Don't have an account?{" "}
            <a
              onClick={() => navigate("/Signup")}
              className="text-blue-600 text-center underline text-sm"
              href=""
            >
              sign up
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
