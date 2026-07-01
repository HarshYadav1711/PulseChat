import { createServer, type Server as HttpServer } from "http";
import { Server } from "socket.io";
import { createApp } from "@/app";
import { env } from "@/config/env";
import { registerSocketHandlers } from "@/socket";
import { logError, logInfo } from "@/utils/logger";

function createSocketServer(httpServer: HttpServer): Server {
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
  const shutdown = async (signal: string) => {
    logInfo(`Received ${signal}, shutting down`);

    io.close(() => {
      logInfo("Socket.IO closed");
    });

    httpServer.close((error) => {
      if (error) {
        logError("HTTP server close failed", error);
        process.exit(1);
      }

      logInfo("HTTP server closed");
      process.exit(0);
    });
  };

  process.on("SIGINT", () => {
    void shutdown("SIGINT");
  });

  process.on("SIGTERM", () => {
    void shutdown("SIGTERM");
  });
}

async function startServer(): Promise<void> {
  const app = createApp();
  const httpServer = createServer(app);
  const io = createSocketServer(httpServer);

  registerShutdownHandlers(httpServer, io);

  await new Promise<void>((resolve, reject) => {
    httpServer.listen(env.port, () => {
      logInfo(`Server listening on port ${env.port}`);
      resolve();
    });

    httpServer.on("error", reject);
  });
}

startServer().catch((error) => {
  logError("Failed to start server", error);
  process.exit(1);
});
