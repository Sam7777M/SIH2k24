import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

        const { email, password } = formData;

        // Basic validation
        if (!email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Login successful!");
                setError(null);
                console.log("User Data:", data.user);
                // Store user details in localStorage/sessionStorage if needed
                localStorage.setItem("user", JSON.stringify(data.user));
                // Redirect or perform further actions
            } else {
                setError(data.message || "Invalid credentials.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
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
            <form className="w-full max-w-md bg-transparent p-6 rounded-md space-y-8" onSubmit={handleSubmit}>
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

                {/* Password Input */}
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

                {/* Error and Success Messages */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                    <Link
                        to="/dashboard1"  // Replace with the path you want for the login page
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg py-3 rounded-md w-full max-w-xs text-center inline-block"
                    >
                        LOGIN
                    </Link>
                </div>

                {/* Register Link */}
                <div className="flex justify-center mt-4">
                    <Link
                        to="/registration" // Adjust the path to your registration page
                        className="text-white underline text-sm hover:text-blue-500"
                    >
                        Don't have an account? Register
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
