import { useState, useCallback } from 'react';
import { addDays, format, startOfWeek, isBefore, startOfDay } from 'date-fns';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { WeeklySchedule } from '../../components/PageUI/Schedule/Weekly';
import { EmployeeList } from '../../components/PageUI/Schedule/EmployeeList';
import { ShiftForm } from '../../components/PageUI/Schedule/ShiftForm';

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [showShiftForm, setShowShiftForm] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start week on Monday

  const isDateValid = useCallback((date: Date) => {
    const today = startOfDay(new Date());
    return !isBefore(date, today);
  }, []);

  const handlePreviousWeek = useCallback(() => {
    setCurrentDate(addDays(currentDate, -7));
  }, [currentDate]);

  const handleNextWeek = useCallback(() => {
    setCurrentDate(addDays(currentDate, 7));
  }, [currentDate]);

  const handleAddShift = useCallback((day: Date, employeeId: number) => {
    if (!isDateValid(day)) {
      alert('Cannot add schedule for past or current date');
      return;
    }
    setSelectedDay(day);
    setSelectedEmployee(employeeId);
    setShowShiftForm(true);
  }, [isDateValid]);

  const handleSaveShift = useCallback((data: any) => {
    console.log('Saving shift:', data);
    setShowShiftForm(false);
    setRefreshKey(prev => prev + 1);
  }, []);

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
              This Week
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
                <Button onClick={() => setShowShiftForm(true)}>
                  Add Shift
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="schedule" className="w-full">
              <TabsContent value="schedule" className="mt-6">
                <WeeklySchedule
                  weekStart={weekStart}
                  onAddShift={handleAddShift}
                  key={refreshKey}
                />
              </TabsContent>

              <TabsContent value="employees" className="mt-6">
                <EmployeeList
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
            selectedEmployee={selectedEmployee}
            selectedDay={selectedDay}
            onClose={() => setShowShiftForm(false)}
            onSave={handleSaveShift}
          />
        )}
      </div>
    </div>
  );
}
