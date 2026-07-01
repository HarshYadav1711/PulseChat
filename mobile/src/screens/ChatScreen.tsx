import { useCallback, useEffect, useRef } from "react";
import { Alert, FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChatBubble } from "@/components/ChatBubble";
import { ChatHeader } from "@/components/ChatHeader";
import { ConnectionBanner } from "@/components/ConnectionBanner";
import { TypingArea } from "@/components/TypingArea";
import { ChatProvider } from "@/context/ChatContext";
import { useSession } from "@/context/SessionContext";
import { useChat } from "@/hooks/useChat";
import type { RootStackParamList } from "@/navigation/types";
import { colors, spacing, typography } from "@/theme";
import type { Message, Session } from "@/types";

type ChatScreenProps = NativeStackScreenProps<RootStackParamList, "Chat">;

interface ChatViewProps {
  session: Session;
  onLeave: () => void;
}

function ChatView({ session, onLeave }: ChatViewProps) {
  const listRef = useRef<FlatList<Message>>(null);
  const { messages, connectionStatus, sendMessage } = useChat();

  useEffect(() => {
    if (messages.length > 0) {
      listRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages.length]);

  const renderItem: ListRenderItem<Message> = useCallback(
    ({ item }) => <ChatBubble message={item} isOwnMessage={item.userId === session.userId} />,
    [session.userId],
  );

  return (
    <>
      <ChatHeader
        username={session.username}
        connectionStatus={connectionStatus}
        onLeave={onLeave}
      />

      <ConnectionBanner status={connectionStatus} />

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          messages.length === 0 && styles.listContentEmpty,
        ]}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No messages yet</Text>
            <Text style={styles.emptySubtitle}>Send a message to start the conversation.</Text>
          </View>
        }
      />

      <TypingArea onSend={sendMessage} disabled={connectionStatus !== "connected"} />
    </>
  );
}

interface ChatScreenContentProps {
  session: Session;
  onLeave: () => void;
}

function ChatScreenContent({ session, onLeave }: ChatScreenContentProps) {
  return (
    <ChatProvider session={session}>
      <ChatView session={session} onLeave={onLeave} />
    </ChatProvider>
  );
}

export function ChatScreen({ navigation }: ChatScreenProps) {
  const { session, setSession } = useSession();

  useEffect(() => {
    if (!session) {
      navigation.replace("Login");
    }
  }, [navigation, session]);

  const handleLeave = useCallback(() => {
    Alert.alert("Leave chat?", "You will return to the login screen.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Leave",
        style: "destructive",
        onPress: () => {
          setSession(null);
          navigation.replace("Login");
        },
      },
    ]);
  }, [navigation, setSession]);

  if (!session) {
    return null;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]}>
        <View style={styles.safeArea}>
          <ChatScreenContent session={session} onLeave={handleLeave} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    flexGrow: 1,
  },
  listContentEmpty: {
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    ...typography.heading,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
