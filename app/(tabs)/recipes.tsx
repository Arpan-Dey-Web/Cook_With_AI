import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import RecipeCard from "../components/RecipeCard";
import { MOCK_RECIPES } from "../constants/mockRecipes";
import { COLORS, SPACING } from "../constants/theme";

export default function RecipesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={MOCK_RECIPES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Recipe Ideas</Text>

            <Text style={styles.subtitle}>
              Here are some recipes you can make
              with your ingredients.
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
});