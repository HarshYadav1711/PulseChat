import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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

    const sent = onSend(text);

    if (sent) {
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
        onSubmitEditing={handleSend}
        blurOnSubmit={false}
      />
      <Pressable
        style={[styles.button, !canSend && styles.buttonDisabled]}
        onPress={handleSend}
        disabled={!canSend}
      >
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>
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
  button: {
    minWidth: 72,
    height: 44,
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
  },
  buttonDisabled: {
    backgroundColor: colors.textMuted,
  },
  buttonText: {
    ...typography.button,
    color: colors.accentText,
  },
});
