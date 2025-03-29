import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import {
  CalendarDays,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { EMPLOYEE } from '../../types/employee';
import { employeeService } from '../../services/employee/index';
import { shiftService } from '../../services/shift';
import { timeService } from '../../services/time';
import { leaveService } from '../../services/leave';

// interface Params {
//   id: string;
//   idprofileemployee: string;
// }

interface Application {
  leaveType: string;
  startDate: String;
  endDate: string;
  description: string;
  status: string;
}

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
  attendanceStatus: string;
  shiftName: string;
}

interface TimekeepingRecord {
  date: string;
  clockIn: string;
  clockOut: string;
  hours: string;
  status: string;
}

interface TimeAccumulation {
  dailyHours: string;
  weeklyHours: string;
  monthlyHours: string;
}

interface EMPLOYEE {
  employeeId: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  status: string;
  role: string;
  // restaurantId: number;
  // restaurantLocation: string;
}

export default function ProfileEmployyee() {
  const navigate = useNavigate();
  const { id, idprofileemployee } = useParams();
  const [timekeepingHistory, setTimekeepingHistory] = useState<
    TimekeepingRecord[]
  >([]);
  const [leaveHistory, setLeaveHistory] = useState<Application[]>([]);
  const [workSchedule, setWorkSchedule] = useState<Schedule[]>([]);
  const [employeeDetail, setEmployeeDetail] = useState<EMPLOYEE | null>(null);
  const [timeAccumulation, setTimeAccumulation] =
    useState<TimeAccumulation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('timekeeping');
  // const [calendarData, setCalendarData] = useState([]);

  const fetchLeaveHistory = async (idprofileemployee: number) => {
    try {
      const { data } = await leaveService.getApplicationByEmpId(
        idprofileemployee,
      );
      const formattedData = data.data.map((record: any) => ({
        leaveType: record.leaveType,
        startDate: record.startDate?.split('T')[0] || 'N/A',
        endDate: record.endDate?.split('T')[0] || 'N/A',
        description: record.description,
        status: record.status,
      }));
      setLeaveHistory(formattedData);
    } catch (error) {
      console.error('Failed to fetch leave history:', error);
    }
  };

  const fetchEmployees = async (idprofileemployee: number) => {
    setLoading(true);
    try {
      const { data } = await employeeService.getDetailEmployee(
        idprofileemployee,
      );

      // console.log('data', data);
      const profileEmployee: EMPLOYEE = {
        employeeId: data.data.employeeId,
        name: data.data.name || '',
        email: data.data.email || '',
        phoneNumber: data.data.phoneNumber || '',
        address: data.data.address || '',
        status: data.data.status || '',
        // avatar:data.data.avatar || "",
        role: data.data.role || '',
      };

      setEmployeeDetail(profileEmployee);
    } catch (error) {
      console.error('Failed to fetch employee details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTimeAccumulation = async (idprofileemployee: number) => {
    try {
      const { data } = await timeService.getTimeAccumulation(idprofileemployee);
      // const formatTime = (totalTime: number) => {
      //   return totalTime
      //     ? `${Math.floor(totalTime)}h ${Math.floor(
      //         (totalTime % 1) * 60,
      //       )}m ${Math.round(((totalTime * 60) % 1) * 60)}s`
      //     : '0h 0m 0s';
      // };

      const formatTimeAccumulation: TimeAccumulation = {
        dailyHours: data.dailyHours,
        weeklyHours: data.weeklyHours || 0,
        monthlyHours: data.monthlyHours || 0,
      };
      setTimeAccumulation(formatTimeAccumulation);
    } catch (error) {
      console.error('Failed to fetch time accumulation:', error);
    }
  };

  const fetchTimekeepingHistory = async (idprofileemployee: number) => {
    try {
      const { data } = await shiftService.getTimeKeeping(idprofileemployee);
      const formattedData = data
        .filter(
          (record: any) =>
            record ||
            record.date ||
            record.attendanceStartTime ||
            record.attendanceEndTime,
        ) // Loại bỏ phần tử không hợp lệ
        .sort((a: any, b: any) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;
        }) // Sắp xếp theo ngày giảm dần
        .slice(0, 30) // Lấy 30 ngày gần nhất
        .map((record: any) => ({
          date: record.date?.split('T')[0] || 'N/A',
          clockIn:
            record.attendanceStartTime?.split('T')[1]?.substring(0, 8) || 'N/A',
          clockOut:
            record.attendanceEndTime?.split('T')[1]?.substring(0, 8) || 'N/A',
          hours: record.totalTime
            ? `${Math.floor(record.totalTime)}h ${Math.floor(
                (record.totalTime % 1) * 60,
              )}m ${Math.round(((record.totalTime * 60) % 1) * 60)}s`
            : '0h 0m 0s',
          status: record.attendaceStatus || 'UNKNOWN',
        }));

      setTimekeepingHistory(formattedData);
    } catch (error) {
      console.error('Failed to fetch timekeeping history:', error);
    }
  };

  const fetchWorkSchedule = async (idprofileemployee: number) => {
    try {
      const { data } = await shiftService.getWorkScheduleByEmpId(
        idprofileemployee,
      );
      const formattedData = data.map((record: any) => ({
        date: record.date?.split('T')[0] || 'N/A',
        startTime: record.startTime?.split('T')[1]?.substring(0, 8) || 'N/A',
        endTime: record.endTime?.split('T')[1]?.substring(0, 8) || 'N/A',
        attendanceStatus: record.attendaceStatus || 'null',
        shiftName: record.shiftName || 'null',
      }));
      console.log('formattedData', formattedData);
      setWorkSchedule(formattedData);
    } catch (error) {
      console.error('Failed to fetch work schedule:', error);
    }
  };

  useEffect(() => {
    if (idprofileemployee) {
      const profileEmployeeId = parseInt(idprofileemployee, 10);
      if (!isNaN(profileEmployeeId)) {
        fetchEmployees(profileEmployeeId);
        fetchTimeAccumulation(profileEmployeeId);
      }
    }
  }, [idprofileemployee]);

  useEffect(() => {
    // if (activeTab === 'absence' && idprofileemployee) {
    //   const profileEmployeeId = parseInt(idprofileemployee, 10);
    //   if (!isNaN(profileEmployeeId)) {
    //     fetchEmployees(profileEmployeeId);
    //   }
    // }
    if (activeTab === 'timekeeping' && idprofileemployee) {
      const profileEmployeeId = parseInt(idprofileemployee, 10);
      if (!isNaN(profileEmployeeId)) {
        fetchTimekeepingHistory(profileEmployeeId);
      }
    } else if (activeTab === 'leave' && idprofileemployee) {
      const profileEmployeeId = parseInt(idprofileemployee, 10);
      if (!isNaN(profileEmployeeId)) {
        fetchLeaveHistory(profileEmployeeId);
      }
    } else if (activeTab === 'schedule' && idprofileemployee) {
      const profileEmployeeId = parseInt(idprofileemployee, 10);
      if (!isNaN(profileEmployeeId)) {
        fetchWorkSchedule(profileEmployeeId);
      }
    }
  }, [activeTab, idprofileemployee]);

  const formatTime = (totalTime: number) => {
    return totalTime
      ? `${Math.floor(totalTime)}h ${Math.floor(
          (totalTime % 1) * 60,
        )}m ${Math.round(((totalTime * 60) % 1) * 60)}s`
      : '0h 0m 0s';
  };

  const calculatePercentage = (actual: number, target: number) => {
    return target > 0 ? Math.min((actual / target) * 100, 100) : 0;
  };

  // Định nghĩa target cho từng mức
  const DAILY_TARGET = 4; // 4 giờ/ngày
  const WEEKLY_TARGET = 24; // 24 giờ/tuần
  const MONTHLY_TARGET = 106; // 106 giờ/tháng

  // console.log('employeeDetail', employeeDetail);

  const handleBackToDetailRestaurants = () => {
    navigate(`/restaurantManager/restaurants/${id}/employees`);
  };
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleBackToDetailRestaurants}
        >
          <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
          Back
        </Button>
      </div>
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
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt="User avatar"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-2xl font-bold">{employeeDetail?.name}</h3>{' '}
                  <p className="text-muted-foreground">
                    {employeeDetail?.role}
                  </p>{' '}
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs py-0 px-2">
                      <User className="h-3 w-3 mr-1" />
                      Email
                    </Badge>
                    <span className="text-sm">
                      {employeeDetail?.email || 'Updating'}
                    </span>{' '}
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs py-0 px-2">
                      <Phone className="h-3 w-3 mr-1" />
                      Phone
                    </Badge>
                    <span className="text-sm">
                      {employeeDetail?.phoneNumber || 'Updating'}
                    </span>{' '}
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs py-0 px-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      Address
                    </Badge>
                    <span className="text-sm">
                      {employeeDetail?.address || 'Updating'}
                    </span>{' '}
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
                  <span className="font-bold">
                    {formatTime(Number(timeAccumulation?.dailyHours) || 0)}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{
                      width: `${calculatePercentage(
                        Number(timeAccumulation?.dailyHours) || 0,
                        DAILY_TARGET,
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {calculatePercentage(
                    Number(timeAccumulation?.dailyHours) || 0,
                    DAILY_TARGET,
                  ).toFixed(1)}
                  % of daily target ({formatTime(DAILY_TARGET)})
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    This Week
                  </span>
                  <span className="font-bold">
                    {formatTime(Number(timeAccumulation?.weeklyHours) || 0)}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{
                      width: `${calculatePercentage(
                        Number(timeAccumulation?.weeklyHours) || 0,
                        WEEKLY_TARGET,
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {calculatePercentage(
                    Number(timeAccumulation?.weeklyHours) || 0,
                    WEEKLY_TARGET,
                  ).toFixed(1)}
                  % of weekly target ({formatTime(WEEKLY_TARGET)})
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    This Month
                  </span>
                  <span className="font-bold">
                    {formatTime(Number(timeAccumulation?.monthlyHours) || 0)}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{
                      width: `${calculatePercentage(
                        Number(timeAccumulation?.monthlyHours) || 0,
                        MONTHLY_TARGET,
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {calculatePercentage(
                    Number(timeAccumulation?.monthlyHours) || 0,
                    MONTHLY_TARGET,
                  ).toFixed(1)}
                  % of weekly target ({formatTime(MONTHLY_TARGET)})
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for History and Schedule */}
      <Tabs
        defaultValue="timekeeping"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="timekeeping">Timekeeping</TabsTrigger>
          <TabsTrigger value="leave">Leave Requests</TabsTrigger>
          <TabsTrigger value="schedule">Work Schedule</TabsTrigger>
        </TabsList>

        {/* Absence Statistics */}

        {/* Timekeeping History */}
        <TabsContent value="timekeeping">
          <Card>
            <CardHeader>
              <CardTitle>Timekeeping History</CardTitle>
              <CardDescription>
                Your recent clock in/out records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Date</th>
                      <th className="text-left py-3 px-2 font-medium">
                        Clock In
                      </th>
                      <th className="text-left py-3 px-2 font-medium">
                        Clock Out
                      </th>
                      <th className="text-left py-3 px-2 font-medium">
                        Total Hours
                      </th>
                      <th className="text-left py-3 px-2 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {timekeepingHistory.slice(0, 5).map((record, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-3 px-2">{record.date}</td>
                        <td className="py-3 px-2">{record.clockIn}</td>
                        <td className="py-3 px-2">{record.clockOut}</td>
                        <td className="py-3 px-2">{record.hours}</td>
                        <td className="py-3 px-2">
                          <Badge
                            variant={
                              record.status === 'PRESENT'
                                ? 'success'
                                : record.status === 'NO ATTENDANCE'
                                ? 'destructive'
                                : record.status === 'LATE'
                                ? 'warning'
                                : record.status === 'EARLY'
                                ? 'warning'
                                : 'outline'
                            }
                          >
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
                      <DialogDescription>
                        Your detailed clock in/out records for this month
                      </DialogDescription>
                    </DialogHeader>
                    <div className="overflow-y-auto max-h-[60vh]">
                      <table className="w-full">
                        <thead className="sticky top-0 bg-background">
                          <tr className="border-b">
                            <th className="text-left py-3 px-2 font-medium">
                              Date
                            </th>
                            <th className="text-left py-3 px-2 font-medium">
                              Clock In
                            </th>
                            <th className="text-left py-3 px-2 font-medium">
                              Clock Out
                            </th>
                            <th className="text-left py-3 px-2 font-medium">
                              Total Hours
                            </th>
                            <th className="text-left py-3 px-2 font-medium">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {timekeepingHistory.map((record, i) => (
                            <tr key={i} className="border-b">
                              <td className="py-3 px-2">{record.date}</td>
                              <td className="py-3 px-2">{record.clockIn}</td>
                              <td className="py-3 px-2">{record.clockOut}</td>
                              <td className="py-3 px-2">{record.hours}</td>
                              <td className="py-3 px-2">
                                <Badge
                                  variant={
                                    record.status === 'PRESENT'
                                      ? 'success'
                                      : record.status === 'NO ATTENDANCE'
                                      ? 'destructive'
                                      : record.status === 'LATE'
                                      ? 'warning'
                                      : record.status === 'EARLY'
                                      ? 'warning'
                                      : 'outline'
                                  }
                                >
                                  {record.status}
                                </Badge>
                              </td>
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
                      <th className="text-left py-3 px-2 font-medium">
                        Reason
                      </th>
                      <th className="text-left py-3 px-2 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveHistory.slice(0, 5).map((leave, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-3 px-2">{leave.leaveType}</td>
                        <td className="py-3 px-2">{leave.startDate}</td>
                        <td className="py-3 px-2">{leave.endDate}</td>
                        <td className="py-3 px-2">{leave.description}</td>
                        <td className="py-3 px-2">
                          <Badge
                            variant="outline"
                            className={
                              leave.status === 'APPROVED'
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : leave.status === 'PENDING'
                                ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                : 'bg-red-50 text-red-700 border-red-200'
                            }
                          >
                            {leave.status}
                          </Badge>
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
                      <DialogDescription>
                        Your detailed leave request history for the current year
                      </DialogDescription>
                    </DialogHeader>
                    <div className="overflow-y-auto max-h-[60vh]">
                      <table className="w-full">
                        <thead className="sticky top-0 bg-background">
                          <tr className="border-b">
                            <th className="text-left py-3 px-2 font-medium">
                              Type
                            </th>
                            <th className="text-left py-3 px-2 font-medium">
                              From
                            </th>
                            <th className="text-left py-3 px-2 font-medium">
                              To
                            </th>
                            <th className="text-left py-3 px-2 font-medium">
                              Reason
                            </th>
                            <th className="text-left py-3 px-2 font-medium">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaveHistory.map((leave, i) => (
                            <tr key={i} className="border-b">
                              <td className="py-3 px-2">{leave.leaveType}</td>
                              <td className="py-3 px-2">{leave.startDate}</td>
                              <td className="py-3 px-2">{leave.endDate}</td>
                              <td className="py-3 px-2">{leave.description}</td>
                              <td className="py-3 px-2">
                                <Badge
                                  variant="outline"
                                  className={
                                    leave.status === 'APPROVED'
                                      ? 'bg-green-50 text-green-700 border-green-200'
                                      : leave.status === 'PENDING'
                                      ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                      : 'bg-red-50 text-red-700 border-red-200'
                                  }
                                >
                                  {leave.status}
                                </Badge>
                              </td>
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

        {/* Upcoming Work Schedule */}
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Work Schedule</CardTitle>
              <CardDescription>
                Your schedule for the next two weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workSchedule.map((day, i) => (
                  <div
                    key={i}
                    className="flex items-start p-3 border rounded-lg"
                  >
                    <div className="mr-4 flex-shrink-0">
                      <CalendarDays className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Date: {day.date}</h4>
                      <p className="text-sm text-muted-foreground">
                        {day.startTime} -{day.endTime}
                      </p>
                      <div className="flex items-center mt-1">
                        {/* <MapPin className="h-3 w-3 mr-1 text-muted-foreground" /> */}
                        <span className="text-xs">{day.shiftName}</span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        day.attendanceStatus === 'PRESENT'
                          ? 'success'
                          : day.attendanceStatus === 'NO ATTENDANCE'
                          ? 'destructive'
                          : day.attendanceStatus === 'LATE'
                          ? 'warning'
                          : day.attendanceStatus === 'EARLY'
                          ? 'warning'
                          : 'outline'
                      }
                    >
                      {day.attendanceStatus}
                    </Badge>
                  </div>
                ))}
              </div>
              {/* <div className="mt-4 flex justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View Full Calendar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Work Schedule Calendar</DialogTitle>
                      <DialogDescription>
                        Your complete work schedule for the month
                      </DialogDescription>
                    </DialogHeader>
                    <div className="p-2">
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                          (day) => (
                            <div
                              key={day}
                              className="text-center font-medium text-sm py-1"
                            >
                              {day}
                            </div>
                          ),
                        )}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 35 }).map((_, i) => {
                          const currentDate = new Date();
                          const firstDayOfMonth = new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            1,
                          );
                          const startDay = firstDayOfMonth.getDay(); // Day of the week the month starts on
                          const day = i - startDay + 1; // Calculate the actual day of the month
                          const isCurrentMonth =
                            day > 0 &&
                            day <=
                              new Date(
                                currentDate.getFullYear(),
                                currentDate.getMonth() + 1,
                                0,
                              ).getDate();
                          const isToday =
                            isCurrentMonth && day === currentDate.getDate();

                          // Find the schedule for the current day
                          const schedule = workSchedule.find(
                            (record) =>
                              record.date ===
                              `${currentDate.getFullYear()}-${String(
                                currentDate.getMonth() + 1,
                              ).padStart(2, '0')}-${String(day).padStart(
                                2,
                                '0',
                              )}`,
                          );

                          return (
                            <div
                              key={i}
                              className={`
                  border rounded-md p-2 min-h-[80px] relative
                  ${!isCurrentMonth ? 'bg-muted/50 text-muted-foreground' : ''}
                  ${isToday ? 'border-primary' : ''}
                `}
                            >
                              {isCurrentMonth && (
                                <>
                                  <div className="text-right text-sm">
                                    {day}
                                  </div>
                                  {schedule && (
                                    <div
                                      className={`
                          mt-1 text-xs p-1 rounded
                          ${
                            schedule.attendanceStatus === 'PRESENT'
                              ? 'bg-green-50 text-green-700'
                              : schedule.attendanceStatus === 'NO ATTENDANCE'
                              ? 'bg-red-50 text-red-700'
                              : schedule.attendanceStatus === 'LATE'
                              ? 'bg-yellow-50 text-yellow-700'
                              : 'bg-blue-50 text-blue-700'
                          }
                        `}
                                    >
                                      {schedule.shiftName} ({schedule.startTime}{' '}
                                      - {schedule.endTime})
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div> */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
