import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { API_URL } from "@/utils/api"

// ------------------ TYPES ------------------
interface Prescription {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface Vitals {
  bp: string;
  hr: string;
  temp: string;
  weight: string;
}

interface MedicalRecordForm {
  patientId: string;
  diagnosis: string;
  doctor: string;
  recordType: string;
  vitals: Vitals;
  prescriptions: Prescription[];
  notes: string;
}

// ------------------ COMPONENT ------------------
export default function AddRecord() {
  const [showDialog, setShowDialog] = useState(false);

  const [newRecord, setNewRecord] = useState<MedicalRecordForm>({
    patientId: "",
    diagnosis: "",
    doctor: "",
    recordType: "",
    vitals: { bp: "", hr: "", temp: "", weight: "" },
    prescriptions: [],
    notes: "",
  });

  const recordTypes = ["Consultation", "Surgery", "Lab Test"];

  const addPrescription = () =>
    setNewRecord((prev) => ({
      ...prev,
      prescriptions: [
        ...prev.prescriptions,
        { medication: "", dosage: "", frequency: "", duration: "" },
      ],
    }));

  const updatePrescription = (
    index: number,
    field: keyof Prescription,
    value: string
  ) => {
    const updated = [...newRecord.prescriptions];
    updated[index][field] = value;
    setNewRecord((prev) => ({ ...prev, prescriptions: updated }));
  };

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setError("");
    // Map frontend form to backend payload
    const payload = {
      patient: newRecord.patientId, // expects patient _id
      hospital: "68b1ec308f13038afa7efddd", // TODO: replace with actual hospital id (can be from context or prop)
      doctor: newRecord.doctor,
      diagnosis: newRecord.diagnosis,
      notes: newRecord.notes,
      vitals: newRecord.vitals,
      prescriptions: newRecord.prescriptions,
    };
    try {
      const res = await fetch(`${API_URL}/medical-records/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save record");
      }
      // Optionally handle success (e.g., show toast, refresh list)
      setShowDialog(false);
      setNewRecord({
        patientId: "",
        diagnosis: "",
        doctor: "",
        recordType: "",
        vitals: { bp: "", hr: "", temp: "", weight: "" },
        prescriptions: [],
        notes: "",
      });
    } catch (err: any) {
      setError(err.message || "Error saving record");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Record
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Medical Record</DialogTitle>
          <DialogDescription>
            Create a new medical record for a patient
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Patient Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patient-id">Patient ID</Label>
              <Input
                id="patient-id"
                placeholder="NI123456789"
                value={newRecord.patientId}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, patientId: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Record Type</Label>
              <Select
                onValueChange={(val) =>
                  setNewRecord({ ...newRecord, recordType: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
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
          </div>

          {/* Diagnosis */}
          <div>
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Input
              id="diagnosis"
              placeholder="Enter diagnosis"
              value={newRecord.diagnosis}
              onChange={(e) =>
                setNewRecord({ ...newRecord, diagnosis: e.target.value })
              }
            />
          </div>

          {/* Doctor */}
          <div>
            <Label htmlFor="doctor">Doctor</Label>
            <Input
              id="doctor"
              placeholder="Doctor's name"
              value={newRecord.doctor}
              onChange={(e) =>
                setNewRecord({ ...newRecord, doctor: e.target.value })
              }
            />
          </div>

          {/* Vitals */}
          <div>
            <Label className="text-base font-medium">Vitals</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {(Object.keys(newRecord.vitals) as (keyof Vitals)[]).map(
                (field) => (
                  <div key={field}>
                    <Label htmlFor={field}>
                      {field === "bp"
                        ? "Blood Pressure"
                        : field === "hr"
                        ? "Heart Rate"
                        : field === "temp"
                        ? "Temperature"
                        : "Weight"}
                    </Label>
                    <Input
                      id={field}
                      placeholder={
                        field === "bp"
                          ? "120/80"
                          : field === "hr"
                          ? "72"
                          : field === "temp"
                          ? "98.6°F"
                          : "165 lbs"
                      }
                      value={newRecord.vitals[field]}
                      onChange={(e) =>
                        setNewRecord((prev) => ({
                          ...prev,
                          vitals: { ...prev.vitals, [field]: e.target.value },
                        }))
                      }
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Prescriptions */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-base font-medium">Prescriptions</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPrescription}
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Prescription
              </Button>
            </div>
            <div className="space-y-4">
              {newRecord.prescriptions.map((prescription, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded"
                >
                  {(Object.keys(prescription) as (keyof Prescription)[]).map(
                    (field) => (
                      <div key={field}>
                        <Label>
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </Label>
                        <Input
                          placeholder={
                            field === "medication"
                              ? "Medication name"
                              : field === "dosage"
                              ? "10mg"
                              : field === "frequency"
                              ? "Once daily"
                              : "30 days"
                          }
                          value={prescription[field]}
                          onChange={(e) =>
                            updatePrescription(index, field, e.target.value)
                          }
                        />
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Clinical Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter clinical notes and observations..."
              rows={4}
              value={newRecord.notes}
              onChange={(e) =>
                setNewRecord({ ...newRecord, notes: e.target.value })
              }
            />
          </div>

          {/* Buttons & Error */}
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDialog(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Record"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
