import { createServer } from "http";
import { Server } from "socket.io";
import { createApp } from "./app";
import { env } from "./config/env";
import { registerSocketHandlers } from "./socket/handlers";

const app = createApp();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: env.clientOrigin,
    methods: ["GET", "POST"],
  },
});

registerSocketHandlers(io);

httpServer.listen(env.port, () => {
  console.log(`PulseChat server listening on port ${env.port}`);
});
