import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ContentDashboard from "./pages/ContentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ADMIN */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* CONTENT MANAGER */}
      <Route
        path="/content/dashboard"
        element={
          <ProtectedRoute allowedRoles={["content_manager"]}>
            <ContentDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
