export const MAX_MESSAGES = 200;
export const MAX_MESSAGE_LENGTH = 1000;
export const MIN_USERNAME_LENGTH = 2;
export const MAX_USERNAME_LENGTH = 24;
export const MAX_USER_ID_LENGTH = 128;
export const JSON_BODY_LIMIT = "16kb";
export const SHUTDOWN_TIMEOUT_MS = 10_000;

export const SOCKET_EVENTS = {
  JOIN: "join",
  SEND_MESSAGE: "send_message",
  HISTORY: "history",
  NEW_MESSAGE: "new_message",
  USER_JOINED: "user_joined",
  USER_LEFT: "user_left",
  ERROR: "error",
  DISCONNECT: "disconnect",
} as const;
