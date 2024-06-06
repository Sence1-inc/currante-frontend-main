import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../type";

const initialState: Order = {
  id: null,
  created_at: "",
  job_order_start_date: "",
  worker_arrived_date: "",
  job_order_completed_date: "",
  worker_id: null,
  worker_user_id: null,
  employer_id: null,
  employer_user_id: null,
  employer_address: "",
  worker_name: "",
  employer_name: "",
  worker_job_subtype: {
    worker_id: null,
    job_subtype: {
      job_type_id: null,
      job_subtype_id: 0,
      worker_job_subtype_id: 0,
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
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    initializeOrder: (state, action: PayloadAction<Order>) => {
      console.log(state);
      return action.payload;
    },
  },
});

export const { initializeOrder } = orderSlice.actions;

export default orderSlice.reducer;
