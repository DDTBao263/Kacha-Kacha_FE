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
}