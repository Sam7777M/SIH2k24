import React, { useState } from "react";
import { Link } from "react-router-dom";

const Fo2= () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phone, companyName, password, confirmPassword } = formData;

        // Basic form validation
        if (!name || !email || !phone || !companyName || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Submit form data to backend
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Registration successful!");
                setError(null);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    companyName: "",
                    password: "",
                    confirmPassword: "",
                });
            } else {
                setError(data.message || "An error occurred.");
            }
        } catch (error) {
            setError("There was a problem with the registration.");
        }
    };

    return (
        <div
            className="mt-16 h-[60vh] w-[80vw] sm:h-[60vh] md:h-[70vh] lg:h-[120vh] xl:h-[130vh] bg-cover bg-center"
            style={{
                backgroundImage:
                    'url("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Truck_map_concept.png/800px-Truck_map_concept.png")',
                backgroundBlendMode: "darken",
                backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay for better visibility of text
            }}
        >
            <form className="w-full max-w-md bg-transparent p-6 rounded-md space-y-8" onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-white text-lg font-semibold mb-2 text-left">
                       suaaaar
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your Name here"
                        className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Email Address Input */}
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-white text-lg font-semibold mb-2 text-left">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your Email Address here"
                        className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Phone No Input */}
                <div className="space-y-2">
                    <label htmlFor="phone" className="block text-white text-lg font-semibold mb-2 text-left">
                        Phone No
                    </label>
                    <input
                        type="text"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your Phone No here"
                        className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Company Name Input */}
                <div className="space-y-2">
                    <label htmlFor="companyName" className="block text-white text-lg font-semibold mb-2 text-left">
                        Company Name
                    </label>
                    <input
                        type="text"
                        id="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Enter your Company Name here"
                        className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Create Password Input */}
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-white text-lg font-semibold mb-2 text-left">
                        Create Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your Password here"
                        className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-white text-lg font-semibold mb-2 text-left">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter your Password"
                        className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Error and Success Messages */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                <Link
                        to="/fo2" // Replace with your target route
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-3 rounded-md w-full max-w-xs text-center block"
                    >
                        NEXT
                    </Link>
                </div>

                {/* Sign In Button */}
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

export default Fo2;
