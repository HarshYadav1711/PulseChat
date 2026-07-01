import { io, type Socket } from "socket.io-client";
import { env } from "@/config/env";

export function createChatSocket(): Socket {
  return io(env.serverUrl, {
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });
}
