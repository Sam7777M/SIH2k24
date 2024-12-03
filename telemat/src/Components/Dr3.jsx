import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dr3 = () => {
    const [formData, setFormData] = useState({
        hrs: "",
        des: "",
        mno: "",
        service: "",
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Input validation
        if (!formData.hrs || !formData.des || !formData.mno || !formData.service) {
            setError("All fields are required.");
            setSuccessMessage("");
            return;
        }

        // Form submission logic (e.g., make API call here)

        setSuccessMessage("Form submitted successfully!");
        setError(""); // Clear any previous error
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
            <form
                className="w-full max-w-md bg-transparent p-6 rounded-md space-y-8"
                onSubmit={handleSubmit}
            >
                {/* Operational Hours Input */}
                <div className="space-y-2">
                    <label
                        htmlFor="hrs"
                        className="block text-white text-lg font-semibold mb-2 text-left"
                    >
                        Operational Hours*
                    </label>
                    <input
                        type="text"
                        id="hrs"
                        name="hrs"
                        value={formData.hrs}
                        onChange={handleChange}
                        placeholder="Enter operational hours (e.g., 9:00 AM - 6:00 PM)"
                        className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Point of Contact Designation Input */}
                <div className="space-y-2">
                    <label
                        htmlFor="des"
                        className="block text-white text-lg font-semibold mb-2 text-left"
                    >
                        Point of Contact Designation*
                    </label>
                    <input
                        type="text"
                        id="des"
                        name="des"
                        value={formData.des}
                        onChange={handleChange}
                        placeholder="Enter the designation (e.g., Assistant Postmaster)"
                        className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Mobile Number Input */}
                <div className="space-y-2">
                    <label
                        htmlFor="mno"
                        className="block text-white text-lg font-semibold mb-2 text-left"
                    >
                        Mobile Number*
                    </label>
                    <input
                        type="text"
                        id="mno"
                        name="mno"
                        value={formData.mno}
                        onChange={handleChange}
                        placeholder="Enter the mobile number (e.g., 9876543210)"
                        className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Service Type Dropdown */}
                <div className="space-y-2">
                    <label
                        htmlFor="service"
                        className="block text-white text-lg font-semibold mb-2 text-left"
                    >
                        Service Type*
                    </label>
                    <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>
                            DoP-Specific Services
                        </option>
                        <option value="Registered Mail">Registered Mail</option>
                        <option value="Speed Post">Speed Post</option>
                        <option value="Logistics Post">Logistics Post</option>
                        <option value="Book Post">Book Post</option>
                        <option value="Business Mail">Business Mail</option>
                    </select>
                </div>

                {/* Error and Success Messages */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                    <Link
                        to="/reg13" // Replace with your target route
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

export default Dr3;
