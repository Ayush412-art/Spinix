import React from "react";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const  SignUp = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const mobRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //  Input Validations
    if (!nameRef.current?.value.trim()) {
      alert("Please enter your name");
      nameRef.current?.focus();
      return;
    }
    if (!cityRef.current?.value.trim()) {
      alert("Please enter city name");
      cityRef.current?.focus();
      return;
    }
    if (!mobRef.current?.value.trim()) {
      alert("Please enter a valid mobile number");
      mobRef.current?.focus();
      return;
    }
    if (!countryRef.current?.value.trim()) {
      alert("Please enter country name");
      countryRef.current?.focus();
      return;
    }
    if (!passwordRef.current?.value.trim()) {
      alert("Please enter password");
      passwordRef.current?.focus();
      return;
    }

    try {
      const formData = {
        username: nameRef.current.value.trim(),
        city: cityRef.current.value.trim(),
        mobile: mobRef.current.value.trim(),
        country: countryRef.current.value.trim(),
        password: passwordRef.current.value.trim(),
      };

      const response = await axios.post("http://localhost:5055/users/signup", formData);

      if (response.status === 201) {
        alert("User created successfully!");
        navigate("/Homepage");
      } else {
        alert("Failed to create user. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error: Could not create user.");
    }
  };

  return (
    <section className="flex justify-center items-center h-screen bg-gray-300">
      <div className="bg-slate-100 p-8 rounded shadow-md w-full max-w-md m-5">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up here</h2>
        
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              ref={nameRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="User Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
            <input
              ref={cityRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="City"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Mobile</label>
            <input
              ref={mobRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Mobile Number"
              maxLength={10}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
            <input
              ref={countryRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Country"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              ref={passwordRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
