import Pusher, { Options } from "pusher-js";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ChatRoom from "./components/Chat/ChatRoom";
import CustomSnackbar from "./components/CustomSnackbar/CustomSnackbar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import ChatPage from "./container/ChatPage/ChatPage";
import EmployerDashboard from "./container/Dashboard/EmployerDashboard";
import ForgotPasswordPage from "./container/ForgotPasswordPage/ForgotPasswordPage";
import ForgotPasswordVerifyPage from "./container/ForgotPasswordPage/ForgotPasswordVerifyPage";
import NewPasswordPage from "./container/ForgotPasswordPage/NewPasswordPage";
import HomePage from "./container/HomePage/HomePage";
import JobListPage from "./container/JobListPage/JobListPage";
import NotificationPage from "./container/NotificationPage/NotificationPage";
import PaymentPage from "./container/PaymentPage/PaymentPage";
import PaymentSuccessPage from "./container/PaymentPage/PaymentSuccessPage";
import ProfilePage from "./container/ProfilePage/ProfilePage";
import ProfileViewPage from "./container/ProfileViewPage/ProfileViewPage";
import ReviewPage from "./container/ReviewPage/ReviewPage";
import SearchWorkerPage from "./container/SearchPage/SearchWorkerPage";
import SignInPage from "./container/SignInPage/SignInPage";
import SignUpPage from "./container/SignUpPage/SignUpPage";
import SignUpComplete from "./container/SignUpVerifyPage/SignUpComplete";
import SignUpVerifyPage from "./container/SignUpVerifyPage/SignUpVerifyPage";
import TestPage from "./container/TestPage/TestPage";
import { initializeUser } from "./redux/reducers/UserReducer";
import { useAppDispatch, useAppSelector } from "./redux/store";

const App = () => {
  const isAuthenticated = useAppSelector((state) => state.isAuthenticated);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [infoMessage, setInfoMessage] = useState<string>("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      encrypted: true,
    } as Options);

    const channel = pusher.subscribe(`orders.worker.${user.worker_id}`);

    channel.bind("App\\Events\\NewOrderCreated", function (data: any) {
      console.log("Data", data);
      dispatch(
        initializeUser({ ...user, orders: [...user.orders, data.order] })
      );
      setInfoMessage(`New order request from ${data.order.employer_name}`);
      setIsSnackbarOpen(true);

      dispatch(
        initializeUser({
          ...user,
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
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      channel.unbind();
      pusher.unsubscribe(`orders.worker.${user.worker_id}`);
    };
  }, []);

  return (
    <>
      <CustomSnackbar
        infoMessage={infoMessage}
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => {
          setIsSnackbarOpen(value);
          if (!value) {
            setInfoMessage("");
          }
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/start" element={<TestPage />} />
        <Route
          path="/jobs"
          element={<PrivateRoute component={JobListPage} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute component={ProfilePage} />}
        />
        <Route
          path="/services"
          element={
            isAuthenticated ? (
              <PrivateRoute component={EmployerDashboard} />
            ) : (
              <PublicRoute component={EmployerDashboard} />
            )
          }
        />
        <Route
          path="/notifications"
          element={<PrivateRoute component={NotificationPage} />}
        />
        <Route
          path="/services/:id/workers"
          element={
            isAuthenticated ? (
              <PrivateRoute component={SearchWorkerPage} />
            ) : (
              <PublicRoute component={SearchWorkerPage} />
            )
          }
        />
        <Route path="/chats" element={<PrivateRoute component={ChatPage} />} />
        <Route
          path="/chat/:conversation_id"
          element={<PrivateRoute component={ChatRoom} />}
        />
        <Route
          path="/services/:service_id/workers/:id"
          element={
            isAuthenticated ? (
              <PrivateRoute component={ProfileViewPage} />
            ) : (
              <PublicRoute component={ProfileViewPage} />
            )
          }
        />
        <Route
          path="/workers/:id/payment"
          element={<PrivateRoute component={PaymentPage} />}
        />
        <Route
          path="/reviews/:id"
          element={<PrivateRoute component={ReviewPage} />}
        />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/verify/:token" element={<SignUpVerifyPage />} />
        <Route path="/verify-complete" element={<SignUpComplete />} />
        <Route
          path="/forgot-password"
          element={<PrivateRoute component={ForgotPasswordPage} />}
        />
        <Route
          path="/forgot-verify-email"
          element={<PrivateRoute component={ForgotPasswordVerifyPage} />}
        />
        <Route
          path="/new-password"
          element={<PrivateRoute component={NewPasswordPage} />}
        />
      </Routes>
    </>
  );
};

export default App;
