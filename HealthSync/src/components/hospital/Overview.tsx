import React from "react";
import {
  Search,
  Plus,
  Calendar,
  Users,
  Activity,
  FileText,
  Clock,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Types
type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type Status =
  | "stable"
  | "monitoring"
  | "recovered"
  | "urgent"
  | "confirmed"
  | string;

interface DashboardStat {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color?: string;
}

interface RecentPatient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  condition: string;
  status: Status;
  doctor: string;
}

interface Appointment {
  id: number;
  patientId: string;
  patientName: string;
  time: string;
  doctor: string;
  type: string;
  status: Status;
}

interface OverviewProps {
  setActiveTab: (tab: string) => void;
  setShowAddRecordDialog: (show: boolean) => void;
}

// Mock Data
const dashboardStats: DashboardStat[] = [
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

const recentPatients: RecentPatient[] = [
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

const todayAppointments: Appointment[] = [
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

const getStatusColor = (status: Status) => {
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

export default function Overview({ setActiveTab, setShowAddRecordDialog }: OverviewProps) {
  return (
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
              onClick={() => setActiveTab("patients")}
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
              <span className="text-sm lg:text-base">Schedule</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
