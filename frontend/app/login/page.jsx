"use client"
import React, {   useState } from "react";
import Image from 'next/image'
 
const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:8800/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-100">
    <div className="  flex md:flex-row flex-col px-5 sm:px-16">
      {/* Left Side Image */}
      <div className="md:w-3/6">
      <Image src="/login.png" width={850} height={850} alt="" />
 
      </div>
  
      {/* Right Side Registration Form */}
      <div className="md:w-3/6 p-8 md:p-16 rounded shadow-xl bg-slate-50">
        <h2 className="text-2xl font-semibold mb-4 text-purple-800">Login</h2>
     <form onSubmit={onSubmitForm}>
       
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
         type="text"
         name="email"
         value={email}
         onChange={e => onChange(e)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
        type="password"
        name="password"
        value={password}
        onChange={e => onChange(e)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
            placeholder="Enter your password"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 my-2 rounded-lg hover:bg-purple-800"
        >
         Login
        </button>
      </form>
      </div>
  </div>
</div>
  )
}

export default Login
