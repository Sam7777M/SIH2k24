import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login2 = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        try {
            const response = await fetch("http://localhost:5000/api/login2", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            setSuccessMessage("Login successful!");
            localStorage.setItem("email", formData.email);
            navigate("/dashboard2", { state: { companyName: data.companyName } });
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
            <form className="w-full max-w-md bg-transparent p-6 rounded-md space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-white text-lg font-semibold mb-2 text-left">
                        Email Address*
                    </label>
                    <input
                        type="email"
                        id="email" // Updated ID to match the backend
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="block text-white text-lg font-semibold mb-2 text-left">
                        Password*
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg py-3 rounded-md w-full max-w-xs text-center"
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
    );
};

export default Login2;
