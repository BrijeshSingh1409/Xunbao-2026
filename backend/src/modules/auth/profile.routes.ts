import { Router } from "express";
import { db } from "../../config/db.js";
import { createRequireSession } from "../../middlewares/require-session.js";

export function createProfileRouter(auth: any) {
  const router = Router();
  const requireSession = createRequireSession(auth);

  router.use(requireSession);

  router.post("/complete", async (req, res) => {
    const { username, universityRollNo, college, branch, mobileNumber } = req.body ?? {};

    if (!username || !universityRollNo || !college || !branch || !mobileNumber) {
      return res.status(400).json({ message: "All profile fields are required" });
    }

    console.log("Profile complete request for user:", req.session.user);
    console.log("Incoming body:", req.body);

    const result = await db.collection("user").updateOne(
      { email: req.session.user.email },
      {
        $set: {
          username,
          universityRollNo,
          college,
          branch,
          mobileNumber,
        },
      }
    );

    console.log("Mongo update result:", result);

    const updatedUser = await db.collection("user").findOne({
      email: req.session.user.email,
    });

    console.log("Updated user from DB:", updatedUser);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "User document not found for profile update",
      });
    }

    res.json({ success: true });
  });

  return router;
}
