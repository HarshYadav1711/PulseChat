import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { authRouter } from "./routes/auth";
import { messagesRouter } from "./routes/messages";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.clientOrigin,
    }),
  );
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/messages", messagesRouter);

  return app;
}
