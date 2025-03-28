export interface Attendance {
    id: number;
    employeeId: number;
    avatar: string;
    email: string;
    checkIn: string | null;
    checkOut: string | null;
    checkInTime: string | null;
    checkOutTime: string | null;
    breakTime: number;
    status: string;
    note: string;
    date: string;
    displayDate?: string;
    shiftId: number;
    workShift?: string;
}
