import { axiosPrivate } from '../../config/axios';

interface AttendancePayload {
    employeeId: number;
    checkIn: string | null;
    checkOut: string | null;
    breakTime: number;
    note: string | null;
    date: string;
    shiftId: number;
    storeManagerId: number;
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

    addAttendManual: async (attendance: AttendancePayload) => {
        const jwt_Token = localStorage.getItem('jwtToken');
        console.log('Making API call with:', {
            url: '/api/attendance',
            data: attendance,
            headers: {
                Authorization: `Bearer ${jwt_Token}`,
                'Content-Type': 'application/json'
            }
        });

        try {
            const response = await axiosPrivate.post(
                '/api/attendance',
                attendance,
                {
                    headers: {
                        Authorization: `Bearer ${jwt_Token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('API Response:', response);
            return response;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
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