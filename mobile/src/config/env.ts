import { Platform } from "react-native";

function getDefaultServerUrl(): string {
  if (Platform.OS === "android") {
    // Android emulator maps host localhost to 10.0.2.2
    return "http://10.0.2.2:3001";
  }

  // iOS simulator can reach the host via localhost.
  // Physical devices require EXPO_PUBLIC_SERVER_URL set to the dev machine IP.
  return "http://localhost:3001";
}

export const env = {
  serverUrl: process.env.EXPO_PUBLIC_SERVER_URL ?? getDefaultServerUrl(),
} as const;
