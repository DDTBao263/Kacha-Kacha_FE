import { axiosPrivate } from '../../config/axios';

export const employeeService = {
  getEmployee: async (page: number, size: number, keyword: string) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(
      `/api/employees?page=${page}&limit=${size}&search=${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${jwt_Token},`,
        },
      },
    );
  },

  getDetailEmployee: async (id: number) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(`/api/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt_Token},`,
      },
    });
  },

  getEmpByRestaurantId: async (restaurantId: number) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(`/api/employees?restaurantId=${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${jwt_Token},`,
      },
    });
  },

  AddEmployee: async (newEmployee: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.post('/api/employees', newEmployee, {
      headers: {
        Authorization: `Bearer ${jwt_Token}`,
        'Content-Type': 'application/json',
      },
    });
  },
    
  UpdateEmpById: async (data: any) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.put(`/api/employees/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${jwt_Token},`,
      },
    });
  },
};
