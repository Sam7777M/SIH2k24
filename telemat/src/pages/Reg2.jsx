import React from "react";
import Navbar from "../Components/Navbar";
import RegisterForm from "../Components/RegistrationForm";
import RegistrationForm2 from "../Components/RegistrationForm2";
import Dr1 from "../Components/Dr1";

{/* 3PL REGISTRATION FORM  */}

const Reg2 = () => {
  return (
    <div
    className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"

    style={{
        backgroundImage: 'url("/public/images/Reg2.jpeg")',
        backgroundBlendMode: "multiply", // Ensures both the image and color blend nicely
        backgroundColor: "rgba(75, 65, 65, 0.8)", // Adds the overlay color
    }}
    >
        <Navbar/>
        <h1 className="text-black text-center text-7xl font-bold mb-4 mt-[150px]">
  Welcome to <span className="text-black">EaseMyDelivery</span> - Register <br/> now to optimize your logistic <br/> experience
</h1>

<div 
  style={{
    width: "80%", // Adjust width as needed
    height: "2px", // Thickness of the line
    backgroundColor: "white", // Line color
    margin: "20px auto", // Centers the line and adds spacing
  }}
></div>

<div className="mt-8 space-y-4">
  <button
    className="bg-white hover:bg-white text-black py-2 px-6 rounded-lg w-[500px] mx-auto"
    style={{ fontSize: "18px" }}
  >
    I am the Client (Want my goods to be Delivered)
  </button>

  
</div>

<div className=" mt-8 space-y-4">
<button
    className="bg-white hover:bg-white text-black py-2 px-6 rounded-lg w-[500px] mx-auto"
    style={{ fontSize: "18px" }}
  >
    I am the Fleet Owner (Have Truck and Driver)
  </button>

</div>

<div className="mt-8 space-y-4">
  <button
    className="bg-blue-500 hover:bg-blue-600 text-black py-2 px-6 rounded-lg w-[500px] mx-auto"
    style={{ fontSize: "18px" }}
  >
    I am the 3PL (Want my goods to be Delivered)
  </button>

  
</div>


 <Dr1/>
</div>
    
    
  );
};

export default Reg2;