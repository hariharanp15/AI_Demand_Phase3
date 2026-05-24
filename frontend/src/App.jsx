import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DatasetUpload from "./pages/DatasetUpload";
import Forecast from "./pages/Forecast";
import Reports from "./pages/Reports";
import Admin from "./pages/Admin";
import "./styles/dashboard.css";
import "./styles/admin.css";


import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";

function App() {

  return (
    <AuthProvider>

      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <DatasetUpload />
              </ProtectedRoute>
            }
          />

          <Route
            path="/forecast"
            element={
              <ProtectedRoute>
                <Forecast />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={<Admin />}
          />


        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;