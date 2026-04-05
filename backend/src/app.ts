import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { env } from "./config/env.js";
import { auth } from "./lib/auth.js";
import { meRouter } from "./modules/auth/me.routes.js";
import { quizRouter } from "./modules/quiz/quiz.routes.js";
import { leaderboardRouter } from "./modules/leaderboard/leaderboard.routes.js";

export const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/me", meRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/leaderboard", leaderboardRouter);
