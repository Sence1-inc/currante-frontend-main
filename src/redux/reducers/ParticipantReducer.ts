import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const participantSlice = createSlice({
  name: "participant",
  initialState: 0,
  reducers: {
    initializeParticipant: (_state, action: PayloadAction<number>) => {
      return action.payload;
    },
  },
});

export const { initializeParticipant } = participantSlice.actions;

export default participantSlice.reducer;
