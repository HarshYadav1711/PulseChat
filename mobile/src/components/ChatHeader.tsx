import { Pressable, StyleSheet, Text, View } from "react-native";
import { ConnectionIndicator } from "@/components/ConnectionIndicator";
import { colors, spacing, typography } from "@/theme";
import type { ConnectionStatus } from "@/types";

interface ChatHeaderProps {
  username: string;
  connectionStatus: ConnectionStatus;
  onLeave?: () => void;
}

export function ChatHeader({ username, connectionStatus, onLeave }: ChatHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title} accessibilityRole="header">
          PulseChat
        </Text>
        <Text style={styles.subtitle}>Signed in as {username}</Text>
        <ConnectionIndicator status={connectionStatus} />
      </View>
      {onLeave ? (
        <Pressable
          onPress={onLeave}
          style={styles.leaveButton}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Leave chat"
          accessibilityHint="Returns to the login screen"
        >
          <Text style={styles.leaveText}>Leave</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  leaveButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  leaveText: {
    ...typography.label,
    color: colors.error,
  },
});
