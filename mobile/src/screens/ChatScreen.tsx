import { useCallback, useEffect, useState } from "react";
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { MessageInput } from "../components/MessageInput";
import { MessageList } from "../components/MessageList";
import {
  connectChatSocket,
  disconnectChatSocket,
  onHistory,
  onNewMessage,
  onSocketError,
  sendMessage,
} from "../services/socket";
import type { Message, Session } from "../types";

interface ChatScreenProps {
  session: Session;
  onLogout: () => void;
}

export function ChatScreen({ session, onLogout }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = connectChatSocket(session.user);

    function handleConnect() {
      setIsConnected(true);
    }

    function handleDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    setIsConnected(socket.connected);

    const unsubscribeHistory = onHistory((history) => {
      setMessages(history);
    });

    const unsubscribeMessage = onNewMessage((message) => {
      setMessages((current) => {
        if (current.some((item) => item.id === message.id)) {
          return current;
        }

        return [...current, message];
      });
    });

    const unsubscribeError = onSocketError((message) => {
      Alert.alert("Chat error", message);
    });

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      unsubscribeHistory();
      unsubscribeMessage();
      unsubscribeError();
      disconnectChatSocket();
    };
  }, [session.user]);

  const handleSend = useCallback(
    async (text: string) => {
      sendMessage(session.user, text);
    },
    [session.user],
  );

  function confirmLogout() {
    Alert.alert("Leave chat?", "You will return to the login screen.", [
      { text: "Cancel", style: "cancel" },
      { text: "Leave", style: "destructive", onPress: onLogout },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>PulseChat</Text>
          <Text style={styles.headerSubtitle}>
            Signed in as {session.user.username}
            {!isConnected ? " · reconnecting..." : ""}
          </Text>
        </View>
        <Pressable onPress={confirmLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Leave</Text>
        </Pressable>
      </View>

      <View style={styles.messages}>
        <MessageList messages={messages} currentUserId={session.user.id} />
      </View>

      <MessageInput onSend={handleSend} disabled={!isConnected} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  logoutText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "600",
  },
  messages: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
});
