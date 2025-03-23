import { axiosPrivate } from '../../config/axios';

interface AttendancePayload {
    employeeId: number;
    checkIn: string | null;
    checkOut: string | null;
    breakTime: number;
    note: string | null;
    date: string;
    shiftId: number;
}

export const attendanceService = {
    getTodayAttendance: (restaurantId: number, page: number, limit: number) => {
        const jwt_Token = localStorage.getItem('jwtToken');
        return axiosPrivate.get(
            `/api/attendance/today/restaurant/${restaurantId}?page=${page}&limit=${limit}&restaurantId=${restaurantId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt_Token}`,
                },
            }
        );
    },

    getTodayAttendanceByEmployeeId: (employeeId: number) => {
        const jwt_Token = localStorage.getItem('jwtToken');
        return axiosPrivate.get(
            `/api/attendance/today/employee/${employeeId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt_Token}`,
                },
            }
        );
    },

    addAttendManual: (attendance: AttendancePayload) => {
        const jwt_Token = localStorage.getItem('jwtToken');
        return axiosPrivate.post(
            '/api/attendance/manual',
            attendance,
            {
                headers: {
                    Authorization: `Bearer ${jwt_Token}`,
                },
            }
        );
    },

    editTodayAttend: (id: number, attendance: AttendancePayload) => {
        const jwt_Token = localStorage.getItem('jwtToken');
        return axiosPrivate.put(
            `/api/attendance/${id}`,
            attendance,
            {
                headers: {
                    Authorization: `Bearer ${jwt_Token}`,
                },
            }
        );
    },
};