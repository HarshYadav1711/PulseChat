import { Platform } from "react-native";

function getDefaultServerUrl(): string {
  if (Platform.OS === "android") {
    return "http://10.0.2.2:3001";
  }

  return "http://localhost:3001";
}

export const env = {
  serverUrl: process.env.EXPO_PUBLIC_SERVER_URL ?? getDefaultServerUrl(),
} as const;
