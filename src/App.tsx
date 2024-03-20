import { Routes, Route } from "react-router-dom";
import HomePage from "./container/HomePage/HomePage";
import WorkerHomePage from "./container/WorkerHomePage/WorkerHomePage";
import TopNavigation from "./components/TopNavigation/TopNavigation";
import BottomNavigation from "./components/BottomNavigation/BottomNavigation";

const App = () => {
  return (
    <>
      <TopNavigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/job-list" element={<WorkerHomePage />} />
        </Routes>
      <BottomNavigation />
    </>
  );
};

export default App;
