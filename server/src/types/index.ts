export interface User {
  id: string;
  username: string;
}

export interface Message {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: string;
}

export interface LoginRequest {
  username: string;
}

export interface LoginResponse {
  user: User;
  token: string;
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
