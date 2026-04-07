import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { env } from "./config/env.js";
import { createMeRouter } from "./modules/auth/me.routes.js";
import { createProfileRouter } from "./modules/auth/profile.routes.js";
import { createQuizRouter } from "./modules/quiz/quiz.routes.js";
import { leaderboardRouter } from "./modules/leaderboard/leaderboard.routes.js";

export function createApp(auth: any) {
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

  app.use("/api/me", createMeRouter(auth));
  app.use("/api/profile", createProfileRouter(auth));
  app.use("/api/quiz", createQuizRouter(auth));
  app.use("/api/leaderboard", leaderboardRouter);

  return app;
}
