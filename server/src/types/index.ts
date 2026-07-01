export interface Message {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: string;
}

export interface JoinPayload {
  userId: string;
  username: string;
}

export interface SendMessagePayload {
  userId: string;
  username: string;
  text: string;
}

export interface UserPresence {
  userId: string;
  username: string;
}
