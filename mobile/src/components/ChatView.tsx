import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { ChatHeader } from "@/components/ChatHeader";
import { ConnectionBanner } from "@/components/ConnectionBanner";
import { MessageList } from "@/components/MessageList";
import { TypingArea } from "@/components/TypingArea";
import type { ConnectionStatus, Message, Session } from "@/types";

interface ChatViewProps {
  session: Session;
  connectionStatus: ConnectionStatus;
  isJoined: boolean;
  messages: Message[];
  onLeave: () => void;
  onSend: (text: string) => boolean;
}

export function ChatView({
  session,
  connectionStatus,
  isJoined,
  messages,
  onLeave,
  onSend,
}: ChatViewProps) {
  const isLoadingHistory = !isJoined;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
    >
      <ChatHeader
        username={session.username}
        connectionStatus={connectionStatus}
        onLeave={onLeave}
      />

      <ConnectionBanner status={connectionStatus} />

      <MessageList
        messages={messages}
        currentUserId={session.userId}
        isLoadingHistory={isLoadingHistory}
      />

      <TypingArea onSend={onSend} connectionStatus={connectionStatus} isJoined={isJoined} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
