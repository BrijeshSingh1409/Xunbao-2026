import { Router } from "express";
import { requireSession } from "../../middlewares/require-session.js";
import {
  getNextQuestion,
  getQuizStatus,
  submitAnswer,
} from "./quiz.service.js";

export const quizRouter = Router();

quizRouter.use(requireSession);

quizRouter.get("/status", async (req, res) => {
  const data = await getQuizStatus(req.session.user.id);
  res.json(data);
});

quizRouter.get("/next", async (req, res) => {
  const data = await getNextQuestion(req.session.user.id);
  res.json(data);
});

quizRouter.post("/answer", async (req, res) => {
  const selectedOption =
    typeof req.body?.selectedOption === "string" ? req.body.selectedOption : null;

  const data = await submitAnswer(req.session.user.id, selectedOption);
  res.json(data);
});
