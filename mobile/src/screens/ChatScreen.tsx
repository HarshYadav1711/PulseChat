import { useCallback, useEffect } from "react";
import { Alert, BackHandler, StyleSheet, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChatHeader } from "@/components/ChatHeader";
import { ConnectionBanner } from "@/components/ConnectionBanner";
import { MessageList } from "@/components/MessageList";
import { TypingArea } from "@/components/TypingArea";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { ChatProvider, useChat } from "@/context/ChatContext";
import { useSession } from "@/context/SessionContext";
import type { RootStackParamList } from "@/navigation/types";
import type { Session } from "@/types";

type ChatScreenProps = NativeStackScreenProps<RootStackParamList, "Chat">;

interface ChatViewProps {
  session: Session;
  onLeave: () => void;
}

function ChatView({ session, onLeave }: ChatViewProps) {
  const { messages, connectionStatus, isJoined, sendMessage } = useChat();
  const isLoadingHistory = !isJoined;

  return (
    <>
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

      <TypingArea
        onSend={sendMessage}
        connectionStatus={connectionStatus}
        isJoined={isJoined}
      />
    </>
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

  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      handleLeave();
      return true;
    });

    return () => {
      subscription.remove();
    };
  }, [handleLeave]);

  if (!session) {
    return null;
  }

  return (
    <ScreenContainer edges={["top"]}>
      <View style={styles.content}>
        <ChatProvider session={session}>
          <ChatView session={session} onLeave={handleLeave} />
        </ChatProvider>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
