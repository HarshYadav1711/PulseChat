import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BootstrapScreen } from "@/screens/BootstrapScreen";
import type { RootStackParamList } from "@/navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Bootstrap" component={BootstrapScreen} />
    </Stack.Navigator>
  );
}
