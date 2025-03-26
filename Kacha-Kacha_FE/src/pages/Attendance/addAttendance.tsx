import type React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import * as Dialog from '@radix-ui/react-dialog';
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
import { userService } from '../../services/user';
import { X } from 'lucide-react';

interface AddAttendDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const SHIFTS = [
  { id: 3001, name: 'Morning Shift', startTime: '08:00', endTime: '13:00' },
  { id: 3002, name: 'Afternoon Shift', startTime: '12:30', endTime: '17:30' },
  { id: 3003, name: 'Evening Shift', startTime: '17:30', endTime: '22:30' },
  { id: 3004, name: 'Full Day Shift', startTime: '10:30', endTime: '19:30' },
];

export function AddAttendDialog({
  open,
  onOpenChange,
  onSuccess
}: AddAttendDialogProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [storeManagerId, setStoreManagerId] = useState<number>(0);
  const [employeeId, setEmployeeId] = useState<string>('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [breakTime, setBreakTime] = useState<number>(0);
  const [note, setNote] = useState('');
  const [shiftId, setShiftId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Format date to YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (user?.id) {
      setStoreManagerId(user.id);
      console.log('Setting storeManagerId from user:', user.id);
    }
  }, [user]);

  const resetForm = () => {
    setEmployeeId('');
    setCheckIn('');
    setCheckOut('');
    setBreakTime(0);
    setNote('');
    setShiftId('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');

    if (!employeeId || !shiftId || !storeManagerId) {
      console.log('Validation failed:', { employeeId, shiftId, storeManagerId });
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError(null);

    // Format datetime to ISO string with timezone
    const formatDateTime = (date: string, time: string | null) => {
      if (!time) return null;
      const [hours, minutes] = time.split(':');
      const dateObj = new Date(date);
      dateObj.setHours(parseInt(hours), parseInt(minutes), 0);
      const isoString = dateObj.toISOString();
      console.log('Formatted datetime:', { original: { date, time }, formatted: isoString });
      return isoString;
    };

    const baseDate = new Date(today);
    const formattedDate = baseDate.toISOString();
    console.log('Base date:', { today, formattedDate });

    const newAttend = {
      employeeId: parseInt(employeeId),
      checkIn: checkIn ? formatDateTime(today, checkIn) : null,
      checkOut: checkOut ? formatDateTime(today, checkOut) : null,
      breakTime: breakTime || 0,
      note: note || "string",
      date: formattedDate,
      shiftId: parseInt(shiftId),
      storeManagerId: parseInt(storeManagerId.toString())
    };

    console.log('Request Data to be sent:', JSON.stringify(newAttend, null, 2));

    try {
      console.log('Sending request to API...');
      const response = await attendanceService.addAttendManual(newAttend);
      console.log('API Response:', response);
      console.log('Response data:', response.data);

      await alert.success('Successfully added new attendance');
      onOpenChange(false);
      resetForm();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.log('Request that caused error:', newAttend);
      console.error('Full error object:', error);
      console.error('Error response:', error.response);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });

      const errorMessage = error.response?.data?.message || 'Failed to add. Please try again.';
      setError(errorMessage);
      await alert.error(errorMessage);
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
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg w-full max-w-[500px] max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Add New Attendance
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </Dialog.Close>
          </div>

          <Dialog.Description className="text-sm text-gray-500 mb-4">
            Create a new attendance record. Please fill in all required information.
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="Enter employee ID"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shift">Work Shift</Label>
                <Select value={shiftId} onValueChange={handleShiftChange}>
                  <SelectTrigger id="shift">
                    <SelectValue placeholder="Select work shift" />
                  </SelectTrigger>
                  <SelectContent>
                    {SHIFTS.map((shift) => (
                      <SelectItem key={shift.id} value={shift.id.toString()}>
                        {shift.name} ({shift.startTime} - {shift.endTime})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkIn">Check-in Time</Label>
                <Input
                  id="checkIn"
                  type="time"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder="Enter check-in time"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkOut">Check-out Time</Label>
                <Input
                  id="checkOut"
                  type="time"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  placeholder="Enter check-out time"
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
                  placeholder="Enter break time"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Note</Label>
                <Input
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Enter note"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={today}
                  disabled
                  className="bg-gray-100"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add New'}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}