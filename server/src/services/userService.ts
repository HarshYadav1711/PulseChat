import { randomUUID } from "crypto";
import type { LoginRequest, LoginResponse, User } from "../types";

const MIN_USERNAME_LENGTH = 2;
const MAX_USERNAME_LENGTH = 24;

function validateUsername(username: string): string {
  const trimmed = username.trim();

  if (trimmed.length < MIN_USERNAME_LENGTH) {
    throw new Error(`Username must be at least ${MIN_USERNAME_LENGTH} characters.`);
  }

  if (trimmed.length > MAX_USERNAME_LENGTH) {
    throw new Error(`Username must be at most ${MAX_USERNAME_LENGTH} characters.`);
  }

  return trimmed;
}

export function login(payload: LoginRequest): LoginResponse {
  const username = validateUsername(payload.username);

  const user: User = {
    id: randomUUID(),
    username,
  };

  // Dummy token — sufficient for this assessment; not conflict with duplicate usernames.
  const token = randomUUID();

  return { user, token };
}
