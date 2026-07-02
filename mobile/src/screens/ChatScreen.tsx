import { useCallback, useEffect } from "react";
import { Alert, BackHandler, Platform, StyleSheet, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChatView } from "@/components/ChatView";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { ChatProvider, useChat } from "@/context/ChatContext";
import { useSession } from "@/context/SessionContext";
import type { RootStackParamList } from "@/navigation/types";
import type { Session } from "@/types";

type ChatScreenProps = NativeStackScreenProps<RootStackParamList, "Chat">;

interface ChatScreenContentProps {
  session: Session;
  onLeave: () => void;
}

function ChatScreenContent({ session, onLeave }: ChatScreenContentProps) {
  const { messages, connectionStatus, isJoined, sendMessage } = useChat();

  return (
    <ChatView
      session={session}
      connectionStatus={connectionStatus}
      isJoined={isJoined}
      messages={messages}
      onLeave={onLeave}
      onSend={sendMessage}
    />
  );
}

export function ChatScreen({ navigation }: ChatScreenProps) {
  const { session, setSession } = useSession();

  useEffect(() => {
    if (!session) {
      navigation.replace("Login");
    }
  }, [navigation, session]);

  const leaveChat = useCallback(() => {
    setSession(null);
    navigation.replace("Login");
  }, [navigation, setSession]);

  const confirmLeave = useCallback(() => {
    if (Platform.OS === "web") {
      if (window.confirm("Leave chat? You will return to the login screen.")) {
        leaveChat();
      }
      return;
    }

    Alert.alert("Leave chat?", "You will return to the login screen.", [
      { text: "Cancel", style: "cancel" },
      { text: "Leave", style: "destructive", onPress: leaveChat },
    ]);
  }, [leaveChat]);

  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }

    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      confirmLeave();
      return true;
    });

    return () => {
      subscription.remove();
    };
  }, [confirmLeave]);

  if (!session) {
    return null;
  }

  return (
    <ScreenContainer edges={["top"]}>
      <View style={styles.content}>
        <ChatProvider session={session}>
          <ChatScreenContent session={session} onLeave={leaveChat} />
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
