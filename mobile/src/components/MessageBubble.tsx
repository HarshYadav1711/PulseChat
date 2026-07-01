import { StyleSheet, Text, View } from "react-native";
import type { Message } from "../types";
import { formatTimestamp } from "../utils/formatTimestamp";

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

export function MessageBubble({ message, isOwnMessage }: MessageBubbleProps) {
  return (
    <View style={[styles.row, isOwnMessage ? styles.rowOwn : styles.rowOther]}>
      <View style={[styles.bubble, isOwnMessage ? styles.bubbleOwn : styles.bubbleOther]}>
        {!isOwnMessage && <Text style={styles.username}>{message.username}</Text>}
        <Text style={[styles.text, isOwnMessage ? styles.textOwn : styles.textOther]}>
          {message.text}
        </Text>
        <Text style={[styles.timestamp, isOwnMessage ? styles.timestampOwn : styles.timestampOther]}>
          {formatTimestamp(message.timestamp)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 12,
    flexDirection: "row",
  },
  rowOwn: {
    justifyContent: "flex-end",
  },
  rowOther: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "80%",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleOwn: {
    backgroundColor: "#2563EB",
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: "#F1F5F9",
    borderBottomLeftRadius: 4,
  },
  username: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  textOwn: {
    color: "#FFFFFF",
  },
  textOther: {
    color: "#0F172A",
  },
  timestamp: {
    fontSize: 11,
    marginTop: 6,
  },
  timestampOwn: {
    color: "#BFDBFE",
    textAlign: "right",
  },
  timestampOther: {
    color: "#64748B",
  },
});
