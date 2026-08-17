import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, SPACING } from "../constants/theme";

interface IngredientChipProps {
  ingredient: string;
  onRemove: () => void;
}

export default function IngredientChip({
  ingredient,
  onRemove,
}: IngredientChipProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{ingredient}</Text>

      <Pressable
        onPress={onRemove}
        accessibilityLabel={`Remove ${ingredient}`}
        hitSlop={8}
      >
        <Text style={styles.remove}>×</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 999,
    backgroundColor: "#FFF1E8",
    borderWidth: 1,
    borderColor: "#FED7AA",
  },

  text: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "500",
  },

  remove: {
    color: COLORS.mutedText,
    fontSize: 18,
    lineHeight: 18,
  },
});