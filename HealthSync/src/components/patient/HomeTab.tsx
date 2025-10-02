import { useEffect, useState } from "react";
import { Calendar, Hospital, FileText, Bell, Activity } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import RecentAppointments from "./RecentAppointments";

interface NextAppointment {
  _id?: string;
  date?: string; // ISO date string
  time?: string;
  specialty?: string;
  doctor?: string;
  status?: string;
  [key: string]: any;
}

interface DashboardStats {
  nextAppointment: NextAppointment | null;
  medicalRecordsCount: number;
  hospitalsVisitedCount: number;
  appointmentsCount: number;
}

export default function HomeTab() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:5000/api/patient/stat", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch stats: ${res.status} ${text}`);
        }

        const data: DashboardStats = await res.json();
        setStats(data);
      } catch (err: any) {
        console.error("Error fetching patient stats:", err);
        setError(err.message || "Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatNextAppointmentDate = (isoDate?: string) => {
    if (!isoDate) return null;
    try {
      // "Jan 25" style
      return new Date(isoDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return isoDate;
    }
  };

  const upcomingSummary = (appt: NextAppointment | null) => {
    if (!appt) return "No upcoming appointments";
    const datePart = appt.date
      ? new Date(appt.date).toLocaleDateString()
      : "Unknown date";
    const timePart = appt.time ?? "Unknown time";
    const specialty = appt.specialty ?? "Appointment";
    const doctor = appt.doctor ?? "doctor";
    return `${specialty} with Dr. ${doctor} on ${datePart} at ${timePart}`;
  };

  return (
    <>
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name?.split(" ")[0] ?? "there"}!
        </h2>
        <p className="text-gray-600 text-sm lg:text-base">
          Here's an overview of your health information
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mt-4">
        <Card>
          <CardContent className="p-3 lg:p-6">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 lg:h-8 lg:w-8 text-blue-500" />
              <div className="ml-2 lg:ml-4">
                <p className="text-xs lg:text-sm font-medium text-gray-600">
                  Next Appointment
                </p>
                <p className="text-lg lg:text-2xl font-bold">
                  {loading
                    ? "..."
                    : stats?.nextAppointment
                    ? formatNextAppointmentDate(stats.nextAppointment.date) ?? "TBD"
                    : "None"}
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
                <p className="text-lg lg:text-2xl font-bold">
                  {loading ? "..." : stats?.medicalRecordsCount ?? 0}
                </p>
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
                  {user?.bloodType ?? "N/A"}
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
                <p className="text-lg lg:text-2xl font-bold">
                  {loading ? "..." : stats?.hospitalsVisitedCount ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Appointments */}
      <div className="mt-6">
        <RecentAppointments />
      </div>

      {/* Health Alerts */}
      <Card className="mt-6">
        <CardHeader className="p-4 lg:p-6">
          <CardTitle className="text-lg lg:text-xl">Health Alerts</CardTitle>
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
                  {loading ? "Loading..." : upcomingSummary(stats?.nextAppointment ?? null)}
                </p>
              </div>
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-500 mt-3">Error loading dashboard: {error}</p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
