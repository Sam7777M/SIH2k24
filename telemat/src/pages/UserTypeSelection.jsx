import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserTypeSelection = () => {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: 'url("/images/Reg2.jpeg")',
                backgroundBlendMode: "multiply", // Ensures both the image and color blend nicely
                backgroundColor: "rgba(75, 65, 65, 0.8)", // Adds the overlay color
            }}
        >
            
        
            <div
  className="rounded-lg shadow-lg w-[60%] h-[80vh] mx-auto flex flex-col justify-center items-center"
  style={{
    backgroundPosition: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Background overlay
    backgroundBlendMode: "overlay", // Makes the overlay visible
  }}
>
  {/* Title */}
  <div className="text-5xl font-bold text-white mb-12 text-center">
    Select Your Role
  </div>

  {/* Buttons Section */}
  <div className="flex flex-col gap-5 items-center w-full">
    {/* Fleet Owner Button */}
    <Link to="/dop">
      <button
        className="text-white rounded-md text-lg font-semibold transition-transform transform hover:scale-105"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay for better visibility
          height: "60px",
          width: "800px", // Relative width for better responsiveness
          borderRadius: "15px",
        }}
      >
        I'm a Delivery Partner
      </button>
    </Link>

    {/* DOP Button */}
    <Link to="/dop">
      <button
        className="text-white rounded-md text-lg font-semibold transition-transform transform hover:scale-105"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay for better visibility
          height: "60px",
          width: "800px",
          borderRadius: "15px",
        }}
      >
        I'm DOP
      </button>
    </Link>

    {/* 3PL Button */}
    <Link to="/3pl">
      <button
        className="text-white rounded-md text-lg font-semibold transition-transform transform hover:scale-105"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay for better visibility
          height: "60px",
          width: "800px",
          borderRadius: "15px",
        }}
      >
        I'm 3PL
      </button>
    </Link>
  </div>
</div>


        
 

        </div>

    );
};

export default UserTypeSelection;
