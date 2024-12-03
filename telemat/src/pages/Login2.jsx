import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login2 = () => {
    const [formData, setFormData] = useState({
        emailid: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.emailid || !formData.password) {
            setError("All fields are required.");
            setSuccessMessage("");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include", // Only if needed for cookies/sessions
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setSuccessMessage(data.message);
            setError("");

            // Redirect to dashboard page
            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
            setSuccessMessage("");
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
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
                {/* Email Input */}
                <div className="space-y-2">
                    <label htmlFor="emailid" className="block text-white text-lg font-semibold mb-2 text-left">
                        Email*
                    </label>
                    <input
                        type="email"
                        id="emailid"
                        value={formData.emailid}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-white text-lg font-semibold mb-2 text-left">
                        Password*
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
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-3 rounded-md w-full max-w-xs text-center"
                    >
                        LOGIN
                    </button>
                </div>

                {/* Sign Up Link */}
                <div className="flex justify-center mt-4">
                    <Link
                        to="/register"
                        className="text-white underline text-sm hover:text-orange-500"
                    >
                        Don't have an account? - Register
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login2;
