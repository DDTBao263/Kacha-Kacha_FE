import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: {
    jwt_token: string;
    id: string;
    userType: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string | null;
  } | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;