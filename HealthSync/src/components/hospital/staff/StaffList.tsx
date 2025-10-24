import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Staff } from "./types";
import { Pencil, Trash2 } from "lucide-react";

interface StaffListProps {
  staffList: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (staffId: string) => void;
}

const StaffList: FC<StaffListProps> = ({ staffList, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <Card className="border-none shadow-none">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800">
              <TableHead className="text-gray-700 dark:text-gray-200">Name</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-200">Role</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-200">Specialization</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-200">Email</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-200">Phone</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-200 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {staffList.map((staff) => (
              <TableRow
                key={staff._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>{staff.specialization}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.phoneNumber}</TableCell>
                <TableCell className="text-right">
  <div className="flex justify-end items-center gap-3">
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
      onClick={() => onEdit(staff)}
    >
      <Pencil className="h-4 w-4" />
      Edit
    </Button>
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2 border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
      onClick={() => onDelete(staff._id)}
    >
      <Trash2 className="h-4 w-4" />
      Delete
    </Button>
  </div>
</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default StaffList;
