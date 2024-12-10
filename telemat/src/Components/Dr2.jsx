

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Make sure to install axios

const Dr2 = () => {
    // State to store form inputs
    
    return (
        <div
        className="mt-16 h-[60vh] w-[80vw] sm:h-[60vh] md:h-[70vh] lg:h-[95vh]  bg-cover bg-center rounded-3xl"
        style={{
          backgroundBlendMode: "darken",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
        >
            <form className="w-full max-w-md bg-transparent p-6 rounded-md space-y-8">
                {/* Office Contact Number */}
                <div className="space-y-2">
                    <label htmlFor="cno" className="block text-white text-lg font-semibold mb-2 text-left">
                        Office Contact Number*
                    </label>
                    <input
                        type="text"
                        id="cno"
                        placeholder="Enter the office contact number (e.g., 022-12345678)"
                        className="w-full p-3 text-white  bg-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 rounded-2xl"
                    />
                </div>

                {/* Office Email ID */}
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-white text-lg font-semibold mb-2 text-left">
                        Office Email ID*
                    </label>
                    <input
                        type="email"
                        id="email"
                        
                        placeholder="Enter the official email ID (e.g., example@dop.gov.in)"
                        className="w-full p-3 text-white  bg-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 rounded-2xl"
                    />
                </div>

                {/* Point of Contact Designation */}
                <div className="space-y-2">
                    <label htmlFor="point" className="block text-white text-lg font-semibold mb-2 text-left">
                        Point of Contact Designation*
                    </label>
                    <input
                        type="text"
                        id="point"
                        
                        placeholder="Enter the designation (e.g., Assistant Postmaster)"
                        className="w-full p-3 text-white  bg-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 rounded-2xl"
                    />
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                    <label htmlFor="mobno" className="block text-white text-lg font-semibold mb-2 text-left">
                        Mobile Number 
                    </label>
                    <input
                        type="text"
                        id="mobno"
                       
                        placeholder="Enter the mobile number (e.g., 9876543210)"
                        className="w-full p-3 text-white  bg-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 rounded-2xl"
                    />
                </div>

                {/* Error and Success Messages */}
               
                
            </form>
             {/* Submit Button */}
             <div className="flex justify-center mt-6">
                <Link
                        to="/reg12" // Replace with your target route
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-3 w-full max-w-xs text-center block rounded-3xl"
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
        </div>
    );
};

export default Dr2;
