import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/config/constants";

export function normalizeUsername(username: string): string {
  return username.trim();
}

export function isValidUsername(username: string): boolean {
  const normalized = normalizeUsername(username);
  return normalized.length >= USERNAME_MIN_LENGTH && normalized.length <= USERNAME_MAX_LENGTH;
}

export function getUsernameValidationMessage(): string {
  return `Enter a name between ${USERNAME_MIN_LENGTH} and ${USERNAME_MAX_LENGTH} characters.`;
}
