import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { AddAttendDialog } from './addAttendance';
import { EditAttendDialog } from './editAttendance';
import { Button } from '../../components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';
import { attendanceService } from '../../services/attendance';
import { userService } from '../../services/user';
import { employeeService } from '../../services/employee';
import type { Attendance } from "../../types/attendance"
import { Badge } from '../../components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

// Danh sách ca làm việc chuẩn
const SHIFTS = [
  { id: 3001, name: 'Morning Shift', startTime: '08:00', endTime: '13:00' },
  { id: 3002, name: 'Afternoon Shift', startTime: '12:30', endTime: '17:30' },
  { id: 3003, name: 'Evening Shift', startTime: '17:30', endTime: '22:30' },
  { id: 3004, name: 'Full Day Shift', startTime: '10:30', endTime: '19:30' },
];

// Interface cho attendance để sử dụng trong component
interface AttendanceDetail {
  id: number;
  employeeId: number;
  checkIn: string;
  checkOut: string;
  breakTime: number;
  note: string;
  date: string;
  shiftId: number;
}

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  shift?: any;
}

interface Shift {
  id: number;
  startTime: string;
  endTime: string;
  date: string;
}

const Attendance = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceDetail | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [employeeShifts, setEmployeeShifts] = useState<Map<number, Shift>>(new Map());

  useEffect(() => {
    const fetchRestaurantId = async () => {
      try {
        if (!user) {
          throw new Error("User is not authenticated");
        }
        const userResponse = await userService.getUserByID(user.id, 'STORE_MANAGER');
        if (!userResponse?.data?.data?.restaurantId) {
          throw new Error("restaurantId is missing");
        }
        setRestaurantId(userResponse.data.data.restaurantId);
      } catch (error) {
        console.error('Failed to fetch restaurant ID:', error);
      }
    };

    fetchRestaurantId();
  }, [user]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        if (!user) {
          throw new Error("User is not authenticated")
        }

        // Lấy restaurant ID từ user
        const userResponse = await userService.getUserByID(user.id, 'STORE_MANAGER')
        if (!userResponse?.data?.data?.restaurantId) {
          throw new Error("restaurantId is missing")
        }

        // Lấy danh sách nhân viên từ restaurant ID
        const response = await employeeService.getEmpByRestaurantId(userResponse.data.data.restaurantId)
        console.log('Employee Response:', response)

        // Kiểm tra và xử lý dữ liệu từ response
        if (response?.data?.data?.content && Array.isArray(response.data.data.content)) {
          const formattedEmployees = response.data.data.content.map((emp: any) => ({
            id: emp.employeeId,
            firstName: emp.firstName || '',
            lastName: emp.lastName || '',
            email: emp.email || '',
            avatar: emp.avatar || ''
          }))
          console.log('Formatted Employees:', formattedEmployees)
          setEmployees(formattedEmployees)

          // Sau khi lấy được danh sách nhân viên, lấy thông tin ca làm việc của từng nhân viên
          await fetchEmployeeShifts(formattedEmployees);
        } else {
          console.error('No employee data found in response')
          setEmployees([])
        }
      } catch (error) {
        console.error('Failed to fetch employees:', error)
        setEmployees([])
      } finally {
        setLoading(false)
      }
    }

    if (restaurantId !== null) {
      fetchEmployees()
    }
  }, [user, restaurantId]);

  const fetchEmployeeShifts = async (employeeList: Employee[]) => {
    const shiftsMap = new Map<number, Shift>();
    const employeesToAttend: Attendance[] = [];

    console.log('Bắt đầu lấy thông tin ca làm việc cho nhân viên');

    for (const employee of employeeList) {
      try {
        console.log(`Đang lấy ca làm việc cho nhân viên ID: ${employee.id}`);
        const shiftResponse = await attendanceService.getShift(employee.id);
        console.log(`Kết quả ca làm việc của nhân viên ${employee.id}:`, shiftResponse);

        if (shiftResponse?.data) {
          const shiftData = {
            id: shiftResponse.data.shiftId,
            startTime: shiftResponse.data.startTime,
            endTime: shiftResponse.data.endTime,
            date: shiftResponse.data.date
          };

          shiftsMap.set(employee.id, shiftData);
          console.log(`Đã lưu thông tin ca làm việc cho nhân viên ${employee.id}:`, shiftData);

          // Tạo dữ liệu điểm danh mặc định cho nhân viên có ca làm việc
          const now = new Date();
          const shiftStartTime = new Date(shiftData.date + 'T' + shiftData.startTime);

          // Xác định trạng thái mặc định
          let defaultStatus = 'PENDING';
          if (now < shiftStartTime) {
            defaultStatus = 'NOT_YET';
          }

          // Thêm vào danh sách nhân viên cần hiển thị điểm danh
          employeesToAttend.push({
            id: 0, // ID sẽ được cập nhật sau khi fetch dữ liệu từ server
            employeeId: employee.id,
            email: employee.email,
            avatar: employee.avatar,
            checkIn: null,
            checkOut: null,
            breakTime: 0,
            status: defaultStatus,
            date: shiftData.date,
            note: '',
            shiftId: shiftData.id,
            checkInTime: null,
            checkOutTime: null
          });
        } else {
          console.log(`Nhân viên ${employee.id} không có ca làm việc hôm nay`);
        }
      } catch (error) {
        console.error(`Lỗi khi lấy ca làm việc cho nhân viên ${employee.id}:`, error);
      }
    }

    setEmployeeShifts(shiftsMap);

    // Hiển thị nhân viên có ca làm việc nhưng chưa có trong danh sách điểm danh
    if (employeesToAttend.length > 0) {
      console.log('Nhân viên có ca làm việc:', employeesToAttend);
    }
  };

  // Hàm lấy thông tin ca làm việc từ shift ID
  const getShiftInfo = (shiftId: number) => {
    const shift = SHIFTS.find(s => s.id === shiftId);
    if (shift) {
      return `${shift.name} (${shift.startTime} - ${shift.endTime})`;
    }
    return 'Unknown Shift';
  };

  // Hàm chuyển đổi thời gian địa phương sang UTC
  const convertToUTC = (dateStr: string, timeStr: string): Date => {
    // Tạo date từ chuỗi ngày và giờ
    const localDate = new Date(`${dateStr}T${timeStr}`);
    // Trả về đối tượng Date đã được chuyển đổi sang UTC
    return localDate;
  };

  // Hàm để format thời gian
  const formatTimeDisplay = (timeStr: string | null): string | null => {
    if (!timeStr) return null;
    // Lấy thời gian trực tiếp từ chuỗi ISO
    const time = timeStr.split('T')[1]?.substring(0, 5); // Chỉ lấy HH:mm
    return time || null;
  };

  const fetchAttendances = useCallback(async (
    page: number,
    size: number = 10
  ) => {
    try {
      if (restaurantId === null) {
        throw new Error("restaurantId is not set");
      }

      const response = await attendanceService.getTodayAttendance(restaurantId, page - 1, size);
      console.log('API Response điểm danh:', response);

      let processedAttendances: Attendance[] = [];

      if (response.data?.content) {
        processedAttendances = response.data.content.map((attendance: any) => {
          // Lấy thông tin ca làm việc của nhân viên
          const shift = employeeShifts.get(attendance.employeeId);

          // Xác định trạng thái dựa trên ca làm việc và thời gian điểm danh
          let status = attendance.status || 'PENDING';

          if (shift) {
            const now = new Date();

            // Lấy thời gian check-in, check-out từ dữ liệu, đã ở định dạng UTC
            const checkInTime = attendance.checkInTime ? new Date(attendance.checkInTime) : null;
            const checkOutTime = attendance.checkOutTime ? new Date(attendance.checkOutTime) : null;

            // Chuyển đổi thời gian ca làm việc sang UTC để so sánh
            const shiftStartTime = convertToUTC(shift.date, shift.startTime);
            const shiftEndTime = convertToUTC(shift.date, shift.endTime);

            // Thêm 15 phút vào thời gian bắt đầu ca để xác định trễ nghiêm trọng
            const severeLateThreshold = new Date(shiftStartTime);
            severeLateThreshold.setMinutes(severeLateThreshold.getMinutes() + 15);

            console.log(`Employee ${attendance.employeeId} - Check-in time: ${checkInTime}, Shift start: ${shiftStartTime}`);

            // Trước ca làm việc
            if (now < shiftStartTime) {
              if (!checkInTime) {
                // Chưa đến ca làm việc và chưa check-in
                status = 'NOT_YET';
              } else if (checkInTime < shiftStartTime) {
                // Đã check-in sớm trước giờ ca làm
                if (!checkOutTime) {
                  // Đã check-in sớm và chưa check-out
                  status = 'IN_WORKING';
                } else if (checkOutTime < shiftEndTime) {
                  // Đã check-in sớm và check-out sớm
                  status = 'EARLY';
                } else {
                  // Đã check-in sớm và check-out đúng giờ hoặc muộn
                  status = 'PRESENT';
                }
              }
            }
            // Trong hoặc sau ca làm việc
            else {
              if (!checkInTime) {
                // Đã đến hoặc qua giờ ca làm nhưng chưa check-in
                status = 'ABSENT';
              } else {
                // Kiểm tra thời gian check-in so với thời gian bắt đầu ca
                const lateMinutes = checkInTime && shiftStartTime ?
                  Math.floor((checkInTime.getTime() - shiftStartTime.getTime()) / (1000 * 60)) : 0;

                console.log(`Employee ${attendance.employeeId} - Late minutes: ${lateMinutes}`);

                if (checkInTime > shiftStartTime) {
                  // Check-in trễ
                  if (checkInTime > severeLateThreshold) {
                    // Check-in trễ nghiêm trọng (sau thời gian cho phép 15 phút)
                    if (!checkOutTime) {
                      // Check-in trễ nghiêm trọng và chưa check-out
                      status = 'IN_WORKING';
                    } else if (checkOutTime < shiftEndTime) {
                      // Check-in trễ nghiêm trọng và check-out sớm
                      status = 'LATE_EARLY';
                    } else {
                      // Check-in trễ nghiêm trọng và check-out đúng giờ hoặc muộn
                      status = 'LATE_SEVERE';
                    }
                  } else {
                    // Check-in trễ nhưng trong khoảng cho phép (dưới 15 phút)
                    if (!checkOutTime) {
                      // Check-in trễ và chưa check-out
                      status = 'IN_WORKING';
                    } else if (checkOutTime < shiftEndTime) {
                      // Check-in trễ và check-out sớm
                      const earlyMinutes = Math.floor((shiftEndTime.getTime() - checkOutTime.getTime()) / (1000 * 60));
                      console.log(`Late CheckIn - CheckOut time: ${checkOutTime}, ShiftEnd time: ${shiftEndTime}, Early minutes: ${earlyMinutes}`);

                      if (earlyMinutes >= 1) {
                        status = 'LATE_EARLY';
                      } else {
                        status = 'LATE';
                      }
                    } else {
                      // Check-in trễ và check-out đúng giờ hoặc muộn
                      status = 'LATE';
                    }
                  }
                } else {
                  // Check-in đúng giờ hoặc trong khoảng thời gian cho phép
                  if (!checkOutTime) {
                    // Check-in đúng giờ và chưa check-out
                    status = 'IN_WORKING';
                  } else if (checkOutTime < shiftEndTime) {
                    // Kiểm tra chính xác hơn: check-out sớm (dù chỉ 1 phút)
                    // Tính chênh lệch thời gian theo phút
                    const earlyMinutes = Math.floor((shiftEndTime.getTime() - checkOutTime.getTime()) / (1000 * 60));
                    console.log(`CheckOut time: ${checkOutTime}, ShiftEnd time: ${shiftEndTime}, Early minutes: ${earlyMinutes}`);

                    // Nếu chênh lệch từ 1 phút trở lên, đánh dấu là EARLY
                    if (earlyMinutes >= 1) {
                      status = 'EARLY';
                    } else {
                      // Nếu chênh lệch ít hơn 1 phút, coi như đúng giờ
                      status = 'PRESENT';
                    }
                  } else if (checkOutTime > shiftEndTime) {
                    // Kiểm tra overtime - check-out sau giờ kết thúc ca
                    const overtimeMinutes = Math.floor((checkOutTime.getTime() - shiftEndTime.getTime()) / (1000 * 60));
                    if (overtimeMinutes > 30) {
                      status = 'OVERTIME';
                    } else {
                      status = 'PRESENT';
                    }
                  } else {
                    // Check-in đúng giờ và check-out đúng giờ (chính xác đến giây)
                    status = 'PRESENT';
                  }
                }
              }
            }
          }

          const shiftId = attendance.shiftId || (shift ? shift.id : 3001);

          // Lấy ngày từ thời gian check-in (nếu có) hoặc từ trường date
          const displayDate = attendance.checkInTime
            ? new Date(attendance.checkInTime).toLocaleDateString('en-US')
            : new Date(attendance.date).toLocaleDateString('en-US');

          return {
            id: attendance.attendanceId,
            employeeId: attendance.employeeId,
            avatar: attendance.avatar || '',
            email: attendance.email,
            // Lưu cả dữ liệu gốc và dữ liệu đã format
            checkInTime: attendance.checkInTime, // Dữ liệu gốc
            checkOutTime: attendance.checkOutTime, // Dữ liệu gốc
            checkIn: formatTimeDisplay(attendance.checkInTime),
            checkOut: formatTimeDisplay(attendance.checkOutTime),
            breakTime: attendance.breakDurianTime,
            status: status,
            date: attendance.date, // Giữ nguyên date gốc từ API
            displayDate: displayDate, // Thêm trường để hiển thị ngày theo chuẩn
            note: attendance.note || '',
            shiftId: shiftId,
            workShift: getShiftInfo(shiftId)
          };
        });

        // Tìm nhân viên có ca làm việc nhưng chưa có trong danh sách điểm danh
        if (employeeShifts.size > 0) {
          const attendedEmployeeIds = new Set(processedAttendances.map(a => a.employeeId));

          // Tạo dữ liệu điểm danh mặc định cho nhân viên có ca làm việc nhưng chưa có trong danh sách
          employeeShifts.forEach((shift, employeeId) => {
            if (!attendedEmployeeIds.has(employeeId)) {
              const employee = employees.find(e => e.id === employeeId);
              if (employee) {
                const now = new Date();
                // Chuyển đổi thời gian ca làm việc sang UTC để so sánh
                const shiftStartTime = convertToUTC(shift.date, shift.startTime);

                // Xác định trạng thái mặc định
                let defaultStatus = 'PENDING';
                if (now < shiftStartTime) {
                  defaultStatus = 'NOT_YET';
                } else {
                  defaultStatus = 'ABSENT';
                }

                processedAttendances.push({
                  id: 0, // ID tạm thời
                  employeeId: employeeId,
                  email: employee.email,
                  avatar: employee.avatar || '',
                  checkIn: null,
                  checkOut: null,
                  breakTime: 0,
                  status: defaultStatus,
                  date: shift.date,
                  displayDate: new Date(shift.date).toLocaleDateString('en-US'),
                  note: '',
                  shiftId: shift.id,
                  checkInTime: null,
                  checkOutTime: null,
                  workShift: getShiftInfo(shift.id)
                });
              }
            }
          });
        }

        setAttendances(processedAttendances);
        setTotalPages(response.data.totalPages || 1);
      } else {
        // Nếu không có dữ liệu điểm danh từ API, tạo dữ liệu mặc định cho tất cả nhân viên có ca làm việc
        const defaultAttendances: Attendance[] = [];

        employeeShifts.forEach((shift, employeeId) => {
          const employee = employees.find(e => e.id === employeeId);
          if (employee) {
            const now = new Date();
            // Chuyển đổi thời gian ca làm việc sang UTC để so sánh
            const shiftStartTime = convertToUTC(shift.date, shift.startTime);

            // Xác định trạng thái mặc định
            let defaultStatus = 'PENDING';
            if (now < shiftStartTime) {
              defaultStatus = 'NOT_YET';
            } else {
              defaultStatus = 'ABSENT';
            }

            defaultAttendances.push({
              id: 0, // ID tạm thời
              employeeId: employeeId,
              email: employee.email,
              avatar: employee.avatar || '',
              checkIn: null,
              checkOut: null,
              breakTime: 0,
              status: defaultStatus,
              date: shift.date,
              displayDate: new Date(shift.date).toLocaleDateString('en-US'),
              note: '',
              shiftId: shift.id,
              checkInTime: null,
              checkOutTime: null,
              workShift: getShiftInfo(shift.id)
            });
          }
        });

        setAttendances(defaultAttendances);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Failed to fetch attendances:', error);
      setAttendances([]);
      setTotalPages(1);
    }
  }, [restaurantId, employeeShifts, employees]);

  useEffect(() => {
    if (restaurantId !== null && employeeShifts.size > 0) {
      fetchAttendances(currentPage, 10);
    }
  }, [currentPage, restaurantId, fetchAttendances, employeeShifts]);

  const handleEditClick = (attendance: any) => {
    console.log('Dữ liệu attendance trước khi chỉnh sửa:', attendance);

    // Chuẩn bị dữ liệu check-in và check-out
    let checkIn = attendance.checkIn || '';
    let checkOut = attendance.checkOut || '';

    // Xử lý checkOut time - trừ 7 tiếng nếu có dữ liệu
    if (attendance.checkOutTime) {
      // Tạo một bản sao của đối tượng Date để không ảnh hưởng đến dữ liệu gốc
      const checkOutDate = new Date(attendance.checkOutTime);

      // Lưu giờ hiện tại
      const hours = checkOutDate.getHours();

      // Trừ 7 tiếng, nhưng giữ nguyên ngày
      // Nếu giờ < 7, điều chỉnh để không dưới 0
      const adjustedHours = hours >= 7 ? hours - 7 : hours + 17; // 24 - 7 = 17

      // Cập nhật giờ
      checkOutDate.setHours(adjustedHours);

      // Format thời gian thành chuỗi giờ:phút
      checkOut = `${String(checkOutDate.getHours()).padStart(2, '0')}:${String(checkOutDate.getMinutes()).padStart(2, '0')}`;

      console.log('Dữ liệu check-out sau khi trừ 7 tiếng:', checkOut);
    }

    // Đảm bảo dùng dữ liệu checkInTime và checkOutTime (dữ liệu gốc ISO)
    const formattedAttendance = {
      id: attendance.id,
      employeeId: attendance.employeeId,
      checkIn: checkIn,
      checkOut: checkOut,
      breakTime: attendance.breakTime || 0,
      note: attendance.note || '',
      date: new Date(attendance.date).toISOString().split('T')[0],
      shiftId: attendance.shiftId
    };

    console.log('Dữ liệu attendance sau khi format:', formattedAttendance);

    setSelectedAttendance(formattedAttendance);
    setEditDialogOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'PRESENT':
        return 'success';
      case 'ABSENT':
        return 'destructive';
      case 'LATE':
        return 'warning';
      case 'LATE_SEVERE':
        return 'destructive';
      case 'EARLY':
        return 'warning';
      case 'NOT_YET':
        return 'outline';
      case 'PENDING':
        return 'default';
      case 'IN_WORKING':
        return 'secondary';
      case 'LATE_CHECKOUT':
        return 'warning';
      case 'OVERTIME':
        return 'success';
      default:
        return 'default';
    }
  };

  // Hiển thị thông báo nếu đang tải dữ liệu
  if (loading) {
    return (
      <>
        <Breadcrumb pageName="Attendance" />
        <div className="bg-white rounded-lg shadow p-6 flex justify-center items-center h-64">
          <p>Loading data...</p>
        </div>
      </>
    );
  }

  // Lọc danh sách hiển thị chỉ nhân viên có ca làm việc
  const employeesWithShifts = employees.filter(emp => employeeShifts.has(emp.id));

  return (
    <>
      <Breadcrumb pageName="Attendance" />
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            {/* <input
              type="text"
              placeholder="Search by employee ID, note..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            /> */}
          </div>
          {/* <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="ml-auto py-6 px-10"
          >
            Add Attendance
          </Button> */}
        </div>
        {employeesWithShifts.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-gray-2 dark:bg-meta-4">
                    <th className="text-left py-4 px-4 font-medium text-slate-600">
                      EMPLOYEE ID
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-slate-600">
                      EMAIL
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-slate-600">
                      WORK SHIFT
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-slate-600">
                      CHECK IN
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-slate-600">
                      CHECK OUT
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-slate-600">
                      STATUS
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-slate-600">
                      DATE
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-slate-600">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendances.map((attendance, key) => (
                    <tr className="border-b hover:bg-slate-50" key={key}>
                      <td className="py-4 px-4 text-slate-800">{attendance.employeeId}</td>
                      <td className="py-4 px-4 text-slate-800">{attendance.email}</td>
                      <td className="py-4 px-4 text-slate-800">
                        {attendance.workShift || '-'}
                      </td>
                      <td className="py-4 px-4 text-slate-800">
                        {attendance.checkIn || '-'}
                      </td>
                      <td className="py-4 px-4 text-slate-800">
                        {attendance.checkOut || '-'}
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={getStatusBadgeVariant(attendance.status)}>{attendance.status}</Badge>
                      </td>
                      <td className="py-4 px-4 text-slate-800">
                        {attendance.displayDate}
                      </td>
                      <td className="py-4 px-4 flex justify-center">
                        {attendance.checkInTime ? (
                          <button
                            onClick={() => handleEditClick(attendance)}
                            className="hover:text-primary"
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                fill=""
                              />
                              <path
                                d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                fill=""
                              />
                            </svg>
                          </button>
                        ) : (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  className="text-gray-300 cursor-not-allowed"
                                  disabled
                                >
                                  <svg
                                    className="fill-current"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                      fill=""
                                    />
                                    <path
                                      d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                      fill=""
                                    />
                                  </svg>
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Cannot edit attendance without check-in data</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                    isDisabled={currentPage === 1}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      isActive={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                    isDisabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        ) : (
          <div className="text-center py-8">
            <p>No employees have shifts today.</p>
          </div>
        )}
      </div>
      <AddAttendDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSuccess={() => fetchAttendances(currentPage, 10)}
      />
      <EditAttendDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        attendance={selectedAttendance}
        onSuccess={() => fetchAttendances(currentPage, 10)}
      />
    </>
  );
};

export default Attendance;