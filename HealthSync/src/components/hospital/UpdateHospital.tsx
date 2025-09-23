import { useState, useEffect } from "react";
import {
  Hospital,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface HospitalInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  registrationNumber: string;
  departments: string[];
  yearEstablished?: string;
  website?: string;
  emergencyAvailable?: boolean;
}

export default function UpdateHospital() {
  const [hospitalInfo, setHospitalInfo] = useState<HospitalInfo>({
    name: "",
    address: "",
    phone: "",
    email: "",
    registrationNumber: "",
    departments: [],
    yearEstablished: "",
    website: "",
    emergencyAvailable: false,
  });

  const [newSpecialty, setNewSpecialty] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch hospital profile on mount
  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const token = localStorage.getItem("token"); // token from login
        const res = await fetch("http://localhost:5000/api/hospital/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch hospital data");

        const data = await res.json();
        setHospitalInfo({
          name: data.name,
          address: data.address,
          phone: data.phone,
          email: data.email,
          registrationNumber: data.registrationNumber,
          departments: data.departments || [],
          yearEstablished: data.yearEstablished?.toString() || "",
          website: data.website || "",
          emergencyAvailable: data.emergencyAvailable || false,
        });
      } catch (err) {
        console.error("Error fetching hospital:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, []);

  // 🔹 Handle profile update
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/hospital/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(hospitalInfo),
      });

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      alert("Hospital profile updated successfully!");
      setHospitalInfo(data.hospital); // update state with new values
    } catch (err) {
      console.error("Error updating hospital:", err);
      alert("Error updating profile");
    }
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !hospitalInfo.departments.includes(newSpecialty.trim())) {
      setHospitalInfo(prev => ({
        ...prev,
        departments: [...prev.departments, newSpecialty.trim()]
      }));
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    setHospitalInfo(prev => ({
      ...prev,
      departments: prev.departments.filter(s => s !== specialty)
    }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Hospital className="mr-2 h-5 w-5" />
            Hospital Information
          </CardTitle>
          <CardDescription>
            Basic information about your hospital
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="hospital-name">Hospital Name</Label>
              <Input
                id="hospital-name"
                value={hospitalInfo.name}
                onChange={(e) => setHospitalInfo(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="registration">Registration Number</Label>
              <Input
                id="registration"
                value={hospitalInfo.registrationNumber}
                onChange={(e) => setHospitalInfo(prev => ({ ...prev, registrationNumber: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              rows={2}
              value={hospitalInfo.address}
              onChange={(e) => setHospitalInfo(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={hospitalInfo.phone}
                onChange={(e) => setHospitalInfo(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={hospitalInfo.email}
                onChange={(e) => setHospitalInfo(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="established">Year Established</Label>
              <Input
                id="established"
                value={hospitalInfo.yearEstablished}
                onChange={(e) => setHospitalInfo(prev => ({ ...prev, yearEstablished: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={hospitalInfo.website}
                onChange={(e) => setHospitalInfo(prev => ({ ...prev, website: e.target.value }))}
              />
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-base font-medium">Departments</Label>
            <p className="text-sm text-gray-600 mb-4">
              Manage the medical specialties offered at your hospital
            </p>
            
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Add new department"
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSpecialty()}
              />
              <Button onClick={addSpecialty} variant="outline">
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {hospitalInfo.departments.map((specialty) => (
                <Badge
                  key={specialty}
                  variant="secondary"
                  className="flex items-center gap-1 pr-1"
                >
                  {specialty}
                  <button
                    onClick={() => removeSpecialty(specialty)}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <Button onClick={handleUpdate} className="mt-6">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
