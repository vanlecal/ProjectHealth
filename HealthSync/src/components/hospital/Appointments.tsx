import { useState } from "react";
import {
  Calendar,
  Clock,
  Plus,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Types
type Status = "confirmed" | "pending" | "cancelled" | "completed" | "urgent";

interface Appointment {
  id: number;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  doctor: string;
  type: string;
  status: Status;
  duration: string;
  notes?: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

interface AppointmentType {
  id: string;
  name: string;
  duration: string;
}

// Mock Data
const allAppointments: Appointment[] = [
  {
    id: 1,
    patientId: "NI123456789",
    patientName: "Sarah Johnson",
    date: "2024-09-08",
    time: "09:00 AM",
    doctor: "Dr. Michael Chen",
    type: "Follow-up",
    status: "confirmed",
    duration: "30 min",
    notes: "Regular check-up for hypertension",
  },
  {
    id: 2,
    patientId: "NI789123456",
    patientName: "David Brown",
    date: "2024-09-08",
    time: "10:30 AM",
    doctor: "Dr. Lisa Rodriguez",
    type: "Consultation",
    status: "confirmed",
    duration: "45 min",
  },
  {
    id: 3,
    patientId: "NI321654987",
    patientName: "Maria Garcia",
    date: "2024-09-08",
    time: "02:00 PM",
    doctor: "Dr. James Wilson",
    type: "Emergency",
    status: "urgent",
    duration: "60 min",
    notes: "Chest pain complaint",
  },
  {
    id: 4,
    patientId: "NI654321987",
    patientName: "John Smith",
    date: "2024-09-09",
    time: "11:00 AM",
    doctor: "Dr. Michael Chen",
    type: "Consultation",
    status: "pending",
    duration: "30 min",
  },
  {
    id: 5,
    patientId: "NI456789321",
    patientName: "Emma Wilson",
    date: "2024-09-09",
    time: "03:30 PM",
    doctor: "Dr. Lisa Rodriguez",
    type: "Follow-up",
    status: "completed",
    duration: "30 min",
    notes: "Diabetes management follow-up",
  },
];

const doctors: Doctor[] = [
  { id: "1", name: "Dr. Michael Chen", specialty: "Cardiology" },
  { id: "2", name: "Dr. Lisa Rodriguez", specialty: "Endocrinology" },
  { id: "3", name: "Dr. James Wilson", specialty: "Emergency Medicine" },
  { id: "4", name: "Dr. Sarah Kim", specialty: "Neurology" },
];

const appointmentTypes: AppointmentType[] = [
  { id: "1", name: "Consultation", duration: "45 min" },
  { id: "2", name: "Follow-up", duration: "30 min" },
  { id: "3", name: "Emergency", duration: "60 min" },
  { id: "4", name: "Specialist Review", duration: "60 min" },
];

const getStatusColor = (status: Status) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    case "urgent":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: Status) => {
  switch (status) {
    case "confirmed":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "cancelled":
      return <XCircle className="h-4 w-4 text-red-600" />;
    case "completed":
      return <CheckCircle className="h-4 w-4 text-blue-600" />;
    case "urgent":
      return <XCircle className="h-4 w-4 text-red-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(allAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [doctorFilter, setDoctorFilter] = useState<string>("all");
  const [showNewAppointmentDialog, setShowNewAppointmentDialog] = useState(false);

  // Filter appointments
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = appointment.patientName
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    const matchesDoctor = doctorFilter === "all" || appointment.doctor === doctorFilter;
    
    return matchesSearch && matchesStatus && matchesDoctor;
  });

  // Group appointments by date
  const groupedAppointments = filteredAppointments.reduce((groups, appointment) => {
    const date = appointment.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(appointment);
    return groups;
  }, {} as Record<string, Appointment[]>);

  const updateAppointmentStatus = (id: number, newStatus: Status) => {
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Appointments
          </h2>
          <p className="text-gray-600">
            Manage and schedule patient appointments
          </p>
        </div>
        <Dialog open={showNewAppointmentDialog} onOpenChange={setShowNewAppointmentDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>
                Create a new appointment for a patient
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="patient-search">Patient ID or Name</Label>
                <Input id="patient-search" placeholder="Search patient..." />
              </div>
              <div>
                <Label htmlFor="appointment-date">Date</Label>
                <Input id="appointment-date" type="date" />
              </div>
              <div>
                <Label htmlFor="appointment-time">Time</Label>
                <Input id="appointment-time" type="time" />
              </div>
              <div>
                <Label>Doctor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Appointment Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name} ({type.duration})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNewAppointmentDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowNewAppointmentDialog(false)}>
                  Schedule
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
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
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.name}>
                      {doctor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="w-full">
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
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  <Badge variant="outline" className="ml-2">
                    {dateAppointments.length} appointment{dateAppointments.length !== 1 ? 's' : ''}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dateAppointments
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border rounded-lg space-y-4 lg:space-y-0"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg flex-shrink-0">
                            <Clock className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium text-lg">
                                {appointment.patientName}
                              </h4>
                              <Badge className={getStatusColor(appointment.status)}>
                                {appointment.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              {appointment.time} • {appointment.duration} • {appointment.type}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.doctor} • ID: {appointment.patientId}
                            </p>
                            {appointment.notes && (
                              <p className="text-sm text-gray-700 mt-1">
                                Note: {appointment.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          {appointment.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
                              >
                                <CheckCircle className="mr-1 h-4 w-4" />
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                              >
                                <XCircle className="mr-1 h-4 w-4" />
                                Cancel
                              </Button>
                            </>
                          )}
                          
                          {appointment.status === "confirmed" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateAppointmentStatus(appointment.id, "completed")}
                            >
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Complete
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
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* No appointments message */}
      {filteredAppointments.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No appointments found
            </h3>
            <p className="text-gray-500 text-center mb-4">
              No appointments match your current filters.
            </p>
            <Button onClick={() => setShowNewAppointmentDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Schedule New Appointment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
