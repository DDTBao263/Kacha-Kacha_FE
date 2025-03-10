"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

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
  name: string
  department: string
  avatar: string
}

type ShiftFormProps = {
  employees: Employee[]
  selectedEmployee: number | null
  selectedDay: Date | null
  onClose: () => void
  onSave: (data: any) => void
}

export function ShiftForm({ employees, selectedEmployee, selectedDay, onClose, onSave }: ShiftFormProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDay || undefined)

  const form = useForm({
    defaultValues: {
      employeeId: selectedEmployee?.toString() || "",
      date: selectedDay || new Date(),
      startTime: "09:00",
      endTime: "17:00",
      notes: "",
    },
  })

  const handleSubmit = (data: any) => {
    onSave({
      ...data,
      date: date,
    })
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
        <DialogHeader>
          <DialogTitle>Schedule a Shift</DialogTitle>
          <DialogDescription>Add a new work shift for an employee. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={selectedEmployee?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id.toString()}>
                          {employee.name}
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
                  <FormLabel>Shift Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !date && "text-muted-foreground")}
                        >
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Start time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={`start-${time}`} value={time}>
                            {time}
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
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="End time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={`end-${time}`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
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

