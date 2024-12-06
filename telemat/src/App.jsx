// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QrCodeProvider } from "./pages/QrCodeContext";
import Aopt from "./pages/Aopt";
import SharedRoute from "./Components/SharedRoute";
import Live from "./pages/Live";
import Monitor from "./pages/Monitor";
import Dashboard1 from "./pages/Dashboard1";
import Reg1 from "./pages/Reg1";
import Homepage from "./pages/Homepage";
import Services from "./pages/Services";
import Reg2 from "./pages/Reg2";
import Reg3 from "./pages/Reg3";
import UserTypeSelection from "./pages/UserTypeSelection";
import LoginForm from "./pages/LoginForm";
import Schedule from "./pages/Schedule";
import InQr from "./pages/InQr";
import ScheduleReg from "./components/ScheduleReg";
import Qreg from "./components/Qreg";
import Dashboard2 from "./pages/Dashboard2";
import Dashboard3 from "./pages/Dashboard3";
import Dr1 from "./Components/Dr1";
import Dr2 from "./Components/Dr2";
import Dr3 from "./Components/Dr3";
import Dr4 from "./Components/Dr4";
import Reg11 from "./pages/Reg11";
import Reg12 from "./pages/Reg12";
import Reg13 from "./pages/Reg13";
import Reg14 from "./pages/Reg14";
import Fo1 from "./Components/Fo1";
import Fo2 from "./Components/Fo2";
import Reg32 from "./pages/Reg32";
import Lomda from "./pages/Lomda";
import Login2 from "./pages/Login2";
import Threepl from "./pages/Threepl";
import ChoosePartner from "./pages/ChoosePartner";
import PartnerDashboard from "./pages/Dashboard1";


function App() {
  return (
    <QrCodeProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Use `element` instead of `component` */}
            <Route path="/" element={<Services />} />
            <Route path="/monitor" element={<Monitor />} />
            <Route path="/services" element={<Services />} />
            <Route path="/aopt" element={<Aopt />} />
            <Route path="/dashboard" element={<UserTypeSelection />} />
            <Route path="/fleet-owner" element={<Reg1 />} />
            <Route path="/3pl" element={<Reg2 />} />
            <Route path="/dop" element={<Reg3 />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/schedule1" element={<Schedule />} />
            <Route path="/qreg" element={<Qreg />} />
            <Route path="/inqr" element={<InQr />} />
            <Route path="/dashboard1" element={<PartnerDashboard />} />
            <Route path="/dashboard2" element={<Dashboard2 />} />
            <Route path="/dashboard3" element={<Dashboard3 />} />
            <Route path="/dr1" element={<Dr1 />} />
            <Route path="/reg11" element={<Reg11 />} />
            <Route path="/reg12" element={<Reg12 />} />
            <Route path="/reg13" element={<Reg13 />} />
            <Route path="/reg14" element={<Reg14 />} />
            <Route path="/fo1" element={<Fo1 />} />
            <Route path="/fo2" element={<Fo2 />} />
            <Route path="/reg32" element={<Reg32 />} />
            <Route path="/reg33" element={<Lomda />} />
            <Route path="/login2" element={<Login2 />} />
            <Route path="/threepl" element={<Threepl />} />
            <Route path="/schedule-reg" element={<ScheduleReg />} />
            <Route path="/live" element={<Live />} />
            <Route path="/choosepartner" element={<ChoosePartner />} />
          </Routes>
        </div>
      </Router>
    </QrCodeProvider>
  );
}

export default App;
