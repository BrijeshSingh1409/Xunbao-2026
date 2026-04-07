import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useQuizStore } from "../store/quizStore";

export default function PublicOnlyRoute() {
  const user = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.initialized);
  const profileCompleted = useAuthStore((state) => state.profileCompleted);
  const quizCompleted = useQuizStore((state) => state.quizCompleted);

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-200">
        Loading...
      </div>
    );
  }

  if (user) {
    if (!profileCompleted) {
      return <Navigate to="/sign-up" replace />;
    }

    return <Navigate to={quizCompleted ? "/leaderboard" : "/start"} replace />;
  }

  return <Outlet />;
}
