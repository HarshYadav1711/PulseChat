import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MessageInput } from "@/components/MessageInput";
import { isChatReady } from "@/config/connectionStatus";
import { colors, spacing } from "@/theme";
import type { ConnectionStatus } from "@/types";

interface TypingAreaProps {
  onSend: (text: string) => boolean;
  connectionStatus: ConnectionStatus;
  isJoined: boolean;
}

export function TypingArea({ onSend, connectionStatus, isJoined }: TypingAreaProps) {
  const insets = useSafeAreaInsets();
  const disabled = !isChatReady({ connectionStatus, isJoined });

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      <MessageInput onSend={onSend} disabled={disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
