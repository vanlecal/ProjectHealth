import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface AppointmentType {
  id: string;
  name: string;
  duration: string;
}

const appointmentTypes: AppointmentType[] = [
  { id: "1", name: "Consultation", duration: "45 min" },
  { id: "2", name: "Follow-up", duration: "30 min" },
  { id: "3", name: "Emergency", duration: "60 min" },
  { id: "4", name: "Specialist Review", duration: "60 min" },
];

export default function AddAppointment() {
  const [showNewAppointmentDialog, setShowNewAppointmentDialog] = useState(false);

  const [patientId, setPatientId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctor, setDoctor] = useState("");
  const [department, setDepartment] = useState("");
  const [appointmentType, setAppointmentType] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token"); // hospital auth token

      const res = await fetch("http://localhost:5000/api/hospital/appointments/book-for-patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          IdCard: patientId,
          date,
          time,
          specialty: department,
          doctor,
          symptoms: appointmentType,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to book appointment");

      alert("Appointment booked successfully!");
      setShowNewAppointmentDialog(false);

      // reset form
      setPatientId("");
      setDate("");
      setTime("");
      setDoctor("");
      setDepartment("");
      setAppointmentType("");

    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
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
              <Label htmlFor="patient-id">Patient ID</Label>
              <Input
                id="patient-id"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="Enter patient ID..."
              />
            </div>
            <div>
              <Label htmlFor="appointment-date">Date</Label>
              <Input
                id="appointment-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="appointment-time">Time</Label>
              <Input
                id="appointment-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="doctor-search">Doctor Name</Label>
              <Input
                id="doctor-search"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                placeholder="Search doctor..."
              />
            </div>
            <div>
              <Label htmlFor="department-search">Department</Label>
              <Input
                id="department-search"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Search department..."
              />
            </div>
            <div>
              <Label>Appointment Type</Label>
              <Select onValueChange={setAppointmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type.id} value={type.name}>
                      {type.name} ({type.duration})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowNewAppointmentDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
