import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { CalendarDays, Clock, MapPin, Phone, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"

export default function Settings() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* User Profile Card */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="w-24 h-24 border">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-2xl font-bold">John Doe</h3>
                  <p className="text-muted-foreground">Software Engineer</p>
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs py-0 px-2">
                      <User className="h-3 w-3 mr-1" />
                      Email
                    </Badge>
                    <span className="text-sm">john.doe@company.com</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs py-0 px-2">
                      <Phone className="h-3 w-3 mr-1" />
                      Phone
                    </Badge>
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs py-0 px-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      Address
                    </Badge>
                    <span className="text-sm">123 Main St, Anytown, CA 12345</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Working Time Statistics */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Working Time Statistics</CardTitle>
            <CardDescription>Your current working time metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    Today
                  </span>
                  <span className="font-bold">7h 15m</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "90%" }}></div>
                </div>
                <div className="text-xs text-muted-foreground">90% of daily target (8h 00m)</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    This Week
                  </span>
                  <span className="font-bold">32h 45m</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "82%" }}></div>
                </div>
                <div className="text-xs text-muted-foreground">82% of weekly target (40h 00m)</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    This Month
                  </span>
                  <span className="font-bold">142h 30m</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "85%" }}></div>
                </div>
                <div className="text-xs text-muted-foreground">85% of monthly target (168h 00m)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for History and Schedule */}
      <Tabs defaultValue="absence" className="w-full">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="absence">Absence Stats</TabsTrigger>
          <TabsTrigger value="timekeeping">Timekeeping</TabsTrigger>
          <TabsTrigger value="leave">Leave Requests</TabsTrigger>
          <TabsTrigger value="schedule">Work Schedule</TabsTrigger>
        </TabsList>

        {/* Absence Statistics */}
        <TabsContent value="absence">
          <Card>
            <CardHeader>
              <CardTitle>Absence & Attendance Statistics</CardTitle>
              <CardDescription>Your attendance record for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Sick Leave</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">3</span>
                    <span className="text-muted-foreground text-sm">/ 10 days</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-full rounded-full" style={{ width: "30%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Vacation</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">8</span>
                    <span className="text-muted-foreground text-sm">/ 20 days</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Late Arrivals</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">2</span>
                    <span className="text-muted-foreground text-sm">instances</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: "20%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timekeeping History */}
        <TabsContent value="timekeeping">
          <Card>
            <CardHeader>
              <CardTitle>Timekeeping History</CardTitle>
              <CardDescription>Your recent clock in/out records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Date</th>
                      <th className="text-left py-3 px-2 font-medium">Clock In</th>
                      <th className="text-left py-3 px-2 font-medium">Clock Out</th>
                      <th className="text-left py-3 px-2 font-medium">Total Hours</th>
                      <th className="text-left py-3 px-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        date: "Mar 9, 2025",
                        clockIn: "08:55 AM",
                        clockOut: "05:10 PM",
                        hours: "8h 15m",
                        status: "Complete",
                      },
                      {
                        date: "Mar 8, 2025",
                        clockIn: "09:02 AM",
                        clockOut: "05:30 PM",
                        hours: "8h 28m",
                        status: "Complete",
                      },
                      {
                        date: "Mar 7, 2025",
                        clockIn: "08:45 AM",
                        clockOut: "04:50 PM",
                        hours: "8h 05m",
                        status: "Complete",
                      },
                      {
                        date: "Mar 6, 2025",
                        clockIn: "09:15 AM",
                        clockOut: "05:45 PM",
                        hours: "8h 30m",
                        status: "Complete",
                      },
                      {
                        date: "Mar 5, 2025",
                        clockIn: "08:50 AM",
                        clockOut: "05:05 PM",
                        hours: "8h 15m",
                        status: "Complete",
                      },
                    ].map((record, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-3 px-2">{record.date}</td>
                        <td className="py-3 px-2">{record.clockIn}</td>
                        <td className="py-3 px-2">{record.clockOut}</td>
                        <td className="py-3 px-2">{record.hours}</td>
                        <td className="py-3 px-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {record.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View All Records
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Complete Timekeeping History</DialogTitle>
                      <DialogDescription>Your detailed clock in/out records for the past 30 days</DialogDescription>
                    </DialogHeader>
                    <div className="overflow-y-auto max-h-[60vh]">
                      <table className="w-full">
                        <thead className="sticky top-0 bg-background">
                          <tr className="border-b">
                            <th className="text-left py-3 px-2 font-medium">Date</th>
                            <th className="text-left py-3 px-2 font-medium">Clock In</th>
                            <th className="text-left py-3 px-2 font-medium">Clock Out</th>
                            <th className="text-left py-3 px-2 font-medium">Total Hours</th>
                            <th className="text-left py-3 px-2 font-medium">Status</th>
                            <th className="text-left py-3 px-2 font-medium">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              date: "Mar 9, 2025",
                              clockIn: "08:55 AM",
                              clockOut: "05:10 PM",
                              hours: "8h 15m",
                              status: "Complete",
                              notes: "",
                            },
                            {
                              date: "Mar 8, 2025",
                              clockIn: "09:02 AM",
                              clockOut: "05:30 PM",
                              hours: "8h 28m",
                              status: "Complete",
                              notes: "",
                            },
                            {
                              date: "Mar 7, 2025",
                              clockIn: "08:45 AM",
                              clockOut: "04:50 PM",
                              hours: "8h 05m",
                              status: "Complete",
                              notes: "",
                            },
                            {
                              date: "Mar 6, 2025",
                              clockIn: "09:15 AM",
                              clockOut: "05:45 PM",
                              hours: "8h 30m",
                              status: "Complete",
                              notes: "",
                            },
                            {
                              date: "Mar 5, 2025",
                              clockIn: "08:50 AM",
                              clockOut: "05:05 PM",
                              hours: "8h 15m",
                              status: "Complete",
                              notes: "",
                            },
                            {
                              date: "Mar 4, 2025",
                              clockIn: "08:45 AM",
                              clockOut: "05:00 PM",
                              hours: "8h 15m",
                              status: "Complete",
                              notes: "",
                            },
                            {
                              date: "Mar 3, 2025",
                              clockIn: "09:00 AM",
                              clockOut: "05:15 PM",
                              hours: "8h 15m",
                              status: "Complete",
                              notes: "",
                            },
                            {
                              date: "Mar 2, 2025",
                              clockIn: "08:30 AM",
                              clockOut: "04:45 PM",
                              hours: "8h 15m",
                              status: "Complete",
                              notes: "",
                            },
                            {
                              date: "Mar 1, 2025",
                              clockIn: "09:05 AM",
                              clockOut: "05:20 PM",
                              hours: "8h 15m",
                              status: "Complete",
                              notes: "",
                            },
                            {
                              date: "Feb 28, 2025",
                              clockIn: "08:50 AM",
                              clockOut: "05:05 PM",
                              hours: "8h 15m",
                              status: "Complete",
                              notes: "",
                            },
                            {
                              date: "Feb 27, 2025",
                              clockIn: "08:55 AM",
                              clockOut: "05:10 PM",
                              hours: "8h 15m",
                              status: "Complete",
                              notes: "",
                            },
                            {
                              date: "Feb 26, 2025",
                              clockIn: "09:10 AM",
                              clockOut: "05:25 PM",
                              hours: "8h 15m",
                              status: "Complete",
                              notes: "",
                            },
                            {
                              date: "Feb 25, 2025",
                              clockIn: "08:45 AM",
                              clockOut: "05:00 PM",
                              hours: "8h 15m",
                              status: "Complete",
                              notes: "",
                            },
                            {
                              date: "Feb 24, 2025",
                              clockIn: "08:50 AM",
                              clockOut: "05:05 PM",
                              hours: "8h 15m",
                              status: "Complete",
                              notes: "",
                            },
                            {
                              date: "Feb 23, 2025",
                              clockIn: "09:00 AM",
                              clockOut: "05:15 PM",
                              hours: "8h 15m",
                              status: "Complete",
                              notes: "",
                            },
                          ].map((record, i) => (
                            <tr key={i} className="border-b">
                              <td className="py-3 px-2">{record.date}</td>
                              <td className="py-3 px-2">{record.clockIn}</td>
                              <td className="py-3 px-2">{record.clockOut}</td>
                              <td className="py-3 px-2">{record.hours}</td>
                              <td className="py-3 px-2">
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  {record.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-2">{record.notes}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leave Request History */}
        <TabsContent value="leave">
          <Card>
            <CardHeader>
              <CardTitle>Leave Request History</CardTitle>
              <CardDescription>Your recent leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Type</th>
                      <th className="text-left py-3 px-2 font-medium">From</th>
                      <th className="text-left py-3 px-2 font-medium">To</th>
                      <th className="text-left py-3 px-2 font-medium">Days</th>
                      <th className="text-left py-3 px-2 font-medium">Status</th>
                      <th className="text-left py-3 px-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: "Vacation", from: "Apr 10, 2025", to: "Apr 15, 2025", days: 5, status: "Pending" },
                      { type: "Sick Leave", from: "Feb 3, 2025", to: "Feb 4, 2025", days: 2, status: "Approved" },
                      { type: "Personal", from: "Jan 15, 2025", to: "Jan 15, 2025", days: 1, status: "Approved" },
                      { type: "Vacation", from: "Dec 20, 2024", to: "Dec 31, 2024", days: 10, status: "Approved" },
                    ].map((leave, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-3 px-2">{leave.type}</td>
                        <td className="py-3 px-2">{leave.from}</td>
                        <td className="py-3 px-2">{leave.to}</td>
                        <td className="py-3 px-2">{leave.days}</td>
                        <td className="py-3 px-2">
                          <Badge
                            variant="outline"
                            className={
                              leave.status === "Approved"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            }
                          >
                            {leave.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-2">
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View All Requests
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Complete Leave Request History</DialogTitle>
                      <DialogDescription>Your detailed leave request history for the current year</DialogDescription>
                    </DialogHeader>
                    <div className="overflow-y-auto max-h-[60vh]">
                      <table className="w-full">
                        <thead className="sticky top-0 bg-background">
                          <tr className="border-b">
                            <th className="text-left py-3 px-2 font-medium">Type</th>
                            <th className="text-left py-3 px-2 font-medium">From</th>
                            <th className="text-left py-3 px-2 font-medium">To</th>
                            <th className="text-left py-3 px-2 font-medium">Days</th>
                            <th className="text-left py-3 px-2 font-medium">Status</th>
                            <th className="text-left py-3 px-2 font-medium">Requested On</th>
                            <th className="text-left py-3 px-2 font-medium">Approved By</th>
                            <th className="text-left py-3 px-2 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              type: "Vacation",
                              from: "Apr 10, 2025",
                              to: "Apr 15, 2025",
                              days: 5,
                              status: "Pending",
                              requestedOn: "Mar 1, 2025",
                              approvedBy: "-",
                            },
                            {
                              type: "Sick Leave",
                              from: "Feb 3, 2025",
                              to: "Feb 4, 2025",
                              days: 2,
                              status: "Approved",
                              requestedOn: "Feb 2, 2025",
                              approvedBy: "Sarah Johnson",
                            },
                            {
                              type: "Personal",
                              from: "Jan 15, 2025",
                              to: "Jan 15, 2025",
                              days: 1,
                              status: "Approved",
                              requestedOn: "Jan 10, 2025",
                              approvedBy: "Sarah Johnson",
                            },
                            {
                              type: "Vacation",
                              from: "Dec 20, 2024",
                              to: "Dec 31, 2024",
                              days: 10,
                              status: "Approved",
                              requestedOn: "Nov 15, 2024",
                              approvedBy: "Sarah Johnson",
                            },
                            {
                              type: "Sick Leave",
                              from: "Oct 5, 2024",
                              to: "Oct 6, 2024",
                              days: 2,
                              status: "Approved",
                              requestedOn: "Oct 5, 2024",
                              approvedBy: "Sarah Johnson",
                            },
                            {
                              type: "Personal",
                              from: "Sep 12, 2024",
                              to: "Sep 12, 2024",
                              days: 1,
                              status: "Approved",
                              requestedOn: "Sep 5, 2024",
                              approvedBy: "Michael Chen",
                            },
                            {
                              type: "Training",
                              from: "Aug 15, 2024",
                              to: "Aug 17, 2024",
                              days: 3,
                              status: "Approved",
                              requestedOn: "Jul 20, 2024",
                              approvedBy: "Sarah Johnson",
                            },
                            {
                              type: "Vacation",
                              from: "Jul 1, 2024",
                              to: "Jul 7, 2024",
                              days: 5,
                              status: "Approved",
                              requestedOn: "Jun 1, 2024",
                              approvedBy: "Sarah Johnson",
                            },
                            {
                              type: "Personal",
                              from: "May 22, 2024",
                              to: "May 22, 2024",
                              days: 1,
                              status: "Approved",
                              requestedOn: "May 15, 2024",
                              approvedBy: "Michael Chen",
                            },
                            {
                              type: "Sick Leave",
                              from: "Apr 10, 2024",
                              to: "Apr 11, 2024",
                              days: 2,
                              status: "Approved",
                              requestedOn: "Apr 10, 2024",
                              approvedBy: "Sarah Johnson",
                            },
                            {
                              type: "Vacation",
                              from: "Mar 5, 2024",
                              to: "Mar 10, 2024",
                              days: 5,
                              status: "Approved",
                              requestedOn: "Feb 5, 2024",
                              approvedBy: "Sarah Johnson",
                            },
                            {
                              type: "Training",
                              from: "Feb 15, 2024",
                              to: "Feb 16, 2024",
                              days: 2,
                              status: "Approved",
                              requestedOn: "Jan 25, 2024",
                              approvedBy: "Michael Chen",
                            },
                          ].map((leave, i) => (
                            <tr key={i} className="border-b">
                              <td className="py-3 px-2">{leave.type}</td>
                              <td className="py-3 px-2">{leave.from}</td>
                              <td className="py-3 px-2">{leave.to}</td>
                              <td className="py-3 px-2">{leave.days}</td>
                              <td className="py-3 px-2">
                                <Badge
                                  variant="outline"
                                  className={
                                    leave.status === "Approved"
                                      ? "bg-green-50 text-green-700 border-green-200"
                                      : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                  }
                                >
                                  {leave.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-2">{leave.requestedOn}</td>
                              <td className="py-3 px-2">{leave.approvedBy}</td>
                              <td className="py-3 px-2">
                                <Button variant="ghost" size="sm">
                                  Details
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button size="sm">New Request</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upcoming Work Schedule */}
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Work Schedule</CardTitle>
              <CardDescription>Your schedule for the next two weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "Monday, Mar 10, 2025", shift: "Regular (9:00 AM - 5:00 PM)", location: "Main Office" },
                  { date: "Tuesday, Mar 11, 2025", shift: "Regular (9:00 AM - 5:00 PM)", location: "Main Office" },
                  { date: "Wednesday, Mar 12, 2025", shift: "Regular (9:00 AM - 5:00 PM)", location: "Main Office" },
                  { date: "Thursday, Mar 13, 2025", shift: "Remote Work", location: "Home Office" },
                  { date: "Friday, Mar 14, 2025", shift: "Remote Work", location: "Home Office" },
                  { date: "Monday, Mar 17, 2025", shift: "Regular (9:00 AM - 5:00 PM)", location: "Main Office" },
                ].map((day, i) => (
                  <div key={i} className="flex items-start p-3 border rounded-lg">
                    <div className="mr-4 flex-shrink-0">
                      <CalendarDays className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{day.date}</h4>
                      <p className="text-sm text-muted-foreground">{day.shift}</p>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs">{day.location}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        day.location.includes("Home")
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-green-50 text-green-700 border-green-200"
                      }
                    >
                      {day.location.includes("Home") ? "Remote" : "In Office"}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View Full Calendar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Work Schedule Calendar</DialogTitle>
                      <DialogDescription>Your complete work schedule for the month</DialogDescription>
                    </DialogHeader>
                    <div className="p-2">
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                          <div key={day} className="text-center font-medium text-sm py-1">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 35 }).map((_, i) => {
                          const day = i - 2 // Offset to start month on a Monday
                          const isCurrentMonth = day >= 0 && day < 31
                          const isToday = day === 9 // Assuming today is the 10th
                          const hasEvent = [10, 11, 12, 13, 14, 17, 18, 19, 20, 21].includes(day)
                          const isRemoteDay = [13, 14, 20, 21].includes(day)

                          return (
                            <div
                              key={i}
                              className={`
                  border rounded-md p-2 min-h-[80px] relative
                  ${!isCurrentMonth ? "bg-muted/50 text-muted-foreground" : ""}
                  ${isToday ? "border-primary" : ""}
                `}
                            >
                              {isCurrentMonth && (
                                <>
                                  <div className="text-right text-sm">{day + 1}</div>
                                  {hasEvent && (
                                    <div
                                      className={`
                        mt-1 text-xs p-1 rounded
                        ${isRemoteDay ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"}
                      `}
                                    >
                                      {isRemoteDay ? "Remote Work" : "Office (9-5)"}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

