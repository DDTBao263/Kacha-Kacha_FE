import { axiosPrivate } from '../../config/axios';

export const shiftService = {
  getTimeKeeping: async (id: number) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(`/api/shift/user-in-month/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt_Token},`,
      },
    });
  },
};
