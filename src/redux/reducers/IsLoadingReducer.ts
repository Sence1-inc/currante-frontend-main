import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const isLoadingSlice = createSlice({
  name: "isLoading",
  initialState: false,
  reducers: {
    initializeIsLoading: (_state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const { initializeIsLoading } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;
