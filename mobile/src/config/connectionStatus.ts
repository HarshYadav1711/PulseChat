import { colors } from "@/theme";
import type { ConnectionStatus } from "@/types";

export interface ConnectionStatusConfig {
  label: string;
  dotColor: string;
  bannerMessage?: string;
}

export const CONNECTION_STATUS_CONFIG: Record<ConnectionStatus, ConnectionStatusConfig> = {
  connected: {
    label: "Connected",
    dotColor: colors.success,
  },
  connecting: {
    label: "Connecting",
    dotColor: colors.warning,
    bannerMessage: "Connecting to chat…",
  },
  disconnected: {
    label: "Offline",
    dotColor: colors.error,
    bannerMessage: "You are offline. Messages will send when reconnected.",
  },
};

export function getConnectionBannerMessage(status: ConnectionStatus): string | undefined {
  return CONNECTION_STATUS_CONFIG[status].bannerMessage;
}

export function isChatReady(status: ConnectionStatus): boolean {
  return status === "connected";
}
