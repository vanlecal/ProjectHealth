import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const HospitalRegister = () => {
  const [name, setName] = useState("");
  const [licenseId, setLicenseId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");
  const [hospitalType, setHospitalType] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await postRequest("hospital/register", {
        name,
        registrationNumber: licenseId,
        type: hospitalType,
        phone,
        email,
        region,
        address,
        password,
      });
      localStorage.setItem("token", response.token);
      navigate("/hospital/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed, please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Background for mobile/tablet */}
      <div
        className="absolute inset-0 lg:hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/medicare.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-purple-800/70 to-indigo-900/80"></div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex h-full bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
        {/* Left side - Form (Desktop) */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
          <div className="w-full max-w-md my-auto">
            <Card className="shadow-2xl rounded-2xl overflow-hidden bg-white">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <CardTitle className="text-2xl font-bold text-center">
                  Hospital Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm">
                      Hospital Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter hospital name"
                      className="text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseId" className="text-sm">
                      License ID
                    </Label>
                    <Input
                      id="licenseId"
                      type="text"
                      value={licenseId}
                      onChange={(e) => setLicenseId(e.target.value)}
                      placeholder="Enter license ID"
                      className="text-sm"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Hospital phone number"
                        className="text-sm"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Official email"
                        className="text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="region" className="text-sm">
                      Region
                    </Label>
                    <Select value={region} onValueChange={setRegion} required>
                      <SelectTrigger id="region" className="text-sm">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Greater Accra Region">Greater Accra</SelectItem>
                        <SelectItem value="Eastern Region">Eastern</SelectItem>
                        <SelectItem value="Ashanti Region">Ashanti</SelectItem>
                        <SelectItem value="Western Region">Western</SelectItem>
                        <SelectItem value="Central Region">Central</SelectItem>
                        <SelectItem value="Northern Region">Northern</SelectItem>
                        <SelectItem value="Volta Region">Volta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hospitalType" className="text-sm">
                      Hospital Type
                    </Label>
                    <Select value={hospitalType} onValueChange={setHospitalType} required>
                      <SelectTrigger id="hospitalType" className="text-sm">
                        <SelectValue placeholder="Select hospital type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Specialist">Specialist</SelectItem>
                        <SelectItem value="Clinic">Clinic</SelectItem>
                        <SelectItem value="Teaching">Teaching</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                 </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm">
                      Address
                    </Label>
                    <Input
                      id="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Hospital address"
                      className="text-sm"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create password"
                        className="text-sm"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className="text-sm"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </Button>
                  <div className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <span
                      onClick={() => navigate("/hospital/login")}
                      className="text-purple-600 hover:text-purple-800 cursor-pointer font-semibold underline"
                    >
                      Log In
                    </span>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right side - Image (Desktop) */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-l from-purple-800/20 to-transparent z-10"></div>
          <img
            src="/medicare.jpg"
            alt="Hospital"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center text-white p-8 max-w-lg">
              <h2 className="text-4xl font-bold mb-4">Partner With Us</h2>
              <p className="text-xl opacity-90">
                Connect with patients and streamline healthcare access
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet layout with background image */}
      <div className="lg:hidden h-full relative z-10 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4">
          <div className="w-full max-w-md my-4">
            <Card className="shadow-2xl rounded-2xl overflow-hidden bg-white/95 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <CardTitle className="text-xl sm:text-2xl font-bold text-center">
                  Hospital Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {error && (
                  <Alert variant="destructive" className="mb-4 sm:mb-6">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleRegister} className="space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-mobile" className="text-sm">
                      Hospital Name
                    </Label>
                    <Input
                      id="name-mobile"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter hospital name"
                      className="text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseId-mobile" className="text-sm">
                      License ID
                    </Label>
                    <Input
                      id="licenseId-mobile"
                      type="text"
                      value={licenseId}
                      onChange={(e) => setLicenseId(e.target.value)}
                      placeholder="Enter license ID"
                      className="text-sm"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone-mobile" className="text-sm">
                        Phone Number
                      </Label>
                      <Input
                        id="phone-mobile"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Hospital phone number"
                        className="text-sm"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email-mobile" className="text-sm">
                        Email
                      </Label>
                      <Input
                        id="email-mobile"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Official email"
                        className="text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="region-mobile" className="text-sm">
                        Region
                      </Label>
                      <Select value={region} onValueChange={setRegion} required>
                        <SelectTrigger id="region-mobile" className="text-sm">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Greater Accra Region">Greater Accra</SelectItem>
                          <SelectItem value="Eastern Region">Eastern</SelectItem>
                          <SelectItem value="Ashanti Region">Ashanti</SelectItem>
                          <SelectItem value="Western Region">Western</SelectItem>
                          <SelectItem value="Central Region">Central</SelectItem>
                          <SelectItem value="Northern Region">Northern</SelectItem>
                          <SelectItem value="Volta Region">Volta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hospitalType-mobile" className="text-sm">
                        Hospital Type
                      </Label>
                      <Select value={hospitalType} onValueChange={setHospitalType} required>
                        <SelectTrigger id="hospitalType-mobile" className="text-sm">
                          <SelectValue placeholder="Select hospital type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General">General</SelectItem>
                          <SelectItem value="Specialist">Specialist</SelectItem>
                          <SelectItem value="Clinic">Clinic</SelectItem>
                          <SelectItem value="Teaching">Teaching</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address-mobile" className="text-sm">
                        Address
                      </Label>
                      <Input
                        id="address-mobile"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Hospital address"
                        className="text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password-mobile" className="text-sm">
                        Password
                      </Label>
                      <Input
                        id="password-mobile"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create password"
                        className="text-sm"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword-mobile" className="text-sm">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword-mobile"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className="text-sm"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </Button>
                  <div className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <span
                      onClick={() => navigate("/hospital/login")}
                      className="text-purple-600 hover:text-purple-800 cursor-pointer font-semibold underline"
                    >
                      Log In
                    </span>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalRegister;
