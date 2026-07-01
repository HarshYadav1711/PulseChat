import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "@/theme";
import type { ConnectionStatus } from "@/types";

interface ConnectionIndicatorProps {
  status: ConnectionStatus;
}

const STATUS_CONFIG: Record<
  ConnectionStatus,
  { label: string; dotColor: string; textColor: string }
> = {
  connected: {
    label: "Connected",
    dotColor: colors.success,
    textColor: colors.textSecondary,
  },
  connecting: {
    label: "Connecting",
    dotColor: colors.warning,
    textColor: colors.textSecondary,
  },
  disconnected: {
    label: "Offline",
    dotColor: colors.error,
    textColor: colors.textSecondary,
  },
};

export function ConnectionIndicator({ status }: ConnectionIndicatorProps) {
  const config = STATUS_CONFIG[status];

  return (
    <View style={styles.container}>
      <View style={[styles.dot, { backgroundColor: config.dotColor }]} />
      <Text style={[styles.label, { color: config.textColor }]}>{config.label}</Text>
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
  },
});
