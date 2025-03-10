import { useState } from 'react';
import { addDays, format, startOfWeek } from 'date-fns';
import { Calendar, Clock, Users } from 'lucide-react';

import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { WeeklySchedule } from '../../components/PageUI/Schedule/Weekly';
import { EmployeeList } from '../../components/PageUI/Schedule/EmployeeList';
import { ShiftForm } from '../../components/PageUI/Schedule/ShiftForm';

// Mock data for employees
const employees = [
  {
    id: 1,
    name: 'Alex Johnson',
    department: 'Sales',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    name: 'Sam Williams',
    department: 'Marketing',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 3,
    name: 'Taylor Brown',
    department: 'Customer Support',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 4,
    name: 'Jordan Smith',
    department: 'IT',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 5,
    name: 'Casey Davis',
    department: 'HR',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 6,
    name: 'Riley Wilson',
    department: 'Finance',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 7,
    name: 'Morgan Lee',
    department: 'Sales',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 8,
    name: 'Jamie Garcia',
    department: 'Marketing',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 9,
    name: 'Quinn Martinez',
    department: 'Customer Support',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 10,
    name: 'Avery Robinson',
    department: 'IT',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 11,
    name: 'Drew Thompson',
    department: 'HR',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 12,
    name: 'Cameron Wright',
    department: 'Finance',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 13,
    name: 'Skyler King',
    department: 'Sales',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 14,
    name: 'Hayden Scott',
    department: 'Marketing',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 15,
    name: 'Parker Green',
    department: 'Customer Support',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 16,
    name: 'Dakota Hall',
    department: 'IT',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 17,
    name: 'Reese Adams',
    department: 'HR',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 18,
    name: 'Finley Baker',
    department: 'Finance',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 19,
    name: 'Jordan Nelson',
    department: 'Sales',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 20,
    name: 'Rowan Carter',
    department: 'Marketing',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 21,
    name: 'Emerson Cooper',
    department: 'Customer Support',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 22,
    name: 'Sage Richardson',
    department: 'IT',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 23,
    name: 'Blake Morgan',
    department: 'HR',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 24,
    name: 'Ellis Peterson',
    department: 'Finance',
    avatar: '/placeholder.svg?height=40&width=40',
  },
];

// Mock data for departments
const departments = [
  'All Departments',
  'Sales',
  'Marketing',
  'Customer Support',
  'IT',
  'HR',
  'Finance',
];

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [showShiftForm, setShowShiftForm] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedDepartment, setSelectedDepartment] =
    useState('All Departments');

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start week on Monday

  const handlePreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handleAddShift = (day: Date, employeeId: number) => {
    setSelectedDay(day);
    setSelectedEmployee(employeeId);
    setShowShiftForm(true);
  };

  const filteredEmployees =
    selectedDepartment === 'All Departments'
      ? employees
      : employees.filter((emp) => emp.department === selectedDepartment);

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Work Schedule</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handlePreviousWeek}>
              Previous Week
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button variant="outline" onClick={handleNextWeek}>
              Next Week
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  Week of {format(weekStart, 'MMMM d, yyyy')}
                </CardTitle>
                <CardDescription>
                  Schedule work shifts for your team
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={() => setShowShiftForm(true)}>
                  Add Shift
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="schedule" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="schedule">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </TabsTrigger>
                <TabsTrigger value="employees">
                  <Users className="mr-2 h-4 w-4" />
                  Employees
                </TabsTrigger>
                <TabsTrigger value="shifts">
                  <Clock className="mr-2 h-4 w-4" />
                  Shifts
                </TabsTrigger>
              </TabsList>

              <TabsContent value="schedule" className="mt-6">
                <WeeklySchedule
                  weekStart={weekStart}
                  employees={filteredEmployees}
                  onAddShift={handleAddShift}
                />
              </TabsContent>

              <TabsContent value="employees" className="mt-6">
                <EmployeeList
                  employees={filteredEmployees}
                  onSelectEmployee={(id) => setSelectedEmployee(id)}
                />
              </TabsContent>

              <TabsContent value="shifts" className="mt-6">
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium">Shift Summary</h3>
                  <p className="text-muted-foreground">
                    Select an employee to view their scheduled shifts
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {showShiftForm && (
          <ShiftForm
            employees={employees}
            selectedEmployee={selectedEmployee}
            selectedDay={selectedDay}
            onClose={() => setShowShiftForm(false)}
            onSave={(data) => {
              console.log('Saving shift:', data);
              setShowShiftForm(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
