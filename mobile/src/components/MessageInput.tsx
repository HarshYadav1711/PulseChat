import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { MESSAGE_MAX_LENGTH } from "@/config/constants";
import { colors, radii, spacing, typography } from "@/theme";
import { isValidMessageText } from "@/utils/messageValidation";

interface MessageInputProps {
  onSend: (text: string) => boolean;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [text, setText] = useState("");
  const canSend = isValidMessageText(text) && !disabled;

  function handleSend() {
    if (!canSend) {
      return;
    }

    if (onSend(text)) {
      setText("");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Write a message"
        placeholderTextColor={colors.textMuted}
        multiline
        maxLength={MESSAGE_MAX_LENGTH}
        editable={!disabled}
        blurOnSubmit={false}
        accessibilityLabel="Message input"
        accessibilityHint="Type your message and press send"
      />
      <PrimaryButton
        label="Send"
        onPress={handleSend}
        disabled={!canSend}
        compact
        accessibilityHint="Sends the current message"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.md,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    ...typography.body,
    color: colors.textPrimary,
  },
});
