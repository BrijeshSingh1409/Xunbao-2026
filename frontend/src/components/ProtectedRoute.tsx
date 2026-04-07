import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute() {
  const user = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.initialized);
  const profileCompleted = useAuthStore((state) => state.profileCompleted);
  const location = useLocation();

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-200">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" replace state={{ from: location.pathname }} />;
  }

  if (!profileCompleted && location.pathname !== "/sign-up") {
    return <Navigate to="/sign-up" replace />;
  }

  return <Outlet />;
}
