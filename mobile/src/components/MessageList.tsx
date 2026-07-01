import { useCallback } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { ChatBubble } from "@/components/ChatBubble";
import { ChatEmptyState } from "@/components/ChatEmptyState";
import { LoadingView } from "@/components/ui/LoadingView";
import { useAutoScrollToEnd } from "@/hooks/useAutoScrollToEnd";
import { spacing } from "@/theme";
import type { Message } from "@/types";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  isLoadingHistory: boolean;
}

export function MessageList({ messages, currentUserId, isLoadingHistory }: MessageListProps) {
  const { listRef, scrollToEnd } = useAutoScrollToEnd<Message>(messages.length);

  const renderItem: ListRenderItem<Message> = useCallback(
    ({ item }) => (
      <ChatBubble message={item} isOwnMessage={item.userId === currentUserId} />
    ),
    [currentUserId],
  );

  return (
    <FlatList
      ref={listRef}
      style={styles.list}
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={[
        styles.content,
        (messages.length === 0 || isLoadingHistory) && styles.contentCentered,
      ]}
      keyboardShouldPersistTaps="handled"
      onContentSizeChange={scrollToEnd}
      initialNumToRender={20}
      windowSize={11}
      ListEmptyComponent={
        isLoadingHistory ? (
          <LoadingView message="Connecting to chat…" />
        ) : (
          <ChatEmptyState />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    flexGrow: 1,
  },
  contentCentered: {
    justifyContent: "center",
  },
});
