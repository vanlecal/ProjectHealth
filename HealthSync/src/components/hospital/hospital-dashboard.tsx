import { useState } from "react";
import {
  Search,
  FileText,
  Calendar,
  Settings,
  Hospital,
  Users,
  Activity,
  Plus,
  Eye,
  Download,
  Filter,
  Bell,
  LogOut,
  Clock,
  Pill,
  Menu,
  ChevronDown,
  Phone,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Mock data (keeping the same data as before)
const hospitalInfo = {
  name: "City General Hospital",
  address: "456 Health Ave, Medical City, MC 12345",
  phone: "+1 (555) 987-6543",
  email: "admin@citygeneralhospital.com",
  license: "HOS-2024-001",
  specialties: ["Cardiology", "Neurology", "Orthopedics", "Emergency Medicine"],
};

const dashboardStats = [
  {
    label: "Total Patients",
    value: "2,847",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    label: "Today's Appointments",
    value: "24",
    change: "+8%",
    icon: Calendar,
    color: "text-green-600",
  },
  {
    label: "Records Added",
    value: "156",
    change: "+15%",
    icon: FileText,
    color: "text-purple-600",
  },
  {
    label: "Active Cases",
    value: "89",
    change: "-3%",
    icon: Activity,
    color: "text-orange-600",
  },
];

const recentPatients = [
  {
    id: "NI123456789",
    name: "Sarah Johnson",
    age: 38,
    lastVisit: "2024-01-20",
    condition: "Hypertension",
    status: "stable",
    doctor: "Dr. Michael Chen",
  },
  {
    id: "NI987654321",
    name: "Robert Smith",
    age: 45,
    lastVisit: "2024-01-19",
    condition: "Type 2 Diabetes",
    status: "monitoring",
    doctor: "Dr. Lisa Rodriguez",
  },
  {
    id: "NI456789123",
    name: "Emily Davis",
    age: 29,
    lastVisit: "2024-01-18",
    condition: "Migraine",
    status: "recovered",
    doctor: "Dr. James Wilson",
  },
];

const todayAppointments = [
  {
    id: 1,
    patientId: "NI123456789",
    patientName: "Sarah Johnson",
    time: "09:00 AM",
    doctor: "Dr. Michael Chen",
    type: "Follow-up",
    status: "confirmed",
  },
  {
    id: 2,
    patientId: "NI789123456",
    patientName: "David Brown",
    time: "10:30 AM",
    doctor: "Dr. Lisa Rodriguez",
    type: "Consultation",
    status: "confirmed",
  },
  {
    id: 3,
    patientId: "NI321654987",
    patientName: "Maria Garcia",
    time: "02:00 PM",
    doctor: "Dr. James Wilson",
    type: "Emergency",
    status: "urgent",
  },
];

const samplePatientData = {
  personalInfo: {
    nationalId: "NI123456789",
    name: "Sarah Johnson",
    dateOfBirth: "1985-03-15",
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

export default function HospitalDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchPatientId, setSearchPatientId] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddRecordDialog, setShowAddRecordDialog] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedRecord, setExpandedRecord] = useState(null);

  const handlePatientSearch = () => {
    if (searchPatientId === "NI123456789") {
      setSelectedPatient(samplePatientData);
    } else {
      setSelectedPatient(null);
      alert("Patient not found. Try NI123456789 for demo.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "stable":
        return "bg-green-100 text-green-800";
      case "monitoring":
        return "bg-yellow-100 text-yellow-800";
      case "recovered":
        return "bg-blue-100 text-blue-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const NavigationContent = () => (
    <div className="space-y-2">
      <Button
        variant={activeTab === "overview" ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("overview");
          setMobileMenuOpen(false);
        }}
      >
        <Activity className="h-4 w-4 mr-2" />
        Overview
      </Button>
      <Button
        variant={activeTab === "patient-lookup" ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("patient-lookup");
          setMobileMenuOpen(false);
        }}
      >
        <Search className="h-4 w-4 mr-2" />
        Patient Lookup
      </Button>
      <Button
        variant={activeTab === "appointments" ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("appointments");
          setMobileMenuOpen(false);
        }}
      >
        <Calendar className="h-4 w-4 mr-2" />
        Appointments
      </Button>
      <Button
        variant={activeTab === "records" ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("records");
          setMobileMenuOpen(false);
        }}
      >
        <FileText className="h-4 w-4 mr-2" />
        Medical Records
      </Button>
      <Button
        variant={activeTab === "settings" ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("settings");
          setMobileMenuOpen(false);
        }}
      >
        <Settings className="h-4 w-4 mr-2" />
        Settings
      </Button>
    </div>
  );

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
                  <NavigationContent />
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
      <header className="hidden lg:block bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Hospital className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {hospitalInfo.name}
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
              <AvatarImage src="/placeholder-hospital.jpg" />
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
        <nav className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <NavigationContent />
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Hospital Dashboard
                </h2>
                <p className="text-gray-600">
                  Welcome to your hospital management portal
                </p>
              </div>

              {/* Stats Cards - Responsive Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                {dashboardStats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-3 lg:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="mb-2 lg:mb-0">
                          <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">
                            {stat.label}
                          </p>
                          <p className="text-lg lg:text-2xl font-bold text-gray-900">
                            {stat.value}
                          </p>
                          <p
                            className={`text-xs lg:text-sm ${
                              stat.change.startsWith("+")
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {stat.change}
                          </p>
                        </div>
                        <stat.icon
                          className={`h-6 w-6 lg:h-8 lg:w-8 ${stat.color} lg:ml-4`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Patients and Today's Appointments - Stack on Mobile */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Recent Patients */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg lg:text-xl">
                      Recent Patients
                    </CardTitle>
                    <CardDescription>
                      Patients seen in the last few days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentPatients.map((patient) => (
                        <div
                          key={patient.id}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 border rounded-lg space-y-3 sm:space-y-0"
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="text-sm">
                                {patient.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm lg:text-base truncate">
                                {patient.name}
                              </p>
                              <p className="text-xs lg:text-sm text-gray-600">
                                Age {patient.age} • {patient.condition}
                              </p>
                              <p className="text-xs text-gray-500">
                                Last visit: {patient.lastVisit}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:flex-col sm:items-end sm:text-right">
                            <Badge
                              className={`${getStatusColor(
                                patient.status
                              )} text-xs`}
                            >
                              {patient.status}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1 sm:mt-1">
                              {patient.doctor}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Today's Appointments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg lg:text-xl">
                      Today's Appointments
                    </CardTitle>
                    <CardDescription>
                      Scheduled appointments for today
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {todayAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 border rounded-lg space-y-3 sm:space-y-0"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg flex-shrink-0">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm lg:text-base truncate">
                                {appointment.patientName}
                              </p>
                              <p className="text-xs lg:text-sm text-gray-600 truncate">
                                {appointment.type} • {appointment.doctor}
                              </p>
                              <p className="text-xs text-gray-500">
                                {appointment.time}
                              </p>
                            </div>
                          </div>
                          <Badge
                            className={`${getStatusColor(
                              appointment.status
                            )} text-xs self-start sm:self-center`}
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions - Responsive Grid */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Button
                      className="h-16 lg:h-20 flex-col space-y-2"
                      onClick={() => setActiveTab("patient-lookup")}
                    >
                      <Search className="h-5 w-5 lg:h-6 lg:w-6" />
                      <span className="text-sm lg:text-base">
                        Search Patient
                      </span>
                    </Button>
                    <Button
                      className="h-16 lg:h-20 flex-col space-y-2 bg-transparent"
                      variant="outline"
                      onClick={() => setShowAddRecordDialog(true)}
                    >
                      <Plus className="h-5 w-5 lg:h-6 lg:w-6" />
                      <span className="text-sm lg:text-base">Add Record</span>
                    </Button>
                    <Button
                      className="h-16 lg:h-20 flex-col space-y-2 bg-transparent"
                      variant="outline"
                      onClick={() => setActiveTab("appointments")}
                    >
                      <Calendar className="h-5 w-5 lg:h-6 lg:w-6" />
                      <span className="text-sm lg:text-base">
                        View Appointments
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Patient Lookup Tab */}
          {activeTab === "patient-lookup" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Patient Lookup
                </h2>
                <p className="text-gray-600">
                  Search for patient records using National Insurance ID
                </p>
              </div>

              {/* Search Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">
                    Search Patient
                  </CardTitle>
                  <CardDescription>
                    Enter the patient's National Insurance ID to access their
                    records
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex-1">
                      <Label htmlFor="patientId">National Insurance ID</Label>
                      <Input
                        id="patientId"
                        placeholder="e.g., NI123456789"
                        value={searchPatientId}
                        onChange={(e) => setSearchPatientId(e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        onClick={handlePatientSearch}
                        className="w-full sm:w-auto"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Patient Information */}
              {selectedPatient && (
                <div className="space-y-6">
                  {/* Patient Overview */}
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div>
                          <CardTitle className="text-xl lg:text-2xl">
                            {selectedPatient.personalInfo.name}
                          </CardTitle>
                          <CardDescription>
                            Patient ID:{" "}
                            {selectedPatient.personalInfo.nationalId}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                          <Button
                            onClick={() => setShowAddRecordDialog(true)}
                            className="w-full sm:w-auto"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Record
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full sm:w-auto bg-transparent"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">
                            Personal Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="font-medium">Age:</span>{" "}
                              {selectedPatient.personalInfo.age}
                            </p>
                            <p>
                              <span className="font-medium">Gender:</span>{" "}
                              {selectedPatient.personalInfo.gender}
                            </p>
                            <p>
                              <span className="font-medium">Blood Type:</span>{" "}
                              {selectedPatient.personalInfo.bloodType}
                            </p>
                            <p>
                              <span className="font-medium">DOB:</span>{" "}
                              {selectedPatient.personalInfo.dateOfBirth}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">
                            Contact Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="break-all">
                                {selectedPatient.personalInfo.phone}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span className="break-all">
                                {selectedPatient.personalInfo.email}
                              </span>
                            </div>
                            <p className="text-sm">
                              <span className="font-medium">Address:</span>{" "}
                              {selectedPatient.personalInfo.address}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">
                            Medical Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p className="break-all">
                              <span className="font-medium">
                                Emergency Contact:
                              </span>{" "}
                              {selectedPatient.personalInfo.emergencyContact}
                            </p>
                            <div>
                              <span className="font-medium">Allergies:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {selectedPatient.personalInfo.allergies.map(
                                  (allergy) => (
                                    <Badge
                                      key={allergy}
                                      variant="destructive"
                                      className="text-xs"
                                    >
                                      {allergy}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Medical History */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg lg:text-xl">
                        Medical History
                      </CardTitle>
                      <CardDescription>
                        Complete medical records from all hospitals
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedPatient.medicalHistory.map((record) => (
                          <Collapsible key={record.id}>
                            <CollapsibleTrigger asChild>
                              <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                <div className="flex-1">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                      <h4 className="text-base lg:text-lg font-semibold">
                                        {record.diagnosis}
                                      </h4>
                                      <p className="text-sm text-gray-600">
                                        {record.hospital} • {record.doctor}
                                      </p>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {record.date}
                                      </Badge>
                                      <ChevronDown className="h-4 w-4 text-gray-400" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div className="border-l-2 border-gray-200 ml-4 pl-4 pb-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                                  <div>
                                    <h5 className="font-medium mb-3">
                                      Vital Signs
                                    </h5>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                      <p>
                                        <span className="font-medium">BP:</span>{" "}
                                        {record.vitals.bp}
                                      </p>
                                      <p>
                                        <span className="font-medium">HR:</span>{" "}
                                        {record.vitals.hr} bpm
                                      </p>
                                      <p>
                                        <span className="font-medium">
                                          Temp:
                                        </span>{" "}
                                        {record.vitals.temp}
                                      </p>
                                      <p>
                                        <span className="font-medium">
                                          Weight:
                                        </span>{" "}
                                        {record.vitals.weight}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <h5 className="font-medium mb-3">
                                      Prescriptions
                                    </h5>
                                    <div className="space-y-2">
                                      {record.prescriptions.map(
                                        (prescription, index) => (
                                          <div
                                            key={index}
                                            className="flex items-start space-x-2 text-sm"
                                          >
                                            <Pill className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <div className="min-w-0 flex-1">
                                              <p className="font-medium break-words">
                                                {prescription.medication}
                                              </p>
                                              <p className="text-gray-600 break-words">
                                                {prescription.dosage} -{" "}
                                                {prescription.frequency}
                                              </p>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {record.notes && (
                                  <div className="mt-4">
                                    <h5 className="font-medium mb-2">
                                      Doctor's Notes
                                    </h5>
                                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded break-words">
                                      {record.notes}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === "appointments" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Appointments
                </h2>
                <p className="text-gray-600">
                  Manage hospital appointments and schedules
                </p>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div>
                      <CardTitle className="text-lg lg:text-xl">
                        Today's Schedule
                      </CardTitle>
                      <CardDescription>
                        All appointments scheduled for today
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto bg-transparent"
                      >
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button className="w-full sm:w-auto">
                        <Plus className="h-4 w-4 mr-2" />
                        New Appointment
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border rounded-lg space-y-4 lg:space-y-0"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg flex-shrink-0">
                            <Clock className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm lg:text-base">
                              {appointment.patientName}
                            </p>
                            <p className="text-xs lg:text-sm text-gray-600 break-all">
                              ID: {appointment.patientId}
                            </p>
                            <p className="text-xs lg:text-sm text-gray-600">
                              {appointment.type} • {appointment.doctor}
                            </p>
                            <p className="text-xs lg:text-sm text-gray-500">
                              {appointment.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between lg:justify-end space-x-3">
                          <Badge
                            className={`${getStatusColor(
                              appointment.status
                            )} text-xs`}
                          >
                            {appointment.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Records Tab */}
          {activeTab === "records" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Medical Records
                </h2>
                <p className="text-gray-600">
                  View and manage medical records from your hospital
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">
                    Recent Records
                  </CardTitle>
                  <CardDescription>
                    Medical records added by your hospital
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">
                      Search for a patient to view their medical records
                    </p>
                    <Button onClick={() => setActiveTab("patient-lookup")}>
                      <Search className="h-4 w-4 mr-2" />
                      Search Patient
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Hospital Settings
                </h2>
                <p className="text-gray-600">
                  Manage your hospital information and preferences
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">
                    Hospital Information
                  </CardTitle>
                  <CardDescription>
                    Update your hospital's basic information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hospitalName">Hospital Name</Label>
                      <Input
                        id="hospitalName"
                        defaultValue={hospitalInfo.name}
                      />
                    </div>
                    <div>
                      <Label htmlFor="licenseNumber">License Number</Label>
                      <Input
                        id="licenseNumber"
                        defaultValue={hospitalInfo.license}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue={hospitalInfo.address} />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={hospitalInfo.phone} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" defaultValue={hospitalInfo.email} />
                    </div>
                  </div>
                  <div>
                    <Label>Specialties</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {hospitalInfo.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Specialty
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button className="w-full sm:w-auto">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Add Medical Record Dialog - Responsive */}
      <Dialog open={showAddRecordDialog} onOpenChange={setShowAddRecordDialog}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Medical Record</DialogTitle>
            <DialogDescription>
              Add a new medical record for the patient
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patientIdRecord">Patient ID</Label>
                <Input
                  id="patientIdRecord"
                  placeholder="National Insurance ID"
                />
              </div>
              <div>
                <Label htmlFor="visitDate">Visit Date</Label>
                <Input id="visitDate" type="date" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="doctorName">Doctor Name</Label>
                <Input id="doctorName" placeholder="Dr. John Smith" />
              </div>
              <div>
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Input id="diagnosis" placeholder="Primary diagnosis" />
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-4">Vital Signs</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="bloodPressure">Blood Pressure</Label>
                  <Input id="bloodPressure" placeholder="120/80" />
                </div>
                <div>
                  <Label htmlFor="heartRate">Heart Rate</Label>
                  <Input id="heartRate" placeholder="72 bpm" />
                </div>
                <div>
                  <Label htmlFor="temperature">Temperature</Label>
                  <Input id="temperature" placeholder="98.6°F" />
                </div>
                <div>
                  <Label htmlFor="weight">Weight</Label>
                  <Input id="weight" placeholder="165 lbs" />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-4">Prescriptions</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="medication">Medication</Label>
                    <Input id="medication" placeholder="Medication name" />
                  </div>
                  <div>
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input id="dosage" placeholder="10mg" />
                  </div>
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Input id="frequency" placeholder="Once daily" />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" placeholder="30 days" />
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Prescription
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Doctor's Notes</Label>
              <Textarea
                id="notes"
                placeholder="Additional notes about the patient's condition and treatment..."
                rows={4}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowAddRecordDialog(false)}
                className="w-full sm:w-auto bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowAddRecordDialog(false)}
                className="w-full sm:w-auto"
              >
                Save Record
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
