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
import { debounce } from 'lodash';
import type { Attendance } from "../../types/attendance"
const Attendance = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [restaurantId, setRestaurantId] = useState<number | null>(null);

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
    if (restaurantId !== null) {
      fetchAttendances(currentPage, 10, searchQuery);
    }
  }, [currentPage, searchQuery, restaurantId]);

  const fetchAttendances = async (page: number, size: number = 10, keyword: string) => {
    try {
      if (restaurantId === null) {
        throw new Error("restaurantId is not set");
      }
      const response = await attendanceService.getTodayAttend(
        page - 1,
        size,
        restaurantId,
        keyword,
      );
      console.log('API Response:', response);
      const attendances =
        response.data.content?.map((attendance: any) => ({
          id: attendance.id,
          employeeId: attendance.employeeId,
          checkIn: attendance.checkIn,
          checkOut: attendance.checkOut,
          breakTime: attendance.breakTime,
          note: attendance.note,
          date: attendance.date,
          shiftId: attendance.shiftId,
        })) || [];
      setAttendances(attendances);
      const total = response.data.totalPages || 1;
      setTotalPages(total);
    } catch (error) {
      console.error('Failed to fetch attendances:', error);
    }
  };

  const handleEditClick = (attendance: any) => {
    console.log('Selected attendance ID:', attendance.id);
    console.log('Selected attendance:', attendance);
    setSelectedAttendance(attendance);
    setEditDialogOpen(true);
  };

  const handlePageChange = (page : number ) => {
    setCurrentPage(page);
  };

  const debouncedSearch = useCallback(
    debounce((keyword) => {
      setSearchQuery(keyword);
    }, 50),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <>
      <Breadcrumb pageName="Attendance" />
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by employee ID, note..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              onChange={handleSearchChange}
            />
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="ml-auto py-6 px-10"
          >
            Add Attendance
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-2 dark:bg-meta-4">
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  EMPLOYEE ID
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  CHECK IN
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  CHECK OUT
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  BREAK TIME
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  NOTE
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  DATE
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-600">
                  SHIFT ID
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
                  <td className="py-4 px-4 text-slate-800">{attendance.checkIn}</td>
                  <td className="py-4 px-4 text-slate-800">{attendance.checkOut}</td>
                  <td className="py-4 px-4 text-slate-800">{attendance.breakTime}</td>
                  <td className="py-4 px-4 text-slate-800">{attendance.note}</td>
                  <td className="py-4 px-4 text-slate-800">{attendance.date}</td>
                  <td className="py-4 px-4 text-slate-800">{attendance.shiftId}</td>
                  <td className="py-4 px-4 flex justify-center">
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
      </div>
      <AddAttendDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
      <EditAttendDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        attendance={selectedAttendance}
      />
    </>
  );
};

export default Attendance;