import { createSlice } from "@reduxjs/toolkit";
import { getIncidentById } from "../thunks/incidentThunks";
import { Incident } from "@/types/incident";

interface IncidentDetailsState {
  incident: Incident | null;
  loading: boolean;
  error: string | null;
}

const initialState: IncidentDetailsState = {
  incident: null,
  loading: false,
  error: null,
};

const incidentDetailsSlice = createSlice({
  name: "incidentDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIncidentById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.incident = null;
      })
      .addCase(getIncidentById.fulfilled, (state, action) => {
        state.loading = false;
        state.incident = action.payload;
      })
      .addCase(getIncidentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.incident = null;
      });
  },
});

export default incidentDetailsSlice.reducer;
