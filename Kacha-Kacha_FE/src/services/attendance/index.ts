import { axiosPrivate } from '../../config/axios';

export const attendanceService = {
    // lấy danh sách điểm danh trong ngày hôm nay của nhà hàng 
    getTodayAttend: async (
        page: number,
        limit: number,
        restaurantId: number,
        keyword?: string
    ) => {
        const jwt_Token = localStorage.getItem('jwtToken');
        const url = `/api/attendance?page=${page}&limit=${limit}&restaurantId=${restaurantId}` +
            (keyword ? `&search=${encodeURIComponent(keyword)}` : '');

        return axiosPrivate.get(url, {
            headers: { Authorization: `Bearer ${jwt_Token}` },
        });
    },


    //Tạo điểm danh
    addAttendManual: async (newAttend: {
        employeeId: number,
        checkIn: string,
        checkOut: string,
        breakTime: number,
        note: string,
        date: string,
      }) => {
        const jwt_Token = localStorage.getItem('jwtToken');
        return axiosPrivate.post(`/api/attendance`, newAttend, {
          headers: {
            Authorization: `Bearer ${jwt_Token}`,
            'Content-Type': 'application/json',
          },
        });
    },


    //Update điểm danh hôm nay 
    editTodayAttend: async (id: number, updatedAttend: {
        employeeId: number,
        checkIn: string,
        checkOut: string,
        breakTime: number,
        note: string,
        date: string,
        shiftId: number,
    }) => {
        const jwt_Token = localStorage.getItem('jwtToken');
        return axiosPrivate.put(`/api/attendance/today/${id}`, updatedAttend, {
            headers: {
                Authorization: `Bearer ${jwt_Token}`,
                'Content-Type': 'application/json',
            },
        });
    },
   





    



}