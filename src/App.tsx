import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import HomePage from "./container/HomePage/HomePage";
import JobListPage from "./container/JobListPage/JobListPage";
import ProfilePage from "./container/ProfilePage/ProfilePage";
import SearchWorkerPage from "./container/SearchPage/SearchWorkerPage";
import { LOGGED_IN_USER } from "./data/WorkerDetails";
import { initializeUser } from "./redux/reducers/UserReducer";
import { useAppDispatch } from "./redux/store";

const App = () => {
  // do this on log in
  const dispatch = useAppDispatch();
  const [id, setId] = useState<number>(LOGGED_IN_USER);
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/v1/users/${id}`);
        if (data) {
          dispatch(initializeUser(data));
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    if (id) {
      getUser();
    }
  }, [dispatch, id]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/jobs" element={<PrivateRoute component={JobListPage} />} />
      <Route
        path="/profile"
        element={<PrivateRoute component={ProfilePage} />}
      />
      <Route
        path="/search"
        element={<PrivateRoute component={SearchWorkerPage} />}
      />
    </Routes>
  );
};

export default App;
