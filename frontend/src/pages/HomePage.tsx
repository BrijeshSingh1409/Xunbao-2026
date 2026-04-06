import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useQuizStore } from "../store/quizStore";

const sideButtonsLeft = ["👥", "📞"];
const sideButtonsRight = ["🏆", "ƒ"];

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
    <main className="xunbao-home relative min-h-screen overflow-hidden text-white">
      <div className="xunbao-stars absolute inset-0" />
      <div className="xunbao-glow absolute inset-x-0 bottom-0 h-[42vh]" />
      <div className="xunbao-horizon absolute bottom-0 left-0 right-0 h-44" />

      <div className="pointer-events-none absolute inset-x-0 top-0 border-t border-white/55" />

      <aside className="absolute left-6 top-8 z-10 hidden flex-col gap-8 md:flex">
        {sideButtonsLeft.map((item) => (
          <button
            key={item}
            type="button"
            className="xunbao-side-btn"
            aria-hidden="true"
          >
            {item}
          </button>
        ))}
      </aside>

      <aside className="absolute right-6 top-8 z-10 hidden flex-col gap-8 md:flex">
        {sideButtonsRight.map((item) => (
          <button
            key={item}
            type="button"
            className="xunbao-side-btn"
            aria-hidden="true"
          >
            {item}
          </button>
        ))}
      </aside>

      <button
        type="button"
        className="xunbao-corner-btn absolute bottom-8 left-6 z-10 hidden md:flex"
        aria-hidden="true"
      >
        ⌂
      </button>

      <button
        type="button"
        className="xunbao-corner-btn xunbao-corner-btn-red absolute bottom-8 right-6 z-10 hidden md:flex"
        aria-hidden="true"
      >
        i
      </button>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center px-6 pb-20 pt-6 text-center">
        <div className="mb-10 flex items-center gap-4 rounded-full px-5 py-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-amber-400 bg-black/50 shadow-[0_0_18px_rgba(255,190,60,0.45)]">
            <span className="text-lg">🕴️</span>
          </div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300 md:text-base">
            {user?.username || user?.name || "Xunbao Player"}
          </p>
        </div>

        <div className="mt-4">
          <h1 className="xunbao-title text-6xl font-black uppercase tracking-[0.08em] md:text-8xl lg:text-[8rem]">
            XUNBAO
          </h1>

          <div className="mx-auto mt-4 h-5 w-72 md:w-96">
            <div className="xunbao-divider h-full w-full" />
          </div>

          <p className="xunbao-subtitle mt-6 text-2xl font-extrabold uppercase tracking-[0.18em] md:text-4xl">
            The Online Treasure Hunt
          </p>
        </div>

        <button
          onClick={handlePlay}
          className="xunbao-play-btn mt-14 flex h-36 w-36 items-center justify-center rounded-full md:h-40 md:w-40"
        >
          <span className="xunbao-play-inner flex h-24 w-24 items-center justify-center rounded-full md:h-28 md:w-28">
            <span className="ml-1 text-4xl text-amber-300 md:text-5xl">▶</span>
          </span>
        </button>

        <p className="mt-6 max-w-xl text-sm font-semibold uppercase tracking-[0.22em] text-amber-100/90 md:text-base">
          {user
            ? quizCompleted
              ? "Quiz completed. Enter the leaderboard."
              : "You are ready to continue the hunt."
            : "Tap play and sign in to begin your hunt."}
        </p>
      </div>
    </main>
  );
}
