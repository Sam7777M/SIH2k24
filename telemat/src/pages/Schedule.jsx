import React from "react";
import Navbar from "../Components/Navbar";
import RegisterForm from "../Components/RegistrationForm";
import ScheduleReg from "../Components/ScheduleReg";

const Schedule = () => {
  return (
    <div
    className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"

    style={{
        backgroundImage: 'url("/public/images/ScheduleReg.jpeg")',
        backgroundBlendMode: "darken",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    }}
    >
        <Navbar/>

 <ScheduleReg/>
</div>
    
    
  );
};

export default Schedule;
