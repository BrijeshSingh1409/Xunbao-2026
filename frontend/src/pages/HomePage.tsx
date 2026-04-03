import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useQuizStore } from "../store/quizStore";

export default function HomePage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const quizCompleted = useQuizStore((state) => state.quizCompleted);

  const handlePlay = () => {
    if (!user) {
      navigate("/sign-in");
      return;
    }

    navigate(quizCompleted ? "/leaderboard" : "/quiz");
  };

  return (
    <main className="grid-bg flex min-h-screen items-center justify-center px-6">
      <section className="glass w-full max-w-3xl rounded-[32px] p-8 text-center md:p-14">
        <p className="mb-3 text-sm uppercase tracking-[0.5em] text-cyan-300">Treasure Quiz Event</p>
        <h1 className="text-5xl font-black tracking-wide md:text-7xl">XUNBAO</h1>
       
        <button
          onClick={handlePlay}
          className="mt-10 rounded-full bg-amber-300 px-8 py-4 text-lg font-bold text-slate-900 transition hover:scale-105 hover:bg-amber-200"
        >
          Play
        </button>
      </section>
    </main>
  );
}
