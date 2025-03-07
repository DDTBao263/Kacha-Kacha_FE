import { useState } from "react"
import { Calendar, Clock, Search, UserCheck, UserX, Plus } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { AttendanceData } from "../../types/attendance" 
import { AttendanceDialog } from "./AttendanceDialog"
import { extendedAttendanceData } from "../Attendance/AttendanceDialog"

export default function AttendancePage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8
    const [dialogOpen, setDialogOpen] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState<AttendanceData | null>(null)

    function handleOpenDialog(record?: AttendanceData) {
        if (record) {
            setIsEditMode(true)
            setSelectedRecord(record)
        } else {
            setIsEditMode(false)
            setSelectedRecord(null)
        }
        setDialogOpen(true)
    }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Here you would typically send data to your backend
    // For demo purposes, we're just closing the dialog
    setDialogOpen(false)

    // Show a success message (you can implement a toast notification here)
    alert(isEditMode ? "Attendance record updated successfully!" : "Attendance record added successfully!")
  }

    // Filter attendance data based on search query and status
        const filteredAttendance = extendedAttendanceData.filter((record) => {
        const matchesSearch = record.employee.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || record.status === statusFilter
        return matchesSearch && matchesStatus
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredAttendance.length / itemsPerPage)
  const paginatedAttendance = filteredAttendance.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Calculate summary statistics
  const presentCount = extendedAttendanceData.filter((record) => record.status === "Present").length
  const absentCount = extendedAttendanceData.filter((record) => record.status === "Absent").length
  const lateCount = extendedAttendanceData.filter((record) => record.status === "Late").length
  const totalEmployees = extendedAttendanceData.length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Attendance Management</h2>
          <p className="text-muted-foreground">View and manage employee attendance records</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Today
          </Button>
          {/* <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button> */}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserCheck className="mr-2 h-4 w-4 text-green-500" />
              <div className="text-2xl font-bold">{presentCount}</div>
              <div className="ml-2 text-sm text-muted-foreground">/ {totalEmployees}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserX className="mr-2 h-4 w-4 text-red-500" />
              <div className="text-2xl font-bold">{absentCount}</div>
              <div className="ml-2 text-sm text-muted-foreground">/ {totalEmployees}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-amber-500" />
              <div className="text-2xl font-bold">{lateCount}</div>
              <div className="ml-2 text-sm text-muted-foreground">employees</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>Employee attendance for today - XXXXXX</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="Search employees..."
                  className="h-9"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1) // Reset to first page on search
                  }}
                />
                <Button size="sm" variant="ghost">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value)
                    setCurrentPage(1) // Reset to first page on filter change
                  }}
                >
                  <SelectTrigger className="w-[120px] h-9">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Present">Present</SelectItem>
                    <SelectItem value="Absent">Absent</SelectItem>
                    <SelectItem value="Late">Late</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" 
                    onClick={() => handleOpenDialog()  }
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Record
                </Button>
                {/* <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button> */}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {Math.min(filteredAttendance.length, (currentPage - 1) * itemsPerPage + 1)}-
                {Math.min(filteredAttendance.length, currentPage * itemsPerPage)} of {filteredAttendance.length} records
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Clock In</TableHead>
                    <TableHead>Clock Out</TableHead>
                    <TableHead>Total Hours</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAttendance.length > 0 ? (
                    paginatedAttendance.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.employee}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(record.status)}>{record.status}</Badge>
                        </TableCell>
                        <TableCell>{record.clockIn}</TableCell>
                        <TableCell>{record.clockOut}</TableCell>
                        <TableCell>{record.totalHours}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(record)}>
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No records found matching your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination controls */}
            {filteredAttendance.length > 0 && (
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1 mx-2">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const pageNumber = i + 1
                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        size="sm"
                        className="w-9 h-9"
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </Button>
                    )
                  })}
                  {totalPages > 5 && <span className="mx-1">...</span>}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <AttendanceDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        isEditMode={isEditMode}
        selectedRecord={selectedRecord}
      />
    </div>
  )
}


/////////////////////////////
  
  // Helper function
  function getStatusVariant(status: string) {
    switch (status) {
      case "Present":
        return "success"
      case "Absent":
        return "destructive"
      case "Late":
        return "warning"
      default:
        return "default"
    }
  }