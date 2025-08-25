import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const HospitalRegister = () => {
  const [hospitalName, setHospitalName] = useState("");
  const [licenseId, setLicenseId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        name: hospitalName,
        licenseId,
        phone,
        email,
        region,
        address,
        password,
      });
      localStorage.setItem("token", response.token);
      navigate("/hospital/dashboard");
    } catch (err) {
      console.error("Hospital registration error:", err);
      setError("Registration failed, please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Background */}
      <div
        className="absolute inset-0 lg:hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hospital-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-indigo-800/70 to-purple-900/80"></div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex h-full bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
          <div className="w-full max-w-md my-auto">
            <Card className="shadow-2xl rounded-2xl overflow-hidden bg-white">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
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
                    <Label htmlFor="hospitalName" className="text-sm">
                      Hospital Name
                    </Label>
                    <Input
                      id="hospitalName"
                      type="text"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      placeholder="Enter hospital name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseId" className="text-sm">
                      License / Registration Number
                    </Label>
                    <Input
                      id="licenseId"
                      type="text"
                      value={licenseId}
                      onChange={(e) => setLicenseId(e.target.value)}
                      placeholder="Official license number"
                      required
                    />
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
                      placeholder="Full hospital address"
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
                        placeholder="Hospital phone"
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
                        placeholder="Hospital email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="region" className="text-sm">
                      Region
                    </Label>
                    <Input
                      id="region"
                      type="text"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      placeholder="Region (e.g. Greater Accra)"
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
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </Button>
                  <div className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <span
                      onClick={() => navigate("/hospital/login")}
                      className="text-indigo-600 hover:text-indigo-800 cursor-pointer font-semibold underline"
                    >
                      Log In
                    </span>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="flex-1 relative">
          <img
            src="/hospital-bg.jpg"
            alt="Hospital"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-indigo-800/30 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default HospitalRegister;
