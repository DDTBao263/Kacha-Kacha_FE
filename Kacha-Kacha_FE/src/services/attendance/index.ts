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






    //Update điểm danh hôm nay 

   





    



}