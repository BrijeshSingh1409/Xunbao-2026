import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { LeaderboardItem } from "../types";

export default function LeaderboardPage() {
  const [items, setItems] = useState<LeaderboardItem[]>([]);

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
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <section className="glass w-full max-w-5xl rounded-3xl p-8">
        <h1 className="text-4xl font-black">Live Leaderboard</h1>
        <p className="mt-2 text-slate-300">Auto refresh every 5 seconds</p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-slate-300">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Name</th>
                <th className="p-4">College</th>
                <th className="p-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.rank} className="border-t border-white/10">
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
