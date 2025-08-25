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

const PatientRegister = () => {
  const [name, setName] = useState("");
  const [IdCard, setIdCard] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sex, setSex] = useState("");
  const [region, setregion] = useState("");
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
      const response = await postRequest("patient/register", {
        name,
        IdCard,
        phone,
        email,
        sex,
        region,
        password,
      });
      localStorage.setItem("token", response.token);
      navigate("/patient/dashboard");
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
                  Patient Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="text-sm"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="IdCard" className="text-sm">
                        Heath ID
                      </Label>
                      <Input
                        id="index"
                        type="text"
                        value={IdCard}
                        onChange={(e) => setIdCard(e.target.value)}
                        placeholder="Heath Insurance Card"
                        className="text-sm"
                        required
                      />
                    </div>
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
                        placeholder="Phone number"
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
                        placeholder="Email address"
                        className="text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sex" className="text-sm">
                        Gender
                      </Label>
                      <Select value={sex} onValueChange={setSex} required>
                        <SelectTrigger id="sex" className="text-sm">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="program" className="text-sm">
                        Region
                      </Label>
                      <Select value={region} onValueChange={setregion} required>
                        <SelectTrigger id="program" className="text-sm">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Grater Accra Region">
                            Greater Accra
                          </SelectItem>
                          <SelectItem value="Eastern Region">
                            Eastern
                          </SelectItem>
                          <SelectItem value="Ashanti Region">
                            Ashanti
                          </SelectItem>
                          <SelectItem value="Western Region">
                            Western
                          </SelectItem>
                          <SelectItem value="Central Region">
                            Central
                          </SelectItem>
                          <SelectItem value="Northern Region">
                            Northern
                          </SelectItem>
                          <SelectItem value="Volta Region">Volta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                      onClick={() => navigate("/patient/login")}
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
            alt="Healthcare"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center text-white p-8 max-w-lg">
              <h2 className="text-4xl font-bold mb-4">
                Your Health Journey Starts Here
              </h2>
              <p className="text-xl opacity-90">
                Join thousands of patients managing their health with ease
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
                  Patient Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {error && (
                  <Alert variant="destructive" className="mb-4 sm:mb-6">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form
                  onSubmit={handleRegister}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name-mobile" className="text-sm">
                      Full Name
                    </Label>
                    <Input
                      id="name-mobile"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="IdCard-mobile" className="text-sm">
                      Heath ID
                    </Label>
                    <Input
                      id="IdCard-mobile"
                      type="text"
                      value={IdCard}
                      onChange={(e) => setIdCard(e.target.value)}
                      placeholder="Heath Insurance Card Number"
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
                        placeholder="Phone number"
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
                        placeholder="Email address"
                        className="text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sex-mobile" className="text-sm">
                        Gender
                      </Label>
                      <Select value={sex} onValueChange={setSex} required>
                        <SelectTrigger id="sex-mobile" className="text-sm">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="region-mobile" className="text-sm">
                        Region
                      </Label>
                      <Select value={region} onValueChange={setregion} required>
                        <SelectTrigger id="region-mobile" className="text-sm">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Grater Accra Region">
                            Greater Accra
                          </SelectItem>
                          <SelectItem value="Eastern Region">
                            Eastern
                          </SelectItem>
                          <SelectItem value="Ashanti Region">
                            Ashanti
                          </SelectItem>
                          <SelectItem value="Western Region">
                            Western
                          </SelectItem>
                          <SelectItem value="Central Region">
                            Central
                          </SelectItem>
                          <SelectItem value="Northern Region">
                            Northern
                          </SelectItem>
                          <SelectItem value="Volta Region">Volta</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Label
                        htmlFor="confirmPassword-mobile"
                        className="text-sm"
                      >
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
                      onClick={() => navigate("/patient/login")}
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

export default PatientRegister;
