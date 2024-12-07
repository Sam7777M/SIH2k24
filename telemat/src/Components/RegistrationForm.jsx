import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccessMessage("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/login3"); // Redirect to the success page
      }, 2000); // Wait for 2 seconds before redirecting
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="mt-16 h-[60vh] w-[80vw] sm:h-[60vh] md:h-[70vh] lg:h-[120vh] xl:h-[130vh] bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Truck_map_concept.png/800px-Truck_map_concept.png")',
        backgroundBlendMode: "darken",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <form
        className="w-full max-w-md bg-transparent p-6 rounded-md space-y-8"
        onSubmit={handleSubmit}
      >
        {["name", "email", "phone", "companyName"].map((field) => (
          <div key={field} className="space-y-2">
            <label
              htmlFor={field}
              className="block text-white text-lg font-semibold text-left"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
              className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        {["password", "confirmPassword"].map((field) => (
          <div key={field} className="space-y-2">
            <label
              htmlFor={field}
              className="block text-white text-lg font-semibold text-left"
            >
              {field === "confirmPassword"
                ? "Confirm Password"
                : "Create Password"}
            </label>
            <input
              type="password"
              id={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter your ${
                field === "confirmPassword"
                  ? "confirmation password"
                  : "password"
              }`}
              className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-3 rounded-md w-full max-w-xs"
          >
            Submit
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <Link
            to="/login3"
            className="text-white underline text-sm hover:text-orange-500"
          >
            I have an account - Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
