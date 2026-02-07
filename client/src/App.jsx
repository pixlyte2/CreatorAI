import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import SuperAdminLogin from "./auth/SuperAdminLogin";
import PrivateRoute from "./routes/PrivateRoutes";

import AdminDashboard from "./pages/AdminDashboard";
import ContentDashboard from "./pages/ContentDashboard";
import ViewerDashboard from "./pages/ViewerDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

export default function App() {
  return (
    <Routes>
      {/* default route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* public */}
      <Route path="/login" element={<Login />} />
      <Route path="/superadmin-login" element={<SuperAdminLogin />} />

      {/* protected */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/content"
        element={
          <PrivateRoute allowedRoles={["content_manager"]}>
            <ContentDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/viewer"
        element={
          <PrivateRoute allowedRoles={["viewer"]}>
            <ViewerDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/superadmin"
        element={
          <PrivateRoute allowedRoles={["superadmin"]}>
            <SuperAdminDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
