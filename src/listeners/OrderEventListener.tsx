import Pusher, { Options } from "pusher-js";
import React, { useEffect } from "react";
import { initializeUser } from "../redux/reducers/UserReducer";
import { useAppDispatch, useAppSelector } from "../redux/store";

const OrderEventListener = ({
  setInfoMessage,
  setIsSnackbarOpen,
}: {
  setInfoMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      encrypted: true,
    } as Options);

    const handleNewOrderCreated = (data: any) => {
      console.log("Data", data);
      dispatch(
        initializeUser({
          ...user,
          orders: [...user.orders, data.order],
          notifications: [
            ...user.notifications,
            {
              user_id: user.id,
              message: `New order request from ${data.order.employer_name}`,
              is_read: false,
            },
          ],
        })
      );
      setInfoMessage(`New order request from ${data.order.employer_name}`);
      setIsSnackbarOpen(true);
    };

    const handleOrderUpdated = (data: any) => {
      const updatedOrders = user.orders.map((order: any) =>
        order.id === data.order.id ? data.order : order
      );

      dispatch(
        initializeUser({
          ...user,
          orders: updatedOrders,
          notifications: [
            ...user.notifications,
            {
              user_id: user.id,
              message: getMessage(data.order),
              is_read: false,
            },
          ],
        })
      );
      setInfoMessage(getMessage(data.order));
      setIsSnackbarOpen(true);
    };

    const getMessage = (order: any) => {
      if (parseInt(order.status) === 3) {
        return `The OTP for order ${order.job_order_code} is ${order.otp}`;
      } else if (parseInt(order.status) === 4) {
        return `Order ${order.job_order_code} has been completed. Please review to release compensation.`;
      } else if (parseInt(order.status) === 2) {
        return `Order ${order.job_order_code} has been accepted by ${order.worker_name}`;
      } else if (parseInt(order.status) === 7) {
        return `Order ${order.job_order_code} payment has been released`;
      }
      return "";
    };

    if (user.logged_in_as === "worker") {
      const workerChannel = `orders.worker.${user.worker_id}`;
      const channel = pusher.subscribe(workerChannel);

      channel.bind("App\\Events\\NewOrderCreated", handleNewOrderCreated);
      channel.bind("App\\Events\\PaymentReleased", handleOrderUpdated);

      // Cleanup function to unsubscribe when component unmounts
      return () => {
        channel.unbind("App\\Events\\NewOrderCreated", handleNewOrderCreated);
        channel.unbind("App\\Events\\PaymentReleased", handleOrderUpdated);
        pusher.unsubscribe(workerChannel);
      };
    }

    if (user.logged_in_as === "employer") {
      const channel = pusher.subscribe(`orders.employer.${user.employer_id}`);
      channel.bind("App\\Events\\OrderUpdated", handleOrderUpdated);

      // Cleanup function to unsubscribe when component unmounts
      return () => {
        channel.unbind();
        pusher.unsubscribe(`orders.employer.${user.employer_id}`);
      };
    }
  }, [user, dispatch]);

  return null;
};

export default OrderEventListener;
