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
import { attendanceService } from '../../services/attendance/index';

interface EditAttendDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export function EditAttendDialog({
  open,
  onOpenChange,
  attendance,
}: EditAttendDialogProps) {
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [breakTime, setBreakTime] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');
  const [shiftId, setShiftId] = useState<number | null>(null);

  useEffect(() => {
    if (attendance) {
      setEmployeeId(attendance.employeeId);
      setCheckIn(attendance.checkIn);
      setCheckOut(attendance.checkOut);
      setBreakTime(attendance.breakTime);
      setNote(attendance.note);
      setDate(attendance.date);
      setShiftId(attendance.shiftId);
    } else {
      setEmployeeId(null);
      setCheckIn('');
      setCheckOut('');
      setBreakTime(null);
      setNote('');
      setDate('');
      setShiftId(null);
    }
  }, [attendance]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || !checkIn || !checkOut || !breakTime || !note || !date || !shiftId) return;

    const updatedAttend = {
      employeeId,
      checkIn,
      checkOut,
      breakTime,
      note,
      date,
      shiftId,
    };

    try {
      await attendanceService.editTodayAttend(attendance?.id || 0, updatedAttend);
      onOpenChange(false);
      window.dispatchEvent(new Event('refreshAttendance'));
    } catch (error) {
      console.error('Failed to update attendance:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Attendance</DialogTitle>
          <DialogDescription>
            Modify attendance details and save changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee ID</Label>
            <Input
              id="employeeId"
              type="number"
              value={employeeId ?? ''}
              onChange={(e) => setEmployeeId(Number(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkIn">Check In</Label>
            <Input
              id="checkIn"
              type="time"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkOut">Check Out</Label>
            <Input
              id="checkOut"
              type="time"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="breakTime">Break Time (minutes)</Label>
            <Input
              id="breakTime"
              type="number"
              value={breakTime ?? ''}
              onChange={(e) => setBreakTime(Number(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note</Label>
            <Input
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shiftId">Shift ID</Label>
            <Input
              id="shiftId"
              type="number"
              value={shiftId ?? ''}
              onChange={(e) => setShiftId(Number(e.target.value))}
              required
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}