import { randomUUID } from "crypto";
import type { Message, SendMessagePayload } from "../types";

const MAX_MESSAGES = 200;

class MessageStore {
  private messages: Message[] = [];

  getAll(): Message[] {
    return [...this.messages];
  }

  add(payload: SendMessagePayload): Message {
    const message: Message = {
      id: randomUUID(),
      userId: payload.userId,
      username: payload.username,
      text: payload.text.trim(),
      timestamp: new Date().toISOString(),
    };

    this.messages.push(message);

    if (this.messages.length > MAX_MESSAGES) {
      this.messages = this.messages.slice(-MAX_MESSAGES);
    }

    return message;
  }
}

export const messageStore = new MessageStore();
