import { useState } from "react"
import { addDays, format } from "date-fns"
import { Plus } from "lucide-react"

import { Button } from "../../ui/button"
import { Card, CardContent } from "../../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination"

// Mock data for shifts
const initialShifts = [
  { id: 1, employeeId: 1, day: new Date(), startTime: "09:00", endTime: "17:00" },
  { id: 2, employeeId: 2, day: new Date(), startTime: "10:00", endTime: "18:00" },
  { id: 3, employeeId: 3, day: addDays(new Date(), 1), startTime: "08:00", endTime: "16:00" },
]

type Employee = {
  id: number
  name: string
  department: string
  avatar: string
}

type WeeklyScheduleProps = {
  weekStart: Date
  employees: Employee[]
  onAddShift: (day: Date, employeeId: number) => void
}

export function WeeklySchedule({ weekStart, employees, onAddShift }: WeeklyScheduleProps) {
  const [shifts, setShifts] = useState(initialShifts)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Generate array of 7 days starting from weekStart
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  // Calculate pagination values
  const totalEmployees = employees.length
  const totalPages = Math.ceil(totalEmployees / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalEmployees)
  const currentEmployees = employees.slice(startIndex, endIndex)

  const getShiftsForDay = (employeeId: number, day: Date) => {
    const dayStr = format(day, "yyyy-MM-dd")
    return shifts.filter(
      (shift) => shift.employeeId === employeeId && format(new Date(shift.day), "yyyy-MM-dd") === dayStr,
    )
  }

  // Handle page changes
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate range around current page
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if at the beginning or end
      if (currentPage <= 2) {
        endPage = 4
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push(-1) // -1 represents ellipsis
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push(-2) // -2 represents ellipsis
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header row with days */}
          <div className="grid grid-cols-8 gap-2 mb-4">
            <div className="font-medium p-2">Employee</div>
            {weekDays.map((day, index) => (
              <div key={index} className="text-center font-medium p-2">
                <div>{format(day, "EEE")}</div>
                <div className="text-sm text-muted-foreground">{format(day, "MMM d")}</div>
              </div>
            ))}
          </div>

          {/* Employee rows */}
          {currentEmployees.map((employee) => (
            <div key={employee.id} className="grid grid-cols-8 gap-2 mb-2">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={employee.avatar} alt={employee.name} />
                  <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm font-medium">{employee.name}</div>
              </div>

              {/* Days cells */}
              {weekDays.map((day, dayIndex) => {
                const dayShifts = getShiftsForDay(employee.id, day)

                return (
                  <div key={dayIndex} className="relative min-h-[60px] border rounded-md p-1 bg-background">
                    {dayShifts.length > 0 ? (
                      <TooltipProvider>
                        {dayShifts.map((shift) => (
                          <Tooltip key={shift.id}>
                            <TooltipTrigger asChild>
                              <Card className="mb-1 cursor-pointer bg-primary/10 hover:bg-primary/20">
                                <CardContent className="p-2 text-xs">
                                  {shift.startTime} - {shift.endTime}
                                </CardContent>
                              </Card>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{employee.name}</p>
                              <p>
                                {format(day, "MMM d")}: {shift.startTime} - {shift.endTime}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </TooltipProvider>
                    ) : null}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute bottom-1 right-1 h-6 w-6 p-0"
                      onClick={() => onAddShift(day, employee.id)}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add shift</span>
                    </Button>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalEmployees > 0 && (
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{endIndex} of {totalEmployees} employees
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => goToPage(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === -1 || page === -2 ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink isActive={page === currentPage} onClick={() => goToPage(page)}>
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => goToPage(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

