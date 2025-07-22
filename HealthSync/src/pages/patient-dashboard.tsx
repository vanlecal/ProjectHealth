"use client"

import { useState } from "react"
import {
  Calendar,
  Home,
  User,
  Hospital,
  FileText,
  Bell,
  Search,
  Plus,
  Activity,
  Heart,
  ChevronRight,
  MapPin,
  Phone,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data
const patientData = {
  name: "Sarah Johnson",
  nationalId: "NI123456789",
  dateOfBirth: "1985-03-15",
  phone: "+1 (555) 123-4567",
  email: "sarah.johnson@email.com",
  address: "123 Main St, City, State 12345",
  bloodType: "O+",
  allergies: ["Penicillin", "Shellfish"],
}

const recentAppointments = [
  {
    id: 1,
    hospital: "City General Hospital",
    doctor: "Dr. Michael Chen",
    date: "2024-01-25",
    time: "10:00 AM",
    status: "upcoming",
    type: "Cardiology Consultation",
  },
  {
    id: 2,
    hospital: "Metro Health Center",
    doctor: "Dr. Lisa Rodriguez",
    date: "2024-01-15",
    time: "2:30 PM",
    status: "completed",
    type: "General Checkup",
  },
]

const medicalHistory = [
  {
    id: 1,
    date: "2024-01-15",
    hospital: "Metro Health Center",
    doctor: "Dr. Lisa Rodriguez",
    diagnosis: "Hypertension",
    prescriptions: [
      { medication: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      { medication: "Amlodipine", dosage: "5mg", frequency: "Once daily" },
    ],
  },
  {
    id: 2,
    date: "2023-12-10",
    hospital: "City General Hospital",
    doctor: "Dr. Michael Chen",
    diagnosis: "Type 2 Diabetes",
    prescriptions: [{ medication: "Metformin", dosage: "500mg", frequency: "Twice daily" }],
  },
]

const hospitals = [
  {
    id: 1,
    name: "City General Hospital",
    address: "456 Health Ave, City, State",
    phone: "+1 (555) 987-6543",
    specialties: ["Cardiology", "Neurology", "Orthopedics"],
    rating: 4.8,
  },
  {
    id: 2,
    name: "Metro Health Center",
    address: "789 Medical Blvd, City, State",
    phone: "+1 (555) 456-7890",
    specialties: ["General Medicine", "Pediatrics", "Dermatology"],
    rating: 4.6,
  },
  {
    id: 3,
    name: "Regional Medical Center",
    address: "321 Care Street, City, State",
    phone: "+1 (555) 234-5678",
    specialties: ["Emergency Medicine", "Surgery", "Radiology"],
    rating: 4.7,
  },
]

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">HealthCare Portal</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{patientData.name}</p>
              <p className="text-gray-500">Patient</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
              <TabsList className="grid w-full grid-cols-1 h-auto bg-transparent p-0 space-y-2">
                <TabsTrigger
                  value="home"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </TabsTrigger>
                <TabsTrigger
                  value="booking"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Medical History
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Home Tab */}
            <TabsContent value="home" className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {patientData.name.split(" ")[0]}!
                </h2>
                <p className="text-gray-600">Here's an overview of your health information</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Calendar className="h-8 w-8 text-blue-500" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Next Appointment</p>
                        <p className="text-2xl font-bold">Jan 25</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-green-500" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Medical Records</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Activity className="h-8 w-8 text-red-500" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Blood Type</p>
                        <p className="text-2xl font-bold">{patientData.bloodType}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Hospital className="h-8 w-8 text-purple-500" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Hospitals Visited</p>
                        <p className="text-2xl font-bold">3</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Appointments</CardTitle>
                  <CardDescription>Your upcoming and recent medical appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              appointment.status === "upcoming" ? "bg-blue-500" : "bg-green-500"
                            }`}
                          />
                          <div>
                            <p className="font-medium">{appointment.hospital}</p>
                            <p className="text-sm text-gray-600">
                              {appointment.doctor} • {appointment.type}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.date} at {appointment.time}
                            </p>
                          </div>
                        </div>
                        <Badge variant={appointment.status === "upcoming" ? "default" : "secondary"}>
                          {appointment.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Health Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Health Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <Bell className="h-5 w-5 text-yellow-600 mr-3" />
                      <div>
                        <p className="font-medium text-yellow-800">Medication Reminder</p>
                        <p className="text-sm text-yellow-700">Take your Lisinopril (10mg) - Due in 2 hours</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium text-blue-800">Upcoming Appointment</p>
                        <p className="text-sm text-blue-700">
                          Cardiology consultation with Dr. Chen tomorrow at 10:00 AM
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Booking Tab */}
            <TabsContent value="booking" className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Book an Appointment</h2>
                <p className="text-gray-600">Select a hospital and schedule your appointment</p>
              </div>

              {/* Search and Filter */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <Label htmlFor="search">Search Hospitals</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input id="search" placeholder="Search by name or specialty..." className="pl-10" />
                      </div>
                    </div>
                    <div className="w-48">
                      <Label>Specialty</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="All specialties" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Specialties</SelectItem>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="general">General Medicine</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hospital List */}
              <div className="grid gap-6">
                {hospitals.map((hospital) => (
                  <Card key={hospital.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <Hospital className="h-6 w-6 text-blue-500" />
                            <h3 className="text-xl font-semibold">{hospital.name}</h3>
                            <div className="flex items-center">
                              <span className="text-yellow-500">★</span>
                              <span className="text-sm text-gray-600 ml-1">{hospital.rating}</span>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              {hospital.address}
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2" />
                              {hospital.phone}
                            </div>
                          </div>
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                            <div className="flex flex-wrap gap-2">
                              {hospital.specialties.map((specialty) => (
                                <Badge key={specialty} variant="secondary">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button className="ml-4">
                          Book Appointment
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Medical History Tab */}
            <TabsContent value="history" className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Medical History</h2>
                <p className="text-gray-600">Your complete medical records and treatment history</p>
              </div>

              <div className="space-y-6">
                {medicalHistory.map((record) => (
                  <Card key={record.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{record.diagnosis}</CardTitle>
                          <CardDescription>
                            {record.hospital} • Dr. {record.doctor} • {record.date}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{record.date}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <h4 className="font-medium mb-3">Prescribed Medications:</h4>
                        <div className="space-y-2">
                          {record.prescriptions.map((prescription, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium">{prescription.medication}</p>
                                <p className="text-sm text-gray-600">
                                  {prescription.dosage} • {prescription.frequency}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h2>
                <p className="text-gray-600">Manage your personal information and preferences</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Picture */}
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="text-2xl">SJ</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Picture</Button>
                  </CardContent>
                </Card>

                {/* Personal Information */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Sarah" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Johnson" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="nationalId">National Insurance ID</Label>
                      <Input id="nationalId" defaultValue={patientData.nationalId} disabled />
                    </div>
                    <div>
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" type="date" defaultValue={patientData.dateOfBirth} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue={patientData.phone} />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue={patientData.email} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue={patientData.address} />
                    </div>
                  </CardContent>
                </Card>

                {/* Medical Information */}
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Medical Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bloodType">Blood Type</Label>
                        <Select defaultValue={patientData.bloodType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <Input id="emergencyContact" placeholder="Name and phone number" />
                      </div>
                    </div>
                    <div>
                      <Label>Known Allergies</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {patientData.allergies.map((allergy) => (
                          <Badge key={allergy} variant="destructive">
                            {allergy}
                          </Badge>
                        ))}
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Allergy
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
