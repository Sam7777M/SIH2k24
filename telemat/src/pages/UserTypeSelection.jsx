import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserTypeSelection = () => {
    const navigate = useNavigate();

    return (
        <div
            className="h-screen w-screen flex flex-col justify-center items-center bg-gray-100"
            style={{
                backgroundImage: 'url("https://example.com/background.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Select Your Role</h1>
            <div className="space-y-4">
                {/* Fleet Owner Button */}
                <Link to="/dop">
                    <button
                        className="bg-blue-500 text-white py-3 px-8 rounded-md text-lg font-semibold hover:bg-blue-600"
                    >
                        I'm a Fleet Owner
                    </button>
                </Link>

                {/* DOP Button */}
                <Link to="/3pl">
                    <button
                        className="bg-green-500 text-white py-3 px-8 rounded-md text-lg font-semibold hover:bg-green-600"
                    >
                        I'm DOP
                    </button>
                </Link>

                {/* 3PL Button */}
                <Link to="/threepl">
                    <button
                        className="bg-orange-500 text-white py-3 px-8 rounded-md text-lg font-semibold hover:bg-orange-600"
                    >
                        I'm 3PL
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default UserTypeSelection;
