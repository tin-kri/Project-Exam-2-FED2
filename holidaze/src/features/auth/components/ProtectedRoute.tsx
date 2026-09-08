import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import {  toast } from 'sonner'

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireVenueManager?: boolean;
}
/**
 * Route guard for authenticated (and optionally venue-manager-only) pages.
 *
 * - Unauthenticated users are redirected to /login, preserving the current
 *   location in router state so LoginPage can navigate back here after login.
 * - If `requireVenueManager` is set and the user isn't a venue manager, they're
 *   redirected to /profile with an error toast instead of /login, since they
 *   are authenticated — just not authorized for this specific route.
 */
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

  return <>{children}</>;
}
