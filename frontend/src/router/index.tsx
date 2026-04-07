import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicOnlyRoute from "../components/PublicOnlyRoute";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import QuizPage from "../pages/QuizPage";
import LeaderboardPage from "../pages/LeaderboardPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    element: <PublicOnlyRoute />,
    children: [{ path: "/sign-in", element: <SignInPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/sign-up", element: <SignUpPage /> },
      { path: "/quiz", element: <QuizPage /> },
      { path: "/leaderboard", element: <LeaderboardPage /> },
    ],
  },
]);
