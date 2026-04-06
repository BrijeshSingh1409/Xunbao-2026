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
    <main className="treasure-page flex min-h-screen items-center justify-center px-6 py-10">
      <section className="treasure-shell w-full max-w-4xl rounded-[32px] p-8 md:p-10">
        <p className="treasure-kicker mb-4 text-xs">Treasure Question Deck</p>
        <div className="mb-6 flex items-center justify-between">
          <span className="treasure-text text-sm">Question {questionNumber} / 15</span>
          <span className="rounded-full border border-amber-200/25 bg-black/30 px-4 py-2 text-sm font-semibold text-amber-200">
            {timeLeft}s
          </span>
        </div>

        <div className="mb-8 h-3 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[linear-gradient(90deg,#ffe08b,#d19a34,#8e6418)] transition-all" style={{ width: `${progress}%` }} />
        </div>

        <h2 className="treasure-title text-3xl font-black">{currentQuestion?.text || "Loading question..."}</h2>

        <div className="mt-8 grid gap-4">
          {currentQuestion?.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSelectedOption(option)}
              className={`treasure-option p-4 text-left ${
                selectedOption === option
                  ? "treasure-option-active"
                  : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !currentQuestion}
          className="treasure-btn mt-8 px-8 py-3.5"
        >
          Submit
        </button>
      </section>
    </main>
  );
}
