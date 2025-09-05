import React, { useState } from "react";
import {
  Settings,
  Hospital,
  Users,
  FileText,
  Calendar,
  Bell,
  LogOut,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useAuth } from "@/context/HospitalAuthContext";

// Import tab components
import Overview from "./Overview";
import Patients from "./Patients";
import Appointments from "./Appointments";
import Records from "./Records";
import MySettings  from "./Settings";

/* ===== Types ===== */
interface Vitals {
  bp: string;
  hr: string;
  temp: string;
  weight: string;
}

interface Prescription {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface MedicalRecord {
  id: number;
  date: string;
  hospital: string;
  doctor: string;
  diagnosis: string;
  prescriptions: Prescription[];
  notes?: string;
  vitals: Vitals;
}

interface PersonalInfo {
  nationalId: string;
  name: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  bloodType: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  allergies: string[];
}

interface Patient {
  personalInfo: PersonalInfo;
  medicalHistory: MedicalRecord[];
}

/* ===== Hospital Info ===== */
const hospitalInfo = {
  name: "City General Hospital",
  address: "456 Health Ave, Medical City, MC 12345",
  phone: "+1 (555) 987-6543",
  email: "admin@citygeneralhospital.com",
  license: "HOS-2024-001",
  specialties: ["Cardiology", "Neurology", "Orthopedics", "Emergency Medicine"],
};

const samplePatientData: Patient = {
  personalInfo: {
    nationalId: "NI123456789",
    name: "Sarah Johnson",
    dateOfBirth: "1985-03-15 A",
    age: 38,
    gender: "Female",
    bloodType: "O+",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@email.com",
    address: "123 Main St, City, State 12345",
    emergencyContact: "John Johnson - +1 (555) 987-6543",
    allergies: ["Penicillin", "Shellfish"],
  },
  medicalHistory: [
    {
      id: 1,
      date: "2024-01-15",
      hospital: "Metro Health Center",
      doctor: "Dr. Lisa Rodriguez",
      diagnosis: "Hypertension",
      prescriptions: [
        {
          medication: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily",
          duration: "30 days",
        },
        {
          medication: "Amlodipine",
          dosage: "5mg",
          frequency: "Once daily",
          duration: "30 days",
        },
      ],
      notes: "Patient responding well to treatment. Blood pressure stable.",
      vitals: { bp: "130/85", hr: "72", temp: "98.6°F", weight: "165 lbs" },
    },
    {
      id: 2,
      date: "2023-12-10",
      hospital: "City General Hospital",
      doctor: "Dr. Michael Chen",
      diagnosis: "Type 2 Diabetes",
      prescriptions: [
        {
          medication: "Metformin",
          dosage: "500mg",
          frequency: "Twice daily",
          duration: "90 days",
        },
      ],
      notes:
        "Initial diagnosis. Patient education provided on diet and exercise.",
      vitals: { bp: "140/90", hr: "78", temp: "98.4°F", weight: "170 lbs" },
    },
  ],
};

interface NavigationContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavigationContent: React.FC<NavigationContentProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { label: "Overview", value: "overview", icon: Hospital },
    { label: "Patients", value: "patients", icon: Users },
    { label: "Appointments", value: "appointments", icon: Calendar },
    { label: "Records", value: "records", icon: FileText },
    { label: "Settings", value: "settings", icon: Settings },
  ];

  return (
    <nav className="flex flex-col space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.value}
            variant={activeTab === item.value ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab(item.value)}
          >
            <Icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
};

export default function HospitalDashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [searchPatientId, setSearchPatientId] = useState<string>("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showAddRecordDialog, setShowAddRecordDialog] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { user } = useAuth();
  console.log("Authenticated Hospital User:", user);

  const handlePatientSearch = () => {
    if (searchPatientId === "NI123456789") {
      setSelectedPatient(samplePatientData);
    } else {
      setSelectedPatient(null);
      alert("Patient not found. Try NI123456789 for demo.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <Hospital className="h-6 w-6 text-blue-600" />
                    <span className="text-sm">{hospitalInfo.name}</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <NavigationContent activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
              </SheetContent>
            </Sheet>
            <Hospital className="h-6 w-6 text-blue-600" />
            <div>
              <h1 className="text-lg font-bold text-gray-900 truncate">
                City General
              </h1>
              <p className="text-xs text-gray-500">Hospital Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">CG</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Hospital className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {user?.name ?? "Hospital Admin 1"}
                </h1>
                <p className="text-sm text-gray-500">Hospital Portal</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-medicare.jpg" />
              <AvatarFallback>CG</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">Dr. Admin</p>
              <p className="text-gray-500">Administrator</p>
            </div>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <nav className="hidden lg:block w-64 bg-white border-r border-gray-200 fixed left-0 top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
          <div className="p-6">
            <NavigationContent activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 lg:ml-64">
          {activeTab === "overview" && (
            <Overview 
              setActiveTab={setActiveTab} 
              setShowAddRecordDialog={setShowAddRecordDialog} 
            />
          )}
          {activeTab === "patients" && (
            <Patients
              searchPatientId={searchPatientId}
              setSearchPatientId={setSearchPatientId}
              selectedPatient={selectedPatient}
              setSelectedPatient={setSelectedPatient}
              handlePatientSearch={handlePatientSearch}
            />
          )}
          {activeTab === "appointments" && <Appointments />}
          {activeTab === "records" && <Records />}
          {activeTab === "settings" && <MySettings />}
        </main>
      </div>
    </div>
  );
}
