import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";
import { colors } from "@/theme";

interface ScreenContainerProps {
  children: ReactNode;
  edges?: Edge[];
}

export function ScreenContainer({ children, edges }: ScreenContainerProps) {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={edges}>
        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
