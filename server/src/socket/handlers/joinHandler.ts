import { SOCKET_EVENTS } from "@/config/constants";
import { joinChat } from "@/controllers/chatController";
import type { Socket } from "socket.io";
import { emitSocketError } from "@/socket/utils/emitSocketError";

export function registerJoinHandler(socket: Socket): void {
  socket.on(SOCKET_EVENTS.JOIN, (payload: unknown) => {
    try {
      const { user, history } = joinChat(payload);
      const alreadyJoined = Boolean(socket.data.userId);

      socket.data.userId = user.userId;
      socket.data.username = user.username;

      socket.emit(SOCKET_EVENTS.HISTORY, { messages: history });

      if (!alreadyJoined) {
        socket.broadcast.emit(SOCKET_EVENTS.USER_JOINED, { user });
      }
    } catch (error) {
      emitSocketError(socket, error);
    }
  });
}
