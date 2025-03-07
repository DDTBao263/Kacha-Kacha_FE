import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Badge } from "../../components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown"
import { Plus, MoreHorizontal } from "lucide-react"

export default function LeaveTypesPage() {
  const leaveTypes = [
    {
      id: 1,
      name: "Vacation",
      description: "Annual paid time off for employees",
      daysAllowed: 14,
      isPaid: true,
      requiresApproval: true,
      status: "Active",
    },
    {
      id: 2,
      name: "Sick Leave",
      description: "Leave due to illness or medical appointments",
      daysAllowed: 7,
      isPaid: true,
      requiresApproval: true,
      status: "Active",
    },
    {
      id: 3,
      name: "Personal Leave",
      description: "Leave for personal matters",
      daysAllowed: 3,
      isPaid: false,
      requiresApproval: true,
      status: "Active",
    },
    {
      id: 4,
      name: "Bereavement",
      description: "Leave due to death of a family member",
      daysAllowed: 5,
      isPaid: true,
      requiresApproval: true,
      status: "Active",
    },
    {
      id: 5,
      name: "Maternity/Paternity",
      description: "Leave for new parents",
      daysAllowed: 90,
      isPaid: true,
      requiresApproval: true,
      status: "Active",
    },
    {
      id: 6,
      name: "Unpaid Leave",
      description: "Extended leave without pay",
      daysAllowed: 30,
      isPaid: false,
      requiresApproval: true,
      status: "Inactive",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Leave Types</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Leave Type
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Type Management</CardTitle>
          <CardDescription>Configure and manage different types of leave for your employees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Days Allowed</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Requires Approval</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveTypes.map((leaveType) => (
                  <TableRow key={leaveType.id}>
                    <TableCell className="font-medium">{leaveType.name}</TableCell>
                    <TableCell>{leaveType.description}</TableCell>
                    <TableCell>{leaveType.daysAllowed}</TableCell>
                    <TableCell>
                      {leaveType.isPaid ? <Badge variant="default">Yes</Badge> : <Badge variant="outline">No</Badge>}
                    </TableCell>
                    <TableCell>{leaveType.requiresApproval ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <Badge variant={leaveType.status === "Active" ? "default" : "secondary"}>
                        {leaveType.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            {leaveType.status === "Active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

