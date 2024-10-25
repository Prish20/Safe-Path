import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/types/user';

export interface UserState {
  currentUser: null | User;
  isAuthenticated: boolean;
  error: null | object | string;
  isLoading: boolean;
  isVerified: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isVerified: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    signUpStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signUpSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    signUpFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    signOutStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    signOutFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    verifyOtpStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    verifyOtpSuccess: (state) => {
      state.isLoading = false;
      state.isVerified = true;
      state.error = null;
    },
    verifyOtpFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
