import axiosInsance from "../../axiosInstance";

const useGetEmployer = () => {
  const getEmployer = async (id: number) => {
    try {
      const response = await axiosInsance.get(`/api/v1/employers/${id}`);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { getEmployer };
};

export default useGetEmployer;
