import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import {  toast } from 'sonner'

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireVenueManager?: boolean; // later forvenue CRUD
}

export function ProtectedRoute({
  children,
  requireVenueManager,
}: ProtectedRouteProps) {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireVenueManager && !user.venueManager) {
   toast.error("You need to be a Venue Manager to access this page.")
    return <Navigate to="/profile"  replace />;
  }
console.log("user:", user);
console.log("venueManager:", user?.venueManager);
  return <>{children}</>;
}
