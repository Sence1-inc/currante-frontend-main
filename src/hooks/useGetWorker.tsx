import axiosInsance from "../../axiosInstance";

const useGetWorker = () => {
  const getWorker = async (id: number) => {
    try {
      const response = await axiosInsance.get(`/api/v1/workers/${id}`);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { getWorker };
};

export default useGetWorker;
