// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { QrCodeProvider } from "./pages/QrCodeContext";

// Import your pages and components
import Aopt from "./pages/Aopt";
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
import ScheduleReg from "./Components/ScheduleReg";
import Qreg from "./Components/Qreg";
import Dashboard2 from "./pages/Dashboard2";
import Dashboard3 from "./pages/Dashboard3";
import Dr1 from "./Components/Dr1";
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
import Fleetnot from "./pages/Fleetnot";
import Dopnot from "./pages/Dopnot";
import UploadQRCode from "./pages/UploadQRCode";
import TrackingPage from "./pages/Tracking";
import LiveTracking from "./pages/LiveTracking";
import Map from "./pages/Map";
import Login3 from "./pages/Login3";
import Driver from "./pages/Driver";
import Login4 from "./pages/Login4";
import ShowDataPage from "./pages/ShowDataPage";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Live2 from "./pages/Live2";
import Schedulet from "./pages/Shdeulet";
import Qregt from "./Components/Qregt";
import ChoosePartnert from "./pages/ChoosePartnert";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51PAxNDSArgUNjTehUXTcr7o8CyzN7rC8aj4JHZJS6USeA55oVHaX823hHXmb4DO76XKxvzOQ16TIsYGtudmANxpQ00BEVjODTk");

function App() {
    return (
        <Elements stripe={stripePromise}>
            <QrCodeProvider>
                <Router>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/monitor" element={<Monitor />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/aopt" element={<Aopt />} />
                            <Route path="/dashboard" element={<UserTypeSelection />} />
                            <Route path="/fleet-owner" element={<Reg1 />} />
                            <Route path="/3pl" element={<Reg2 />} />
                            <Route path="/dop" element={<Reg3 />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/schedule1" element={<Schedule />} />
                            <Route path="/schedulet" element={<Schedulet />} />
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
                            <Route path="/show-data" element={<ShowDataPage />} />
                            <Route path="/fo2" element={<Fo2 />} />
                            <Route path="/reg32" element={<Reg32 />} />
                            <Route path="/reg33" element={<Lomda />} />
                            <Route path="/login2" element={<Login2 />} />
                            <Route path="/threepl" element={<Threepl />} />
                            <Route path="/schedule-reg" element={<ScheduleReg />} />
                            <Route path="/live" element={<Live />} />
                            <Route path="/choosepartner" element={<ChoosePartner />} />
                            <Route path="/fleetnot" element={<Fleetnot />} />
                            <Route path="/dopnot" element={<Dopnot />} />
                            <Route path="/upload" element={<UploadQRCode />} />
                            <Route path="/tracking" element={<TrackingPage />} />
                            <Route path="/livetracking" element={<LiveTracking />} />
                            <Route path="/map" element={<Map />} />
                            <Route path="/login3" element={<Login3 />} />
                            <Route path="/driver" element={<Driver />} />
                            <Route path="/login4" element={<Login4 />} />
                            <Route path="/dashboardd" element={<Dashboard />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/rashboard1" element={<Dashboard1 />} />
                            <Route path="/live2" element={<Live2 />} />
                            <Route path="/qregt" element={<Qregt />} />
                            <Route path="/choosepartnert" element={<ChoosePartnert />} />
                        </Routes>
                    </div>
                </Router>
            </QrCodeProvider>
        </Elements>
    );
}

export default App;
