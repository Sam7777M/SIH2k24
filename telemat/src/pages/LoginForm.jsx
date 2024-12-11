

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const LoginForm = () => {
  const [formData, setFormData] = useState({ companyName: "", password: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [userCompanyName, setUserCompanyName] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setSuccessMessage("Login successful!");
      setUserCompanyName(data.companyName);
      navigate("/upload", { state: { companyName: data.companyName } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
    className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"

      style={{
        backgroundImage: 'url("/public/images/Reg2.jpeg")',
        backgroundBlendMode: "multiply", // Ensures both the image and color blend nicely
        backgroundColor: "rgba(75, 65, 65, 0.8)", // Adds the overlay color
      }}
    >

<Navbar/>

<div
            className="mt-16  w-[30vw]  bg-cover bg-center rounded-3xl"
            style={{
                backgroundImage:
                    'url("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Truck_map_concept.png/800px-Truck_map_concept.png")',
                backgroundBlendMode: "darken",
                backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay for better visibility of text
            }}
        >
      <form
        className=" max-w-md bg-transparent p-6 rounded-md space-y-8 "
        onSubmit={handleSubmit}
      >
        <div className="space-y-2">
          <label htmlFor="companyName" className="block text-white text-lg font-semibold mb-2 text-left">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter your Company Name"
            className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-white text-lg font-semibold mb-2 text-left">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your Password"
            className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg py-3 rounded-md w-full max-w-xs text-center inline-block"
          >
            LOGIN
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <Link
            to="/registration"
            className="text-white underline text-sm hover:text-blue-500"
          >
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
