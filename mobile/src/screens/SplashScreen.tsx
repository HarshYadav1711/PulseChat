import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SPLASH_DURATION_MS } from "@/config/constants";
import type { RootStackParamList } from "@/navigation/types";
import { colors, radii, spacing, typography } from "@/theme";

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, "Splash">;

export function SplashScreen({ navigation }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, SPLASH_DURATION_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <ScreenContainer edges={["top"]}>
      <View style={styles.content} accessibilityRole="text" accessibilityLabel="PulseChat loading">
        <View style={styles.mark}>
          <Text style={styles.markText}>P</Text>
        </View>
        <Text style={styles.title} accessibilityRole="header">
          PulseChat
        </Text>
        <Text style={styles.subtitle}>Simple real-time messaging</Text>
        <ActivityIndicator
          style={styles.spinner}
          size="small"
          color={colors.accent}
          accessibilityLabel="Loading"
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  mark: {
    width: 64,
    height: 64,
    borderRadius: radii.lg,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  markText: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.accentText,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  spinner: {
    marginTop: spacing.sm,
  },
});
