import { AuthProvider } from "@/context/HospitalAuthContext";
import HospitalDashboard from "@/components/hospital/hospital-dashboard";

export default function HospitalUserDashboard() {
  return (
    <AuthProvider>
        <HospitalDashboard />
    </AuthProvider>
  );
}