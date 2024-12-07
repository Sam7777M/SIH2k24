import React, { useState } from "react";
import API from "../api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    companyName: "",
    password: "",
    confirmPassword: "",
    truck: "",
    preferredFrom: "",
    preferredTo: "",
    preferredCost: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await API.post("/partner/register", formData);
      alert(response.data.message);
      setFormData({
        name: "",
        city: "",
        phone: "",
        companyName: "",
        password: "",
        confirmPassword: "",
        truck: "",
        preferredFrom: "",
        preferredTo: "",
        preferredCost: "",
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}</label>
            <input
              type={key.includes("password") ? "password" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
