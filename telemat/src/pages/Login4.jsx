import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login4 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/login4", {
        email,
        password,
      });
   
      if (response.status === 200) {
        localStorage.setItem('email',email);
        {/*localStorage.setItem('name', response.data.name);
        localStorage.setItem('objectId', response.data.objectId);*/}
        alert("Login successful!");
        navigate("/upload");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Invalid email or password. Try again."
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-16 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-2 rounded-md border"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-2 rounded-md border"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login4;
