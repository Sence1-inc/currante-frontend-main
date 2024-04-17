import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../type";

const initialState: User = {
  id: null,
  email: "",
  role: {
    role_name: "",
    role_details: "",
  },
  orders: [
    {
      created_at: "",
      job_order_start_date: "",
      worker_id: null,
      employer_id: null,
      employer_name: "",
      worker_job_subtype: {
        worker_id: null,
        job_subtype: {
          job_type_id: null,
          job_subtype_id: 0,
          job_type: "",
          job_name: "",
          unit: "",
          job_unit_price: 0,
          active_flg: false,
        },
        job_unit_price: null,
      },
      quantity: null,
      total: null,
      status: "",
      job_order_code: "",
    },
  ],
  description: "",
  schedule: "",
  uuid: "",
  job_subtypes: [
    {
      job_type_id: null,
      job_subtype_id: 0,
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
  addresses: [
    {
      province: "",
      city: "",
      barangay: "",
      street: "",
    },
  ],
  user_photos: [{ profile_photo: "", id_photo: "" }],
  reviews: [
    {
      id: null,
      overall_rating: null,
      category_flg: null,
      feedback: "",
      order: {
        created_at: "",
        job_order_start_date: "",
        worker_id: null,
        employer_id: null,
        employer_name: "",
        worker_job_subtype: {
          worker_id: null,
          job_subtype: {
            job_type_id: null,
            job_subtype_id: 0,
            job_type: "",
            job_name: "",
            unit: "",
            job_unit_price: 0,
            active_flg: false,
          },
          job_unit_price: null,
        },
        quantity: null,
        total: null,
        status: "",
        job_order_code: "",
      },
      category_rating: [
        {
          category: {
            name: "",
          },
          rating: null,
        },
      ],
    },
  ],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { initializeUser } = userSlice.actions;

export default userSlice.reducer;
