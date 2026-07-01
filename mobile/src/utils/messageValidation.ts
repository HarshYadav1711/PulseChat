import { MESSAGE_MAX_LENGTH } from "@/config/constants";

export function normalizeMessageText(text: string): string {
  return text.trim();
}

export function isValidMessageText(text: string): boolean {
  const normalized = normalizeMessageText(text);
  return normalized.length > 0 && normalized.length <= MESSAGE_MAX_LENGTH;
}
