import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const participantSlice = createSlice({
  name: "participant",
  initialState: 0,
  reducers: {
    initializeParticipant: (state, action: PayloadAction<number>) => {
      console.log(state);
      return action.payload;
    },
  },
});

export const { initializeParticipant } = participantSlice.actions;

export default participantSlice.reducer;
