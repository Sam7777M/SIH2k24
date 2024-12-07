import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const formFields = [
  {
    id: "name",
    label: "Full Name*",
    type: "text",
    placeholder: "Enter your full name",
    required: true,
  },
  {
    id: "address",
    label: "Address*",
    type: "text",
    placeholder: "Enter your address",
    required: true,
  },
  {
    id: "aadhaarNumber",
    label: "Aadhaar Number*",
    type: "text",
    placeholder: "Enter your Aadhaar number",
    required: true,
  },
  {
    id: "phoneNumber",
    label: "Phone Number*",
    type: "text",
    placeholder: "Enter your phone number",
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
    placeholder: "Enter your password here",
    required: true,
  },
  {
    id: "vehicleNumber",
    label: "Vehicle Number*",
    type: "text",
    placeholder: "Enter your vehicle number",
    required: true,
  },
  {
    id: "truckCapacity",
    label: "Truck Capacity (kg)*",
    type: "number",
    placeholder: "Enter your truck capacity in kg",
    required: true,
  },
];

const Drive = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    aadhaarNumber: "",
    phoneNumber: "",
    email: "",
    password: "",
    vehicleNumber: "",
    truckCapacity: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/drive",
        formData
      );
      if (response.status === 201) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login4");
        }, 2000);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div
      className="mt-16 h-[60vh] w-[80vw] sm:h-[60vh] md:h-[70vh] lg:h-[120vh] xl:h-[150vh] bg-cover bg-center"
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
        {formFields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label
              htmlFor={field.id}
              className="block text-white text-lg font-semibold mb-2 text-left"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              value={formData[field.id]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={field.required}
            />
          </div>
        ))}

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm">{successMessage}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md"
        >
          Register
        </button>

        <p className="mt-4 text-white text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Drive;
