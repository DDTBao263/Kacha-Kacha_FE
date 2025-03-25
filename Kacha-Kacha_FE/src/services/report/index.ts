import { axiosPrivate } from '../../config/axios';

export const reportService = {
    exportReport: async (restaurantId: number, month: number) => {
        const jwt_Token = localStorage.getItem('jwtToken');
        return axiosPrivate.get(`/api/reports?restaurantId=${restaurantId}&month=${month}`, {
            headers: {
                Authorization: `Bearer ${jwt_Token}`,
            }
        });
    }
}