import {
  Calendar,
  Hospital,
  FileText,
  Bell,
  Activity
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import RecentAppointments from "./RecentAppointments";


// Mock data
const patientData = {
  name: "Sarah Johnson",
  nationalId: "NI123456789",
  dateOfBirth: "1985-03-15 C",
  phone: "+1 (555) 123-4567",
  email: "sarah.johnson@email.com",
  address: "123 Main St, City, State 12345",
  bloodType: "O+",
  allergies: ["Penicillin", "Shellfish"],
};


export default function HomeTab() {
  const { user } = useAuth();

  return (
    <>
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name.split(" ")[0]}!
        </h2>
        <p className="text-gray-600 text-sm lg:text-base">
          Here's an overview of your health information
        </p>
      </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                  <Card>
                    <CardContent className="p-3 lg:p-6">
                      <div className="flex items-center">
                        <Calendar className="h-6 w-6 lg:h-8 lg:w-8 text-blue-500" />
                        <div className="ml-2 lg:ml-4">
                          <p className="text-xs lg:text-sm font-medium text-gray-600">
                            Next Appointment
                          </p>
                          <p className="text-lg lg:text-2xl font-bold">
                            Jan 25
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 lg:p-6">
                      <div className="flex items-center">
                        <FileText className="h-6 w-6 lg:h-8 lg:w-8 text-green-500" />
                        <div className="ml-2 lg:ml-4">
                          <p className="text-xs lg:text-sm font-medium text-gray-600">
                            Medical Records
                          </p>
                          <p className="text-lg lg:text-2xl font-bold">12</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 lg:p-6">
                      <div className="flex items-center">
                        <Activity className="h-6 w-6 lg:h-8 lg:w-8 text-red-500" />
                        <div className="ml-2 lg:ml-4">
                          <p className="text-xs lg:text-sm font-medium text-gray-600">
                            Blood Type
                          </p>
                          <p className="text-lg lg:text-2xl font-bold">
                            {patientData.bloodType}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 lg:p-6">
                      <div className="flex items-center">
                        <Hospital className="h-6 w-6 lg:h-8 lg:w-8 text-purple-500" />
                        <div className="ml-2 lg:ml-4">
                          <p className="text-xs lg:text-sm font-medium text-gray-600">
                            Hospitals Visited
                          </p>
                          <p className="text-lg lg:text-2xl font-bold">3</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Appointments */}
                <RecentAppointments/>


                {/* Health Alerts */}
                <Card>
                  <CardHeader className="p-4 lg:p-6">
                    <CardTitle className="text-lg lg:text-xl">
                      Health Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 lg:p-6">
                    <div className="space-y-3">
                      <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <Bell className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-yellow-800 text-sm lg:text-base">
                            Medication Reminder
                          </p>
                          <p className="text-xs lg:text-sm text-yellow-700">
                            Take your Lisinopril (10mg) - Due in 2 hours
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <Calendar className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-blue-800 text-sm lg:text-base">
                            Upcoming Appointment
                          </p>
                          <p className="text-xs lg:text-sm text-blue-700">
                            Cardiology consultation with Dr. Chen tomorrow at
                            10:00 AM
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
    </>
  )
}
