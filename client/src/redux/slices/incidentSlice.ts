import { createSlice } from "@reduxjs/toolkit";
import { getAllIncidents } from "@/user/userThunks";

interface Incident {
  type: string;
  description: string;
  location: string;
  images?: string[];
  status: string;
  createdAt: string;
}

interface IncidentState {
  incidents: Incident[];
  loading: boolean;
  error: string | null;
}

const initialState: IncidentState = {
  incidents: [],
  loading: false,
  error: null,
};

const incidentSlice = createSlice({
  name: "incidents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllIncidents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllIncidents.fulfilled, (state, action) => {
        state.loading = false;
        state.incidents = action.payload;
      })
      .addCase(getAllIncidents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default incidentSlice.reducer; 
