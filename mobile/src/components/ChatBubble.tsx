import { StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing, typography } from "@/theme";
import type { Message } from "@/types";
import { formatTimestamp } from "@/utils/formatTimestamp";

interface ChatBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

export function ChatBubble({ message, isOwnMessage }: ChatBubbleProps) {
  return (
    <View style={[styles.row, isOwnMessage ? styles.rowOwn : styles.rowOther]}>
      <View style={[styles.bubble, isOwnMessage ? styles.bubbleOwn : styles.bubbleOther]}>
        {!isOwnMessage ? <Text style={styles.username}>{message.username}</Text> : null}
        <Text style={[styles.text, isOwnMessage ? styles.textOwn : styles.textOther]}>
          {message.text}
        </Text>
        <Text
          style={[styles.timestamp, isOwnMessage ? styles.timestampOwn : styles.timestampOther]}
        >
          {formatTimestamp(message.timestamp)}
        </Text>
      </View>
    </View>
  );
}

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
    color: "#BFDBFE",
    textAlign: "right",
  },
  timestampOther: {
    color: colors.textMuted,
  },
});
