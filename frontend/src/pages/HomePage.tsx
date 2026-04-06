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
    <main className="gothic-screen flex items-center justify-center px-4 py-8">
      <section className="gothic-panel relative w-full max-w-5xl overflow-hidden rounded-[28px] px-6 py-10 md:px-10 md:py-12">
        <img src={crow} alt="" className="gothic-ornament left-4 top-4" />
        <img src={crow} alt="" className="gothic-ornament right-4 top-4 scale-x-[-1]" />
        <img src={crow} alt="" className="gothic-ornament bottom-4 left-4" />
        <img src={crow} alt="" className="gothic-ornament bottom-4 right-4 scale-x-[-1]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-8 flex items-center justify-center gap-4">
            <img src={satchel} alt="" className="h-10 w-10 [image-rendering:pixelated]" />
            <div className="rounded-full border border-[rgba(214,176,106,0.22)] bg-black/30 px-5 py-2">
              <p className="gothic-helper text-base uppercase tracking-[0.16em]">
                {user?.username || user?.name || "Player Ready"}
              </p>
            </div>
            <img src={quill} alt="" className="h-10 w-10 [image-rendering:pixelated]" />
          </div>

          <div className="relative mx-auto w-full max-w-[260px]">
            <img
              src={ornateOval}
              alt=""
              className="mx-auto w-full [image-rendering:pixelated] opacity-90"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-3">
              <img src={pocketwatch} alt="" className="h-8 w-8 [image-rendering:pixelated]" />
              <span className="gothic-kicker text-sm">Game Portal</span>
            </div>
          </div>

          <div className="relative mx-auto mt-10 max-w-3xl">
            <img
              src={ornateFrame}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full scale-[1.03] [image-rendering:pixelated] opacity-88"
            />
            <div className="relative mx-auto max-w-[760px] px-10 py-10 md:px-16 md:py-14">
              <h1 className="gothic-title text-6xl leading-none md:text-8xl">
                XUNBAO
              </h1>
              <p className="mt-5 text-xl text-[var(--gold-soft)] md:text-3xl">
                The Online Treasure Hunt
              </p>
              <div className="mx-auto mt-6 max-w-[540px] text-sm leading-6 text-[var(--muted)] md:text-base">
                Enter the hunt, unlock your random question trail, and race through the challenge
                before the dark claims the round.
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-12 max-w-lg">
            <img
              src={ornateArch}
              alt=""
              className="mx-auto h-40 [image-rendering:pixelated] opacity-80 md:h-48"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <button
                onClick={handlePlay}
                className="gothic-btn flex min-h-[86px] min-w-[240px] items-center justify-center gap-3 px-8 py-5 text-3xl"
              >
                <img src={selector} alt="" className="h-6 w-6 [image-rendering:pixelated]" />
                Play
                <img src={selector} alt="" className="h-6 w-6 scale-x-[-1] [image-rendering:pixelated]" />
              </button>
              <p className="mt-5 text-base uppercase tracking-[0.18em] text-[var(--gold-soft)]">
                {user
                  ? quizCompleted
                    ? "Completed run available"
                    : "Continue your active quest"
                  : "Sign in begins the adventure"}
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <div className="gothic-card rounded-2xl px-5 py-5">
              <p className="gothic-kicker text-xs">Question Pool</p>
              <p className="mt-3 text-4xl text-[var(--gold-soft)]">75</p>
            </div>
            <div className="gothic-card rounded-2xl px-5 py-5">
              <p className="gothic-kicker text-xs">Per Player</p>
              <p className="mt-3 text-4xl text-[var(--gold-soft)]">15</p>
            </div>
            <div className="gothic-card rounded-2xl px-5 py-5">
              <p className="gothic-kicker text-xs">Timer</p>
              <p className="mt-3 text-4xl text-[var(--gold-soft)]">20s</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
