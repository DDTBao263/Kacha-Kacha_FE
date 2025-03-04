import { axiosClient } from '../../config/axios';
// import { getAuth } from 'firebase/auth';
export const authService = {
  loginWithFirebase: async (idToken: string) => {
    try {
      const response = await axiosClient.post('/login/google', { idToken });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
};
