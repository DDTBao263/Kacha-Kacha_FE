import { axiosPrivate } from '../../config/axios';

export const storeService = {
  getAllStores: async (page: number, size: number) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(`/api/restaurants?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${jwt_Token}`,
      },
    });
  },

  addStore: async (newStore: {
    location: string;
    phoneNumber: string;
    status: string;
  }) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.post('/api/restaurants', newStore, {
      headers: {
        Authorization: `Bearer ${jwt_Token}`,
        'Content-Type': 'application/json',
      },
    });
  },
};
