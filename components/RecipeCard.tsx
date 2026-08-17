import { Pressable, StyleSheet, Text, View } from "react-native";
import { Recipe } from "../types/recipe";
import { COLORS, SPACING } from "../constants/theme";

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
}

export default function RecipeCard({
  recipe,
  onPress,
}: RecipeCardProps) {
  const missingIngredients = recipe.ingredients.filter(
    (ingredient) => !ingredient.available && !ingredient.optional
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{recipe.name}</Text>

          <Text style={styles.description} numberOfLines={2}>
            {recipe.description}
          </Text>
        </View>

        <View style={styles.matchBadge}>
          <Text style={styles.matchText}>
            {recipe.matchPercentage}%
          </Text>
          <Text style={styles.matchLabel}>Match</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>⏱</Text>
          <Text style={styles.metaText}>
            {recipe.cookingTime} min
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>●</Text>
          <Text style={styles.metaText}>
            {recipe.difficulty}
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>👥</Text>
          <Text style={styles.metaText}>
            {recipe.servings}
          </Text>
        </View>
      </View>

      {missingIngredients.length > 0 && (
        <View style={styles.missingContainer}>
          <Text style={styles.missingTitle}>
            Missing:
          </Text>

          <Text style={styles.missingText} numberOfLines={1}>
            {missingIngredients
              .map((ingredient) => ingredient.name)
              .join(", ")}
          </Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.viewText}>
          View Recipe
        </Text>

        <Text style={styles.arrow}>→</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    gap: SPACING.md,
  },

  pressed: {
    opacity: 0.75,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.md,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "700",
  },

  description: {
    marginTop: SPACING.xs,
    color: COLORS.mutedText,
    fontSize: 13,
    lineHeight: 19,
  },

  matchBadge: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: "#FFF1E8",
    alignItems: "center",
    justifyContent: "center",
  },

  matchText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "800",
  },

  matchLabel: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "600",
  },

  metaRow: {
    flexDirection: "row",
    gap: SPACING.lg,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  metaIcon: {
    fontSize: 13,
    color: COLORS.mutedText,
  },

  metaText: {
    color: COLORS.mutedText,
    fontSize: 12,
    fontWeight: "500",
  },

  missingContainer: {
    backgroundColor: "#FFF7ED",
    borderRadius: 12,
    padding: SPACING.sm,
  },

  missingTitle: {
    color: COLORS.warning,
    fontSize: 12,
    fontWeight: "700",
  },

  missingText: {
    marginTop: 2,
    color: COLORS.mutedText,
    fontSize: 12,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  viewText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
  },

  arrow: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "600",
  },
});