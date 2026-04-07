import { Router } from "express";
import { db } from "../../config/db.js";
import { createRequireSession } from "../../middlewares/require-session.js";

export function createProfileRouter(auth: any) {
  const router = Router();
  const requireSession = createRequireSession(auth);

  router.use(requireSession);

  router.post("/complete", async (req, res) => {
    const { universityRollNo, college, branch, mobileNumber } = req.body ?? {};

    if (!universityRollNo || !college || !branch || !mobileNumber) {
      return res.status(400).json({ message: "All profile fields are required" });
    }

    const result = await db.collection("user").updateOne(
      { email: req.session.user.email },
      {
        $set: {
          universityRollNo,
          college,
          branch,
          mobileNumber,
        },
      }
    );

    await db.collection("quizSessions").updateMany(
      { userId: req.session.user.id },
      {
        $set: {
          displayName: req.session.user.name || "Participant",
          college,
          updatedAt: new Date().toISOString(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "User document not found for profile update",
      });
    }

    res.json({ success: true });
  });

  return router;
}
