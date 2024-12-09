import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const formFields = [
  {
    id: "registrationNumber",
    label: "Government Registration Number*",
    type: "text",
    placeholder: "Ex. 1234-INDPOST-MUM",
    required: true,
  },
  {
    id: "email",
    label: "Email*",
    type: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    id: "password",
    label: "Create Password*",
    type: "password",
    placeholder: "Enter your Password here",
    required: true,
  },
  {
    id: "confirmPassword",
    label: "Confirm Password*",
    type: "password",
    placeholder: "Re-enter your Password",
    required: true,
  },
  {
    id: "serviceType",
    label: "Service Type*",
    type: "select",
    options: [
      { value: "", label: "Select your service type", disabled: true },
      { value: "Postal Service", label: "Postal Service" },
      { value: "Courier Service", label: "Courier Service" },
      { value: "Other", label: "Other" },
    ],
    required: true,
  },
];

const Dr4 = () => {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    serviceType: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    try {
      // Post form data to the backend
      const response = await axios.post("http://localhost:5000/api/registers", formData);

      if (response.status === 201) {
        setSuccessMessage("User registered successfully!");
        setTimeout(() => navigate("/login2"), 2000); // Redirect to login page after 2 seconds
      }
    } catch (err) {
      // Display error message from the backend
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="mt-16 h-[60vh] w-[80vw] sm:h-[60vh] md:h-[70vh] lg:h-[100vh] xl:h-[115vh] bg-cover bg-center rounded-2xl"
      style={{
        backgroundBlendMode: "darken",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <form
        className="w-full max-w-md bg-transparent p-6 rounded-md space-y-8"
        onSubmit={handleSubmit}
      >
        {formFields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label
              htmlFor={field.id}
              className="block text-white text-lg font-semibold mb-2 text-left"
            >
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                id={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                className="w-full p-3 text-white  bg-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 rounded-2xl"
                required={field.required}
              >
                {field.options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full p-3 text-white  bg-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 rounded-2xl"
                required={field.required}
              />
            )}
          </div>
        ))}

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

       
      </form>
      <button
          type="submit"
         className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-3 rounded-3xl w-full max-w-xs text-center block"
        >
          SUBMIT
        </button>

        <p className="mt-4 text-white text-center">
          Already have an account?{" "}
          <Link to="/login2" className="text-blue-400">
            Login
          </Link>
        </p>
    </div>
  );
};

export default Dr4;
