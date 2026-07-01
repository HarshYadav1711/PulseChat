import { Router } from "express";
import { healthRouter } from "@/routes/health";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
