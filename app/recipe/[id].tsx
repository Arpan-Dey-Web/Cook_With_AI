import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  Stack,
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import RecipeIngredient from "../../components/RecipeIngredient";
import { COLORS, SPACING } from "../../constants/theme";
import { useRecipeContext } from "../../contexts/RecipeContext";

export default function Recipe() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { recipes } = useRecipeContext();

  const recipe = recipes.find((item) => item.id === id);

  if (!recipe) {
    return (
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "left", "right", "bottom"]}
      >
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundTitle}>
            Recipe not found
          </Text>

          <Pressable
            onPress={() => router.replace("/recipes")}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>
              ← Go Back
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const missingIngredients = recipe.ingredients.filter(
    (ingredient) =>
      !ingredient.available && !ingredient.optional
  );

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right", "bottom"]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Fixed Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={8}
        >
          <Text style={styles.backIcon}>←</Text>
        </Pressable>

        <Text style={styles.headerTitle}>
          Recipe Details
        </Text>

        {/* Keeps the title centered */}
        <View style={styles.headerSpacer} />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Recipe Hero */}
        <View style={styles.hero}>
          <View style={styles.recipeIcon}>
            <Text style={styles.recipeEmoji}>🍳</Text>
          </View>

          <Text style={styles.title}>
            {recipe.name}
          </Text>

          <Text style={styles.description}>
            {recipe.description}
          </Text>
        </View>

        {/* Recipe Info */}
        <View style={styles.metaCard}>
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>⏱</Text>

            <Text style={styles.metaValue}>
              {recipe.cookingTime} min
            </Text>

            <Text style={styles.metaLabel}>
              Time
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>●</Text>

            <Text style={styles.metaValue}>
              {recipe.difficulty}
            </Text>

            <Text style={styles.metaLabel}>
              Difficulty
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>👥</Text>

            <Text style={styles.metaValue}>
              {recipe.servings}
            </Text>

            <Text style={styles.metaLabel}>
              Servings
            </Text>
          </View>
        </View>

        {/* Ingredient Match */}
        <View style={styles.matchCard}>
          <View style={styles.matchInfo}>
            <Text style={styles.matchTitle}>
              Ingredient Match
            </Text>

            <Text style={styles.matchDescription}>
              How much of this recipe you can make
            </Text>
          </View>

          <Text style={styles.matchPercentage}>
            {recipe.matchPercentage}%
          </Text>
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Ingredients
          </Text>

          <Text style={styles.sectionSubtitle}>
            Everything you'll need
          </Text>

          <View style={styles.ingredientsCard}>
            {recipe.ingredients.map((ingredient) => (
              <RecipeIngredient
                key={ingredient.name}
                ingredient={ingredient}
              />
            ))}
          </View>
        </View>

        {/* Missing Ingredients */}
        {missingIngredients.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Missing Ingredients
            </Text>

            <View style={styles.warningCard}>
              <Text style={styles.warningIcon}>
                ⚠️
              </Text>

              <View style={styles.warningContent}>
                <Text style={styles.warningTitle}>
                  You don't have these
                </Text>

                {missingIngredients.map(
                  (ingredient) => (
                    <Text
                      key={ingredient.name}
                      style={styles.warningItem}
                    >
                      • {ingredient.name} —{" "}
                      {ingredient.quantity}
                    </Text>
                  )
                )}
              </View>
            </View>
          </View>
        )}

        {/* Substitutions */}
        {recipe.substitutions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Possible Substitutions
            </Text>

            {recipe.substitutions.map(
              (substitution) => (
                <View
                  key={substitution.missingIngredient}
                  style={styles.substitutionCard}
                >
                  <Text
                    style={styles.substitutionMissing}
                  >
                    {substitution.missingIngredient}
                  </Text>

                  <Text style={styles.substitutionArrow}>
                    →
                  </Text>

                  <Text
                    style={
                      styles.substitutionAlternative
                    }
                  >
                    {substitution.alternative}
                  </Text>
                </View>
              )
            )}
          </View>
        )}

        {/* Cooking Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Cooking Instructions
          </Text>

          <Text style={styles.sectionSubtitle}>
            Follow these steps
          </Text>

          <View style={styles.instructions}>
            {recipe.instructions.map(
              (instruction, index) => (
                <View
                  key={`${recipe.id}-step-${index}`}
                  style={styles.instructionRow}
                >
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>
                      {index + 1}
                    </Text>
                  </View>

                  <Text style={styles.instructionText}>
                    {instruction}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>

        {/* Chef Tip */}
        {recipe.chefTip && (
          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>💡</Text>

            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>
                Chef Tip
              </Text>

              <Text style={styles.tipText}>
                {recipe.chefTip}
              </Text>
            </View>
          </View>
        )}

        {/* Extra bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.background,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "600",
  },

  headerTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
  },

  headerSpacer: {
    width: 42,
  },

  content: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },

  hero: {
    alignItems: "center",
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
  },

  recipeIcon: {
    width: 84,
    height: 84,
    borderRadius: 28,
    backgroundColor: "#FFF1E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
  },

  recipeEmoji: {
    fontSize: 42,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },

  description: {
    marginTop: SPACING.sm,
    color: COLORS.mutedText,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    maxWidth: 340,
  },

  metaCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    paddingVertical: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  metaItem: {
    alignItems: "center",
    minWidth: 75,
  },

  metaIcon: {
    fontSize: 15,
    color: COLORS.primary,
    marginBottom: 4,
  },

  metaValue: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
  },

  metaLabel: {
    color: COLORS.mutedText,
    fontSize: 11,
    marginTop: 2,
  },

  divider: {
    width: 1,
    height: 38,
    backgroundColor: COLORS.border,
  },

  matchCard: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderRadius: 18,
    backgroundColor: "#FFF1E8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  matchInfo: {
    flex: 1,
  },

  matchTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
  },

  matchDescription: {
    marginTop: 3,
    color: COLORS.mutedText,
    fontSize: 11,
  },

  matchPercentage: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "800",
  },

  section: {
    marginTop: SPACING.xl,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "800",
  },

  sectionSubtitle: {
    marginTop: 4,
    color: COLORS.mutedText,
    fontSize: 12,
  },

  ingredientsCard: {
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
  },

  warningCard: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderRadius: 18,
    backgroundColor: "#FFF7ED",
    flexDirection: "row",
    gap: SPACING.md,
  },

  warningIcon: {
    fontSize: 20,
  },

  warningContent: {
    flex: 1,
  },

  warningTitle: {
    color: COLORS.warning,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 5,
  },

  warningItem: {
    color: COLORS.mutedText,
    fontSize: 13,
    lineHeight: 21,
  },

  substitutionCard: {
    marginTop: SPACING.sm,
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },

  substitutionMissing: {
    color: COLORS.warning,
    fontSize: 13,
    fontWeight: "700",
    flexShrink: 1,
  },

  substitutionArrow: {
    color: COLORS.mutedText,
    fontSize: 16,
  },

  substitutionAlternative: {
    flex: 1,
    color: COLORS.text,
    fontSize: 13,
  },

  instructions: {
    marginTop: SPACING.lg,
    gap: SPACING.lg,
  },

  instructionRow: {
    flexDirection: "row",
    gap: SPACING.md,
  },

  stepNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  stepNumberText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  instructionText: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 22,
    paddingTop: 4,
  },

  tipCard: {
    marginTop: SPACING.xl,
    padding: SPACING.md,
    borderRadius: 18,
    backgroundColor: "#FFFBEB",
    flexDirection: "row",
    gap: SPACING.md,
  },

  tipIcon: {
    fontSize: 22,
  },

  tipContent: {
    flex: 1,
  },

  tipTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "800",
  },

  tipText: {
    marginTop: 4,
    color: COLORS.mutedText,
    fontSize: 13,
    lineHeight: 20,
  },

  bottomSpacing: {
    height: SPACING.xl,
  },

  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.lg,
  },

  notFoundTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: SPACING.lg,
  },

  backButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
  },
});
