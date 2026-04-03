import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useQuizStore } from "../store/quizStore";

export default function SignInPage() {
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);
  const loading = useAuthStore((state) => state.loading);
  const quizCompleted = useQuizStore((state) => state.quizCompleted);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e:React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn(email, password);
    navigate(quizCompleted ? "/leaderboard" : "/quiz");
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={onSubmit} className="glass w-full max-w-md rounded-3xl p-8">
        <h1 className="mb-6 text-3xl font-bold">Sign In</h1>
        <div className="space-y-4">
          <input className="w-full rounded-xl border border-white/10 bg-slate-950/50 p-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full rounded-xl border border-white/10 bg-slate-950/50 p-3" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="mt-6 w-full rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950" disabled={loading}>
          {loading ? "Please wait..." : "Submit"}
        </button>
        <p className="mt-5 text-sm text-slate-300">
          Dont have an account? <Link to="/sign-up" className="font-semibold text-amber-300">Sign-Up</Link>
        </p>
      </form>
    </main>
  );
}
