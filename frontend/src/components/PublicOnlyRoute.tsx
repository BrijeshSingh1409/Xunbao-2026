import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useQuizStore } from "../store/quizStore";

export default function PublicOnlyRoute() {
  const user = useAuthStore((state) => state.user);
  const quizCompleted = useQuizStore((state) => state.quizCompleted);

  if (user) {
    return <Navigate to={quizCompleted ? "/leaderboard" : "/quiz"} replace />;
  }

  return <Outlet />;
}
