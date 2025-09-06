import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

interface Prescription {
  medication: string;
  dosage: string;
  frequency: string;
  duration?: string;
}

interface MedicalRecord {
  _id?: string;
  id?: number;
  date: string;
  hospital: string | { name: string };
  doctor: string;
  diagnosis: string;
  prescriptions: Prescription[];
  notes?: string;
}

const MedicalHistory = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!user?._id) {
        setError("No patient ID found.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`http://localhost:5000/api/medical-records/${user._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch medical records.");
        }
        const data = await response.json();
        console.log("Fetched medical records:", data);
        setRecords(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || "Error fetching records.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [user]);

  return (
    <>
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Medical History
        </h2>
        <p className="text-gray-600 text-sm lg:text-base">
          Your complete medical records and treatment history
        </p>
      </div>

      <div className="space-y-4 lg:space-y-6">
        {loading ? (
          <p>Loading medical history...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : records.length === 0 ? (
          <p>No medical records found.</p>
        ) : (
          records.map((record, idx) => (
            <Card key={record._id || record.id || idx}>
              <CardHeader className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg lg:text-xl">
                      {record.diagnosis}
                    </CardTitle>
                    <CardDescription className="text-xs lg:text-sm break-words">
                      {typeof record.hospital === "string"
                        ? record.hospital
                        : record.hospital?.name || "Unknown Hospital"}{" "}
                      • Dr. {record.doctor} •{" "}
                      {record.date
                        ? new Date(record.date).toLocaleDateString()
                        : ""}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs self-start sm:self-center"
                  >
                    {record.date
                      ? new Date(record.date).toLocaleDateString()
                      : ""}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 lg:p-6">
                <div>
                  <h4 className="font-medium mb-3 text-sm lg:text-base">
                    Prescribed Medications:
                  </h4>
                  <div className="space-y-2">
                    {record.prescriptions.map((prescription, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm lg:text-base">
                            {prescription.medication}
                          </p>
                          <p className="text-xs lg:text-sm text-gray-600">
                            {prescription.dosage} • {prescription.frequency}
                            {prescription.duration
                              ? ` • ${prescription.duration}`
                              : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {record.notes && (
                    <div className="mt-3">
                      <h4 className="font-medium mb-1 text-sm lg:text-base">
                        Notes:
                      </h4>
                      <p className="text-xs lg:text-sm text-gray-700 bg-white p-3 rounded border">
                        {record.notes}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </>
  );
};

export default MedicalHistory;