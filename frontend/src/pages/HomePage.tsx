import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useQuizStore } from "../store/quizStore";

const featureCards = [
  { value: "75", label: "Cosmic Questions" },
  { value: "15", label: "Mystery Drops" },
  { value: "20s", label: "Rocket Timer" },
];

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
    <main className="relative min-h-screen overflow-hidden bg-[#140b44] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,214,102,0.22),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(82,208,255,0.24),transparent_26%),radial-gradient(circle_at_50%_78%,rgba(255,127,191,0.18),transparent_22%),linear-gradient(180deg,#28106a_0%,#1b0a4c_48%,#120733_100%)]" />
      <div className="starfield absolute inset-0 opacity-70" />
      <div className="planet-glow absolute -left-20 top-20 h-72 w-72 rounded-full" />
      <div className="planet-glow planet-glow-cyan absolute right-6 top-24 h-44 w-44 rounded-full" />
      <div className="planet-glow planet-glow-pink absolute bottom-10 right-20 h-60 w-60 rounded-full" />
      <div className="absolute left-[10%] top-[18%] h-4 w-4 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.95)]" />
      <div className="absolute right-[18%] top-[26%] h-3 w-3 rounded-full bg-amber-200 shadow-[0_0_18px_rgba(253,230,138,0.95)]" />
      <div className="absolute left-[22%] bottom-[24%] h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(165,243,252,0.95)]" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-100 backdrop-blur-xl">
              Space Hunt Activated
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.95)]" />
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.55em] text-amber-200">
                Funny Space Quest
              </p>
              <h1 className="text-6xl font-black uppercase leading-none tracking-[0.14em] text-white drop-shadow-[0_0_28px_rgba(255,255,255,0.16)] md:text-8xl">
                XUNBAO
              </h1>
              <p className="max-w-2xl text-base leading-8 text-violet-100/90 md:text-lg">
                Blast into a colorful space hunt where every player gets a surprise route through the
                galaxy. Grab 15 random questions from a floating bank of 75, dodge the 20-second rocket
                timer, and zoom onto the live leaderboard before the stars cool down.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handlePlay}
                className="group relative overflow-hidden rounded-full border border-amber-200/70 bg-[linear-gradient(135deg,#ffd86b_0%,#ff9f6e_50%,#ff7cc9_100%)] px-9 py-4 text-base font-black uppercase tracking-[0.28em] text-[#2d114f] shadow-[0_18px_35px_rgba(255,153,102,0.35)] transition duration-300 hover:scale-[1.03]"
              >
                <span className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(120deg,rgba(255,255,255,0.45),transparent_55%)] transition duration-500 group-hover:translate-x-[120%]" />
                <span className="relative">Play Now</span>
              </button>

              <div className="flex items-center rounded-full border border-white/15 bg-white/10 px-5 py-4 text-sm font-medium text-violet-50 backdrop-blur-xl">
                {user ? (quizCompleted ? "Galaxy Run Complete" : "Pilot Authenticated") : "Sign in to launch"}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {featureCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-[28px] border border-white/15 bg-white/10 p-5 shadow-[0_18px_45px_rgba(39,18,102,0.32)] backdrop-blur-xl"
                >
                  <p className="text-3xl font-black text-amber-100">{card.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.28em] text-violet-100/75">{card.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[36px] bg-[linear-gradient(145deg,rgba(255,214,102,0.26),rgba(82,208,255,0.2),rgba(255,127,191,0.24))] blur-2xl" />
            <div className="relative overflow-hidden rounded-[36px] border border-white/15 bg-white/10 p-6 shadow-[0_30px_80px_rgba(22,8,62,0.45)] backdrop-blur-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-100">Space Capsule</p>
                  <h2 className="mt-2 text-2xl font-black uppercase tracking-[0.18em] text-white">
                    Mission Brief
                  </h2>
                </div>
                <div className="rounded-full border border-emerald-300/30 bg-emerald-300/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-100">
                  Ready
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[28px] border border-cyan-200/20 bg-cyan-200/8 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-100">Mission Rules</p>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-violet-50/90">
                    <p>Questions arrive one by one straight from the control room.</p>
                    <p>The server owns the timer, so every round stays fair.</p>
                    <p>After 15 space stops, your ship auto-docks at the leaderboard.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-[28px] border border-white/15 bg-white/10 p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-violet-100/70">Theme</p>
                    <p className="mt-3 text-2xl font-black text-white">Playful</p>
                  </div>
                  <div className="rounded-[28px] border border-white/15 bg-white/10 p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-violet-100/70">Mode</p>
                    <p className="mt-3 text-2xl font-black text-white">Star Dash</p>
                  </div>
                </div>

                <div className="rounded-[28px] border border-amber-200/20 bg-amber-200/10 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-100">Captain Tip</p>
                  <p className="mt-3 text-sm leading-7 text-violet-50/90">
                    Quick answers give your ship more boost. Stay accurate, move fast, and your rank
                    shoots upward like a comet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
