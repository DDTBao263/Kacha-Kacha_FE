import { axiosPrivate } from '../../config/axios';

export const timeService = {

    //Lấy thời gian hiện tại 
    getTime: async () => {
        const jwt_Token = localStorage.getItem('jwtToken');
        return axiosPrivate.get(`/api/clock-hour`, {
            headers: {
                Authorization: `Bearer ${jwt_Token}`,
                'Content-Type': 'application/json',
            },
        });
    }
}