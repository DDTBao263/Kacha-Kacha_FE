
import { Clock, UserCheck, Users, ClipboardCheck, UserX } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { extendedAttendanceData } from "../Attendance/AttendanceDialog"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

const StoreDash = () => {
    const presentCount = extendedAttendanceData.filter((record) => record.status === "Present").length
    const absentCount = extendedAttendanceData.filter((record) => record.status === "Absent").length
    const lateCount = extendedAttendanceData.filter((record) => record.status === "Late").length
    const totalEmployees = extendedAttendanceData.length
    const staffCoverage = [
        { day: "Monday", coverage: 75, staff: 15 },
        { day: "Tuesday", coverage: 80, staff: 16 },
        { day: "Wednesday", coverage: 65, staff: 13 },
        { day: "Thursday", coverage: 90, staff: 18 },
        { day: "Friday", coverage: 95, staff: 19 },
        { day: "Saturday", coverage: 50, staff: 10 },
        { day: "Sunday", coverage: 45, staff: 9 },
      ]
      
      
      
      function getCoverageVariant(coverage: number) {
        if (coverage >= 80) return "success"
        if (coverage >= 60) return "default"
        if (coverage >= 40) return "warning"
        return "destructive"
      }
    return ( 
        <>
        <Breadcrumb pageName="Dashboard" />
        <div className="space-y-6">
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
            <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Staff Coverage</CardTitle>
                <CardDescription>Daily staff coverage for the current week</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                {staffCoverage.map((day, index) => (
                    <div key={index} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium">{day.day}</div>
                    <div className="flex-1">
                        <div className="flex h-2 w-full overflow-hidden rounded-full bg-secondary">
                        <div className="bg-primary" style={{ width: `${day.coverage}%` }} />
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{day.staff}</span>
                    </div>
                    <Badge variant={getCoverageVariant(day.coverage)}>{day.coverage}%</Badge>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>
            <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for store management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <a
                href="/attendance"
                className="flex items-center gap-2 rounded-lg border p-3 hover:bg-muted transition-colors"
              >
                <Clock className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">Manage Attendance</p>
                  <p className="text-sm text-muted-foreground">View and edit employee clock-ins</p>
                </div>
              </a>
              <a
                href="/leaverequest"
                className="flex items-center gap-2 rounded-lg border p-3 hover:bg-muted transition-colors"
              >
                <ClipboardCheck className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">Approve Leave Requests</p>
                  <p className="text-sm text-muted-foreground">Review pending leave requests</p>
                </div>
              </a>
              <a
                href="/schedule"
                className="flex items-center gap-2 rounded-lg border p-3 hover:bg-muted transition-colors"
              >
                <Users className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">Create Schedule</p>
                  <p className="text-sm text-muted-foreground">Manage weekly employee schedules</p>
                </div>
              </a>
            </div>
          </CardContent>
            </Card>
            </div>
        </div>
        </>
    );
};

export default StoreDash;
  
  
  
  