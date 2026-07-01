import { StyleSheet, Text, View } from "react-native";
import { CONNECTION_STATUS_CONFIG } from "@/config/connectionStatus";
import { colors, spacing, typography } from "@/theme";
import type { ConnectionStatus } from "@/types";

interface ConnectionIndicatorProps {
  status: ConnectionStatus;
}

export function ConnectionIndicator({ status }: ConnectionIndicatorProps) {
  const { label, dotColor } = CONNECTION_STATUS_CONFIG[status];

  return (
    <View
      style={styles.container}
      accessibilityRole="text"
      accessibilityLabel={`Connection status: ${label}`}
    >
      <View style={[styles.dot, { backgroundColor: dotColor }]} accessibilityElementsHidden />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
