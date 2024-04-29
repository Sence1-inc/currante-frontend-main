import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Worker } from "../type";

const initialState: Worker[] = [];

export const workersSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {
    initializeWorkers: (state, action: PayloadAction<Worker[]>) => {
      return action.payload;
    },
  },
});
// eslint-disable-next-line no-unused-vars
export const { initializeWorkers } = workersSlice.actions;

export default workersSlice.reducer;
