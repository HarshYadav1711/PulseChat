import type { Server, Socket } from "socket.io";
import { SOCKET_EVENTS } from "@/config/constants";
import { joinChat } from "@/controllers/chatController";
import { getErrorMessage, ValidationError } from "@/utils/errors";
import { logError } from "@/utils/logger";

export function registerJoinHandler(io: Server, socket: Socket): void {
  socket.on(SOCKET_EVENTS.JOIN, async (payload: unknown) => {
    try {
      const { user, history } = joinChat(payload);

      socket.data.userId = user.userId;
      socket.data.username = user.username;

      socket.emit(SOCKET_EVENTS.HISTORY, { messages: history });
      socket.broadcast.emit(SOCKET_EVENTS.USER_JOINED, { user });
    } catch (error) {
      emitSocketError(socket, error);
    }
  });
}

function emitSocketError(socket: Socket, error: unknown): void {
  const message =
    error instanceof ValidationError ? error.message : getErrorMessage(error);

  if (!(error instanceof ValidationError)) {
    logError("Socket handler error", error);
  }

  socket.emit(SOCKET_EVENTS.ERROR, { message });
}

export { emitSocketError };
