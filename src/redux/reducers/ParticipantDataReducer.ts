import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Participant } from "../type";

const initialState: Participant = {
  id: null,
  id_photo: "",
  is_identification_verified: false,
  email: "",
  role: {
    role_name: "",
    role_details: "",
  },
  overall_rating: null,
  description: "",
  job_subtypes: [
    {
      job_type_id: null,
      job_subtype_id: 0,
      worker_job_subtype_id: 0,
      job_type: "",
      job_name: "",
      unit: "",
      job_unit_price: 0,
      active_flg: false,
    },
  ],
  areas: [],
  first_name: "",
  middle_name: "",
  last_name: "",
  suffix: "",
  birthday: "",
  gender: "",
  phone_number: "",
  addresses: [],
};

export const participantDataSlice = createSlice({
  name: "participantData",
  initialState,
  reducers: {
    initializeParticipantData: (_state, action: PayloadAction<Participant>) => {
      return action.payload;
    },
  },
});

export const { initializeParticipantData } = participantDataSlice.actions;

export default participantDataSlice.reducer;
