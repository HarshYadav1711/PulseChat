import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "@/theme";
import type { ConnectionStatus } from "@/types";

interface ConnectionBannerProps {
  status: ConnectionStatus;
}

const BANNER_MESSAGES: Partial<Record<ConnectionStatus, string>> = {
  connecting: "Reconnecting… Messages will sync when back online.",
  disconnected: "You are offline. Messages will send when reconnected.",
};

export function ConnectionBanner({ status }: ConnectionBannerProps) {
  const message = BANNER_MESSAGES[status];

  if (!message) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accentMuted,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  text: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
