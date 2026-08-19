import { Stack } from "expo-router";
import { RecipeProvider } from "../contexts/RecipeContext";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  return (
    <RecipeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="recipe/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </RecipeProvider>
  );
}
