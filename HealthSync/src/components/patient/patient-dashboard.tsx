import { useState } from "react";
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
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import BookAppointment from "./BookAppointment";
import MedicalHistory from "./MedicalHistory";
import ProfileSettings from "./ProfileSettings";
import HomeTab from "./HomeTab";

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
};



export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 lg:h-8 lg:w-8 text-red-500" />
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 hidden sm:block">
                HealthCare Portal
              </h1>
              <h1 className="text-xl font-bold text-gray-900 sm:hidden">
                Health
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div className="text-sm hidden md:block">
              <p className="font-medium">{patientData.name}</p>
              <p className="text-gray-500">Patient</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar Navigation - Now Sticky */}
        <nav
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:sticky top-0 lg:top-[73px] left-0 z-50 w-64 bg-white border-r border-gray-200 h-screen lg:h-[calc(100vh-73px)] transition-transform duration-300 ease-in-out lg:transition-none overflow-y-auto`}
        >
          <div className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <Tabs
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value);
                setSidebarOpen(false); // Close sidebar on mobile when tab changes
              }}
              orientation="vertical"
              className="w-full"
            >
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

        {/* Main Content - Now with proper spacing for sticky sidebar */}
        <main className="flex-1 lg:ml-0 min-h-screen">
          <div className="p-4 lg:p-6">
            <Tabs
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value);
                setSidebarOpen(false);
              }}
            >
              {/* Home Tab */}
              <TabsContent value="home" className="space-y-4 lg:space-y-6">
                <HomeTab/>
              </TabsContent>

              {/* Booking Tab */}
              <TabsContent value="booking" className="space-y-4 lg:space-y-6">
                <BookAppointment/>
              </TabsContent>

              {/* Medical History Tab */}
              <TabsContent value="history" className="space-y-4 lg:space-y-6">
               <MedicalHistory/>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4 lg:space-y-6">
                <ProfileSettings/>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
