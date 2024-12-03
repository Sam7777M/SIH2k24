import React, { useState } from "react";
import { Link } from "react-router-dom";

const Fo1 = () => {
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

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        setError("");
        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccessMessage("Data saved successfully!");
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
            } else {
                setError(data.message || "Error saving data.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div
            className="mt-16 h-auto w-[80vw] sm:h-auto md:h-auto lg:h-auto xl:h-auto bg-cover bg-center"
            style={{
                backgroundImage:
                    'url("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Truck_map_concept.png/800px-Truck_map_concept.png")',
                backgroundBlendMode: "darken",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
        >
            <form
                className="w-full max-w-md mx-auto bg-transparent p-6 rounded-md space-y-8"
                onSubmit={handleSubmit}
            >
                {/* Form Fields */}
                {[
                    { id: "name", label: "Name", placeholder: "Enter your name" },
                    { id: "city", label: "City", placeholder: "Enter your city" },
                    { id: "phone", label: "Phone No", placeholder: "Enter your phone number" },
                    { id: "companyName", label: "Company Name", placeholder: "Enter your company name" },
                    { id: "password", label: "Create Password", placeholder: "Enter your password", type: "password" },
                    { id: "confirmPassword", label: "Confirm Password", placeholder: "Re-enter your password", type: "password" },
                    { id: "truck", label: "Truck Detail", placeholder: "Enter truck number" },
                    { id: "preferredFrom", label: "Lane From", placeholder: "From" },
                    { id: "preferredTo", label: "Lane To", placeholder: "To" },
                    { id: "preferredCost", label: "Preferred Cost", placeholder: "Enter cost" },
                ].map(({ id, label, placeholder, type = "text" }) => (
                    <div key={id} className="space-y-2">
                        <label htmlFor={id} className="block text-white text-lg font-semibold">
                            {label}
                        </label>
                        <input
                            type={type}
                            id={id}
                            value={formData[id]}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}

                {/* Error and Success Messages */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-3 rounded-md w-full max-w-xs text-center"
                    >
                        NEXT
                    </button>
                </div>

                {/* Sign In Link */}
                <div className="flex justify-center mt-4">
                    <Link
                        to="/login"
                        className="text-white underline text-sm hover:text-orange-500"
                    >
                        I have an account - Sign In
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Fo1;
