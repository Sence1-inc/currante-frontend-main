import axiosInsance from "../../axiosInstance";
import { initializeUser } from "../redux/reducers/UserReducer";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Order } from "../redux/type";

const useGetOrders = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const getOrders = async () => {
    try {
      const response = await axiosInsance.get(`/api/v1/orders`);
      if (response.data) {
        const currentOrderIds = new Set(user.orders.map((order) => order.id));
        const responseOrderIds = response.data.orders.map(
          (order: Order) => order.id
        );

        const newOrderIds = responseOrderIds.filter(
          (id: number) => !currentOrderIds.has(id)
        );

        const newOrderIdsSet = new Set(newOrderIds);

        const newOrders = response.data.orders.filter((order: Order) =>
          newOrderIdsSet.has(order.id)
        );

        if (newOrders.length > 0) {
          dispatch(
            initializeUser({
              ...user,
              orders: [...newOrders, ...user.orders],
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { getOrders };
};

export default useGetOrders;
