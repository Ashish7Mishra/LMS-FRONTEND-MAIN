 import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ✅ If not logged in → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Check if role is allowed
  if (role && allowedRoles.includes(role.toLowerCase())) {
    return <>{children}</>;
  }

  // ❌ Not authorized → go to home
  return <Navigate to="/" replace />;
}
