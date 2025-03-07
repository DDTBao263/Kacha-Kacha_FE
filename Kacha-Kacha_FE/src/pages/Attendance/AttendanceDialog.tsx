import type React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { AttendanceData } from "../../types/attendance"

// Helper function to convert time string (like "08:00 AM") to input time format ("08:00")
function convertTimeStringToInputTime(timeString: string): string {
  if (timeString === "-") return ""

  // Parse the time string
  const [time, period] = timeString.split(" ")
  const [hours, minutes] = time.split(":")

  // Convert to 24-hour format for input type="time"
  let hoursNum = Number.parseInt(hours, 10)
  if (period === "PM" && hoursNum < 12) hoursNum += 12
  if (period === "AM" && hoursNum === 12) hoursNum = 0

  return `${hoursNum.toString().padStart(2, "0")}:${minutes}`
}

interface AttendanceDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  isEditMode: boolean
  selectedRecord: AttendanceData | null
}

export function AttendanceDialog({
  open,
  onClose,
  onSubmit,
  isEditMode,
  selectedRecord,
}: AttendanceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Attendance Record" : "Add New Attendance Record"}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the attendance information for this employee."
                : "Add a new attendance record for an employee."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="employee" className="text-right">
                Employee
              </Label>
              <div className="col-span-3">
                <Select defaultValue={selectedRecord?.employee || ""} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {extendedAttendanceData.map((employee) => (
                            <SelectItem key={employee.id} value={employee.employee}>
                            {employee.employee}
                            </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <div className="col-span-3">
                <Select defaultValue={selectedRecord?.status || "Present"} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Present">Present</SelectItem>
                    <SelectItem value="Absent">Absent</SelectItem>
                    <SelectItem value="Late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clockIn" className="text-right">
                Clock In
              </Label>
              <Input
                id="clockIn"
                type="time"
                defaultValue={selectedRecord?.clockIn ? convertTimeStringToInputTime(selectedRecord.clockIn) : ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clockOut" className="text-right">
                Clock Out
              </Label>
              <Input
                id="clockOut"
                type="time"
                defaultValue={selectedRecord?.clockOut ? convertTimeStringToInputTime(selectedRecord.clockOut) : ""}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


export const extendedAttendanceData = [
    {
      id: 1,
      employee: "John Smith",
      status: "Present",
      clockIn: "08:02 AM",
      clockOut: "05:00 PM",
      totalHours: "8.97",
    },
    {
      id: 2,
      employee: "Maria Garcia",
      status: "Present",
      clockIn: "08:00 AM",
      clockOut: "05:00 PM",
      totalHours: "9.00",
    },
    {
      id: 3,
      employee: "David Johnson",
      status: "Late",
      clockIn: "09:15 AM",
      clockOut: "05:30 PM",
      totalHours: "8.25",
    },
    {
      id: 4,
      employee: "Sarah Williams",
      status: "Present",
      clockIn: "08:00 AM",
      clockOut: "04:00 PM",
      totalHours: "8.00",
    },
    {
      id: 5,
      employee: "Robert Brown",
      status: "Present",
      clockIn: "08:05 AM",
      clockOut: "05:10 PM",
      totalHours: "9.08",
    },
    {
      id: 6,
      employee: "Jennifer Davis",
      status: "Absent",
      clockIn: "-",
      clockOut: "-",
      totalHours: "0.00",
    },
    {
      id: 7,
      employee: "Michael Miller",
      status: "Present",
      clockIn: "08:00 AM",
      clockOut: "05:00 PM",
      totalHours: "9.00",
    },
    {
      id: 8,
      employee: "Lisa Wilson",
      status: "Late",
      clockIn: "10:30 AM",
      clockOut: "06:30 PM",
      totalHours: "8.00",
    },
    {
      id: 9,
      employee: "James Taylor",
      status: "Present",
      clockIn: "04:00 PM",
      clockOut: "12:00 AM",
      totalHours: "8.00",
    },
    {
      id: 10,
      employee: "Patricia Anderson",
      status: "Present",
      clockIn: "08:00 AM",
      clockOut: "04:00 PM",
      totalHours: "8.00",
    },
    {
      id: 11,
      employee: "Thomas Martinez",
      status: "Absent",
      clockIn: "-",
      clockOut: "-",
      totalHours: "0.00",
    },
    {
      id: 12,
      employee: "Jessica Robinson",
      status: "Present",
      clockIn: "08:00 AM",
      clockOut: "04:00 PM",
      totalHours: "8.00",
    },
    {
      id: 13,
      employee: "Daniel Clark",
      status: "Present",
      clockIn: "04:00 PM",
      clockOut: "12:00 AM",
      totalHours: "8.00",
    },
    {
      id: 14,
      employee: "Nancy Lewis",
      status: "Late",
      clockIn: "08:45 AM",
      clockOut: "05:00 PM",
      totalHours: "8.25",
    },
    {
      id: 15,
      employee: "Christopher Lee",
      status: "Present",
      clockIn: "08:00 AM",
      clockOut: "04:00 PM",
      totalHours: "8.00",
    },
    {
      id: 16,
      employee: "Margaret Walker",
      status: "Present",
      clockIn: "08:00 AM",
      clockOut: "04:00 PM",
      totalHours: "8.00",
    },
    {
      id: 17,
      employee: "Matthew Hall",
      status: "Absent",
      clockIn: "-",
      clockOut: "-",
      totalHours: "0.00",
    },
    {
      id: 18,
      employee: "Karen Young",
      status: "Present",
      clockIn: "08:00 AM",
      clockOut: "05:00 PM",
      totalHours: "9.00",
    },
    {
      id: 19,
      employee: "Steven Allen",
      status: "Present",
      clockIn: "04:00 PM",
      clockOut: "12:00 AM",
      totalHours: "8.00",
    },
    {
      id: 20,
      employee: "Betty Hernandez",
      status: "Present",
      clockIn: "08:00 AM",
      clockOut: "04:00 PM",
      totalHours: "8.00",
    },
    {
      id: 21,
      employee: "Richard King",
      status: "Present",
      clockIn: "08:00 AM",
      clockOut: "04:00 PM",
      totalHours: "8.00",
    },
    {
      id: 22,
      employee: "Linda Wright",
      status: "Present",
      clockIn: "08:00 AM",
      clockOut: "05:00 PM",
      totalHours: "9.00",
    },
    {
      id: 23,
      employee: "Joseph Lopez",
      status: "Late",
      clockIn: "04:30 PM",
      clockOut: "12:30 AM",
      totalHours: "8.00",
    },
    {
      id: 24,
      employee: "Susan Hill",
      status: "Absent",
      clockIn: "-",
      clockOut: "-",
      totalHours: "0.00",
    },
]