import { io, type Socket } from "socket.io-client";
import { env } from "../config/env";
import type { Message, User } from "../types";

type MessageHandler = (message: Message) => void;
type HistoryHandler = (messages: Message[]) => void;
type ErrorHandler = (message: string) => void;

let socket: Socket | null = null;
let activeUser: User | null = null;

function ensureSocket(): Socket {
  if (socket) {
    return socket;
  }

  socket = io(env.serverUrl, {
    transports: ["websocket"],
    autoConnect: true,
  });

  socket.on("connect", () => {
    if (activeUser) {
      socket?.emit("join", {
        userId: activeUser.id,
        username: activeUser.username,
      });
    }
  });

  return socket;
}

export function connectChatSocket(user: User): Socket {
  activeUser = user;
  const instance = ensureSocket();

  if (instance.connected) {
    instance.emit("join", {
      userId: user.id,
      username: user.username,
    });
  }

  return instance;
}

export function disconnectChatSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  activeUser = null;
}

export function sendMessage(user: User, text: string): void {
  if (!socket?.connected) {
    throw new Error("Not connected to chat server.");
  }

  socket.emit("send_message", {
    userId: user.id,
    username: user.username,
    text,
  });
}

export function onNewMessage(handler: MessageHandler): () => void {
  const instance = ensureSocket();

  const listener = (payload: { message: Message }) => {
    handler(payload.message);
  };

  instance.on("new_message", listener);

  return () => {
    instance.off("new_message", listener);
  };
}

export function onHistory(handler: HistoryHandler): () => void {
  const instance = ensureSocket();

  const listener = (payload: { messages: Message[] }) => {
    handler(payload.messages);
  };

  instance.on("history", listener);

  return () => {
    instance.off("history", listener);
  };
}

export function onSocketError(handler: ErrorHandler): () => void {
  const instance = ensureSocket();

  const listener = (payload: { message: string }) => {
    handler(payload.message);
  };

  instance.on("error", listener);

  return () => {
    instance.off("error", listener);
  };
}

export function isSocketConnected(): boolean {
  return socket?.connected ?? false;
}
