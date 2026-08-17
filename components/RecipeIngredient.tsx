import { StyleSheet, Text, View } from "react-native";

import { RecipeIngredient as RecipeIngredientType } from "../types/recipe";
import { COLORS, SPACING } from "../constants/theme";

interface RecipeIngredientProps {
  ingredient: RecipeIngredientType;
}

export default function RecipeIngredient({
  ingredient,
}: RecipeIngredientProps) {
  const isAvailable = ingredient.available;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.status,
          isAvailable
            ? styles.availableStatus
            : styles.missingStatus,
        ]}
      >
        <Text style={styles.statusIcon}>
          {isAvailable ? "✓" : "!"}
        </Text>
      </View>

      <View style={styles.info}>
        <Text
          style={[
            styles.name,
            !isAvailable && styles.missingName,
          ]}
        >
          {ingredient.name}
        </Text>

        <Text style={styles.quantity}>
          {ingredient.quantity}
        </Text>
      </View>

      {!isAvailable && (
        <Text style={styles.missingLabel}>
          Missing
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
  },

  status: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.md,
  },

  availableStatus: {
    backgroundColor: "#DCFCE7",
  },

  missingStatus: {
    backgroundColor: "#FEF3C7",
  },

  statusIcon: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },

  info: {
    flex: 1,
  },

  name: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "600",
  },

  missingName: {
    color: COLORS.warning,
  },

  quantity: {
    marginTop: 2,
    color: COLORS.mutedText,
    fontSize: 12,
  },

  missingLabel: {
    color: COLORS.warning,
    fontSize: 11,
    fontWeight: "700",
  },
});