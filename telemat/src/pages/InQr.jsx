import React from "react";
import Navbar from "../Components/Navbar";
import RegisterForm from "../Components/RegistrationForm";
import Qreg from '../Components/Qreg';

const InQr = () => {
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
       

<div className="mt-8 space-y-4">
  

  
</div>

<div className=" mt-8 space-y-4">

</div>
 <Qreg/>
</div>
  );
};

export default InQr;
