import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dr1 = () => {
    // State for form fields
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [address, setAddress] = useState('');
    const [region, setRegion] = useState('');
    const [circle, setCircle] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State for error and success messages
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare form data
        const formData = {
            name,
            code,
            address,
            region,
            circle,
            confirmPassword,
        };

        try {
            // Send POST request to backend to register the user
            const response = await axios.post('https://sih-2k24-seven.vercel.app/api/register-office', formData);  // Adjust the endpoint as needed
            if (response.data.success) {
                setSuccessMessage('Registration successful!');
                setError('');
            } else {
                setSuccessMessage('');
                setError(response.data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setSuccessMessage('');
            setError('Failed to connect to the server. Please try again later.');
        }
    };

    return (
        <div
        className="mt-16 h-[60vh] w-[80vw] sm:h-[60vh] md:h-[70vh] lg:h-[120vh] xl:h-[130vh] bg-cover bg-center rounded-3xl"
        style={{
          backgroundBlendMode: "darken",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      >
  
            <form className="w-full max-w-md bg-transparent p-6 rounded-md space-y-8" onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-white text-lg font-semibold mb-2 text-left">
                        Office Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your Name here"
                        className="w-full p-3 text-white  bg-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 rounded-2xl"

                    />
                </div>

                {/* Office Code Input */}
                <div className="space-y-2">
                    <label htmlFor="code" className="block text-white text-lg font-semibold mb-2 text-left">
                        Office Code
                    </label>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter Office Code here"
                        className="w-full p-3 text-white  bg-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 rounded-2xl"

                    />
                </div>

                {/* Address Input */}
                <div className="space-y-2">
                    <label htmlFor="address" className="block text-white text-lg font-semibold mb-2 text-left">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter Address here"
                        className="w-full p-3 text-white  bg-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 rounded-2xl"

                    />
                </div>

                {/* Region Input */}
                <div className="space-y-2">
                    <label htmlFor="region" className="block text-white text-lg font-semibold mb-2 text-left">
                        Region/Zone
                    </label>
                    <select
                        id="region"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full p-3 text-white  bg-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 rounded-2xl"

                    >
                        <option value="" disabled>Select your Region</option>
                        <option value="Northern">Northern</option>
                        <option value="Western">Western</option>
                        <option value="Southern">Southern</option>
                        <option value="Central">Central</option>
                        <option value="South-Eastern">South-Eastern</option>
                    </select>
                </div>

                {/* Circles Input */}
                <div className="space-y-2">
                    <label htmlFor="circle" className="block text-white text-lg font-semibold mb-2 text-left">
                        Circles
                    </label>
                    <select
                        id="circle"
                        value={circle}
                        onChange={(e) => setCircle(e.target.value)}
                        className="w-full p-3 text-white  bg-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 rounded-2xl"

                    >
                        <option value="" disabled>Select your Circle</option>
                        <option value="Andhra Pradesh">Andhra Pradesh Circle</option>
                        {/* Add more circle options as needed */}
                    </select>
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-white text-lg font-semibold mb-2 text-left">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your Password"
                        className="w-full p-3 text-white  bg-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 rounded-2xl"

                    />
                </div>

                {/* Error and Success Messages */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                {/* Submit Button */}
              
            </form>
            <div className="flex justify-center mt-6">
                    <Link
                        to="/reg11" // Replace with the actual path where you want to navigate
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-3 rounded-3xl w-full max-w-xs text-center block"
                    >
                        NEXT
                    </Link>
                </div>

                {/* Sign In Button */}
                <div className="flex justify-center mt-4">
                    <Link
                        to="/login2"
                        className="text-white underline text-sm hover:text-orange-500"
                    >
                        I have an account - Sign In
                    </Link>
                </div>
        </div>
    );
};

export default Dr1;
