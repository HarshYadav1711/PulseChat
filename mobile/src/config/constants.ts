export const SOCKET_EVENTS = {
  JOIN: "join",
  SEND_MESSAGE: "send_message",
  HISTORY: "history",
  NEW_MESSAGE: "new_message",
  USER_JOINED: "user_joined",
  USER_LEFT: "user_left",
  ERROR: "error",
} as const;

export const USERNAME_MIN_LENGTH = 2;
export const USERNAME_MAX_LENGTH = 24;
export const MESSAGE_MAX_LENGTH = 1000;

export const SOCKET_RECONNECTION_DELAY_MS = 1000;
export const SOCKET_RECONNECTION_DELAY_MAX_MS = 5000;
