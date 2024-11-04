import { createAsyncThunk } from "@reduxjs/toolkit";

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
