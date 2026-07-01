import { io, type Socket } from "socket.io-client";
import {
  SOCKET_EVENTS,
  SOCKET_RECONNECTION_DELAY_MAX_MS,
  SOCKET_RECONNECTION_DELAY_MS,
} from "@/config/constants";
import { env } from "@/config/env";
import type { ConnectionStatus, Message, Session } from "@/types";

export interface ChatSocketCallbacks {
  onConnectionStatusChange: (status: ConnectionStatus) => void;
  onHistory: (messages: Message[]) => void;
  onNewMessage: (message: Message) => void;
  onError: (message: string) => void;
}

export class ChatSocketService {
  private socket: Socket | null = null;
  private session: Session | null = null;

  connect(session: Session, callbacks: ChatSocketCallbacks): void {
    this.disconnect();
    this.session = session;

    const socket = io(env.serverUrl, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: SOCKET_RECONNECTION_DELAY_MS,
      reconnectionDelayMax: SOCKET_RECONNECTION_DELAY_MAX_MS,
    });

    this.socket = socket;
    this.attachListeners(socket, callbacks);

    callbacks.onConnectionStatusChange("connecting");

    if (socket.connected) {
      callbacks.onConnectionStatusChange("connected");
      this.joinChat(socket);
    }
  }

  sendMessage(text: string): void {
    if (!this.session || !this.socket?.connected) {
      return;
    }

    this.socket.emit(SOCKET_EVENTS.SEND_MESSAGE, {
      userId: this.session.userId,
      username: this.session.username,
      text,
    });
  }

  disconnect(): void {
    if (!this.socket) {
      return;
    }

    this.socket.removeAllListeners();
    this.socket.disconnect();
    this.socket = null;
    this.session = null;
  }

  private attachListeners(socket: Socket, callbacks: ChatSocketCallbacks): void {
    socket.on("connect", () => {
      callbacks.onConnectionStatusChange("connected");
      this.joinChat(socket);
    });

    socket.on("disconnect", () => {
      callbacks.onConnectionStatusChange("disconnected");
    });

    socket.on("reconnect_attempt", () => {
      callbacks.onConnectionStatusChange("connecting");
    });

    socket.on(SOCKET_EVENTS.HISTORY, (payload: { messages: Message[] }) => {
      callbacks.onHistory(payload.messages);
    });

    socket.on(SOCKET_EVENTS.NEW_MESSAGE, (payload: { message: Message }) => {
      callbacks.onNewMessage(payload.message);
    });

    socket.on(SOCKET_EVENTS.ERROR, (payload: { message: string }) => {
      callbacks.onError(payload.message);
    });
  }

  private joinChat(socket: Socket): void {
    if (!this.session) {
      return;
    }

    socket.emit(SOCKET_EVENTS.JOIN, {
      userId: this.session.userId,
      username: this.session.username,
    });
  }
}
