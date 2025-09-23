import { useState } from "react";
import {
  Settings as SettingsIcon,
  Hospital,
  Shield,
  Bell,
  Database,
  Download,
  Upload,
  Save,
  AlertTriangle,
  Check,
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import UpdateHospital from "./UpdateHospital";

// Types
interface HospitalInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  license: string;
  specialties: string[];
  established: string;
  website: string;
  emergencyContact: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  appointmentReminders: boolean;
  emergencyAlerts: boolean;
  systemUpdates: boolean;
  reportNotifications: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: string;
  passwordPolicy: string;
  auditLogging: boolean;
  dataEncryption: boolean;
}

interface SystemSettings {
  timezone: string;
  dateFormat: string;
  language: string;
  backupFrequency: string;
  autoSave: boolean;
  maintenanceMode: boolean;
}

export default function MySettings() {
  const [hospitalInfo, setHospitalInfo] = useState<HospitalInfo>({
    name: "City General Hospital",
    address: "456 Health Ave, Medical City, MC 12345",
    phone: "+1 (555) 987-6543",
    email: "admin@citygeneralhospital.com",
    license: "HOS-2024-001",
    specialties: ["Cardiology", "Neurology", "Orthopedics", "Emergency Medicine"],
    established: "1985",
    website: "www.citygeneralhospital.com",
    emergencyContact: "+1 (555) 911-HELP",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    emergencyAlerts: true,
    systemUpdates: true,
    reportNotifications: false,
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordPolicy: "strong",
    auditLogging: true,
    dataEncryption: true,
  });

  const [system, setSystem] = useState<SystemSettings>({
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    language: "en",
    backupFrequency: "daily",
    autoSave: true,
    maintenanceMode: false,
  });

  const [newSpecialty, setNewSpecialty] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const handleSaveSettings = () => {
    setSaveStatus("saving");
    // Simulate save operation
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !hospitalInfo.specialties.includes(newSpecialty.trim())) {
      setHospitalInfo(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }));
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    setHospitalInfo(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Hospital Settings
          </h2>
          <p className="text-gray-600">
            Manage hospital information and system preferences
          </p>
        </div>
        <Button onClick={handleSaveSettings} disabled={saveStatus === "saving"}>
          {saveStatus === "saving" ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              Saving...
            </>
          ) : saveStatus === "saved" ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="hospital" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hospital" className="flex items-center space-x-2">
            <Hospital className="h-4 w-4" />
            <span className="hidden sm:inline">Hospital</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <SettingsIcon className="h-4 w-4" />
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
        </TabsList>

        {/* Hospital Information */}
        <TabsContent value="hospital" className="space-y-6">
          <UpdateHospital/>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked: boolean) => 
                      setNotifications(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">SMS Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via text message</p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked: boolean) => 
                      setNotifications(prev => ({ ...prev, smsNotifications: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Appointment Reminders</Label>
                    <p className="text-sm text-gray-600">Get notified about upcoming appointments</p>
                  </div>
                  <Switch
                    checked={notifications.appointmentReminders}
                    onCheckedChange={(checked: boolean) => 
                      setNotifications(prev => ({ ...prev, appointmentReminders: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Emergency Alerts</Label>
                    <p className="text-sm text-gray-600">Critical emergency notifications</p>
                  </div>
                  <Switch
                    checked={notifications.emergencyAlerts}
                    onCheckedChange={(checked: boolean) => 
                      setNotifications(prev => ({ ...prev, emergencyAlerts: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">System Updates</Label>
                    <p className="text-sm text-gray-600">Notifications about system maintenance and updates</p>
                  </div>
                  <Switch
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked: boolean) => 
                      setNotifications(prev => ({ ...prev, systemUpdates: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Report Notifications</Label>
                    <p className="text-sm text-gray-600">Get notified when reports are generated</p>
                  </div>
                  <Switch
                    checked={notifications.reportNotifications}
                    onCheckedChange={(checked: boolean) => 
                      setNotifications(prev => ({ ...prev, reportNotifications: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage security and authentication preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    checked={security.twoFactorAuth}
                    onCheckedChange={(checked: boolean) => 
                      setSecurity(prev => ({ ...prev, twoFactorAuth: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Audit Logging</Label>
                    <p className="text-sm text-gray-600">Keep detailed logs of all system activities</p>
                  </div>
                  <Switch
                    checked={security.auditLogging}
                    onCheckedChange={(checked: boolean) => 
                      setSecurity(prev => ({ ...prev, auditLogging: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Data Encryption</Label>
                    <p className="text-sm text-gray-600">Encrypt sensitive patient data</p>
                  </div>
                  <Switch
                    checked={security.dataEncryption}
                    onCheckedChange={(checked: boolean) => 
                      setSecurity(prev => ({ ...prev, dataEncryption: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Session Timeout (minutes)</Label>
                    <Select 
                      value={security.sessionTimeout} 
                      onValueChange={(value) => setSecurity(prev => ({ ...prev, sessionTimeout: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Password Policy</Label>
                    <Select 
                      value={security.passwordPolicy} 
                      onValueChange={(value) => setSecurity(prev => ({ ...prev, passwordPolicy: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                        <SelectItem value="strong">Strong (8+ chars, mixed case, numbers)</SelectItem>
                        <SelectItem value="very-strong">Very Strong (12+ chars, symbols)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                System Configuration
              </CardTitle>
              <CardDescription>
                Configure system-wide settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Timezone</Label>
                  <Select 
                    value={system.timezone} 
                    onValueChange={(value) => setSystem(prev => ({ ...prev, timezone: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Date Format</Label>
                  <Select 
                    value={system.dateFormat} 
                    onValueChange={(value) => setSystem(prev => ({ ...prev, dateFormat: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Language</Label>
                  <Select 
                    value={system.language} 
                    onValueChange={(value) => setSystem(prev => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Backup Frequency</Label>
                  <Select 
                    value={system.backupFrequency} 
                    onValueChange={(value) => setSystem(prev => ({ ...prev, backupFrequency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Auto-Save</Label>
                    <p className="text-sm text-gray-600">Automatically save changes</p>
                  </div>
                  <Switch
                    checked={system.autoSave}
                    onCheckedChange={(checked: boolean) => 
                      setSystem(prev => ({ ...prev, autoSave: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base flex items-center">
                      <AlertTriangle className="mr-2 h-4 w-4 text-orange-500" />
                      Maintenance Mode
                    </Label>
                    <p className="text-sm text-gray-600">Put the system in maintenance mode</p>
                  </div>
                  <Switch
                    checked={system.maintenanceMode}
                    onCheckedChange={(checked: boolean) => 
                      setSystem(prev => ({ ...prev, maintenanceMode: checked }))
                    }
                  />
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium">Data Management</Label>
                <p className="text-sm text-gray-600 mb-4">
                  Import and export hospital data
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Data
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                  <Button variant="outline">
                    <Database className="mr-2 h-4 w-4" />
                    Backup Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
