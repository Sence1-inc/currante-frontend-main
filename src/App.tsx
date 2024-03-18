import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import HomePage from "./container/HomePage/HomePage";
import JobListPage from "./container/JobListPage/JobListPage";
import ProfilePage from "./container/ProfilePage/ProfilePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/jobs" element={<PrivateRoute component={JobListPage} />} />
      <Route
        path="/profile"
        element={<PrivateRoute component={ProfilePage} />}
      />
    </Routes>
  );
};

export default App;
