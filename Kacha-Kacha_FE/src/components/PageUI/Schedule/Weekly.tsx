import { useState, useEffect, useCallback } from 'react';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { employeeService } from '../../../services/employee';
import { scheduleService } from '../../../services/schedule';
import { userService } from '../../../services/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Plus } from "lucide-react"

import { Button } from "../../ui/button"
import { Card, CardContent } from "../../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination"

type WeeklyScheduleProps = {
  weekStart: Date;
  onAddShift: (day: Date, employeeId: number) => void;
};

type ShiftDTO = {
  shiftId: number;
  employeeShiftId: number;
  startTime: string;
  endTime: string;
  breakDuration: number;
  date: string;
  shiftName: string;
};

type ScheduleEmployee = {
  employeeId: number;
  shiftDTO: ShiftDTO[];
};

export function WeeklySchedule({ weekStart, onAddShift }: WeeklyScheduleProps) {
  const [scheduleData, setScheduleData] = useState<ScheduleEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const isDateValid = useCallback((date: Date) => {
    const today = startOfDay(new Date());
    return !isBefore(date, today);
  }, []);

  const fetchSchedule = useCallback(async (
    page: number,
    size: number = 10
  ) => {
    try {
      if (restaurantId === null) {
        throw new Error("restaurantId is not set");
      }

      const formattedDate = format(weekStart, 'M/d/yyyy');
      const encodedDate = encodeURIComponent(formattedDate);
      const response = await scheduleService.getSchedule(
        restaurantId,
        page - 1,
        size,
        encodedDate
      );

      if (response.data?.content) {
        setScheduleData(response.data.content);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error('Failed to fetch schedule:', error);
    } finally {
      setLoading(false);
    }
  }, [restaurantId, weekStart]);

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
      fetchSchedule(currentPage, 10);
    }
  }, [currentPage, restaurantId, fetchSchedule]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  if (loading) {
    return <div>Loading...</div>;
  }

  const getShiftForDay = (employeeId: number, date: Date) => {
    const employee = scheduleData.find(emp => emp.employeeId === employeeId);
    if (!employee) return null;

    return employee.shiftDTO.find(shift => {
      const shiftDate = new Date(shift.date);
      return format(shiftDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    });
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header row with days */}
          <div className="grid grid-cols-8 gap-2 mb-4">
            <div className="font-medium p-2">Employee ID</div>
            {weekDays.map((day, index) => (
              <div key={index} className="text-center font-medium p-2">
                <div>{format(day, "EEE")}</div>
                <div className="text-sm text-muted-foreground">{format(day, "MMM d")}</div>
              </div>
            ))}
          </div>

          {/* Employee rows */}
          {scheduleData.map((employee) => (
            <div key={employee.employeeId} className="grid grid-cols-8 gap-2 mb-2">
              <div className="flex items-center gap-2 p-2">
                <div className="text-sm font-medium">{employee.employeeId}</div>
              </div>

              {/* Days cells */}
              {weekDays.map((day, dayIndex) => {
                const shift = getShiftForDay(employee.employeeId, day);
                return (
                  <div key={dayIndex} className="relative min-h-[60px] border rounded-md p-1 bg-background">
                    {shift ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="p-2 text-xs bg-primary/10 rounded-md">
                              {shift.shiftName}
                              <br />
                              {shift.startTime.split('T')[1].substring(0, 5)} -
                              {shift.endTime.split('T')[1].substring(0, 5)}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Break: {shift.breakDuration} minutes</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      isDateValid(day) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute bottom-1 right-1 h-6 w-6 p-0"
                          onClick={() => onAddShift(day, employee.employeeId)}
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Add shift</span>
                        </Button>
                      )
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {scheduleData.length > 0 && (
        <div className="flex items-center justify-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
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
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

