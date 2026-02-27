import { Stack } from "expo-router";
import { LanguageProvider } from "../contexts/LanguageContext";

export default function Layout() {
  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="language" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </LanguageProvider>
  );
}
