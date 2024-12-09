import axiosInstance from "../../axiosInstance";

const useGetUser = () => {
  const getUser = async (id: number, type: string) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/users/${id}?type=${type}`
      );
      return data;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return { getUser };
};

export default useGetUser;
