"use client"

import { useState } from "react"
import { Calendar, Check, Clock, Download, Filter, Search, X } from "lucide-react"

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

export default function LeaveRequest() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Filter leave request data based on search query, department, and status
  const filteredRequests = extendedLeaveRequestData.filter((request) => {
    const matchesSearch = request.employee.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    return matchesSearch  && matchesStatus
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const paginatedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Calculate summary statistics
  const pendingCount = extendedLeaveRequestData.filter((request) => request.status === "Pending").length
  const approvedCount = extendedLeaveRequestData.filter((request) => request.status === "Approved").length
  const rejectedCount = extendedLeaveRequestData.filter((request) => request.status === "Rejected").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leave Requests</h2>
          <p className="text-muted-foreground">Manage and approve employee leave requests</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            This Month
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-amber-500" />
              <div className="text-2xl font-bold">{pendingCount}</div>
              <div className="ml-2 text-sm text-muted-foreground">requests</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <div className="text-2xl font-bold">{approvedCount}</div>
              <div className="ml-2 text-sm text-muted-foreground">this month</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <X className="mr-2 h-4 w-4 text-red-500" />
              <div className="text-2xl font-bold">{rejectedCount}</div>
              <div className="ml-2 text-sm text-muted-foreground">this month</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Request Management</CardTitle>
          <CardDescription>Review and manage employee leave requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="Search requests..."
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
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>

                {/* <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button> */}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {Math.min(filteredRequests.length, (currentPage - 1) * itemsPerPage + 1)}-
                {Math.min(filteredRequests.length, currentPage * itemsPerPage)} of {filteredRequests.length} requests
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRequests.length > 0 ? (
                    paginatedRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.employee}</TableCell>
                        <TableCell>{request.leaveType}</TableCell>
                        <TableCell>{request.startDate}</TableCell>
                        <TableCell>{request.endDate}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(request.status)}>{request.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {request.status === "Pending" && (
                              <>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <Check className="h-4 w-4 text-green-500" />
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <X className="h-4 w-4 text-red-500" />
                                </Button>
                              </>
                            )}
                            {/* <Button variant="ghost" size="sm">
                              View
                            </Button> */}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No requests found matching your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination controls */}
            {filteredRequests.length > 0 && (
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
    </div>
  )
}

// Extended sample data with more employees and department information
const extendedLeaveRequestData = [
  {
    id: 1,
    employee: "David Johnson",
    department: "Kitchen",
    leaveType: "Sick Leave",
    startDate: "2025-03-08",
    endDate: "2025-03-09",
    status: "Pending",
  },
  {
    id: 2,
    employee: "Sarah Williams",
    department: "Service",
    leaveType: "Vacation",
    startDate: "2025-03-15",
    endDate: "2025-03-22",
    status: "Pending",
  },
  {
    id: 3,
    employee: "Michael Miller",
    department: "Kitchen",
    leaveType: "Personal Leave",
    startDate: "2025-03-10",
    endDate: "2025-03-10",
    status: "Pending",
  },
  {
    id: 4,
    employee: "Jennifer Davis",
    department: "Service",
    leaveType: "Sick Leave",
    startDate: "2025-03-12",
    endDate: "2025-03-13",
    status: "Pending",
  },
  {
    id: 5,
    employee: "Robert Brown",
    department: "Kitchen",
    leaveType: "Family Emergency",
    startDate: "2025-03-09",
    endDate: "2025-03-11",
    status: "Pending",
  },
  {
    id: 6,
    employee: "Lisa Wilson",
    department: "Service",
    leaveType: "Vacation",
    startDate: "2025-02-20",
    endDate: "2025-02-27",
    status: "Approved",
  },
  {
    id: 7,
    employee: "John Smith",
    department: "Kitchen",
    leaveType: "Sick Leave",
    startDate: "2025-02-15",
    endDate: "2025-02-16",
    status: "Approved",
  },
  {
    id: 8,
    employee: "Maria Garcia",
    department: "Service",
    leaveType: "Personal Leave",
    startDate: "2025-02-18",
    endDate: "2025-02-18",
    status: "Rejected",
  },
  {
    id: 9,
    employee: "James Taylor",
    department: "Bar",
    leaveType: "Vacation",
    startDate: "2025-03-25",
    endDate: "2025-04-01",
    status: "Pending",
  },
  {
    id: 10,
    employee: "Patricia Anderson",
    department: "Service",
    leaveType: "Sick Leave",
    startDate: "2025-02-28",
    endDate: "2025-03-01",
    status: "Approved",
  },
  {
    id: 11,
    employee: "Thomas Martinez",
    department: "Kitchen",
    leaveType: "Family Emergency",
    startDate: "2025-02-25",
    endDate: "2025-02-26",
    status: "Approved",
  },
  {
    id: 12,
    employee: "Jessica Robinson",
    department: "Service",
    leaveType: "Personal Leave",
    startDate: "2025-03-05",
    endDate: "2025-03-05",
    status: "Approved",
  },
  {
    id: 13,
    employee: "Daniel Clark",
    department: "Bar",
    leaveType: "Vacation",
    startDate: "2025-04-10",
    endDate: "2025-04-17",
    status: "Pending",
  },
  {
    id: 14,
    employee: "Nancy Lewis",
    department: "Service",
    leaveType: "Sick Leave",
    startDate: "2025-03-02",
    endDate: "2025-03-03",
    status: "Approved",
  },
  {
    id: 15,
    employee: "Christopher Lee",
    department: "Kitchen",
    leaveType: "Personal Leave",
    startDate: "2025-03-18",
    endDate: "2025-03-18",
    status: "Pending",
  },
  {
    id: 16,
    employee: "Margaret Walker",
    department: "Service",
    leaveType: "Vacation",
    startDate: "2025-05-01",
    endDate: "2025-05-08",
    status: "Pending",
  },
  {
    id: 17,
    employee: "Matthew Hall",
    department: "Kitchen",
    leaveType: "Sick Leave",
    startDate: "2025-02-10",
    endDate: "2025-02-12",
    status: "Approved",
  },
  {
    id: 18,
    employee: "Karen Young",
    department: "Management",
    leaveType: "Personal Leave",
    startDate: "2025-03-20",
    endDate: "2025-03-20",
    status: "Approved",
  },
  {
    id: 19,
    employee: "Steven Allen",
    department: "Bar",
    leaveType: "Vacation",
    startDate: "2025-04-05",
    endDate: "2025-04-12",
    status: "Rejected",
  },
  {
    id: 20,
    employee: "Betty Hernandez",
    department: "Service",
    leaveType: "Sick Leave",
    startDate: "2025-03-07",
    endDate: "2025-03-08",
    status: "Approved",
  },
]

// Helper function
function getStatusVariant(status: string) {
  switch (status) {
    case "Approved":
      return "success"
    case "Rejected":
      return "destructive"
    case "Pending":
      return "warning"
    default:
      return "default"
  }
}

