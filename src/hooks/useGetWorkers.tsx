import React from "react";
import axiosInsance from "../../axiosInstance";
import { initializeWorkers } from "../redux/reducers/WorkersReducer";
import { useAppDispatch } from "../redux/store";

const useGetWorkers = () => {
  const dispatch = useAppDispatch();
  const getWorkers = async (parameters?: string) => {
    try {
      const query = parameters ? `?${parameters}` : "";
      const response = await axiosInsance.get(`/api/v1/workers?${query}`);
      if (response.data) {
        dispatch(initializeWorkers(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { getWorkers };
};

export default useGetWorkers;
