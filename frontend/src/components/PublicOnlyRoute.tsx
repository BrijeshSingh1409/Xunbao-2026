import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useQuizStore } from "../store/quizStore";

export default function PublicOnlyRoute() {
  const user = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.initialized);
  const quizCompleted = useQuizStore((state) => state.quizCompleted);

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-200">
        Loading...
      </div>
    );
  }

  if (user) {
    return <Navigate to={quizCompleted ? "/leaderboard" : "/quiz"} replace />;
  }

  return <Outlet />;
}
