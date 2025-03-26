import type React from 'react';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { alert } from '../../utils/Alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { attendanceService } from '../../services/attendance/index';

interface EditAttendDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  attendance: {
    id: number;
    employeeId: number;
    checkIn: string;
    checkOut: string;
    breakTime: number;
    note: string;
    date: string;
    shiftId: number;
  } | null;
}

const SHIFTS = [
  { id: 3001, name: 'Morning Shift', startTime: '08:00', endTime: '13:00' },
  { id: 3002, name: 'Afternoon Shift', startTime: '12:30', endTime: '17:30' },
  { id: 3003, name: 'Evening Shift', startTime: '17:30', endTime: '22:30' },
  { id: 3004, name: 'Full Day Shift', startTime: '10:30', endTime: '19:30' },
];

export function EditAttendDialog({
  open,
  onOpenChange,
  onSuccess,
  attendance,
}: EditAttendDialogProps) {
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [breakTime, setBreakTime] = useState<number>(0);
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');
  const [shiftId, setShiftId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (attendance) {
      setEmployeeId(attendance.employeeId);
      setCheckIn(attendance.checkIn || '');
      setCheckOut(attendance.checkOut || '');
      setBreakTime(attendance.breakTime || 0);
      setNote(attendance.note || '');
      setDate(attendance.date || new Date().toISOString().split('T')[0]);
      setShiftId(attendance.shiftId?.toString() || '');

      // Log để debug
      console.log('Attendance data received:', attendance);
    } else {
      setEmployeeId(null);
      setCheckIn('');
      setCheckOut('');
      setBreakTime(0);
      setNote('');
      setDate(new Date().toISOString().split('T')[0]);
      setShiftId('');
    }
  }, [attendance]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || !date) {
      setError('Please fill in all required information.');
      return;
    }

    setLoading(true);
    setError(null);

    // Format datetime to ISO string
    const formatDateTime = (date: string, time: string | null) => {
      if (!time) return null;
      const [hours, minutes] = time.split(':');
      const dateObj = new Date(date);
      dateObj.setHours(parseInt(hours), parseInt(minutes), 0);
      return dateObj.toISOString();
    };

    const updatedAttend = {
      employeeId,
      checkIn: checkIn ? formatDateTime(date, checkIn) : null,
      checkOut: checkOut ? formatDateTime(date, checkOut) : null,
      breakTime: breakTime || 0,
      note: note || null,
      date: new Date(date).toISOString(),
      shiftId: attendance?.shiftId || 3001 // Use existing shiftId or default to 3001
    };

    try {
      await attendanceService.editTodayAttend(attendance?.id || 0, updatedAttend);
      await alert.success('Update attendance successfully');
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setError('Failed to update attendance. Please try again.');
      await alert.error('Failed to update attendance. Please try again');
      console.error('Failed to update attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShiftChange = (value: string) => {
    setShiftId(value);
    const shift = SHIFTS.find(s => s.id.toString() === value);
    if (shift) {
      setCheckIn(shift.startTime);
      setCheckOut(shift.endTime);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Attendance</DialogTitle>
          <DialogDescription>
            Edit attendance information. Please fill in all required information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee ID</Label>
            <Input
              id="employeeId"
              type="number"
              value={employeeId ?? ''}
              disabled
              className="bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkIn">Check-in Time</Label>
            <Input
              id="checkIn"
              type="time"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkOut">Check-out Time</Label>
            <Input
              id="checkOut"
              type="time"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="breakTime">Break Time (minutes)</Label>
            <Input
              id="breakTime"
              type="number"
              min="0"
              value={breakTime}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0) {
                  setBreakTime(value);
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note</Label>
            <Input
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              disabled
              className="bg-gray-100"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}