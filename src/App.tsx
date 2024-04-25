import { Route, Routes } from "react-router-dom";
import ChatRoom from "./components/Chat/ChatRoom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ChatPage from "./container/ChatPage/ChatPage";
import EmployerDashboard from "./container/Dashboard/EmployerDashboard";
import HomePage from "./container/HomePage/HomePage";
import JobListPage from "./container/JobListPage/JobListPage";
import PaymentPage from "./container/PaymentPage/PaymentPage";
import ProfilePage from "./container/ProfilePage/ProfilePage";
import ProfileViewPage from "./container/ProfileViewPage/ProfileViewPage";
import SearchWorkerPage from "./container/SearchPage/SearchWorkerPage";
import TestPage from "./container/TestPage/TestPage";
import SignInPage from "./container/SignInPage/SignInPage";
import SignUpPage from "./container/SignUpPage/SignUpPage";
import SignUpVerifyPage from "./container/SignUpVerifyPage/SignUpVerifyPage";
import SignUpComplete from "./container/SignUpVerifyPage/SignUpComplete";
import ForgotPasswordPage from "./container/ForgotPasswordPage/ForgotPasswordPage";
import ForgotPasswordVerifyPage from "./container/ForgotPasswordPage/ForgotPasswordVerifyPage";
import NewPasswordPage from "./container/ForgotPasswordPage/NewPasswordPage";
import { LOGGED_IN_USER } from "./data/WorkerDetails";
import { initializeUser } from "./redux/reducers/UserReducer";
import { useAppDispatch } from "./redux/store";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/start" element={<TestPage />} />
      <Route path="/jobs" element={<PrivateRoute component={JobListPage} />} />
      <Route
        path="/profile"
        element={<PrivateRoute component={ProfilePage} />}
      />
      <Route
        path="/services"
        element={<PrivateRoute component={EmployerDashboard} />}
      />
      <Route
        path="/services/:id/workers"
        element={<PrivateRoute component={SearchWorkerPage} />}
      />
      <Route path="/chats" element={<PrivateRoute component={ChatPage} />} />
      <Route
        path="/chat/:conversation_id"
        element={<PrivateRoute component={ChatRoom} />}
      />
      <Route
        path="/services/:service_id/workers/:id"
        element={<PrivateRoute component={ProfileViewPage} />}
      />
      <Route
        path="/workers/:id/payment"
        element={<PrivateRoute component={PaymentPage} />}
      />
      <Route path="/sign-in" element={<PrivateRoute component={SignInPage} />} />
      <Route path="/sign-up" element={<PrivateRoute component={SignUpPage} />} />
      <Route path="/verify-email" element={<PrivateRoute component={SignUpVerifyPage} />} />
      <Route path="/verify-complete" element={<PrivateRoute component={SignUpComplete} />} />
      <Route path="/forgot-password" element={<PrivateRoute component={ForgotPasswordPage} />} />
      <Route path="/forgot-verify-email" element={<PrivateRoute component={ForgotPasswordVerifyPage} />} />
      <Route path="/new-password" element={<PrivateRoute component={NewPasswordPage} />} />
    </Routes>
  );
};

export default App;
