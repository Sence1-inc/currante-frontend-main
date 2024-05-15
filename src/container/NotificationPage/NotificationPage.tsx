import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { initializeUser } from "../../redux/reducers/UserReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Notification } from "../../redux/type";

const NotificationPage = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [notifications, setNotifications] = useState<Notification[] | []>([]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/notifications");

        if (response.data) {
          setNotifications(response.data);
          dispatch(initializeUser({ ...user, notifications: response.data }));
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    getNotifications();
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      const response = await axiosInstance.patch(`/api/v1/notifications/${id}`);
      if (response.status === 200) {
        const updatedNotifications = [...user.notifications].map(
          (notification) => {
            if (notification.id === id) {
              return {
                ...notification,
                is_read: response.data.notification.is_read, // Assuming the response contains the updated notification data
              };
            }
            return notification;
          }
        );

        setNotifications([...notifications, response.data.notification]);
        dispatch(
          initializeUser({
            ...user,
            notifications: updatedNotifications,
          })
        );
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <Box sx={{ margin: "20px" }}>
      {user.notifications.length > 0 &&
        user.notifications?.map((notification: Notification, index: number) => {
          console.log(notification.message);
          return (
            <Card key={index} sx={{ margin: "20px" }}>
              <CardContent>
                <Typography>{notification.message}</Typography>
              </CardContent>
              {!notification.is_read && (
                <CardActions>
                  <Button
                    onClick={() => handleMarkAsRead(Number(notification.id))}
                  >
                    Mark as read
                  </Button>
                </CardActions>
              )}
            </Card>
          );
        })}
    </Box>
  );
};

export default NotificationPage;
