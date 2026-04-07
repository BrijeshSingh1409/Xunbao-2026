import { Router } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { db } from "../../config/db.js";

export function createMeRouter(auth: any) {
  const router = Router();

  router.get("/", async (req, res) => {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.json({
        authenticated: false,
        session: null,
        profileCompleted: false,
      });
    }

    const userFromDb = await db.collection("user").findOne({
      email: session.user.email,
    });

    const profileCompleted = Boolean(
      userFromDb?.username &&
      userFromDb?.universityRollNo &&
      userFromDb?.college &&
      userFromDb?.branch &&
      userFromDb?.mobileNumber
    );

    return res.json({
      authenticated: true,
      session: {
        ...session,
        user: {
          ...session.user,
          username: userFromDb?.username ?? "",
          universityRollNo: userFromDb?.universityRollNo ?? "",
          college: userFromDb?.college ?? "",
          branch: userFromDb?.branch ?? "",
          mobileNumber: userFromDb?.mobileNumber ?? "",
        },
      },
      profileCompleted,
    });
  });

  return router;
}
