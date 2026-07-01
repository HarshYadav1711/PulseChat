import type { JoinPayload, Message, SendMessagePayload } from "@/types";

export interface ServerToClientEvents {
  history: (payload: { messages: Message[] }) => void;
  new_message: (payload: { message: Message }) => void;
  user_joined: (payload: { user: JoinPayload }) => void;
  user_left: (payload: { user: JoinPayload }) => void;
  error: (payload: { message: string }) => void;
}

export interface ClientToServerEvents {
  join: (payload: JoinPayload) => void;
  send_message: (payload: SendMessagePayload) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userId?: string;
  username?: string;
}

declare module "socket.io" {
  interface SocketData {
    userId?: string;
    username?: string;
  }
}
