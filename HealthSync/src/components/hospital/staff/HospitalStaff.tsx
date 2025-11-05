import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Staff } from "./types";
import StaffList from "./StaffList";
import StaffForm, { StaffFormData } from "./StaffForm";
import { API_URL } from "@/utils/api";

export default function HospitalStaff() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  // ------------------ Fetch Staff ------------------
  const fetchStaff = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get(
        `${API_URL}/hospital/staff/all`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setStaffList(response.data.staff || []);
      } else {
        toast.error("Failed to retrieve staff list");
      }
    } catch (err: any) {
      console.error("Error fetching staff:", err);
      setError("Failed to load staff. Please try again later.");
      toast.error("Unable to fetch staff records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // ------------------ Form Controls ------------------
  const handleAddClick = () => {
    setSelectedStaff(null);
    setFormMode("add");
    setIsFormOpen(true);
  };

  const handleEditClick = (staff: Staff) => {
    setSelectedStaff(staff);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedStaff(null);
  };

  // ------------------ Add/Edit Submit ------------------
  const handleFormSubmit = async (data: StaffFormData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      if (formMode === "add") {
        await axios.post(
          `${API_URL}/hospital/staff/add`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Staff added successfully");
      } else if (formMode === "edit" && data._id) {
        await axios.put(
          `${API_URL}/hospital/staff/edit/${data._id}`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Staff updated successfully");
      }

      await fetchStaff(); // refresh list
      setIsFormOpen(false);
    } catch (err: any) {
      console.error("Error saving staff:", err);
      toast.error("Failed to save staff details");
    }
  };

  const handleDeleteClick = async (staffId: string) => {
  const confirmed = window.confirm("Are you sure you want to delete this staff?");
  if (!confirmed) return;

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    await axios.delete(`${API_URL}/hospital/staff/delete/${staffId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Staff deleted successfully");
    await fetchStaff(); // refresh list
  } catch (err: any) {
    console.error("Error deleting staff:", err);
    toast.error("Failed to delete staff. Please try again.");
  }
};


  // ------------------ Render ------------------
  return (
    <div className="p-6 w-full">
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-2xl font-semibold">Staff Management</CardTitle>
          <Button onClick={handleAddClick} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Staff
          </Button>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-gray-500 text-center py-10">Loading staff...</p>
          ) : error ? (
            <p className="text-red-500 text-center py-10">{error}</p>
          ) : staffList.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No staff members found. Click “Add Staff” to get started.
            </p>
          ) : (
            <StaffList staffList={staffList} onEdit={handleEditClick} onDelete={handleDeleteClick} />
          )}
        </CardContent>
      </Card>

      <StaffForm
        open={isFormOpen}
        onClose={handleCloseForm}
        mode={formMode}
        initialData={selectedStaff}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
