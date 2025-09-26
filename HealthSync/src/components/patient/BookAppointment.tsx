import { useEffect, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { API_URL } from "@/utils/api"

interface HospitalType {
  _id: string;
  name: string;
  address: string;
  phone: string;
  departments: string[];
}

function BookAppointment() {
  const [hospitals, setHospitals] = useState<HospitalType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<HospitalType | null>(
    null
  );

  const [form, setForm] = useState({
    date: "",
    time: "",
    specialty: "",
    doctor: "",
    symptoms: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/patient/gethospitals`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch hospitals");
        }

        const data = await res.json();
        setHospitals(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleOpenModal = (hospital: HospitalType) => {
    setSelectedHospital(hospital);
    setForm({
      date: "",
      time: "",
      specialty: "",
      doctor: "",
      symptoms: "",
    });
    setOpenModal(true);
    setSuccessMsg(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!selectedHospital) return;

    try {
      setSubmitting(true);

      const token = localStorage.getItem("token"); // patient JWT
      if (!token) {
        alert("You must be logged in to book an appointment.");
        return;
      }

      const res = await fetch(`${API_URL}/api/patient/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          hospitalId: selectedHospital._id,
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Booking failed");
      }

      setSuccessMsg("Appointment booked successfully!");
      setOpenModal(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
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
                <Label htmlFor="search" className="text-sm lg:text-base">
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
                <Label className="text-sm lg:text-base">Specialty</Label>
                <Select>
                  <SelectTrigger className="text-sm lg:text-base">
                    <SelectValue placeholder="All specialties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="general">General Medicine</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hospital List */}
        <div className="grid gap-4 lg:gap-6 mt-4">
          {loading && <p className="text-gray-600">Loading hospitals...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && hospitals.length === 0 && (
            <p className="text-gray-600">No hospitals found.</p>
          )}
          {hospitals.map((hospital) => (
            <Card key={hospital._id}>
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
                      </div>
                    </div>
                    <div className="space-y-2 text-xs lg:text-sm text-gray-600">
                      <div className="flex items-start">
                        <MapPin className="h-3 w-3 lg:h-4 lg:w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="break-words">{hospital.address}</span>
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
                        {hospital.departments &&
                        hospital.departments.length > 0 ? (
                          hospital.departments.map((specialty) => (
                            <Badge
                              key={specialty}
                              variant="secondary"
                              className="text-xs"
                            >
                              {specialty}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-gray-500 text-xs">
                            No specialties listed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleOpenModal(hospital)}
                    className="w-full lg:w-auto lg:ml-4 text-sm lg:text-base"
                  >
                    Book Appointment
                    <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Appointment Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Book Appointment at {selectedHospital?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Label>Date</Label>
            <Input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />

            <Label>Time</Label>
            <Input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
            />

            <Label>Specialty</Label>
            <Input
              type="text"
              name="specialty"
              value={form.specialty}
              onChange={handleChange}
              placeholder="e.g. Cardiology"
            />

            <Label>Doctor</Label>
            <Input
              type="text"
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
              placeholder="Doctor's name"
            />

            <Label>Symptoms</Label>
            <Input
              type="text"
              name="symptoms"
              value={form.symptoms}
              onChange={handleChange}
              placeholder="Describe your symptoms"
            />
          </div>

          <DialogFooter>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Booking..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BookAppointment;
