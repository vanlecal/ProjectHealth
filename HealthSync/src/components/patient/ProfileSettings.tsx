import {
  Plus,
} from "lucide-react";

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



function ProfileSettings() {
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
                      <CardTitle className="text-lg lg:text-xl">
                        Profile Picture
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-4 p-4 lg:p-6">
                      <Avatar className="h-20 w-20 lg:h-24 lg:w-24">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback className="text-xl lg:text-2xl">
                          SJ
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        variant="outline"
                        className="text-sm lg:text-base"
                      >
                        Change Picture
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Personal Information */}
                  <Card className="lg:col-span-2">
                    <CardHeader className="p-4 lg:p-6">
                      <CardTitle className="text-lg lg:text-xl">
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 lg:p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="firstName"
                            className="text-sm lg:text-base"
                          >
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            defaultValue="Sarah"
                            className="text-sm lg:text-base"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="lastName"
                            className="text-sm lg:text-base"
                          >
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            defaultValue="Johnson"
                            className="text-sm lg:text-base"
                          />
                        </div>
                      </div>
                      <div>
                        <Label
                          htmlFor="nationalId"
                          className="text-sm lg:text-base"
                        >
                          National Insurance ID
                        </Label>
                        <Input
                          id="nationalId"
                          defaultValue={patientData.nationalId}
                          disabled
                          className="text-sm lg:text-base"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dob" className="text-sm lg:text-base">
                          Date of Birth
                        </Label>
                        <Input
                          id="dob"
                          type="date"
                          defaultValue={patientData.dateOfBirth}
                          className="text-sm lg:text-base"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="phone"
                            className="text-sm lg:text-base"
                          >
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            defaultValue={patientData.phone}
                            className="text-sm lg:text-base"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="email"
                            className="text-sm lg:text-base"
                          >
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue={patientData.email}
                            className="text-sm lg:text-base"
                          />
                        </div>
                      </div>
                      <div>
                        <Label
                          htmlFor="address"
                          className="text-sm lg:text-base"
                        >
                          Address
                        </Label>
                        <Input
                          id="address"
                          defaultValue={patientData.address}
                          className="text-sm lg:text-base"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Medical Information */}
                  <Card className="lg:col-span-3">
                    <CardHeader className="p-4 lg:p-6">
                      <CardTitle className="text-lg lg:text-xl">
                        Medical Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 lg:p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="bloodType"
                            className="text-sm lg:text-base"
                          >
                            Blood Type
                          </Label>
                          <Select defaultValue={patientData.bloodType}>
                            <SelectTrigger className="text-sm lg:text-base">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label
                            htmlFor="emergencyContact"
                            className="text-sm lg:text-base"
                          >
                            Emergency Contact
                          </Label>
                          <Input
                            id="emergencyContact"
                            placeholder="Name and phone number"
                            className="text-sm lg:text-base"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm lg:text-base">
                          Known Allergies
                        </Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {patientData.allergies.map((allergy) => (
                            <Badge
                              key={allergy}
                              variant="destructive"
                              className="text-xs"
                            >
                              {allergy}
                            </Badge>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs lg:text-sm"
                          >
                            <Plus className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                            Add Allergy
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button variant="outline" className="text-sm lg:text-base">
                    Cancel
                  </Button>
                  <Button className="text-sm lg:text-base">Save Changes</Button>
                </div>
    </>
  )
}

export default ProfileSettings
