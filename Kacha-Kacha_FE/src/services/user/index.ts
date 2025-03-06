import { axiosPrivate } from '../../config/axios';

export const userService = {
  async getAllUsers() {
    return axiosPrivate.get('/api/users');
  },
};
