import { useColorScheme } from "@/presentation/theme/hooks/useColorScheme.web";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");

  const [loaded] = useFonts({
    KanitRegular: require("../assets/fonts/Kanit-Regular.ttf"),
    KanitBolt: require("../assets/fonts/Kanit-Bold.ttf"),
    KanitThin: require("../assets/fonts/Kanit-Thin.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView
      style={{ backgroundColor: backgroundColor, flex: 1 }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            {" "}
          </Stack>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
