import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ChatScreen } from "./src/screens/ChatScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import type { Session } from "./src/types";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  return (
    <>
      <StatusBar style="dark" />
      {session ? (
        <ChatScreen session={session} onLogout={() => setSession(null)} />
      ) : (
        <LoginScreen onLoginSuccess={setSession} />
      )}
    </>
  );
}
