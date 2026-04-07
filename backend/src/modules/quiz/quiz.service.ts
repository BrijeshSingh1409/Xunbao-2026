import { ObjectId } from "mongodb";
import { db } from "../../config/db.js";
import { sampleQuestions } from "./questions.data.js";

const QUESTION_TIME_MS = 20_000;
const QUIZ_LENGTH = 15;
const USERS_COLLECTION = "user";

type QuestionDoc = {
  _id?: ObjectId;
  text: string;
  options: string[];
  correctOption: string;
  isActive: boolean;
};

type Attempt = {
  questionId: string;
  openedAt: string;
  submittedAt: string | null;
  selectedOption: string | null;
  isCorrect: boolean;
  timeTakenMs: number | null;
  scoreAwarded: number;
};

type QuizSessionDoc = {
  _id?: ObjectId;
  userId: string;
  servedQuestionIds: string[];
  currentQuestionId: string | null;
  currentQuestionOpenedAt: string | null;
  currentQuestionExpiresAt: string | null;
  answeredCount: number;
  completed: boolean;
  attempts: Attempt[];
  createdAt: string;
  updatedAt: string;
};

const questionsCollection = () => db.collection<QuestionDoc>("questions");
const sessionsCollection = () => db.collection<QuizSessionDoc>("quizSessions");
const usersCollection = () => db.collection(USERS_COLLECTION);

type LeaderboardUserDoc = {
  _id?: ObjectId | string;
  id?: string;
  email?: string;
  name?: string;
  username?: string;
  college?: string;
};

function nowIso() {
  return new Date().toISOString();
}

function questionPublicShape(question: QuestionDoc) {
  return {
    id: question._id!.toString(),
    text: question.text,
    options: question.options,
  };
}

function calculateScore(
  openedAtIso: string,
  submittedAtIso: string,
  isCorrect: boolean
) {
  if (!isCorrect) return 0;

  const openedAt = new Date(openedAtIso).getTime();
  const submittedAt = new Date(submittedAtIso).getTime();
  const timeTakenMs = Math.max(0, submittedAt - openedAt);
  const timeTakenSec = Math.floor(timeTakenMs / 1000);

  return Math.max(20, 100 - timeTakenSec * 4);
}

async function getOrCreateSession(userId: string) {
  const existing = await sessionsCollection().findOne({ userId });

  if (existing) return existing;

  const session: QuizSessionDoc = {
    userId,
    servedQuestionIds: [],
    currentQuestionId: null,
    currentQuestionOpenedAt: null,
    currentQuestionExpiresAt: null,
    answeredCount: 0,
    completed: false,
    attempts: [],
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };

  await sessionsCollection().insertOne(session);
  return session;
}

async function markCurrentQuestionExpired(session: QuizSessionDoc) {
  if (
    !session.currentQuestionId ||
    !session.currentQuestionOpenedAt ||
    !session.currentQuestionExpiresAt
  ) {
    return;
  }

  const expiredAttempt: Attempt = {
    questionId: session.currentQuestionId,
    openedAt: session.currentQuestionOpenedAt,
    submittedAt: session.currentQuestionExpiresAt,
    selectedOption: null,
    isCorrect: false,
    timeTakenMs:
      new Date(session.currentQuestionExpiresAt).getTime() -
      new Date(session.currentQuestionOpenedAt).getTime(),
    scoreAwarded: 0,
  };

  await sessionsCollection().updateOne(
    { userId: session.userId },
    {
      $set: {
        currentQuestionId: null,
        currentQuestionOpenedAt: null,
        currentQuestionExpiresAt: null,
        updatedAt: nowIso(),
      },
      $push: { attempts: expiredAttempt },
      $inc: { answeredCount: 1 },
    }
  );
}

async function refreshExpiredState(userId: string) {
  const session = await getOrCreateSession(userId);

  if (
    session.currentQuestionExpiresAt &&
    new Date() >= new Date(session.currentQuestionExpiresAt)
  ) {
    await markCurrentQuestionExpired(session);
    return getOrCreateSession(userId);
  }

  return session;
}

function randomPick<T>(items: T[]) {
  if (items.length === 0) {
    throw new Error("Cannot pick a random item from an empty array");
  }
  const index = Math.floor(Math.random() * items.length);
  return items[index]!;
}

export async function seedSampleQuestionsIfEmpty() {
  const count = await questionsCollection().countDocuments();
  if (count > 0) return;

  await questionsCollection().insertMany(sampleQuestions);
  console.log("Inserted sample questions");
}

export async function getQuizStatus(userId: string) {
  const session = await refreshExpiredState(userId);

  return {
    completed: session.completed || session.answeredCount >= QUIZ_LENGTH,
    answeredCount: session.answeredCount,
    currentQuestionId: session.currentQuestionId,
    currentQuestionExpiresAt: session.currentQuestionExpiresAt,
  };
}

