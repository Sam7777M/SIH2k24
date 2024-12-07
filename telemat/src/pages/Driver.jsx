import React from "react";
import Navbar from "../Components/Navbar";
import RegisterForm from "../Components/RegistrationForm";
import Dr1 from "../Components/Dr1";
import Drive from "../Components/Drive";

const Driver = () => {
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
        <h1 className="text-black text-center text-7xl font-bold mb-4 mt-[160px]">
   <span className="text-black">"Drive Success, Deliver Excellence – Partner with Us Today!"</span>  <br/> <br/> 
</h1>

<div className="mt-8 space-y-4">
 

  
</div>

<div className=" mt-8 space-y-4">

</div>
 <Drive/>
</div>
  );
};

export default Driver;
