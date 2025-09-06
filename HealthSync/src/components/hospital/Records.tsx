import { useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Calendar,
  User,
  Activity,
  Pill,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddRecord from "./Add-record";

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
  patientId: string;
  patientName: string;
  date: string;
  hospital: string;
  doctor: string;
  diagnosis: string;
  prescriptions: Prescription[];
  notes?: string;
  vitals: Vitals;
  recordType: string;
}

// Mock Data
const allRecords: MedicalRecord[] = [
  {
    id: 1,
    patientId: "NI123456789",
    patientName: "Sarah Johnson",
    date: "2024-09-08",
    hospital: "City General Hospital",
    doctor: "Dr. Michael Chen",
    diagnosis: "Hypertension Follow-up",
    prescriptions: [
      {
        medication: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "30 days",
      },
    ],
    notes: "Patient responding well to treatment. Blood pressure stable at 130/85.",
    vitals: { bp: "130/85", hr: "72", temp: "98.6°F", weight: "165 lbs" },
    recordType: "Follow-up",
  },
  {
    id: 2,
    patientId: "NI987654321",
    patientName: "Robert Smith",
    date: "2024-09-07",
    hospital: "City General Hospital",
    doctor: "Dr. Lisa Rodriguez",
    diagnosis: "Type 2 Diabetes Management",
    prescriptions: [
      {
        medication: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        duration: "90 days",
      },
      {
        medication: "Glipizide",
        dosage: "5mg",
        frequency: "Once daily",
        duration: "90 days",
      },
    ],
    notes: "HbA1c improved to 7.2%. Continue current medication regimen.",
    vitals: { bp: "140/88", hr: "78", temp: "98.4°F", weight: "180 lbs" },
    recordType: "Consultation",
  },
  {
    id: 3,
    patientId: "NI456789123",
    patientName: "Emily Davis",
    date: "2024-09-06",
    hospital: "City General Hospital",
    doctor: "Dr. James Wilson",
    diagnosis: "Migraine Treatment",
    prescriptions: [
      {
        medication: "Sumatriptan",
        dosage: "50mg",
        frequency: "As needed",
        duration: "30 days",
      },
    ],
    notes: "Migraine frequency reduced. Patient educated on trigger avoidance.",
    vitals: { bp: "120/80", hr: "68", temp: "98.2°F", weight: "140 lbs" },
    recordType: "Treatment",
  },
  {
    id: 4,
    patientId: "NI321654987",
    patientName: "Maria Garcia",
    date: "2024-09-05",
    hospital: "City General Hospital",
    doctor: "Dr. James Wilson",
    diagnosis: "Emergency - Chest Pain",
    prescriptions: [
      {
        medication: "Aspirin",
        dosage: "81mg",
        frequency: "Once daily",
        duration: "Ongoing",
      },
    ],
    notes: "ECG normal. Chest pain attributed to musculoskeletal strain. Discharged home.",
    vitals: { bp: "145/92", hr: "88", temp: "99.1°F", weight: "155 lbs" },
    recordType: "Emergency",
  },
];

const recordTypes = ["All Types", "Consultation", "Follow-up", "Treatment", "Emergency", "Diagnostic"];
const doctors = ["All Doctors", "Dr. Michael Chen", "Dr. Lisa Rodriguez", "Dr. James Wilson"];

export default function Records() {
  const [records, setRecords] = useState<MedicalRecord[]>(allRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [recordTypeFilter, setRecordTypeFilter] = useState("All Types");
  const [doctorFilter, setDoctorFilter] = useState("All Doctors");
  const [dateFilter, setDateFilter] = useState("");
  const [showAddRecordDialog, setShowAddRecordDialog] = useState(false);
  const [newRecord, setNewRecord] = useState({
    patientId: "",
    diagnosis: "",
    doctor: "",
    notes: "",
    vitals: { bp: "", hr: "", temp: "", weight: "" },
    prescriptions: [{ medication: "", dosage: "", frequency: "", duration: "" }],
  });

  // Filter records
  const filteredRecords = records.filter((record) => {
    const matchesSearch = 
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = recordTypeFilter === "All Types" || record.recordType === recordTypeFilter;
    const matchesDoctor = doctorFilter === "All Doctors" || record.doctor === doctorFilter;
    const matchesDate = !dateFilter || record.date === dateFilter;
    
    return matchesSearch && matchesType && matchesDoctor && matchesDate;
  });

  const addPrescription = () => {
    setNewRecord(prev => ({
      ...prev,
      prescriptions: [...prev.prescriptions, { medication: "", dosage: "", frequency: "", duration: "" }]
    }));
  };

  const updatePrescription = (index: number, field: string, value: string) => {
    setNewRecord(prev => ({
      ...prev,
      prescriptions: prev.prescriptions.map((prescription, i) => 
        i === index ? { ...prescription, [field]: value } : prescription
      )
    }));
  };

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case "Emergency":
        return "bg-red-100 text-red-800";
      case "Consultation":
        return "bg-blue-100 text-blue-800";
      case "Follow-up":
        return "bg-green-100 text-green-800";
      case "Treatment":
        return "bg-purple-100 text-purple-800";
      case "Diagnostic":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Medical Records
          </h2>
          <p className="text-gray-600">
            Manage and view patient medical records
          </p>
        </div>
        <AddRecord/>

      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Patient, ID, or diagnosis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label>Record Type</Label>
              <Select value={recordTypeFilter} onValueChange={setRecordTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {recordTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
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
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor} value={doctor}>
                      {doctor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date-filter">Date</Label>
              <Input
                id="date-filter"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSearchTerm("");
                  setRecordTypeFilter("All Types");
                  setDoctorFilter("All Doctors");
                  setDateFilter("");
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <Card key={record.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {record.patientName.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{record.patientName}</h3>
                        <p className="text-sm text-gray-600">ID: {record.patientId}</p>
                      </div>
                    </div>
                    <Badge className={getRecordTypeColor(record.recordType)}>
                      {record.recordType}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{record.doctor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{record.diagnosis}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Vitals */}
                    <div>
                      <h5 className="font-medium mb-2 flex items-center">
                        <Activity className="mr-2 h-4 w-4" />
                        Vitals
                      </h5>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>BP: {record.vitals.bp}</div>
                        <div>HR: {record.vitals.hr}</div>
                        <div>Temp: {record.vitals.temp}</div>
                        <div>Weight: {record.vitals.weight}</div>
                      </div>
                    </div>

                    {/* Prescriptions */}
                    <div>
                      <h5 className="font-medium mb-2 flex items-center">
                        <Pill className="mr-2 h-4 w-4" />
                        Prescriptions ({record.prescriptions.length})
                      </h5>
                      <div className="space-y-2">
                        {record.prescriptions.slice(0, 2).map((prescription, index) => (
                          <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                            <div className="font-medium">{prescription.medication}</div>
                            <div className="text-gray-600">
                              {prescription.dosage} • {prescription.frequency}
                            </div>
                          </div>
                        ))}
                        {record.prescriptions.length > 2 && (
                          <div className="text-sm text-gray-500">
                            +{record.prescriptions.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {record.notes && (
                    <div className="mt-4">
                      <h5 className="font-medium mb-2">Clinical Notes</h5>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {record.notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 lg:ml-4">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="mr-1 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No records message */}
      {filteredRecords.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No records found
            </h3>
            <p className="text-gray-500 text-center mb-4">
              No medical records match your current filters.
            </p>
            <Button onClick={() => setShowAddRecordDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Record
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
