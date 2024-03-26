import { Routes, Route } from "react-router-dom";
import HomePage from "./container/HomePage/HomePage";
import WorkerHomePage from "./container/WorkerHomePage/WorkerHomePage";
import TopNavigation from "./components/TopNavigation/TopNavigation";
import BottomNavigation from "./components/BottomNavigation/BottomNavigation";
import ReviewPage from "./container/ReviewPage/ReviewPage";

const App = () => {
  return (
    <>
      { /* Only shows the navbar in worker/employer pages */
        location.pathname != "/" ? <TopNavigation /> : null } 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/job-list" element={<WorkerHomePage />} />
          <Route path="/review" element={<ReviewPage />} />
        </Routes>
      { location.pathname != "/" ? <BottomNavigation /> : null }
    </>
  );
};

export default App;
