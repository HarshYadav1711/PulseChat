export interface Message {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: string;
}

export interface Session {
  userId: string;
  username: string;
}

export type ConnectionStatus = "connected" | "connecting" | "disconnected";

export interface UserPresence {
  userId: string;
  username: string;
}
