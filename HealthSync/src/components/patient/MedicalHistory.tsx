
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


// Mock data


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



const MedicalHistory = () => {
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
                  {medicalHistory.map((record) => (
                    <Card key={record.id}>
                      <CardHeader className="p-4 lg:p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg lg:text-xl">
                              {record.diagnosis}
                            </CardTitle>
                            <CardDescription className="text-xs lg:text-sm break-words">
                              {record.hospital} • Dr. {record.doctor} •{" "}
                              {record.date}
                            </CardDescription>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs self-start sm:self-center"
                          >
                            {record.date}
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
                                    {prescription.dosage} •{" "}
                                    {prescription.frequency}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
    </>
  )
}

export default MedicalHistory
