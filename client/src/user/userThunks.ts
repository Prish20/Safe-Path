// userThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosForApiCall } from '@/lib/axios';
import { userActions } from './userSlice';
import { AxiosError } from 'axios';

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
      const response = await axiosForApiCall.post('/auth/signup', userData);
      dispatch(userActions.signUpSuccess());
      return response.data;
    } catch (error: unknown) {
      let errorMessage = 'User already exists';
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.error || error.message || errorMessage;
        
        dispatch(userActions.signUpFailure(errorMessage));
      } else {
        dispatch(userActions.signUpFailure(errorMessage));
      }
      return rejectWithValue(errorMessage);
    }
  }
);
