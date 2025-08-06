import {
  Hospital,
  Search,
  ChevronRight,
  MapPin,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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

const recentAppointments = [
  {
    id: 1,
    hospital: "City General Hospital",
    doctor: "Dr. Michael Chen",
    date: "2024-01-25",
    time: "10:00 AM",
    status: "upcoming",
    type: "Cardiology Consultation",
  },
  {
    id: 2,
    hospital: "Metro Health Center",
    doctor: "Dr. Lisa Rodriguez",
    date: "2024-01-15",
    time: "2:30 PM",
    status: "completed",
    type: "General Checkup",
  },
];

const medicalHistory = [
  {
    id: 1,
    date: "2024-01-15",
    hospital: "Metro Health Center",
    doctor: "Dr. Lisa Rodriguez",
    diagnosis: "Hypertension",
    prescriptions: [
      { medication: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      { medication: "Amlodipine", dosage: "5mg", frequency: "Once daily" },
    ],
  },
  {
    id: 2,
    date: "2023-12-10",
    hospital: "City General Hospital",
    doctor: "Dr. Michael Chen",
    diagnosis: "Type 2 Diabetes",
    prescriptions: [
      { medication: "Metformin", dosage: "500mg", frequency: "Twice daily" },
    ],
  },
];

const hospitals = [
  {
    id: 1,
    name: "City General Hospital",
    address: "456 Health Ave, City, State",
    phone: "+1 (555) 987-6543",
    specialties: ["Cardiology", "Neurology", "Orthopedics"],
    rating: 4.8,
  },
  {
    id: 2,
    name: "Metro Health Center",
    address: "789 Medical Blvd, City, State",
    phone: "+1 (555) 456-7890",
    specialties: ["General Medicine", "Pediatrics", "Dermatology"],
    rating: 4.6,
  },
  {
    id: 3,
    name: "Regional Medical Center",
    address: "321 Care Street, City, State",
    phone: "+1 (555) 234-5678",
    specialties: ["Emergency Medicine", "Surgery", "Radiology"],
    rating: 4.7,
  },
];

function BookAppointment() {
  return (
    <>
      {/* Booking Tab */}
              <div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    Book an Appointment
                  </h2>
                  <p className="text-gray-600 text-sm lg:text-base">
                    Select a hospital and schedule your appointment
                  </p>
                </div>

                {/* Search and Filter */}
                <Card>
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                      <div className="flex-1">
                        <Label
                          htmlFor="search"
                          className="text-sm lg:text-base"
                        >
                          Search Hospitals
                        </Label>
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="search"
                            placeholder="Search by name or specialty..."
                            className="pl-10 text-sm lg:text-base"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-48">
                        <Label className="text-sm lg:text-base">
                          Specialty
                        </Label>
                        <Select>
                          <SelectTrigger className="text-sm lg:text-base">
                            <SelectValue placeholder="All specialties" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Specialties</SelectItem>
                            <SelectItem value="cardiology">
                              Cardiology
                            </SelectItem>
                            <SelectItem value="general">
                              General Medicine
                            </SelectItem>
                            <SelectItem value="neurology">Neurology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Hospital List */}
                <div className="grid gap-4 lg:gap-6">
                  {hospitals.map((hospital) => (
                    <Card key={hospital.id}>
                      <CardContent className="p-4 lg:p-6">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                              <div className="flex items-center space-x-3">
                                <Hospital className="h-5 w-5 lg:h-6 lg:w-6 text-blue-500 flex-shrink-0" />
                                <h3 className="text-lg lg:text-xl font-semibold">
                                  {hospital.name}
                                </h3>
                              </div>
                              <div className="flex items-center">
                                <span className="text-yellow-500">★</span>
                                <span className="text-sm text-gray-600 ml-1">
                                  {hospital.rating}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-2 text-xs lg:text-sm text-gray-600">
                              <div className="flex items-start">
                                <MapPin className="h-3 w-3 lg:h-4 lg:w-4 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="break-words">
                                  {hospital.address}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-3 w-3 lg:h-4 lg:w-4 mr-2 flex-shrink-0" />
                                <span>{hospital.phone}</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-xs lg:text-sm font-medium text-gray-700 mb-2">
                                Specialties:
                              </p>
                              <div className="flex flex-wrap gap-1 lg:gap-2">
                                {hospital.specialties.map((specialty) => (
                                  <Badge
                                    key={specialty}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Button className="w-full lg:w-auto lg:ml-4 text-sm lg:text-base">
                            Book Appointment
                            <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
    </>
  )
}

export default BookAppointment
