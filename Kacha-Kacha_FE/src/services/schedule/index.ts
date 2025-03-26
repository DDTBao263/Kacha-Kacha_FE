import { axiosPrivate } from '../../config/axios';

type ScheduleData = {
    employeeId: number;
    date: string;
    shiftId: number;
}

export const scheduleService = {
    createSchedule: async (schedules: ScheduleData[]) => {
        const jwt_Token = localStorage.getItem('jwtToken');
        return axiosPrivate.post('/api/schedule', schedules, {
            headers: {
                Authorization: `Bearer ${jwt_Token}`,
                'Content-Type': 'application/json',
            },
        });
    },

    getSchedule: async (restaurantId: number, page: number = 0, size: number = 10, weekStartDate: string) => {
        const jwt_Token = localStorage.getItem('jwtToken');
        return axiosPrivate.get(
            `/api/schedule?restaurantId=${restaurantId}&page=${page}&size=${size}&weekStartDate=${weekStartDate}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt_Token}`,
                },
            },
        );
    },
}