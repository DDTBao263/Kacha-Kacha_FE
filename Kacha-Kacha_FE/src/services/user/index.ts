import { axiosPrivate } from '../../config/axios';

export const userService = {
  getAllUsers: async (page: number, size: number) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    return axiosPrivate.get(`/api/users?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${jwt_Token}`,
      },
    });
  },

  addUser: async (newUser: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }) => {
    const jwt_Token = localStorage.getItem('jwtToken');
    console.log(newUser);
    return axiosPrivate.post('/api/users', newUser, {
      headers: {
        Authorization: `Bearer ${jwt_Token}`,
        'Content-Type': 'application/json',
      },
    });
  },
};
