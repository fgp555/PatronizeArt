import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Welcome from "./pages/HomePage";
import Error404 from "./pages/Error404";
function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/*" element={<Error404 />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
