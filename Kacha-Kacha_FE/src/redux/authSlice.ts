import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: {
    jwt_token: string;
    id: number;
    userType: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string | null;
  } | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.isLoggedIn = false;
      state.error = null;
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoggedIn = false;
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = initialState.user;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
