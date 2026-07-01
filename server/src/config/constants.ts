export const MAX_MESSAGES = 200;
export const MAX_MESSAGE_LENGTH = 1000;
export const MIN_USERNAME_LENGTH = 2;
export const MAX_USERNAME_LENGTH = 24;

export const SOCKET_EVENTS = {
  JOIN: "join",
  SEND_MESSAGE: "send_message",
  HISTORY: "history",
  NEW_MESSAGE: "new_message",
  USER_JOINED: "user_joined",
  USER_LEFT: "user_left",
  ERROR: "error",
} as const;
