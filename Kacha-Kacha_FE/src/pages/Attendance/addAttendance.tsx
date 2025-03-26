import type React from 'react';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
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
import { userService } from '../../services/user/index';

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
  const [employeeId, setEmployeeId] = useState<string>('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [breakTime, setBreakTime] = useState<number>(0);
  const [note, setNote] = useState('');
  const [shiftId, setShiftId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [storeManagerId, setStoreManagerId] = useState<number>(0);

  // Format date to YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  // Lấy storeManagerId khi component mount hoặc khi user thay đổi
  useEffect(() => {
    const getStoreManagerId = async () => {
      if (!user?.id) {
        console.log('Không có thông tin user từ Redux store');
        return;
      }

      try {
        console.log('User ID từ Redux:', user.id);
        const response = await userService.getUserByID(user.id, 'STORE_MANAGER');
        console.log('Response từ API getUserByID:', response);

        // Dựa trên cấu trúc dữ liệu từ StoreDash.tsx
        if (response?.data?.data) {
          console.log('Store Manager Data:', response.data.data);
          setStoreManagerId(response.data.data.userId || 0);
          console.log('Đã set storeManagerId:', response.data.data.userId || 0);
        } else {
          console.log('Không tìm thấy data trong response');
        }
      } catch (error) {
        console.error('Failed to get store manager id:', error);
      }
    };

    getStoreManagerId();
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

    if (!employeeId || !shiftId) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc.');
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

    const newAttend = {
      employeeId: parseInt(employeeId),
      checkIn: checkIn ? formatDateTime(today, checkIn) : null,
      checkOut: checkOut ? formatDateTime(today, checkOut) : null,
      breakTime: breakTime || 0,
      note: note || null,
      date: new Date(today).toISOString(),
      shiftId: parseInt(shiftId),
      storeManagerId: storeManagerId || 0
    };

    console.log('Giá trị storeManagerId trước khi gửi:', storeManagerId);
    console.log('Dữ liệu attendance sẽ được gửi:', newAttend);

    try {
      await attendanceService.addAttendManual(newAttend);
      await alert.success('Add success');
      onOpenChange(false);
      resetForm();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setError('Try again');
      await alert.error('Please try again');
      console.error(error);
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
          <DialogTitle>Add New Attendance</DialogTitle>
          <DialogDescription>
            Create a new attendance record. Please fill in all required information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
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
              <SelectTrigger>
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
              {loading ? 'Adding...' : 'Add new'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}