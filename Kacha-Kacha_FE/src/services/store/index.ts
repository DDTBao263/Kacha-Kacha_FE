import { axiosPrivate } from '../../config/axios';

export const storeService = {
  getAllStores: async () => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(`/api/restaurants?page=${0}&size=${10}`, {
      headers: {
        Authorization: `Bearer ${jwt_Token}`,
      },
    });
  },
};
