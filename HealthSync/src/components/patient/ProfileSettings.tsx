import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";

function ProfileSettings() {
  const { user } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    region: user?.region || "",
    dateOfBirth: (user as any)?.dateOfBirth || "",
    bloodType: (user as any)?.bloodType || "",
    emergencyContact: (user as any)?.emergencyContact?.name
      ? `${(user as any).emergencyContact.name} - ${(user as any).emergencyContact.phone}`
      : "",
    knownAllergies: (user as any)?.knownAllergies || [],
  });

  const [newAllergy, setNewAllergy] = useState("");

  // Handle input changes
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Add allergy to list
  const handleAddAllergy = () => {
    if (newAllergy.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        knownAllergies: [...prev.knownAllergies, newAllergy.trim()],
      }));
      setNewAllergy("");
    }
  };

  // Submit updated data
  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/patient/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({
          ...formData,
          emergencyContact: {
            name: formData.emergencyContact.split(" - ")[0] || "",
            phone: formData.emergencyContact.split(" - ")[1] || "",
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await res.json();
      console.log("Profile updated:", updatedUser);

      // optional: refresh page or update AuthContext if you expose setUser
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  return (
    <>
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Profile Settings
        </h2>
        <p className="text-gray-600 text-sm lg:text-base">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Profile Picture */}
        <Card>
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-lg lg:text-xl">Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4 p-4 lg:p-6">
            <Avatar className="h-20 w-20 lg:h-24 lg:w-24">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="text-xl lg:text-2xl">
                {user?.name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" className="text-sm lg:text-base">
              Change Picture
            </Button>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-lg lg:text-xl">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4 lg:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm lg:text-base">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="dob" className="text-sm lg:text-base">
                  Date of Birth
                </Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dateOfBirth?.split("T")[0] || ""}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm lg:text-base">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm lg:text-base">
                Email Address
              </Label>
              <Input id="email" value={formData.email} disabled />
            </div>
            <div>
              <Label htmlFor="address" className="text-sm lg:text-base">
                Address
              </Label>
              <Input
                id="address"
                value={formData.region}
                onChange={(e) => handleChange("region", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card className="lg:col-span-3">
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="text-lg lg:text-xl">Medical Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4 lg:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bloodType" className="text-sm lg:text-base">
                  Blood Type
                </Label>
                <Select
                  value={formData.bloodType}
                  onValueChange={(val) => handleChange("bloodType", val)}
                >
                  <SelectTrigger className="text-sm lg:text-base">
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (bt) => (
                        <SelectItem key={bt} value={bt}>
                          {bt}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="emergencyContact" className="text-sm lg:text-base">
                  Emergency Contact
                </Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleChange("emergencyContact", e.target.value)}
                  placeholder="Name - Phone"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm lg:text-base">Known Allergies</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.knownAllergies.map((allergy: string, i: number) => (
                  <Badge key={i} variant="destructive" className="text-xs">
                  {allergy}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  placeholder="Add allergy"
                  className="text-sm lg:text-base"
                />
                <Button variant="outline" size="sm" onClick={handleAddAllergy}>
                  <Plus className="h-3 w-3 mr-1" /> Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
        <Button variant="outline" className="text-sm lg:text-base">
          Cancel
        </Button>
        <Button className="text-sm lg:text-base" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </>
  );
}

export default ProfileSettings;
