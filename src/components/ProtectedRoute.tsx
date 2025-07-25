import { useAuth } from "./AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="login" replace />;
}

export default ProtectedRoute;
