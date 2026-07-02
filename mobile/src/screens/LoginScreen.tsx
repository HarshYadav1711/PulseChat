import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { USERNAME_MAX_LENGTH } from "@/config/constants";
import { useSession } from "@/context/SessionContext";
import type { RootStackParamList } from "@/navigation/types";
import { colors, radii, spacing, typography } from "@/theme";
import { createUserId } from "@/utils/createUserId";
import {
  getUsernameValidationMessage,
  isValidUsername,
  normalizeUsername,
} from "@/utils/usernameValidation";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: LoginScreenProps) {
  const { setSession } = useSession();
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const canContinue = isValidUsername(username);

  function handleContinue() {
    if (!canContinue) {
      setError(getUsernameValidationMessage());
      return;
    }

    setError(null);
    setSession({
      userId: createUserId(),
      username: normalizeUsername(username),
    });
    navigation.replace("Chat");
  }

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.content}>
          <Text style={styles.title} accessibilityRole="header">
            PulseChat
          </Text>
          <Text style={styles.subtitle}>
            Choose a display name to enter the chat. No password required.
          </Text>

          <Text style={styles.label} nativeID="username-label">
            Display name
          </Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(value) => {
              setUsername(value);
              if (error) {
                setError(null);
              }
            }}
            placeholder="Your name"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={USERNAME_MAX_LENGTH}
            onSubmitEditing={handleContinue}
            returnKeyType="done"
            accessibilityLabel="Display name"
            accessibilityLabelledBy="username-label"
          />

          {error ? (
            <Text style={styles.error} accessibilityRole="alert">
              {error}
            </Text>
          ) : null}

          <View style={styles.buttonContainer}>
            <PrimaryButton
              label="Continue"
              onPress={handleContinue}
              disabled={!canContinue}
              accessibilityHint="Creates a session and opens the chat"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  label: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  error: {
    ...typography.caption,
    color: colors.error,
    marginBottom: spacing.md,
  },
  buttonContainer: {
    marginTop: spacing.sm,
  },
});
