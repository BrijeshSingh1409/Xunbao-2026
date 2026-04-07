import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { env } from "./config/env.js";
import { createMeRouter } from "./modules/auth/me.routes.js";
import { createProfileRouter } from "./modules/auth/profile.routes.js";
import { createQuizRouter } from "./modules/quiz/quiz.routes.js";
import { leaderboardRouter } from "./modules/leaderboard/leaderboard.routes.js";
import { auth } from "./lib/auth.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true,
    })
  );

  app.all("/api/auth/{*any}", toNodeHandler(auth));

  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api/me", createMeRouter());
  app.use("/api/profile", createProfileRouter());
  app.use("/api/quiz", createQuizRouter());
  app.use("/api/leaderboard", leaderboardRouter);

  return app;
}
