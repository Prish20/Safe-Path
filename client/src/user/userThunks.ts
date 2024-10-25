// userThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from './userSlice';

export const registerUser = createAsyncThunk(
  'user/register',
  async (
    userData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(userActions.signUpStart());
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register user');
      }

      const data = await response.json();
      dispatch(userActions.signUpSuccess());
      return data;
    } catch (error) {
      let errorMessage = 'An unexpected error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(userActions.signUpFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'user/verifyOtp',
  async ({ email, otp }: { email: string; otp: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(userActions.verifyOtpStart());
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to verify OTP');
      }

      const data = await response.json();
      dispatch(userActions.verifyOtpSuccess());
      dispatch(userActions.signInSuccess(data.user));
      return data;
    } catch (error) {
      let errorMessage = 'An unexpected error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(userActions.verifyOtpFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);
