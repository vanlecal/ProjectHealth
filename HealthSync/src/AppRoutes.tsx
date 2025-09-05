import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import PatientDashboard from "./components/patient/patient-dashboard";
import PatientRegister from "./pages/patient/PateintRegister";
import PatientLogin from "./pages/patient/PatientLogin";
import HospitalDashboard from "./components/hospital/hospital-dashboard";
import UserDashboard from "./pages/patient/dashboard";
import HospitalRegister from "./pages/hospital/HospitalRegister";
import HospitalUserDashboard from "./pages/hospital/dashboard";
import HospitalLogin from "./pages/hospital/HospitalLogin";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Homepage />} />
        <Route path="/Home" element={<Homepage />} />

        {/* Patient Routes */}
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient/dashboard" element={<UserDashboard />} />
        <Route path="/patient/signup" element={<PatientRegister />} />
        <Route path="/patient/login" element={<PatientLogin />} />

        {/* Hospital Routes */}
        <Route path="/hospital/d" element={<HospitalDashboard />} />
        <Route path="/hospital/dashboard" element={<HospitalUserDashboard />} />
        <Route path="/hospital/register" element={<HospitalRegister />} />
        <Route path="/hospital/login" element={<HospitalLogin />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
