import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import HomePage from "./container/HomePage/HomePage";
import WorkerHomePage from "./container/WorkerHomePage/WorkerHomePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/jobs"
        element={<PrivateRoute component={WorkerHomePage} />}
      />
    </Routes>
  );
};

export default App;
