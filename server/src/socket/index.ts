import type { Server } from "socket.io";
import { registerDisconnectHandler } from "@/socket/handlers/disconnectHandler";
import { registerJoinHandler } from "@/socket/handlers/joinHandler";
import { registerMessageHandler } from "@/socket/handlers/messageHandler";
import { logInfo } from "@/utils/logger";

export function registerSocketHandlers(io: Server): void {
  io.on("connection", (socket) => {
    logInfo("Client connected", { socketId: socket.id });

    registerJoinHandler(socket);
    registerMessageHandler(io, socket);
    registerDisconnectHandler(io, socket);
  });
}
