import type { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";

export function createRequireSession(auth: any) {
  return async function requireSession(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.session = session;
    next();
  };
}
