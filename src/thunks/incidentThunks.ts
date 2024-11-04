import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Incident } from '@/types/incident';

export const getAllIncidents = createAsyncThunk(
  'incidents/getAll',
  async () => {
    const response = await fetch('/api/incidents');
    return response.json() as Promise<Incident[]>;
  }
); 
