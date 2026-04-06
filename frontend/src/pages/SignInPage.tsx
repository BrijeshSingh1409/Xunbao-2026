import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useQuizStore } from "../store/quizStore";

export default function SignInPage() {
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);
  const loading = useAuthStore((state) => state.loading);
  const fetchStatus = useQuizStore((state) => state.fetchStatus);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn(email, password);
    await fetchStatus();
    navigate(useQuizStore.getState().quizCompleted ? "/leaderboard" : "/quiz");
  };

  return (
    <main className="treasure-page flex min-h-screen items-center justify-center px-6 py-10">
      <form onSubmit={onSubmit} className="treasure-shell w-full max-w-md rounded-[32px] p-8 md:p-10">
        <p className="treasure-kicker mb-4 text-xs">Enter The Hunt</p>
        <h1 className="treasure-title mb-6 text-4xl font-black">Sign In</h1>
        <div className="space-y-4">
          <input className="treasure-field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="relative">
            <input
              className="treasure-field pr-20"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="treasure-toggle absolute right-3 top-1/2 -translate-y-1/2 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button className="treasure-btn mt-8 w-full px-4 py-3.5" disabled={loading}>
          {loading ? "Please wait..." : "Submit"}
        </button>
        <p className="treasure-text mt-5 text-sm">
          Don't have an account? <Link to="/sign-up" className="treasure-link">Sign-Up</Link>
        </p>
      </form>
    </main>
  );
}
