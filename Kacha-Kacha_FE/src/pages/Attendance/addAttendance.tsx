import type React from 'react';

import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { attendanceService } from '../../services/attendance/index';

interface AddAttendDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddAttendDialog({
  open,
  onOpenChange,
}: AddAttendDialogProps) {
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [breakTime, setBreakTime] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeId || !checkIn || !checkOut || !breakTime || !note || !date) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError(null);

    const newAttend = {
      employeeId,
      checkIn,
      checkOut,
      breakTime,
      note,
      date,
    };

    try {
      await attendanceService.addAttendManual(newAttend);
      onOpenChange(false);
      setEmployeeId(null);
      setCheckIn('');
      setCheckOut('');
      setBreakTime(null);
      setNote('');
      setDate('');
      window.dispatchEvent(new Event('refreshAttendance'));
    } catch (error) {
      setError('Failed to add attendance. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Attendance</DialogTitle>
          <DialogDescription>
            Create a new attendance record. Please provide the necessary details.
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
              placeholder="Enter employee ID"
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
              placeholder="Enter check-in time"
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
              placeholder="Enter check-out time"
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
              placeholder="Enter break time in minutes"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note</Label>
            <Input
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter note"
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
              placeholder="Enter date"
              required
            />
          </div>

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
              {loading ? 'Adding...' : 'Add Attendance'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}