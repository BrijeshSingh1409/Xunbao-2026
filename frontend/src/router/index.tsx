import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicOnlyRoute from "../components/PublicOnlyRoute";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import VerifyPage from "../pages/VerifyPage";
import QuizPage from "../pages/QuizPage";
import LeaderboardPage from "../pages/LeaderboardPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      { path: "/verify", element: <VerifyPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/quiz", element: <QuizPage /> },
      { path: "/leaderboard", element: <LeaderboardPage /> },
    ],
  },
]);
