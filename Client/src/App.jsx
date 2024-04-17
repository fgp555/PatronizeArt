import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Welcome from "./pages/HomePage";
import Error404 from "./pages/Error404";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar></Navbar>
          <Routes>
            {/* <Route path="/login" element={<LoginPage />} />q
          <Route path="/register" element={<RegisterPage />} /> */}
            <Route path="/*" element={<Error404 />} />
            <Route path="/" element={<Welcome />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
