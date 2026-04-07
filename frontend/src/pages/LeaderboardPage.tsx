import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { LeaderboardItem } from "../types";

type LeaderboardRow = LeaderboardItem & {
  totalTimeMs?: number;
};

export default function LeaderboardPage() {
  const [items, setItems] = useState<LeaderboardRow[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await api.leaderboard();
      setItems(data.items);
    };

    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="treasure-page flex min-h-screen items-center justify-center px-6 py-10">
      <section className="treasure-shell w-full max-w-5xl rounded-[32px] p-8 md:p-10">
        <p className="treasure-kicker mb-4 text-xs">Hall Of Explorers</p>
        <h1 className="treasure-title text-4xl font-black">Live Leaderboard</h1>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          <table className="treasure-table w-full text-left">
            <thead className="bg-white/5">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Name</th>
                <th className="p-4">College</th>
                <th className="p-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={`${item.rank}-${item.name}`} className="border-t border-white/10 bg-black/15">
                  <td className="p-4">{item.rank}</td>
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.college}</td>
                  <td className="p-4 font-bold text-amber-300">{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
