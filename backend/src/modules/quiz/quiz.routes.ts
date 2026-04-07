import { Router } from "express";
import { createRequireSession } from "../../middlewares/require-session.js";
import {
  getNextQuestion,
  getQuizStatus,
  submitAnswer,
} from "./quiz.service.js";

export function createQuizRouter() {
  const router = Router();
  const requireSession = createRequireSession();

  router.use(requireSession);

  router.get("/status", async (req, res) => {
    const data = await getQuizStatus(req.session.user.id);
    res.json(data);
  });

  router.get("/next", async (req, res) => {
    const data = await getNextQuestion(req.session.user.id);
    res.json(data);
  });

  router.post("/answer", async (req, res) => {
    const selectedOption =
      typeof req.body?.selectedOption === "string" ? req.body.selectedOption : null;

    const data = await submitAnswer(req.session.user.id, selectedOption);
    res.json(data);
  });

  return router;
}
