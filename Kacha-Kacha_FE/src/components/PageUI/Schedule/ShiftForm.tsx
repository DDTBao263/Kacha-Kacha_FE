"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useSelector } from 'react-redux'
import { RootState } from "../../../redux/store"
import { employeeService } from "../../../services/employee"
import { userService } from "../../../services/user"
import { scheduleService } from "../../../services/schedule"
import { alert } from "../../../utils/Alert"

import { Button } from "../../ui/button"
import { Calendar } from "../../ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { cn } from "../../../lib/utils"
import { useForm } from "react-hook-form"

type Employee = {
  id: number
  firstName: string
  lastName: string
  email: string
  avatar?: string
}

const SHIFTS = [
  { id: 3001, name: 'Morning Shift', startTime: '08:00', endTime: '13:00' },
  { id: 3002, name: 'Afternoon Shift', startTime: '12:30', endTime: '17:30' },
  { id: 3003, name: 'Evening Shift', startTime: '17:30', endTime: '22:30' },
  { id: 3004, name: 'Full Day Shift', startTime: '10:30', endTime: '19:30' },
];

type ShiftFormProps = {
  selectedEmployee: number | null
  selectedDay: Date | null
  onClose: () => void
  onSave: (data: any) => void
}

export function ShiftForm({ selectedEmployee, selectedDay, onClose, onSave }: ShiftFormProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDay || undefined)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const user = useSelector((state: RootState) => state.auth.user)

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

    fetchEmployees()
  }, [user])

  const form = useForm({
    defaultValues: {
      employeeId: selectedEmployee?.toString() || "",
      date: selectedDay || new Date(),
      shiftId: "",
      startTime: "",
      endTime: "",
      notes: "",
    },
  })

  const handleShiftChange = (shiftId: string) => {
    const selectedShift = SHIFTS.find(shift => shift.id.toString() === shiftId);
    if (selectedShift) {
      form.setValue('startTime', selectedShift.startTime);
      form.setValue('endTime', selectedShift.endTime);
    }
  }

  const handleSubmit = async (data: any) => {
    if (!date) return;

    try {
      const scheduleData = [{
        employeeId: parseInt(data.employeeId),
        date: date.toISOString(),
        shiftId: parseInt(data.shiftId)
      }];

      const response = await scheduleService.createSchedule(scheduleData);
      if (response.status === 200 || response.status === 201) {
        await alert.success("Schedule created successfully");
        onSave(scheduleData[0]);
        onClose();
      } else {
        await alert.error("Failed to create schedule");
      }
    } catch (error: any) {
      console.error('Failed to create schedule:', error);
      await alert.error(error?.response?.data?.message || "Failed to create schedule");
    }
  }

  // Time options for the select dropdowns
  const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4)
    const minute = (i % 4) * 15
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
  })

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold">Schedule Work Shift</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Add a new work shift for employee. Click save when done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-5 space-y-6">
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Employee</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={selectedEmployee?.toString()}
                    disabled={loading}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder={loading ? "Loading employees..." : "Select employee"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id.toString()}>
                          <div className="flex items-center gap-2">
                            {employee.avatar && (
                              <img
                                src={employee.avatar}
                                alt={`${employee.firstName} ${employee.lastName}`}
                                className="h-6 w-6 rounded-full object-cover"
                              />
                            )}
                            <span>{`${employee.firstName} ${employee.lastName}`}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium">Work Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "h-10 w-full border border-input bg-background pl-3 text-left font-normal hover:bg-accent hover:text-accent-foreground",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            {date ? format(date, "MMMM d, yyyy") : <span>Select date</span>}
                          </div>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="rounded-md border shadow-sm"
                        classNames={{
                          months: "space-y-4 p-3",
                          month: "space-y-4",
                          caption: "flex justify-center pt-1 relative items-center gap-1",
                          caption_label: "text-sm font-medium",
                          nav: "flex items-center gap-1",
                          nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-accent rounded-md",
                          nav_button_previous: "absolute left-1",
                          nav_button_next: "absolute right-1",
                          table: "w-full border-collapse space-y-1",
                          head_row: "flex",
                          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                          row: "flex w-full mt-2",
                          cell: cn(
                            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
                            "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                          ),
                          day: cn(
                            "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md"
                          ),
                          day_range_end: "day-range-end",
                          day_selected:
                            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                          day_today: "bg-accent text-accent-foreground",
                          day_outside: "text-muted-foreground opacity-50",
                          day_disabled: "text-muted-foreground opacity-50",
                          day_hidden: "invisible",
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shiftId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Work Shift</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleShiftChange(value);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select work shift" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SHIFTS.map((shift) => (
                        <SelectItem key={shift.id} value={shift.id.toString()}>
                          {shift.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("shiftId") && (
              <div className="rounded-md border border-input bg-muted/50 p-3">
                <div className="text-sm font-medium text-muted-foreground">Working Hours</div>
                <div className="mt-1 text-sm">
                  {SHIFTS.find(shift => shift.id.toString() === form.watch("shiftId"))?.startTime} -
                  {SHIFTS.find(shift => shift.id.toString() === form.watch("shiftId"))?.endTime}
                </div>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save Shift</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

