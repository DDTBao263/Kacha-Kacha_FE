import { axiosPrivate } from '../../config/axios';

export const storeService = {
  getAllStores: async (page: number, size: number, keyword: string) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(
      `/api/restaurants?page=${page}&size=${size}&keyword=${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${jwt_Token}`,
        },
      },
    );
  },

  getStoreById: async (storeId: number | string) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(`/api/restaurants/${storeId}`, {
      headers: {
        Authorization: `Bearer ${jwt_Token}`,
      },
    });
  },

  getStoresBySearch: async (keyword: string) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(`/api/restaurants?keyword=${keyword}`, {
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

  // updateStore: async(updatedStore:{
  //   storeId: store.storeId,
  //     location,
  //     phoneNumber,
  //     status,
  //     storeManagerId: storeManager,
  // }),
};
