
import { useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { Badge } from "../../ui/badge"

// Mock data for employees and attendance
const mockEmployees = [
  {
    id: "E001",
    name: "John Smith",
    position: "Server",
    shift: "Morning",
    attendance: {
      1: "Present",
      2: "Present",
      3: "Present",
      4: "Absent",
      5: "Present",
      6: "Off",
      7: "Off",
      8: "Present",
      9: "Present",
      10: "Present",
      11: "Present",
      12: "Present",
      13: "Off",
      14: "Off",
      15: "Present",
      16: "Present",
      17: "Present",
      18: "Present",
      19: "Present",
      20: "Off",
      21: "Off",
      22: "Present",
      23: "Present",
      24: "Present",
      25: "Present",
      26: "Present",
      27: "Off",
      28: "Off",
      29: "Present",
      30: "Present",
    },
  },
  {
    id: "E002",
    name: "Jane Doe",
    position: "Chef",
    shift: "Evening",
    attendance: {
      1: "Off",
      2: "Off",
      3: "Present",
      4: "Present",
      5: "Present",
      6: "Present",
      7: "Present",
      8: "Off",
      9: "Off",
      10: "Present",
      11: "Present",
      12: "Present",
      13: "Present",
      14: "Present",
      15: "Off",
      16: "Off",
      17: "Present",
      18: "Present",
      19: "Present",
      20: "Present",
      21: "Present",
      22: "Off",
      23: "Off",
      24: "Present",
      25: "Present",
      26: "Present",
      27: "Present",
      28: "Present",
      29: "Off",
      30: "Off",
    },
  },
  {
    id: "E003",
    name: "Michael Johnson",
    position: "Bartender",
    shift: "Evening",
    attendance: {
      1: "Present",
      2: "Present",
      3: "Off",
      4: "Off",
      5: "Present",
      6: "Present",
      7: "Present",
      8: "Present",
      9: "Present",
      10: "Off",
      11: "Off",
      12: "Present",
      13: "Present",
      14: "Present",
      15: "Present",
      16: "Present",
      17: "Off",
      18: "Off",
      19: "Present",
      20: "Present",
      21: "Present",
      22: "Present",
      23: "Present",
      24: "Off",
      25: "Off",
      26: "Present",
      27: "Present",
      28: "Present",
      29: "Present",
      30: "Present",
    },
  },
  {
    id: "E004",
    name: "Emily Wilson",
    position: "Host",
    shift: "Morning",
    attendance: {
      1: "Present",
      2: "Present",
      3: "Present",
      4: "Present",
      5: "Present",
      6: "Off",
      7: "Off",
      8: "Present",
      9: "Present",
      10: "Present",
      11: "Present",
      12: "Present",
      13: "Off",
      14: "Off",
      15: "Present",
      16: "Late",
      17: "Present",
      18: "Present",
      19: "Present",
      20: "Off",
      21: "Off",
      22: "Present",
      23: "Present",
      24: "Present",
      25: "Present",
      26: "Present",
      27: "Off",
      28: "Off",
      29: "Present",
      30: "Present",
    },
  },
  {
    id: "E005",
    name: "Robert Brown",
    position: "Kitchen Staff",
    shift: "Morning",
    attendance: {
      1: "Off",
      2: "Off",
      3: "Present",
      4: "Present",
      5: "Present",
      6: "Present",
      7: "Present",
      8: "Off",
      9: "Off",
      10: "Present",
      11: "Present",
      12: "Present",
      13: "Present",
      14: "Present",
      15: "Off",
      16: "Off",
      17: "Present",
      18: "Present",
      19: "Present",
      20: "Present",
      21: "Present",
      22: "Off",
      23: "Off",
      24: "Present",
      25: "Present",
      26: "Present",
      27: "Present",
      28: "Present",
      29: "Off",
      30: "Off",
    },
  },
]

// Generate days for the current month
const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1)

interface AttendanceTableProps {
  searchQuery: string
}

export function AttendanceTable({ searchQuery }: AttendanceTableProps) {
  // Filter employees based on search query
  const filteredEmployees = useMemo(() => {
    if (!searchQuery) return mockEmployees

    return mockEmployees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  // Calculate total working days for each employee
  const calculateWorkingDays = (attendance: Record<string, string>) => {
    return Object.values(attendance).filter((status) => status === "Present" || status === "Late").length
  }

  // Render attendance status badge
  const renderAttendanceStatus = (status: string) => {
    switch (status) {
      case "Present":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            P
          </Badge>
        )
      case "Absent":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            A
          </Badge>
        )
      case "Late":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            L
          </Badge>
        )
      case "Off":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
            O
          </Badge>
        )
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">No.</TableHead>
            <TableHead className="w-24">ID</TableHead>
            <TableHead className="w-40">Name</TableHead>
            <TableHead className="w-32">Position</TableHead>
            <TableHead className="w-32">Shift</TableHead>
            {daysInMonth.map((day) => (
              <TableHead key={day} className="w-12 text-center">
                {day}
              </TableHead>
            ))}
            <TableHead className="w-32 text-right">Working Days</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={daysInMonth.length + 6} className="text-center h-24">
                No employees found matching your search criteria
              </TableCell>
            </TableRow>
          ) : (
            filteredEmployees.map((employee, index) => (
              <TableRow key={employee.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{employee.id}</TableCell>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.shift}</TableCell>
                {daysInMonth.map((day) => (
                  <TableCell key={day} className="text-center p-1">
                    {renderAttendanceStatus(employee.attendance[day as keyof typeof employee.attendance])}
                  </TableCell>
                ))}
                <TableCell className="text-right font-medium">{calculateWorkingDays(employee.attendance)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

