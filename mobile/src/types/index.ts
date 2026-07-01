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

export interface LoginResponse {
  user: User;
  token: string;
}

export interface Session {
  user: User;
  token: string;
}
