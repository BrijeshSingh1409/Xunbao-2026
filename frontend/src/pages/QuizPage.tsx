import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/quizStore";

export default function QuizPage() {
  const navigate = useNavigate();
  const {
    currentQuestion,
    selectedOption,
    questionNumber,
    expiresAt,
    loading,
    setSelectedOption,
    fetchStatus,
    fetchNextQuestion,
    submitCurrentAnswer,
  } = useQuizStore();

  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    const init = async () => {
      await fetchStatus();
      const completed = useQuizStore.getState().quizCompleted;
      if (completed) {
        navigate("/leaderboard", { replace: true });
        return;
      }

      const done = await fetchNextQuestion();
      if (done) {
        navigate("/leaderboard", { replace: true });
      }
    };

    init();
  }, [fetchStatus, fetchNextQuestion, navigate]);

  useEffect(() => {
    if (!expiresAt) return;

    const update = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      const seconds = Math.max(0, Math.ceil(diff / 1000));
      setTimeLeft(seconds);
    };

    update();
    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  useEffect(() => {
    if (timeLeft !== 0 || !currentQuestion) return;

    const move = async () => {
      const done = await submitCurrentAnswer();
      if (done) {
        navigate("/leaderboard", { replace: true });
        return;
      }

      const completed = await fetchNextQuestion();
      if (completed) {
        navigate("/leaderboard", { replace: true });
      }
    };

    move();
  }, [timeLeft, currentQuestion, submitCurrentAnswer, fetchNextQuestion, navigate]);

  const handleSubmit = async () => {
    const done = await submitCurrentAnswer();

    if (done) {
      navigate("/leaderboard", { replace: true });
      return;
    }

    const completed = await fetchNextQuestion();
    if (completed) {
      navigate("/leaderboard", { replace: true });
    }
  };

  const progress = useMemo(() => {
    return Math.max(0, Math.min(100, (timeLeft / 20) * 100));
  }, [timeLeft]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <section className="glass w-full max-w-4xl rounded-3xl p-8">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm text-slate-300">Question {questionNumber} / 15</span>
          <span className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300">
            {timeLeft}s
          </span>
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
