import { useState } from "react";
import {
  Search,
  Eye,
  Download,
  Filter,
  Plus,
  Phone,
  Mail,
  ChevronDown,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Types
interface Vitals {
  bp: string;
  hr: string;
  temp: string;
  weight: string;
}

interface Prescription {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface MedicalRecord {
  id: number;
  date: string;
  hospital: string;
  doctor: string;
  diagnosis: string;
  prescriptions: Prescription[];
  notes?: string;
  vitals: Vitals;
}

interface PersonalInfo {
  nationalId: string;
  name: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  bloodType: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  knownAllergies: string[];
}

interface Patient {
  personalInfo: PersonalInfo;
  medicalHistory: MedicalRecord[];
}

export default function Patients() {
  const [searchPatientId, setSearchPatientId] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [expandedRecord, setExpandedRecord] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handlePatientSearch = async () => {
    if (!searchPatientId.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/medical-records/card/${searchPatientId.trim()}`
      );
      const data = await response.json();
      console.log("Fetched patient data:", data);

      if (!response.ok || !Array.isArray(data) || data.length === 0) {
        setError(data.message || "Patient not found");
        setSelectedPatient(null);
        return;
      }

      setError("");
      const firstRecord = data[0];

      const mappedPatient: Patient = {
        personalInfo: {
          nationalId: firstRecord.patient?.IdCard || "N/A",
          name: firstRecord.patient?.name || "Unknown",
          dateOfBirth: firstRecord.patient?.dateOfBirth
            ? new Date(firstRecord.patient.dateOfBirth).toLocaleDateString()
            : "N/A",
          age: firstRecord.patient?.dateOfBirth
            ? new Date().getFullYear() -
              new Date(firstRecord.patient.dateOfBirth).getFullYear()
            : 0,
          gender: firstRecord.patient?.sex || "N/A",
          bloodType: firstRecord.patient?.bloodType || "N/A",
          phone: firstRecord.patient?.phone || "N/A",
          email: firstRecord.patient?.email || "N/A",
          address: firstRecord.patient?.address || "N/A",
          emergencyContact: firstRecord.patient?.emergencyContact?.name
            ? `${firstRecord.patient.emergencyContact.name} (${firstRecord.patient.emergencyContact.phone})`
            : "N/A",
          knownAllergies: firstRecord.patient?.knownAllergies || [],
        },
        medicalHistory: data.map((record: any, index: number) => ({
          id: index + 1,
          date: record.date
            ? new Date(record.date).toLocaleDateString()
            : "N/A",
          hospital: record.hospital?.name || "N/A",
          doctor: record.doctor || "N/A",
          diagnosis: record.diagnosis || "N/A",
          vitals: record.vitals || {
            bp: "N/A",
            hr: "N/A",
            temp: "N/A",
            weight: "N/A",
          },
          prescriptions: record.prescriptions || [],
          notes: record.notes || "",
        })),
      };

      setSelectedPatient(mappedPatient);
    } catch (err) {
      console.error("Error fetching patient:", err);
      setError("An error occurred while fetching patient");
      setSelectedPatient(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Patient Management
        </h2>
        <p className="text-gray-600">Search and manage patient records</p>
      </div>

      {/* Patient Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Patient Lookup</CardTitle>
          <CardDescription>
            Enter a National ID to search for patient records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="patientId" className="text-sm font-medium">
                National ID
              </Label>
              <Input
                id="patientId"
                placeholder="e.g., T1"
                value={searchPatientId}
                onChange={(e) => setSearchPatientId(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handlePatientSearch} className="w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" />
                Search Patient
              </Button>
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </CardContent>
      </Card>

      {/* Patient Results */}
      {selectedPatient && (
        <div className="space-y-6">
          {/* Patient Info Card */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">
                      {selectedPatient.personalInfo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">
                      {selectedPatient.personalInfo.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      ID: {selectedPatient.personalInfo.nationalId}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">
                        Age {selectedPatient.personalInfo.age}
                      </Badge>
                      <Badge variant="outline">
                        {selectedPatient.personalInfo.gender}
                      </Badge>
                      <Badge variant="outline">
                        {selectedPatient.personalInfo.bloodType}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Full
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h4 className="font-semibold mb-3">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date of Birth:</span>
                      <span>{selectedPatient.personalInfo.dateOfBirth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="flex items-center">
                        <Phone className="mr-1 h-3 w-3" />
                        {selectedPatient.personalInfo.phone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="flex items-center">
                        <Mail className="mr-1 h-3 w-3" />
                        {selectedPatient.personalInfo.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Address:</span>
                      <span className="text-right">
                        {selectedPatient.personalInfo.address}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Emergency Contact:</span>
                      <span className="text-right">
                        {selectedPatient.personalInfo.emergencyContact}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Allergies */}
                <div>
                  <h4 className="font-semibold mb-3">Allergies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPatient.personalInfo.knownAllergies.length > 0 ? (
                      selectedPatient.personalInfo.knownAllergies.map(
                        (knownAllergy, index) => (
                          <Badge key={index} variant="destructive">
                            {knownAllergy}
                          </Badge>
                        )
                      )
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No allergies reported
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical History */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <CardTitle className="text-lg lg:text-xl">
                    Medical History
                  </CardTitle>
                  <CardDescription>
                    Complete medical records and treatment history
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Record
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedPatient.medicalHistory.map((record) => (
                  <Collapsible
                    key={record.id}
                    open={expandedRecord === record.id}
                    onOpenChange={(open) =>
                      setExpandedRecord(open ? record.id : null)
                    }
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h5 className="font-medium">{record.diagnosis}</h5>
                              <p className="text-sm text-gray-600">
                                {record.date} • {record.hospital}
                              </p>
                              <p className="text-sm text-gray-500">
                                {record.doctor}
                              </p>
                            </div>
                            <div className="mt-2 sm:mt-0">
                              <Badge variant="outline">
                                {record.prescriptions.length} prescription(s)
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <ChevronDown className="h-4 w-4 ml-4" />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-4 border-t bg-gray-50 rounded-b-lg">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Vitals */}
                          <div>
                            <h6 className="font-medium mb-2">Vitals</h6>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-600">BP:</span>{" "}
                                {record.vitals.bp}
                              </div>
                              <div>
                                <span className="text-gray-600">HR:</span>{" "}
                                {record.vitals.hr}
                              </div>
                              <div>
                                <span className="text-gray-600">Temp:</span>{" "}
                                {record.vitals.temp}
                              </div>
                              <div>
                                <span className="text-gray-600">Weight:</span>{" "}
                                {record.vitals.weight}
                              </div>
                            </div>
                          </div>

                          {/* Prescriptions */}
                          <div>
                            <h6 className="font-medium mb-2">Prescriptions</h6>
                            <div className="space-y-2">
                              {record.prescriptions.map((prescription, idx) => (
                                <div
                                  key={idx}
                                  className="p-2 bg-white rounded border text-sm"
                                >
                                  <div className="font-medium">
                                    {prescription.medication}
                                  </div>
                                  <div className="text-gray-600">
                                    {prescription.dosage} •{" "}
                                    {prescription.frequency} •{" "}
                                    {prescription.duration}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Notes */}
                        {record.notes && (
                          <div className="mt-4">
                            <h6 className="font-medium mb-2">Notes</h6>
                            <p className="text-sm text-gray-700 bg-white p-3 rounded border">
                              {record.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
