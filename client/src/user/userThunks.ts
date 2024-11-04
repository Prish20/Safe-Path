// userThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userActions } from "./userSlice";

export const registerUser = createAsyncThunk(
  "user/register",
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
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to register user");
      }

      const data = await response.json();
      dispatch(userActions.signUpSuccess());
      return data;
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(userActions.signUpFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (
    { email, otp }: { email: string; otp: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(userActions.verifyOtpStart());
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to verify OTP");
      }

      const data = await response.json();
      dispatch(userActions.verifyOtpSuccess());
      dispatch(userActions.signInSuccess(data.user));
      return data;
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(userActions.verifyOtpFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const signInUser = createAsyncThunk(
  "user/signIn",
  async (
    userData: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(userActions.signInStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign in");
      }

      const data = await response.json();
      dispatch(userActions.signInSuccess(data.user));
      return { user: data.user, isVerified: data.user.isVerified };
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  "user/requestPasswordReset",
  async (email: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(userActions.requestPasswordResetStart());
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to request password reset"
        );
      }

      const data = await response.json();
      dispatch(userActions.requestPasswordResetSuccess());
      return data;
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(userActions.requestPasswordResetFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (
    resetData: { password: string; token: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(userActions.resetPasswordStart());
      const response = await fetch(
        `/api/auth/reset-password/${resetData.token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: resetData.password }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to reset password");
      }

      dispatch(userActions.resetPasswordSuccess());
      return responseData;
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(userActions.resetPasswordFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const handleLogout = createAsyncThunk(
  "user/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(userActions.signOutStart());
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign out");
      }

      dispatch(userActions.signOutSuccess());
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(userActions.signOutFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const getAllIncidents = createAsyncThunk(
  "user/getAllIncidents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/incident", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch incidents");
      }

      const data = await response.json();
      return data.incidents;
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);
