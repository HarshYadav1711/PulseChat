import { Router, type Request, type Response } from "express";
import { login } from "../services/userService";
import type { LoginRequest } from "../types";

export const authRouter = Router();

authRouter.post("/login", (req: Request, res: Response) => {
  const body = req.body as LoginRequest;

  if (!body?.username || typeof body.username !== "string") {
    res.status(400).json({ error: "Username is required." });
    return;
  }

  try {
    const result = login(body);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed.";
    res.status(400).json({ error: message });
  }
});
