import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { API_URL } from "@/utils/api"

interface Appointment {
  _id: string;
  hospital: { name: string; address: string; phone: string };
  doctor?: string; // depending on your schema
  date: string;
  time?: string; // if you store separately
  status: string;
  type?: string;
}

export default function RecentAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`${API_URL}/patient/myappointments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // token from login
          },
        });

        if (!res.ok) throw new Error("Failed to fetch appointments");

        const data = await res.json();
        setAppointments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <Card>
      <CardHeader className="p-4 lg:p-6">
        <CardTitle className="text-lg lg:text-xl">Recent Appointments</CardTitle>
        <CardDescription className="text-sm lg:text-base">
          Your upcoming and recent medical appointments
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 lg:p-6">
        {loading && <p className="text-gray-600">Loading appointments...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && appointments.length === 0 && (
          <p className="text-gray-600">No appointments found.</p>
        )}
        <div className="space-y-3 lg:space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 border rounded-lg space-y-2 sm:space-y-0"
            >
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div
                  className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    appointment.status === "upcoming"
                      ? "bg-blue-500"
                      : appointment.status === "completed"
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm lg:text-base truncate">
                    {appointment.hospital?.name}
                  </p>
                  <p className="text-xs lg:text-sm text-gray-600">
                    {appointment.doctor || "Doctor not assigned"} •{" "}
                    {appointment.type || "General"}
                  </p>
                  <p className="text-xs lg:text-sm text-gray-500">
                    {new Date(appointment.date).toLocaleDateString()}{" "}
                    {appointment.time && `at ${appointment.time}`}
                  </p>
                </div>
              </div>
              <Badge
                variant={
                  appointment.status === "upcoming" ? "default" : "secondary"
                }
                className="text-xs self-start sm:self-center"
              >
                {appointment.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
