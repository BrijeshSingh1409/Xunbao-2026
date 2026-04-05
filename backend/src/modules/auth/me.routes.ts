import { Router } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../../lib/auth.js";

export const meRouter = Router();

meRouter.get("/", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  res.json({
    authenticated: !!session,
    session,
  });
});
