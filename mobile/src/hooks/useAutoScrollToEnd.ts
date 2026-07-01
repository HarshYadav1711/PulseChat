import { useEffect, useRef } from "react";
import type { FlatList } from "react-native";

export function useAutoScrollToEnd<T>(itemCount: number) {
  const listRef = useRef<FlatList<T>>(null);

  useEffect(() => {
    if (itemCount > 0) {
      listRef.current?.scrollToEnd({ animated: true });
    }
  }, [itemCount]);

  return listRef;
}
