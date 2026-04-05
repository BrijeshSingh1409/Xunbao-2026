import { Router } from "express";
import { fromNodeHeaders } from "better-auth/node";

export function createMeRouter(auth: any) {
  const router = Router();

  router.get("/", async (req, res) => {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    res.json({
      authenticated: !!session,
      session,
    });
  });

  return router;
}
