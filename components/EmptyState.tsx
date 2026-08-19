import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, SPACING } from "../constants/theme";

interface EmptyStateProps {
  message?: string;
  onAddMore?: () => void;
}

export default function EmptyState({
  message = "No good recipes found.\nTry adding a few more ingredients to get better suggestions.",
  onAddMore,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🍽️</Text>
      </View>

      <Text style={styles.title}>No recipes found</Text>

      <Text style={styles.message}>{message}</Text>

      {onAddMore && (
        <Pressable
          onPress={onAddMore}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>
            ← Add More Ingredients
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.xl,
  },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "#FFF7ED",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.lg,
  },

  icon: {
    fontSize: 40,
  },

  title: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: SPACING.sm,
  },

  message: {
    color: COLORS.mutedText,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: SPACING.lg,
  },

  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
  },

  pressed: {
    opacity: 0.75,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
