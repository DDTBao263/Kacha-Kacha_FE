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
};
