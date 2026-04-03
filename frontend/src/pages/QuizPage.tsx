import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useQuizStore } from "../store/quizStore";

const QUESTION_TIME = 20;

export default function QuizPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const {
    currentQuestion,
    selectedOption,
    questionIndex,
    quizCompleted,
    loading,
    setSelectedOption,
    fetchNextQuestion,
    submitCurrentAnswer,
  } = useQuizStore();

  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  useEffect(() => {
    if (!user?.token) return;

    const init = async () => {
      const done = await fetchNextQuestion(user.token);
      if (done) navigate("/leaderboard", { replace: true });
    };

    init();
  }, [user?.token, fetchNextQuestion, navigate]);

  useEffect(() => {
    if (!currentQuestion) return;
    setTimeLeft(QUESTION_TIME);

    const timer = setInterval(async () => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion?.id]);

  useEffect(() => {
    if (timeLeft !== 0 || !user?.token || !currentQuestion) return;

    const autoMove = async () => {
      const done = await submitCurrentAnswer(user.token);
      if (done) {
        navigate("/leaderboard", { replace: true });
        return;
      }

      const completed = await fetchNextQuestion(user.token);
      if (completed) navigate("/leaderboard", { replace: true });
    };

    autoMove();
  }, [timeLeft, user?.token, currentQuestion, submitCurrentAnswer, fetchNextQuestion, navigate]);

  const handleSubmit = async () => {
    if (!user?.token) return;

    const done = await submitCurrentAnswer(user.token);
    if (done || quizCompleted) {
      navigate("/leaderboard", { replace: true });
      return;
    }

    const completed = await fetchNextQuestion(user.token);
    if (completed) navigate("/leaderboard", { replace: true });
  };

  const progress = (timeLeft / QUESTION_TIME) * 100;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <section className="glass w-full max-w-4xl rounded-3xl p-8">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm text-slate-300">Question {Math.min(questionIndex + 1, 15)} / 15</span>
          <span className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300">{timeLeft}s</span>
        </div>

        <div className="mb-8 h-3 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-amber-300 transition-all" style={{ width: `${progress}%` }} />
        </div>

        <h2 className="text-2xl font-bold">{currentQuestion?.text || "Loading question..."}</h2>

        <div className="mt-8 grid gap-4">
          {currentQuestion?.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSelectedOption(option)}
              className={`rounded-2xl border p-4 text-left transition ${
                selectedOption === option
                  ? "border-cyan-300 bg-cyan-400/15"
                  : "border-white/10 bg-slate-950/40 hover:border-white/25"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !currentQuestion}
          className="mt-8 rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950"
        >
          Submit
        </button>
      </section>
    </main>
  );
}
