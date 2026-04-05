import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useQuizStore } from "../store/quizStore";

export default function SignInPage() {
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);
  const loading = useAuthStore((state) => state.loading);
  const fetchStatus = useQuizStore((state) => state.fetchStatus);
  const quizCompleted = useQuizStore((state) => state.quizCompleted);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn(email, password);
    await fetchStatus();
    navigate(quizCompleted ? "/leaderboard" : "/quiz");
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={onSubmit} className="glass w-full max-w-md rounded-3xl p-8">
        <h1 className="mb-6 text-3xl font-bold">Sign In</h1>
        <div className="space-y-4">
          <input className="w-full rounded-xl border border-white/10 bg-slate-950/50 p-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="relative">
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-950/50 p-3 pr-20"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-cyan-300"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button className="mt-6 w-full rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950" disabled={loading}>
          {loading ? "Please wait..." : "Submit"}
        </button>
        <p className="mt-5 text-sm text-slate-300">
          Don't have an account? <Link to="/sign-up" className="font-semibold text-amber-300">Sign-Up</Link>
        </p>
      </form>
    </main>
  );
}
