import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "@/utils/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock } from "lucide-react";

const PatientLogin = () => {
  const [InsuranceID, setInsuranceID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(""); // Clear any previous errors

    try {
      const response = await postRequest("patient/login", {
        InsuranceID,
        password,
      });
      localStorage.setItem("token", response.token);
      navigate("/patient/dashboard");
    } catch (err: Error | unknown) {
      console.error("Login error:", err);
      if (err instanceof Error) {
        setError(err.message || "Invalid credentials, please try again!");
      } else if (typeof err === "object" && err !== null && "response" in err) {
        const errorResponse = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          errorResponse.response?.data?.message ||
            "Invalid credentials, please try again!"
        );
      } else {
        setError("Invalid credentials, please try again!");
      }
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
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Card className="shadow-2xl rounded-2xl overflow-hidden bg-white">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <CardTitle className="text-2xl font-bold text-center">
                  Patient Login
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <Lock className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="InsuranceID">Insurance ID</Label>
                    <Input
                      id="InsuranceID"
                      type="text"
                      value={InsuranceID}
                      onChange={(e) => setInsuranceID(e.target.value)}
                      placeholder="Enter your Insurance ID"
                      className="text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="text-sm"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                  <div className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <span
                      onClick={() => navigate("/patient/signup")}
                      className="text-purple-600 hover:text-purple-800 cursor-pointer font-semibold underline"
                    >
                      Sign up here
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
                Welcome Back
              </h2>
              <p className="text-xl opacity-90">
                Access your health records and manage appointments
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
                  Patient Login
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {error && (
                  <Alert variant="destructive" className="mb-4 sm:mb-6">
                    <Lock className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="InsuranceID" className="text-sm">Insurance ID</Label>
                    <Input
                      id="InsuranceID"
                      type="text"
                      value={InsuranceID}
                      onChange={(e) => setInsuranceID(e.target.value)}
                      placeholder="Enter your Insurance ID"
                      className="text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-mobile" className="text-sm">Password</Label>
                    <Input
                      id="password-mobile"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="text-sm"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                  <div className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <span
                      onClick={() => navigate("/patient/signup")}
                      className="text-purple-600 hover:text-purple-800 cursor-pointer font-semibold underline"
                    >
                      Sign up here
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
export default PatientLogin;
