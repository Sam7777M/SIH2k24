import React from "react";
import Navbar from "../Components/Navbar";
import RegisterForm from "../Components/RegistrationForm";
import Dr1 from "../Components/Dr1";

const Threepl = () => {
  return (
    <div
    className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"

    style={{
        backgroundImage: 'url("/public/images/Reg2.jpeg")',
        backgroundBlendMode: "darken",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    }}
    >
        <Navbar/>
        <h1 className="text-black text-center text-7xl font-bold mb-4 mt-[150px]">
  Welcome to <span className="text-black">SAARTHI</span> - Register <br/> now to optimize your logistic <br/> experience
</h1>

<div className="mt-8 space-y-4">
  <button
    className="bg-blue-500 hover:bg-blue-600 text-black py-2 px-6 rounded-lg w-[500px] mx-auto"
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
 <RegisterForm/>
</div>
  );
};

export default Threepl;
