import { SOCKET_EVENTS } from "@/config/constants";
import { sendChatMessage } from "@/controllers/chatController";
import type { Server, Socket } from "socket.io";
import { emitSocketError } from "@/socket/utils/emitSocketError";

export function registerMessageHandler(io: Server, socket: Socket): void {
  socket.on(SOCKET_EVENTS.SEND_MESSAGE, (payload: unknown) => {
    try {
      const message = sendChatMessage(payload, {
        userId: socket.data.userId,
        username: socket.data.username,
      });

      io.emit(SOCKET_EVENTS.NEW_MESSAGE, { message });
    } catch (error) {
      emitSocketError(socket, error);
    }
  });
}
