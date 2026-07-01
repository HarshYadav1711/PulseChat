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
  return (
    <Pressable
      style={[styles.base, compact ? styles.compact : styles.default, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
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
  label: {
    ...typography.button,
    color: colors.accentText,
  },
});
