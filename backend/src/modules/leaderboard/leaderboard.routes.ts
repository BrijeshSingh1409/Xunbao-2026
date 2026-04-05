import { Router } from "express";
import { getLeaderboard } from "../quiz/quiz.service.js";

export const leaderboardRouter = Router();

leaderboardRouter.get("/live", async (_req, res) => {
  const items = await getLeaderboard();
  res.json({ items });
});
