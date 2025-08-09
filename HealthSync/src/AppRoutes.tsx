import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import PatientDashboard from "./components/patient/patient-dashboard";
import PatientRegister from "./pages/patient/PateintRegister";
import PatientLogin from "./pages/patient/PatientLogin";
import HospitalDashboard from "./components/hospital/hospital-dashboard";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Home" element={<Homepage />} />
        <Route path="/user" element={<PatientDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient/signup" element={<PatientRegister />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/hospital" element={<HospitalDashboard />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
