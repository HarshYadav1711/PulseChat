import { Platform } from "react-native";

/**
 * Default server URL for local development.
 * - Android emulator: 10.0.2.2 maps to the host machine's localhost
 * - iOS simulator / web: localhost works directly
 *
 * Override with EXPO_PUBLIC_SERVER_URL when testing on a physical device
 * (use your machine's LAN IP, e.g. http://192.168.1.10:3001).
 */
function getDefaultServerUrl(): string {
  if (Platform.OS === "android") {
    return "http://10.0.2.2:3001";
  }

  return "http://localhost:3001";
}

export const env = {
  serverUrl: process.env.EXPO_PUBLIC_SERVER_URL ?? getDefaultServerUrl(),
} as const;
