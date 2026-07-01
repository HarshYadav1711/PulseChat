import { createServer, type Server as HttpServer } from "http";
import { Server } from "socket.io";
import { createApp } from "@/app";
import { SHUTDOWN_TIMEOUT_MS } from "@/config/constants";
import { env } from "@/config/env";
import { registerSocketHandlers } from "@/socket";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "@/types/socket";
import { logError, logInfo } from "@/utils/logger";

function createSocketServer(httpServer: HttpServer): Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
> {
  const io = new Server(httpServer, {
    cors: {
      origin: env.clientOrigin,
      methods: ["GET", "POST"],
    },
  });

  registerSocketHandlers(io);
  return io;
}

function registerShutdownHandlers(httpServer: HttpServer, io: Server): void {
  let isShuttingDown = false;

  const shutdown = (signal: string) => {
    if (isShuttingDown) {
      return;
    }

    isShuttingDown = true;
    logInfo(`Received ${signal}, shutting down`);

    const forceExitTimeout = setTimeout(() => {
      logError("Forced shutdown after timeout");
      process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS);

    io.close(() => {
      logInfo("Socket.IO closed");

      httpServer.close((error) => {
        clearTimeout(forceExitTimeout);

        if (error) {
          logError("HTTP server close failed", error);
          process.exit(1);
        }

        logInfo("HTTP server closed");
        process.exit(0);
      });
    });
  };

  process.on("SIGINT", () => {
    shutdown("SIGINT");
  });

  process.on("SIGTERM", () => {
    shutdown("SIGTERM");
  });
}

async function startServer(): Promise<void> {
  const app = createApp();
  const httpServer = createServer(app);
  const io = createSocketServer(httpServer);

  registerShutdownHandlers(httpServer, io);

  await new Promise<void>((resolve, reject) => {
    const onError = (error: Error) => {
      httpServer.off("error", onError);
      reject(error);
    };

    httpServer.once("error", onError);
    httpServer.listen(env.port, () => {
      httpServer.off("error", onError);
      logInfo(`Server listening on port ${env.port}`);
      resolve();
    });
  });
}

startServer().catch((error) => {
  logError("Failed to start server", error);
  process.exit(1);
});
