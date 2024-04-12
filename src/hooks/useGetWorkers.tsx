import axiosInsance from "../../axiosInstance";
import { initializeWorkers } from "../redux/reducers/WorkersReducer";
import { useAppDispatch } from "../redux/store";

const useGetWorkers = () => {
  const dispatch = useAppDispatch();
  const getWorkers = async () => {
    try {
      const response = await axiosInsance.get("/api/v1/workers");
      dispatch(initializeWorkers(response.data));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return { getWorkers };
};

export default useGetWorkers;
