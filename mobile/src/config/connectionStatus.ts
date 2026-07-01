import type { ConnectionStatus } from "@/types";

export type ConnectionStatusTone = "success" | "warning" | "error";

export interface ConnectionStatusConfig {
  label: string;
  tone: ConnectionStatusTone;
  bannerMessage?: string;
}

export const CONNECTION_STATUS_CONFIG: Record<ConnectionStatus, ConnectionStatusConfig> = {
  connected: {
    label: "Connected",
    tone: "success",
  },
  connecting: {
    label: "Connecting",
    tone: "warning",
    bannerMessage: "Connecting to chat…",
  },
  disconnected: {
    label: "Offline",
    tone: "error",
    bannerMessage: "You are offline. Messages will send when reconnected.",
  },
};

export function getConnectionBannerMessage(status: ConnectionStatus): string | undefined {
  return CONNECTION_STATUS_CONFIG[status].bannerMessage;
}

export function isChatReady(state: {
  connectionStatus: ConnectionStatus;
  isJoined: boolean;
}): boolean {
  return state.connectionStatus === "connected" && state.isJoined;
}
