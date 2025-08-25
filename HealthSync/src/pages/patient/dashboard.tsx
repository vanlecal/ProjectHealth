import PatientDashboard from "@/components/patient/patient-dashboard";
import { AuthProvider } from "@/context/AuthContext";

export default function UserDashboard() {
  return (
    <AuthProvider>
        <PatientDashboard />
    </AuthProvider>
  );
}