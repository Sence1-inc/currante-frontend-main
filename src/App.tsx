import { Routes, Route } from "react-router-dom";
import HomePage from "./container/HomePage/HomePage";
import WorkerHomePage from "./container/WorkerHomePage/WorkerHomePage";
import TopNavigation from "./components/TopNavigation/TopNavigation";
import BottomNavigation from "./components/BottomNavigation/BottomNavigation";
import WorkerSearchPage from "./container/WorkerSearchPage/WorkerSearchPage";

const App = () => {
  return (
    <>
      { /* Only shows the navbar in worker/employer pages */
        location.pathname != "/" ? <TopNavigation /> : null } 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/job-list" element={<WorkerHomePage />} />
          <Route path="/search-worker" element={<WorkerSearchPage />} />
        </Routes>
      { location.pathname != "/" ? <BottomNavigation /> : null }
    </>
  );
};

export default App;
