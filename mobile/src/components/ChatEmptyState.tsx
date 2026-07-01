import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "@/theme";

export function ChatEmptyState() {
  return (
    <View style={styles.container} accessibilityRole="text">
      <Text style={styles.title}>No messages yet</Text>
      <Text style={styles.subtitle}>Send a message to start the conversation.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
