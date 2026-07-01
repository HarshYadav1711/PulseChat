import type { Server, Socket } from "socket.io";
import { messageStore } from "../services/messageStore";
import type { JoinPayload, SendMessagePayload } from "../types";

const MAX_MESSAGE_LENGTH = 1000;

function validateSendPayload(payload: SendMessagePayload): string | null {
  if (!payload?.userId || !payload?.username || !payload?.text) {
    return "userId, username, and text are required.";
  }

  const text = payload.text.trim();

  if (!text) {
    return "Message cannot be empty.";
  }

  if (text.length > MAX_MESSAGE_LENGTH) {
    return `Message must be at most ${MAX_MESSAGE_LENGTH} characters.`;
  }

  return null;
}

export function registerSocketHandlers(io: Server): void {
  io.on("connection", (socket: Socket) => {
    socket.on("join", (payload: JoinPayload) => {
      if (!payload?.userId || !payload?.username) {
        socket.emit("error", { message: "Invalid join payload." });
        return;
      }

      socket.data.userId = payload.userId;
      socket.data.username = payload.username;

      socket.emit("history", { messages: messageStore.getAll() });
    });

    socket.on("send_message", (payload: SendMessagePayload) => {
      const validationError = validateSendPayload(payload);

      if (validationError) {
        socket.emit("error", { message: validationError });
        return;
      }

      const message = messageStore.add({
        userId: payload.userId,
        username: payload.username,
        text: payload.text,
      });

      io.emit("new_message", { message });
    });

    socket.on("disconnect", () => {
      // No persistent session state to clean up for this assessment.
    });
  });
}
