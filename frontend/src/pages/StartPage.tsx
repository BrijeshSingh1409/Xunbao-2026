import { Navigate, useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/quizStore";

export default function StartPage() {
  const navigate = useNavigate();
  const quizCompleted = useQuizStore((state) => state.quizCompleted);

  if (quizCompleted) {
    return <Navigate to="/leaderboard" replace />;
  }

  return (
    <main className="treasure-page flex min-h-screen items-center justify-center px-6 py-10">
      <section className="treasure-shell w-full max-w-2xl rounded-[32px] p-8 md:p-10">
        <p className="treasure-kicker mb-4 text-xs text-center">Ready Check</p>
        <h1 className="treasure-title mb-8 text-center text-4xl font-black">
          Start Quiz
        </h1>

        <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
          <h2 className="mb-4 text-xl font-bold text-amber-200">Rules</h2>
          <ul className="space-y-3 text-sm leading-7 text-slate-200 md:text-base">
            <li>There will be 15 questions in total.</li>
            <li>Each question will have a 20-second timer.</li>
            <li>Faster submissions will earn higher scores.</li>
          </ul>
        </div>

        <button
          type="button"
          onClick={() => navigate("/quiz")}
          className="treasure-btn mt-8 w-full px-6 py-4 text-lg md:py-5 md:text-xl"
        >
          Start
        </button>
      </section>
    </main>
  );
}
