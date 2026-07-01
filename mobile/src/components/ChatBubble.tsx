import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing, typography } from "@/theme";
import type { Message } from "@/types";
import { formatTimestamp } from "@/utils/formatTimestamp";

interface ChatBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

function ChatBubbleComponent({ message, isOwnMessage }: ChatBubbleProps) {
  const timestamp = formatTimestamp(message.timestamp);
  const accessibilityLabel = isOwnMessage
    ? `You said ${message.text}${timestamp ? `, ${timestamp}` : ""}`
    : `${message.username} said ${message.text}${timestamp ? `, ${timestamp}` : ""}`;

  return (
    <View
      style={[styles.row, isOwnMessage ? styles.rowOwn : styles.rowOther]}
      accessible
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel}
    >
      <View
        style={[styles.bubble, isOwnMessage ? styles.bubbleOwn : styles.bubbleOther]}
        importantForAccessibility="no-hide-descendants"
      >
        {!isOwnMessage ? <Text style={styles.username}>{message.username}</Text> : null}
        <Text style={[styles.text, isOwnMessage ? styles.textOwn : styles.textOther]}>
          {message.text}
        </Text>
        {timestamp ? (
          <Text
            style={[styles.timestamp, isOwnMessage ? styles.timestampOwn : styles.timestampOther]}
          >
            {timestamp}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

export const ChatBubble = memo(ChatBubbleComponent);

const styles = StyleSheet.create({
  row: {
    marginBottom: spacing.md,
    flexDirection: "row",
  },
  rowOwn: {
    justifyContent: "flex-end",
  },
  rowOther: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "82%",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radii.lg,
  },
  bubbleOwn: {
    backgroundColor: colors.bubbleOwn,
    borderBottomRightRadius: radii.sm,
  },
  bubbleOther: {
    backgroundColor: colors.bubbleOther,
    borderWidth: 1,
    borderColor: colors.bubbleOtherBorder,
    borderBottomLeftRadius: radii.sm,
  },
  username: {
    ...typography.caption,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  text: {
    ...typography.body,
  },
  textOwn: {
    color: colors.accentText,
  },
  textOther: {
    color: colors.textPrimary,
  },
  timestamp: {
    ...typography.caption,
    marginTop: spacing.sm,
  },
  timestampOwn: {
    color: colors.bubbleOwnTimestamp,
    textAlign: "right",
  },
  timestampOther: {
    color: colors.textMuted,
  },
});
