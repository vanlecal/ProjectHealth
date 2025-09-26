import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Filter,
  Search,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddAppointment from "./Add-appointment";

type RawStatus = string;

interface AppointmentFromAPI {
  _id: string;
  patient?: {
    _id?: string;
    name?: string;
    email?: string;
    phone?: string;
    IdCard?: string;
    sex?: string;
    region?: string;
  };
  hospital?: { _id?: string; name?: string; phone?: string; address?: string };
  date?: string;
  time?: string;
  specialty?: string;
  doctor?: string;
  symptoms?: string;
  status?: RawStatus;
  createdAt?: string;
  [key: string]: any;
}

const getStatusColor = (status: string) => {
  const s = (status || "").toLowerCase();
  switch (s) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "denied":
    case "cancelled":
    case "cancel":
      return "bg-red-100 text-red-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    case "urgent":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function Appointments() {
  const [appointments, setAppointments] = useState<AppointmentFromAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [doctorFilter, setDoctorFilter] = useState<string>("all");

  const [processingId, setProcessingId] = useState<string | null>(null);

  const getToken = () =>
    localStorage.getItem("token") ||
    localStorage.getItem("hospitalToken") ||
    "";

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getToken();
        const res = await fetch(
          "http://localhost:5000/api/hospital/appointments",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (res.status === 401) {
          throw new Error("Unauthorized. Please login.");
        }

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to fetch appointments");
        }

        const data: AppointmentFromAPI[] = await res.json();
        setAppointments(data);
      } catch (err: any) {
        console.error("Error fetching appointments:", err);
        setError(err?.message || "Error fetching appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const actionToBackendStatus = (action: "confirm" | "cancel" | "complete") => {
    switch (action) {
      case "confirm":
        return "Confirmed";
      case "cancel":
        return "Cancelled"; // adjust if your backend expects 'cancelled'
      case "complete":
        return "Completed";
    }
  };

  const updateAppointmentStatus = async (
    appointmentId: string,
    action: "confirm" | "cancel" | "complete"
  ) => {
    const backendStatus = actionToBackendStatus(action);
    setProcessingId(appointmentId);
    try {
      const token = getToken();
      const res = await fetch(
        `http://localhost:5000/api/hospital/appointments/${appointmentId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({ status: backendStatus }),
        }
      );

      if (res.status === 401) throw new Error("Unauthorized. Please login.");

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Failed to update appointment status");
      }

      setAppointments((prev) =>
        prev.map((a) => (a._id === appointmentId ? { ...a, status: backendStatus } : a))
      );
    } catch (err: any) {
      console.error("Error updating appointment status:", err);
      alert(err?.message || "Failed to update status");
    } finally {
      setProcessingId(null);
    }
  };

  // ==== Fix for TS2322: build a string[] of doctors using a type guard ====
  const doctorOptions: string[] = Array.from(
    new Set(
      appointments
        .map((a) => a.doctor)
        .filter((d): d is string => typeof d === "string" && d.trim().length > 0)
    )
  );

  // Filters
  const filteredAppointments = appointments.filter((appt) => {
    const patientName = (appt.patient?.name || "").toString();
    const patientId = (appt.patient?.IdCard || appt.patient?._id || "").toString();
    const status = (appt.status || "").toString().toLowerCase();
    const doctor = (appt.doctor || "").toString();

    const matchesSearch =
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patientId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || status === statusFilter.toLowerCase();
    const matchesDoctor = doctorFilter === "all" || doctor === doctorFilter;

    return matchesSearch && matchesStatus && matchesDoctor;
  });

  const groupedAppointments = filteredAppointments.reduce(
    (groups: Record<string, AppointmentFromAPI[]>, appt) => {
      const dateIso = appt.date ? appt.date.split("T")[0] : "unknown";
      if (!groups[dateIso]) groups[dateIso] = [];
      groups[dateIso].push(appt);
      return groups;
    },
    {}
  );

  if (loading) return <p className="text-gray-600">Loading appointments...</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Appointments</h2>
          <p className="text-gray-600">Manage and schedule patient appointments</p>
        </div>
        <AddAppointment />
      </div>

      {error && (
        <div className="text-red-600">
          Error: {error}
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Patient name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="denied">Denied</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Doctor</Label>
              <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doctors</SelectItem>
                  {doctorOptions.map((doc) => (
                    <SelectItem key={doc} value={doc}>
                      {doc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setDoctorFilter("all");
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="space-y-6">
        {Object.entries(groupedAppointments)
          .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
          .map(([date, dateAppointments]) => (
            <Card key={date}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  <Badge variant="outline" className="ml-2">
                    {dateAppointments.length} appointment
                    {dateAppointments.length !== 1 ? "s" : ""}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dateAppointments
                    .sort((a, b) => (a.time || "").localeCompare(b.time || ""))
                    .map((appointment) => {
                      const raw = appointment.status || "";
                      const statusNorm = raw.toString().toLowerCase();

                      return (
                        <div
                          key={appointment._id}
                          className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border rounded-lg space-y-4 lg:space-y-0"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg flex-shrink-0">
                              <Clock className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium text-lg">
                                  {appointment.patient?.name || "Unknown patient"}
                                </h4>
                                <Badge className={getStatusColor(statusNorm)}>
                                  {raw ? raw.toString() : "N/A"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                {appointment.time ?? "Time not set"} • {appointment.specialty ?? "General"}
                              </p>
                              <p className="text-sm text-gray-500">
                                {appointment.doctor ?? "Doctor"} • ID: {appointment.patient?.IdCard ?? appointment.patient?._id}
                              </p>
                              {appointment.symptoms && (
                                <p className="text-sm text-gray-700 mt-1">Note: {appointment.symptoms}</p>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-2">
                            {statusNorm === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateAppointmentStatus(appointment._id, "confirm")}
                                  disabled={processingId === appointment._id}
                                >
                                  <CheckCircle className="mr-1 h-4 w-4" />
                                  {processingId === appointment._id ? "Processing..." : "Confirm"}
                                </Button>

                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => {
                                    if (confirm("Are you sure you want to cancel (deny) this appointment?")) {
                                      updateAppointmentStatus(appointment._1d, "cancel");
                                    }
                                  }}
                                  disabled={processingId === appointment._id}
                                >
                                  <XCircle className="mr-1 h-4 w-4" />
                                  {processingId === appointment._id ? "Processing..." : "Cancel"}
                                </Button>
                              </>
                            )}

                            {statusNorm === "confirmed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateAppointmentStatus(appointment._id, "complete")}
                                disabled={processingId === appointment._id}
                              >
                                <CheckCircle className="mr-1 h-4 w-4" />
                                {processingId === appointment._id ? "Processing..." : "Complete"}
                              </Button>
                            )}

                            <Button size="sm" variant="outline">
                              <Eye className="mr-1 h-4 w-4" />
                              View
                            </Button>

                            <Button size="sm" variant="outline">
                              <Edit className="mr-1 h-4 w-4" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {appointments.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-500 text-center mb-4">No appointments match your current filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
