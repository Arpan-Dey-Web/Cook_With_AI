import { useEffect } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import EmptyState from "../../components/EmptyState";
import LoadingState from "../../components/LoadingState";
import RecipeCard from "../../components/RecipeCard";
import { COLORS, SPACING } from "../../constants/theme";
import { useRecipeContext } from "../../contexts/RecipeContext";
import { generateRecipes } from "../../services/recipeService";

export default function RecipesScreen() {
  const router = useRouter();
  const {
    ingredients,
    recipes,
    setRecipes,
    loading,
    setLoading,
    error,
    setError,
  } = useRecipeContext();

  useEffect(() => {
    console.log("[RECIPES] useEffect - ingredients:", ingredients, "recipes:", recipes.length, "loading:", loading);
    if (recipes.length > 0 || loading) return;
    if (ingredients.length === 0) return;

    let cancelled = false;

    async function fetchRecipes() {
      setLoading(true);
      setError(null);

      try {
        console.log("[RECIPES] Fetching recipes for:", ingredients);
        const result = await generateRecipes(ingredients);
        if (!cancelled) {
          console.log("[RECIPES] Got", result.length, "recipes");
          setRecipes(result);
        }
      } catch (err) {
        console.error("[RECIPES] Error:", err);
        if (!cancelled) {
          const msg =
            err instanceof Error
              ? err.message
              : "Something went wrong.";
          setError(msg);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchRecipes();

    return () => {
      cancelled = true;
    };
  }, [ingredients]);

  const handleGoHome = () => {
    router.push("/");
  };

  if (ingredients.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <EmptyState
          message="No ingredients provided. Go back and add some ingredients first."
          onAddMore={handleGoHome}
        />
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LoadingState />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>

          <Text style={styles.errorTitle}>
            Couldn't generate recipes
          </Text>

          <Text style={styles.errorMessage}>{error}</Text>

          <Pressable
            onPress={handleGoHome}
            style={({ pressed }) => [
              styles.errorButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.errorButtonText}>
              ← Add More Ingredients
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (recipes.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <EmptyState onAddMore={handleGoHome} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Recipe Ideas</Text>

            <Text style={styles.subtitle}>
              Based on:{" "}
              {ingredients
                .map(
                  (i) =>
                    i.charAt(0).toUpperCase() + i.slice(1)
                )
                .join(" • ")}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() =>
              router.push(`/recipe/${item.id}`)
            }
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },

  header: {
    marginBottom: SPACING.lg,
  },

  title: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: SPACING.sm,
    color: COLORS.mutedText,
    fontSize: 14,
    lineHeight: 21,
  },

  separator: {
    height: SPACING.md,
  },

  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.xl,
  },

  errorIcon: {
    fontSize: 48,
    marginBottom: SPACING.lg,
  },

  errorTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: SPACING.sm,
  },

  errorMessage: {
    color: COLORS.mutedText,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: SPACING.lg,
  },

  errorButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
  },

  pressed: {
    opacity: 0.75,
  },

  errorButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
