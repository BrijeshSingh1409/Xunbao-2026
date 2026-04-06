import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useQuizStore } from "../store/quizStore";

import ornateOval from "../assets/gothic-ui/gothic_pixel_ui_free_v_1-0-2/split_assets/frames and bars/ornate_oval.png";
import ornateArch from "../assets/gothic-ui/gothic_pixel_ui_free_v_1-0-2/split_assets/frames and bars/ornate_arch.png";
import ornateFrame from "../assets/gothic-ui/gothic_pixel_ui_free_v_1-0-2/split_assets/frames and bars/large_ornate_frame2.png";
import selector from "../assets/gothic-ui/gothic_pixel_ui_free_v_1-0-2/split_assets/frames and bars/small_selector_03.png";
import pocketwatch from "../assets/gothic-ui/gothic_pixel_ui_free_v_1-0-2/split_assets/grids and icons/32px/32px_pocketwatch.png";
import satchel from "../assets/gothic-ui/gothic_pixel_ui_free_v_1-0-2/split_assets/grids and icons/32px/32px_satchel.png";
import quill from "../assets/gothic-ui/gothic_pixel_ui_free_v_1-0-2/split_assets/grids and icons/32px/32px_inkwell_and_quill.png";
import crow from "../assets/gothic-ui/gothic_pixel_ui_free_v_1-0-2/split_assets/grids and icons/32px/32px_crow.png";

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
    <main className="gothic-screen flex min-h-screen items-center justify-center px-3 py-4 sm:px-4 sm:py-8">
      <section className="gothic-panel relative w-full max-w-5xl overflow-hidden rounded-[24px] px-4 py-6 sm:rounded-[28px] sm:px-6 sm:py-10 md:px-10 md:py-12">
        <img src={crow} alt="" className="gothic-ornament left-2 top-2 sm:left-4 sm:top-4" />
        <img src={crow} alt="" className="gothic-ornament right-2 top-2 scale-x-[-1] sm:right-4 sm:top-4" />
        <img src={crow} alt="" className="gothic-ornament bottom-2 left-2 sm:bottom-4 sm:left-4" />
        <img src={crow} alt="" className="gothic-ornament bottom-2 right-2 scale-x-[-1] sm:bottom-4 sm:right-4" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 sm:mb-8 sm:gap-4">
            <img src={satchel} alt="" className="h-8 w-8 [image-rendering:pixelated] sm:h-10 sm:w-10" />
            <div className="rounded-full border border-[rgba(214,176,106,0.22)] bg-black/30 px-4 py-2 sm:px-5">
              <p className="gothic-helper text-xs uppercase tracking-[0.14em] sm:text-base sm:tracking-[0.16em]">
                {user?.username || user?.name || "Player Ready"}
              </p>
            </div>
            <img src={quill} alt="" className="h-8 w-8 [image-rendering:pixelated] sm:h-10 sm:w-10" />
          </div>

          <div className="relative mx-auto w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px]">
            <img
              src={ornateOval}
              alt=""
              className="mx-auto w-full [image-rendering:pixelated] opacity-90"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 px-4 sm:gap-3 sm:px-6">
              <img src={pocketwatch} alt="" className="h-5 w-5 [image-rendering:pixelated] sm:h-8 sm:w-8" />
              <span className="gothic-kicker text-[9px] sm:text-sm">Game Portal</span>
            </div>
          </div>

          <div className="relative mx-auto mt-8 max-w-3xl sm:mt-10">
            <img
              src={ornateFrame}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full scale-[1.02] [image-rendering:pixelated] opacity-88 sm:scale-[1.03]"
            />
            <div className="relative mx-auto max-w-[760px] px-5 py-7 sm:px-10 sm:py-10 md:px-16 md:py-14">
              <h1 className="gothic-title text-4xl leading-none sm:text-6xl md:text-8xl">
                XUNBAO
              </h1>
              <p className="mt-4 text-base text-[var(--gold-soft)] sm:text-xl md:mt-5 md:text-3xl">
                The Online Treasure Hunt
              </p>
              <div className="mx-auto mt-4 max-w-[540px] text-xs leading-5 text-[var(--muted)] sm:mt-6 sm:text-sm sm:leading-6 md:text-base">
                Enter the hunt, unlock your random question trail, and race through the challenge
                before the dark claims the round.
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-10 max-w-lg sm:mt-12">
            <img
              src={ornateArch}
              alt=""
              className="mx-auto h-28 [image-rendering:pixelated] opacity-80 sm:h-40 md:h-48"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <button
                onClick={handlePlay}
                className="gothic-btn gothic-btn-zoom flex min-h-[64px] min-w-[180px] items-center justify-center gap-2 px-5 py-3 text-xl sm:min-h-[86px] sm:min-w-[240px] sm:gap-3 sm:px-8 sm:py-5 sm:text-3xl"
              >
                <img src={selector} alt="" className="h-5 w-5 [image-rendering:pixelated] sm:h-6 sm:w-6" />
                Play
                <img src={selector} alt="" className="h-5 w-5 scale-x-[-1] [image-rendering:pixelated] sm:h-6 sm:w-6" />
              </button>
              <p className="mt-4 px-4 text-center text-[10px] uppercase tracking-[0.14em] text-[var(--gold-soft)] sm:mt-5 sm:text-base sm:tracking-[0.18em]">
                {user
                  ? quizCompleted
                    ? "Completed run available"
                    : "Continue your active quest"
                  : "Sign in begins the adventure"}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:mt-14 sm:gap-4 md:grid-cols-3">
            <div className="gothic-card rounded-2xl px-4 py-4 sm:px-5 sm:py-5">
              <p className="gothic-kicker text-[9px] sm:text-xs">Question Pool</p>
              <p className="mt-2 text-3xl text-[var(--gold-soft)] sm:mt-3 sm:text-4xl">75</p>
            </div>
            <div className="gothic-card rounded-2xl px-4 py-4 sm:px-5 sm:py-5">
              <p className="gothic-kicker text-[9px] sm:text-xs">Per Player</p>
              <p className="mt-2 text-3xl text-[var(--gold-soft)] sm:mt-3 sm:text-4xl">15</p>
            </div>
            <div className="gothic-card rounded-2xl px-4 py-4 sm:px-5 sm:py-5">
              <p className="gothic-kicker text-[9px] sm:text-xs">Timer</p>
              <p className="mt-2 text-3xl text-[var(--gold-soft)] sm:mt-3 sm:text-4xl">20s</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
