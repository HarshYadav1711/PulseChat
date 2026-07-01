import { SOCKET_EVENTS } from "@/config/constants";
import type { Socket } from "socket.io";
import { getClientErrorMessage, ValidationError } from "@/utils/errors";
import { logError } from "@/utils/logger";

export function emitSocketError(socket: Socket, error: unknown): void {
  if (!(error instanceof ValidationError)) {
    logError("Socket handler error", error);
  }

  socket.emit(SOCKET_EVENTS.ERROR, { message: getClientErrorMessage(error) });
}
