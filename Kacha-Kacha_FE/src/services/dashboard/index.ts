import { axiosPrivate } from '../../config/axios';

export const dashboardService = {

  //STORE MANAGER 
  getSMDash: async (
    restaurantId: number
  ) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(
      `/api/store-managers/dashboard?restaurantId=${restaurantId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt_Token}`,
        },
      },
    );
  },

  getCoverage: async (
    restaurantId: number
  ) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(
      `/api/store-managers/staff-coverage?restaurantId=${restaurantId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt_Token}`,
        },
      },
    );
  },

  //ADMIN
  getAccountsCount: async (
    month: number,
    year: number
  ) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(
      `/api/restaurant-managers/accounts/count?month=${month}&year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${jwt_Token}`,
        },
      },
    );
  },

  getRestaurantsCount: async (
    month: number,
    year: number
  ) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(
      `/api/restaurant-managers/restaurants/count?month=${month}&year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${jwt_Token}`,
        },
      },
    );
  },

  getRestaurantsStatusCount: async () => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(
      `/api/restaurant-managers/restaurants/status/count`,
      {
        headers: {
          Authorization: `Bearer ${jwt_Token}`,
        },
      },
    );
  },

  getGrowthData: async (year: number) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(
      `/api/restaurant-managers/growth?year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${jwt_Token}`,
        },
      },
    );
  },


}