import { useState } from "react";
import {
  Plus,
} from "lucide-react";
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


export default function AddAppointment() {
     const [showNewAppointmentDialog, setShowNewAppointmentDialog] = useState(false);
  return (
    <>
              <Dialog open={showNewAppointmentDialog} onOpenChange={setShowNewAppointmentDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Appointment 1
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
    </>
  )
}