export async function getNextQuestion(userId: string) {
  let session = await refreshExpiredState(userId);

  if (session.completed || session.answeredCount >= QUIZ_LENGTH) {
    await sessionsCollection().updateOne(
      { userId },
      { $set: { completed: true, updatedAt: nowIso() } }
    );

    return {
      completed: true,
      question: null,
    };
  }

  if (session.currentQuestionId) {
    const currentQuestion = await questionsCollection().findOne({
      _id: new ObjectId(session.currentQuestionId),
    });

    if (!currentQuestion) {
      return { completed: false, question: null };
    }

    return {
      completed: false,
      question: questionPublicShape(currentQuestion),
      expiresAt: session.currentQuestionExpiresAt,
      openedAt: session.currentQuestionOpenedAt,
      questionNumber: session.answeredCount + 1,
    };
  }

  const remainingQuestions = await questionsCollection()
    .find({
      isActive: true,
      _id: {
        $nin: session.servedQuestionIds.map((id) => new ObjectId(id)),
      },
    })
    .toArray();

  if (remainingQuestions.length === 0) {
    await sessionsCollection().updateOne(
      { userId },
      { $set: { completed: true, updatedAt: nowIso() } }
    );

    return {
      completed: true,
      question: null,
    };
  }

  const selected = randomPick(remainingQuestions);
  const openedAt = new Date();
  const expiresAt = new Date(openedAt.getTime() + QUESTION_TIME_MS);

  await sessionsCollection().updateOne(
    { userId },
    {
      $set: {
        currentQuestionId: selected._id!.toString(),
        currentQuestionOpenedAt: openedAt.toISOString(),
        currentQuestionExpiresAt: expiresAt.toISOString(),
        updatedAt: nowIso(),
      },
      $addToSet: {
        servedQuestionIds: selected._id!.toString(),
      },
    }
  );

  session = await getOrCreateSession(userId);

  return {
    completed: false,
    question: questionPublicShape(selected),
    openedAt: session.currentQuestionOpenedAt,
    expiresAt: session.currentQuestionExpiresAt,
    questionNumber: session.answeredCount + 1,
  };
}

export async function submitAnswer(userId: string, selectedOption: string | null) {
  const session = await getOrCreateSession(userId);

  if (
    session.completed ||
    session.answeredCount >= QUIZ_LENGTH ||
    !session.currentQuestionId ||
    !session.currentQuestionOpenedAt ||
    !session.currentQuestionExpiresAt
  ) {
    return { completed: true };
  }

  const question = await questionsCollection().findOne({
    _id: new ObjectId(session.currentQuestionId),
  });

  if (!question) {
    return { completed: true };
  }

  const submittedAt = new Date();
  const expiresAt = new Date(session.currentQuestionExpiresAt);
  const finalSubmittedAt = submittedAt > expiresAt ? expiresAt : submittedAt;

  const isCorrect =
    submittedAt <= expiresAt &&
    selectedOption !== null &&
    selectedOption === question.correctOption;

  const scoreAwarded = calculateScore(
    session.currentQuestionOpenedAt,
    finalSubmittedAt.toISOString(),
    isCorrect
  );

  const attempt: Attempt = {
    questionId: session.currentQuestionId,
    openedAt: session.currentQuestionOpenedAt,
    submittedAt: finalSubmittedAt.toISOString(),
    selectedOption,
    isCorrect,
    timeTakenMs:
      new Date(finalSubmittedAt).getTime() -
      new Date(session.currentQuestionOpenedAt).getTime(),
    scoreAwarded,
  };

  const nextAnsweredCount = session.answeredCount + 1;
  const completed = nextAnsweredCount >= QUIZ_LENGTH;

  await sessionsCollection().updateOne(
    { userId },
    {
      $set: {
        currentQuestionId: null,
        currentQuestionOpenedAt: null,
        currentQuestionExpiresAt: null,
        completed,
        updatedAt: nowIso(),
      },
      $push: { attempts: attempt },
      $inc: { answeredCount: 1 },
    }
  );

  return { completed };
}

export async function getLeaderboard() {
  const sessions = await sessionsCollection()
    .find({ attempts: { $exists: true, $ne: [] } })
    .toArray();

  const userIds = [...new Set(sessions.map((item) => String(item.userId)).filter(Boolean))];
  const objectUserIds = userIds
    .filter((id) => ObjectId.isValid(id))
    .map((id) => new ObjectId(id));

  const projection = {
    _id: 1,
    id: 1,
    email: 1,
    name: 1,
    username: 1,
    college: 1,
  } as const;

  const usersByIdOrEmail = await usersCollection()
    .find({
      $or: [{ id: { $in: userIds } }, { email: { $in: userIds } }],
    })
    .project(projection)
    .toArray();

  const usersByRawId = await usersCollection()
    .aggregate<LeaderboardUserDoc>([
      {
        $match: {
          _id: { $in: [...userIds, ...objectUserIds] },
        },
      },
      {
        $project: projection,
      },
    ])
    .toArray();

  const users = [...usersByIdOrEmail, ...usersByRawId];

  const usersMap = new Map(
    users.flatMap((user: LeaderboardUserDoc) => {
      const meta = {
        name: user.username || user.name || user.email?.split("@")[0] || "Participant",
        college: user.college || "Unknown College",
      };

      const keys = [
        ...new Set(
          [user.id, user.email, user._id ? String(user._id) : undefined].filter(Boolean)
        ),
      ];

      return keys.map((key) => [String(key), meta] as const);
    })
  );

  const ranked = sessions
    .map((session) => {
      const totalScore = session.attempts.reduce(
        (sum, item) => sum + item.scoreAwarded,
        0
      );

      const totalTimeMs = session.attempts.reduce(
        (sum, item) => sum + (item.timeTakenMs || 0),
        0
      );

      const meta = usersMap.get(String(session.userId));

      return {
        userId: session.userId,
        name: meta?.name || "Participant",
        college: meta?.college || "Unknown College",
        score: totalScore,
        totalTimeMs,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.totalTimeMs - b.totalTimeMs;
    })
    .map((item, index) => ({
      rank: index + 1,
      name: item.name,
      college: item.college,
      score: item.score,
      totalTimeMs: item.totalTimeMs,
    }));

  return ranked;
}

