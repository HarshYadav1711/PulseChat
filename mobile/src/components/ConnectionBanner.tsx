import { StyleSheet, Text, View } from "react-native";
import { getConnectionBannerMessage } from "@/config/connectionStatus";
import { colors, spacing, typography } from "@/theme";
import type { ConnectionStatus } from "@/types";

interface ConnectionBannerProps {
  status: ConnectionStatus;
}

export function ConnectionBanner({ status }: ConnectionBannerProps) {
  const message = getConnectionBannerMessage(status);

  if (!message) {
    return null;
  }

  return (
    <View
      style={styles.container}
      accessibilityRole="text"
      accessibilityLiveRegion="polite"
      accessibilityLabel={message}
    >
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
