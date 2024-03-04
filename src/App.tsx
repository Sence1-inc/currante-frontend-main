import { Routes, Route } from "react-router-dom";
import HomePage from "./container/HomePage/HomePage";
import TestPage from "./container/TestPage/TestPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
};

export default App;
