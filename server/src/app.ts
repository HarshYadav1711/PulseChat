import cors from "cors";
import express, { type Application, type NextFunction, type Request, type Response } from "express";
import { JSON_BODY_LIMIT } from "@/config/constants";
import { env } from "@/config/env";
import { apiRouter } from "@/routes";

export function createApp(): Application {
  const app = express();

  app.use(
    cors({
      origin: env.clientOrigin,
    }),
  );
  app.use(express.json({ limit: JSON_BODY_LIMIT }));
  app.use("/api", apiRouter);

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use((_error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}
