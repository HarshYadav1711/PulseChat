import {
  MAX_MESSAGE_LENGTH,
  MAX_USER_ID_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from "@/config/constants";
import type { JoinPayload, Message } from "@/types";
import { ValidationError } from "@/utils/errors";
import { messageStore } from "@/utils/messageStore";
import { requireNonEmptyString, requireStringLength } from "@/utils/validation";

interface ConnectedUser {
  userId: string;
  username: string;
}

function parseJoinPayload(payload: unknown): JoinPayload {
  if (!payload || typeof payload !== "object") {
    throw new ValidationError("Invalid join payload.");
  }

  const data = payload as Record<string, unknown>;
  const userId = requireStringLength(
    requireNonEmptyString(data.userId, "userId"),
    "userId",
    1,
    MAX_USER_ID_LENGTH,
  );
  const username = requireStringLength(
    requireNonEmptyString(data.username, "username"),
    "Username",
    MIN_USERNAME_LENGTH,
    MAX_USERNAME_LENGTH,
  );

  return { userId, username };
}

function parseSendMessagePayload(payload: unknown): { userId: string; text: string } {
  if (!payload || typeof payload !== "object") {
    throw new ValidationError("Invalid message payload.");
  }

  const data = payload as Record<string, unknown>;
  const userId = requireStringLength(
    requireNonEmptyString(data.userId, "userId"),
    "userId",
    1,
    MAX_USER_ID_LENGTH,
  );
  const text = requireStringLength(
    requireNonEmptyString(data.text, "Message"),
    "Message",
    1,
    MAX_MESSAGE_LENGTH,
  );

  return { userId, text };
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
  connectedUser: ConnectedUser | undefined,
): Message {
  if (!connectedUser?.userId || !connectedUser.username) {
    throw new ValidationError("Join the chat before sending messages.");
  }

  const messagePayload = parseSendMessagePayload(payload);

  if (messagePayload.userId !== connectedUser.userId) {
    throw new ValidationError("Message userId does not match the connected user.");
  }

  return messageStore.add({
    userId: connectedUser.userId,
    username: connectedUser.username,
    text: messagePayload.text,
  });
}
