import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireVenueManager?: boolean; // optional role guard, see #4
}

export function ProtectedRoute({ children, requireVenueManager }: ProtectedRouteProps) {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireVenueManager && !user.venueManager) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}