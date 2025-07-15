import React, { useRef } from "react";
import axios from "axios";

export default function Contact() {
  const userRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const handlerForm = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!userRef.current?.value) {
      alert("Name is missing");
      userRef.current?.focus();
      return;
    }
    if (!emailRef.current?.value) {
      alert("Email not found");
      emailRef.current?.focus();
      return;
    }

    try {
      const res = await axios.post("http://localhost:5055/contact", {
        username: userRef.current?.value,
        email: emailRef.current?.value,
        msg: msgRef.current?.value,
      });
      if (res.status === 200) {
        alert("Request sent successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-gray-900 pt-20 pb-10 px-6 md:px-16">
      <hr className="mb-12 w-[10%] mx-auto border-dashed border-2 border-gray-400" />
      <div className="flex flex-col md:flex-row items-center justify-around gap-10 max-w-6xl mx-auto">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="h-[300px] md:h-[350px] w-full max-w-xs md:max-w-md rounded-xl shadow-xl shadow-gray-800 object-cover"
            src="frontPic.jpg"
            alt="Contact"
          />
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-6 text-center md:text-left">
            Contact <span className="text-red-500">Us</span>
          </p>
          <form className="flex flex-col space-y-4 text-white">
            <div>
              <label className="text-base sm:text-lg">Name</label>
              <input
                ref={userRef}
                type="text"
                placeholder="Enter your name"
                className="mt-1 w-full px-4 py-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring-blue-500 "
              />
            </div>
            <div>
              <label className="text-base sm:text-lg">Email</label>
              <input
                ref={emailRef}
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-base sm:text-lg">Message</label>
              <textarea
                ref={msgRef}
                rows={4}
                placeholder="Write your message here..."
                className="mt-1 w-full px-4 py-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
          <button
            onClick={handlerForm}
            className="mt-5 w-full md:w-auto px-6 py-2 text-lg bg-red-600 hover:bg-red-700 rounded-md text-white transition"
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
}
