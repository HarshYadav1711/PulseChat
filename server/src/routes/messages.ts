import { Router, type Response } from "express";
import { messageStore } from "../services/messageStore";

export const messagesRouter = Router();

messagesRouter.get("/", (_req, res: Response) => {
  res.json({ messages: messageStore.getAll() });
});
