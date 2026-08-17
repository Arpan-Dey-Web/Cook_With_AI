import { useState } from "react";
import { useRouter } from "expo-router";
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import IngredientChip from "../../components/IngredientChip";
import IngredientInput from "../../components/IngredientInput";
import { COLORS, SPACING } from "../../constants/theme";
import {
  isDuplicateIngredient,
  normalizeIngredient,
} from "../../utils/ingredients";
export default function HomeScreen() {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
const router = useRouter();
  const handleAddIngredient = () => {
    const normalized = normalizeIngredient(ingredientInput);

    if (!normalized) {
      return;
    }

    if (isDuplicateIngredient(ingredients, normalized)) {
      Alert.alert(
        "Already added",
        `${normalized} is already in your ingredients.`
      );
      return;
    }

    setIngredients((current) => [...current, normalized]);
    setIngredientInput("");
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredients((current) =>
      current.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  };

const handleFindRecipes = () => {
  if (ingredients.length === 0) {
    return;
  }

  Keyboard.dismiss();

  router.push("/recipes");
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>🍳</Text>
          </View>

          <Text style={styles.title}>Cook With AI</Text>

          <Text style={styles.tagline}>
            Tell us what you have.{"\n"}
            We'll tell you what to cook.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            What ingredients do you have?
          </Text>

          <IngredientInput
            value={ingredientInput}
            onChangeText={setIngredientInput}
            onAdd={handleAddIngredient}
          />
        </View>

        {ingredients.length > 0 && (
          <View style={styles.section}>
            <View style={styles.ingredientsHeader}>
              <Text style={styles.sectionTitle}>Your ingredients</Text>

              <Text style={styles.count}>
                {ingredients.length}
              </Text>
            </View>

            <View style={styles.chipsContainer}>
              {ingredients.map((ingredient) => (
                <IngredientChip
                  key={ingredient}
                  ingredient={ingredient}
                  onRemove={() => handleRemoveIngredient(ingredient)}
                />
              ))}
            </View>
          </View>
        )}

        <View style={styles.bottomSection}>
          <Pressable
            disabled={ingredients.length === 0}
            onPress={handleFindRecipes}
            style={({ pressed }) => [
              styles.findButton,
              ingredients.length === 0 && styles.findButtonDisabled,
              pressed && ingredients.length > 0 && styles.pressed,
            ]}
          >
            <Text style={styles.findButtonText}>
              Find Recipes
            </Text>

            <Text style={styles.findButtonIcon}>🍳</Text>
          </Pressable>

          <Text style={styles.footerText}>
            Powered by AI • Cook with what you have
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },

  hero: {
    alignItems: "center",
    marginTop: SPACING.lg,
    marginBottom: SPACING.xxl,
  },

  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: "#FFF1E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
  },

  logo: {
    fontSize: 36,
  },

  title: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.8,
  },

  tagline: {
    marginTop: SPACING.sm,
    color: COLORS.mutedText,
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
  },

  section: {
    marginBottom: SPACING.xl,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: SPACING.md,
  },

  ingredientsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  count: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFF1E8",
    color: COLORS.primary,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 13,
    fontWeight: "700",
  },

  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },

  bottomSection: {
    marginTop: "auto",
    paddingTop: SPACING.lg,
  },

  findButton: {
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
  },

  findButtonDisabled: {
    opacity: 0.45,
  },

  findButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  findButtonIcon: {
    fontSize: 18,
  },

  footerText: {
    marginTop: SPACING.md,
    color: COLORS.mutedText,
    textAlign: "center",
    fontSize: 12,
  },

  pressed: {
    opacity: 0.75,
  },
});