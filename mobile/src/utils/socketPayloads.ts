import type { Message } from "@/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isMessage(value: unknown): value is Message {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.userId === "string" &&
    typeof value.username === "string" &&
    typeof value.text === "string" &&
    typeof value.timestamp === "string"
  );
}

export function parseHistoryPayload(payload: unknown): Message[] {
  if (!isRecord(payload) || !Array.isArray(payload.messages)) {
    throw new Error("Invalid history payload.");
  }

  if (!payload.messages.every(isMessage)) {
    throw new Error("Invalid history payload.");
  }

  return payload.messages;
}

export function parseNewMessagePayload(payload: unknown): Message {
  if (!isRecord(payload) || !isMessage(payload.message)) {
    throw new Error("Invalid message payload.");
  }

  return payload.message;
}

export function parseErrorPayload(payload: unknown): string {
  if (!isRecord(payload) || typeof payload.message !== "string" || !payload.message.trim()) {
    throw new Error("Invalid error payload.");
  }

  return payload.message.trim();
}
