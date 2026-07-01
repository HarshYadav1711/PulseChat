import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MessageInput } from "@/components/MessageInput";
import { colors, spacing } from "@/theme";

interface TypingAreaProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function TypingArea({ onSend, disabled = false }: TypingAreaProps) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
    >
      <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
        <MessageInput onSend={onSend} disabled={disabled} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
