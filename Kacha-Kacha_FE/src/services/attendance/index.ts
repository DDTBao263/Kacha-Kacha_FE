import { axiosPrivate } from '../../config/axios';

interface AttendancePayload {
    employeeId: number;
    checkIn: string | null;
    checkOut: string | null;
    breakTime: number;
    note: string | null;
    date: string;
    shiftId: number;
    storeManagerId?: number;
}

export const attendanceService = {
    getTodayAttendance: (restaurantId: number, page: number, limit: number) => {
        const jwt_Token = localStorage.getItem('jwtToken');
        return axiosPrivate.get(
            `/api/attendance?page=${page}&limit=${limit}&restaurantId=${restaurantId}`,
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
            '/api/attendance',
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

    getShift: (id: number) => {
        const jwt_Token = localStorage.getItem('jwtToken');
        return axiosPrivate.get(`/api/shift/today/employee/${id}`, {
            headers: {
                Authorization: `Bearer ${jwt_Token}`,
            },
        });
    },



};