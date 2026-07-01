import { useCallback } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { ChatBubble } from "@/components/ChatBubble";
import { ChatEmptyState } from "@/components/ChatEmptyState";
import { LoadingView } from "@/components/ui/LoadingView";
import { useAutoScrollToEnd } from "@/hooks/useAutoScrollToEnd";
import { spacing } from "@/theme";
import type { ConnectionStatus, Message } from "@/types";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  connectionStatus: ConnectionStatus;
}

export function MessageList({ messages, currentUserId, connectionStatus }: MessageListProps) {
  const listRef = useAutoScrollToEnd<Message>(messages.length);
  const isInitialLoad = connectionStatus === "connecting" && messages.length === 0;

  const renderItem: ListRenderItem<Message> = useCallback(
    ({ item }) => (
      <ChatBubble message={item} isOwnMessage={item.userId === currentUserId} />
    ),
    [currentUserId],
  );

  return (
    <FlatList
      ref={listRef}
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={[
        styles.content,
        (messages.length === 0 || isInitialLoad) && styles.contentCentered,
      ]}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        isInitialLoad ? (
          <LoadingView message="Connecting to chat…" />
        ) : (
          <ChatEmptyState />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    flexGrow: 1,
  },
  contentCentered: {
    justifyContent: "center",
  },
});
