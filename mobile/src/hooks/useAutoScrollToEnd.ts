import { useCallback, useEffect, useRef } from "react";
import type { FlatList } from "react-native";

export function useAutoScrollToEnd<T>(itemCount: number) {
  const listRef = useRef<FlatList<T>>(null);

  const scrollToEnd = useCallback(() => {
    if (itemCount > 0) {
      listRef.current?.scrollToEnd({ animated: true });
    }
  }, [itemCount]);

  useEffect(() => {
    scrollToEnd();
  }, [scrollToEnd]);

  return { listRef, scrollToEnd };
}
