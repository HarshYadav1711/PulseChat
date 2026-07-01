import type { Server, Socket } from "socket.io";
import { SOCKET_EVENTS } from "@/config/constants";
import { logInfo } from "@/utils/logger";

export function registerDisconnectHandler(_io: Server, socket: Socket): void {
  socket.on("disconnect", (reason) => {
    const userId = socket.data.userId;
    const username = socket.data.username;

    if (userId && username) {
      socket.broadcast.emit(SOCKET_EVENTS.USER_LEFT, {
        user: { userId, username },
      });

      logInfo("User disconnected", { userId, username, reason });
      return;
    }

    logInfo("Client disconnected", { socketId: socket.id, reason });
  });
}
