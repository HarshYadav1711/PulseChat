import {
  MAX_MESSAGE_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from "@/config/constants";
import type { JoinPayload, Message, SendMessagePayload } from "@/types";
import { ValidationError } from "@/utils/errors";
import { messageStore } from "@/utils/messageStore";
import { requireNonEmptyString, requireStringLength } from "@/utils/validation";

function parseJoinPayload(payload: unknown): JoinPayload {
  if (!payload || typeof payload !== "object") {
    throw new ValidationError("Invalid join payload.");
  }

  const data = payload as Record<string, unknown>;
  const userId = requireNonEmptyString(data.userId, "userId");
  const username = requireStringLength(
    requireNonEmptyString(data.username, "username"),
    "Username",
    MIN_USERNAME_LENGTH,
    MAX_USERNAME_LENGTH,
  );

  return { userId, username };
}

function parseSendMessagePayload(payload: unknown): SendMessagePayload {
  if (!payload || typeof payload !== "object") {
    throw new ValidationError("Invalid message payload.");
  }

  const data = payload as Record<string, unknown>;
  const userId = requireNonEmptyString(data.userId, "userId");
  const username = requireNonEmptyString(data.username, "username");
  const text = requireStringLength(
    requireNonEmptyString(data.text, "Message"),
    "Message",
    1,
    MAX_MESSAGE_LENGTH,
  );

  return { userId, username, text };
}

export function joinChat(payload: unknown): { user: JoinPayload; history: Message[] } {
  const user = parseJoinPayload(payload);
  return {
    user,
    history: messageStore.getAll(),
  };
}

export function sendChatMessage(
  payload: unknown,
  connectedUserId: string | undefined,
): Message {
  if (!connectedUserId) {
    throw new ValidationError("Join the chat before sending messages.");
  }

  const messagePayload = parseSendMessagePayload(payload);

  if (messagePayload.userId !== connectedUserId) {
    throw new ValidationError("Message userId does not match the connected user.");
  }

  return messageStore.add(messagePayload);
}
