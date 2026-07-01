import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radii, spacing, typography } from "@/theme";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  accessibilityHint?: string;
  compact?: boolean;
}

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  accessibilityHint,
  compact = false,
}: PrimaryButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      style={[
        styles.base,
        compact ? styles.compact : styles.default,
        disabled && styles.disabled,
        isPressed && !disabled && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
  },
  default: {
    height: 52,
    paddingHorizontal: spacing.lg,
  },
  compact: {
    minWidth: 72,
    height: 44,
    paddingHorizontal: spacing.lg,
  },
  disabled: {
    backgroundColor: colors.textMuted,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    ...typography.button,
    color: colors.accentText,
  },
});
