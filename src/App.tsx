import { Routes, Route } from "react-router-dom";
import TestPage from "./container/TestPage/TestPage";

const App = () => {
  return (
    <Routes>
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
};

export default App;
