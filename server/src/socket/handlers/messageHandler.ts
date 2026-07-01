import type { Server, Socket } from "socket.io";
import { SOCKET_EVENTS } from "@/config/constants";
import { sendChatMessage } from "@/controllers/chatController";
import { emitSocketError } from "@/socket/handlers/joinHandler";

export function registerMessageHandler(io: Server, socket: Socket): void {
  socket.on(SOCKET_EVENTS.SEND_MESSAGE, async (payload: unknown) => {
    try {
      const message = sendChatMessage(payload, socket.data.userId);
      io.emit(SOCKET_EVENTS.NEW_MESSAGE, { message });
    } catch (error) {
      emitSocketError(socket, error);
    }
  });
}
