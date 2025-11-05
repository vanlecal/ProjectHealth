import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { LucideIcon, Users, Calendar, FileText, Activity } from "lucide-react";
import { API_URL } from "@/utils/api";

interface DashboardStat {
  label: string;
  value: number | string;
  change: string;
  icon: LucideIcon;
  color?: string;
}

export default function OverviewCards() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/hospital/stats`, {
            method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching hospital stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading stats...</p>;
  }

  if (!stats) {
    return <p className="text-red-500">Failed to load stats</p>;
  }

  const dashboardStats: DashboardStat[] = [
    {
      label: "Total Patients",
      value: stats.totalPatients,
      change: `+${stats.patientsToday} today`,
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Today's Appointments",
      value: stats.appointmentsToday,
      change: `+${stats.appointmentsMadeToday} made`,
      icon: Calendar,
      color: "text-green-600",
    },
    {
      label: "Records Added",
      value: stats.patientRecords,
      change: `+${stats.patientRecordsToday} today`,
      icon: FileText,
      color: "text-purple-600",
    },
    {
      label: "Active Cases",
      value: "0", // you didn’t provide an API field, so keep static for now
      change: "0%",
      icon: Activity,
      color: "text-orange-600",
    },
  ];

  return (
    <>
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
    </>
  );
}
