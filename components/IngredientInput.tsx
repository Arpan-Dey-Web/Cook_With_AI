import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS, SPACING } from "../constants/theme";

interface IngredientInputProps {
  value: string;
  onChangeText: (value: string) => void;
  onAdd: () => void;
}

export default function IngredientInput({
  value,
  onChangeText,
  onAdd,
}: IngredientInputProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="e.g. chicken, egg, onion..."
          placeholderTextColor={COLORS.mutedText}
          style={styles.input}
          returnKeyType="done"
          onSubmitEditing={onAdd}
          autoCapitalize="words"
        />

        <Pressable
          onPress={onAdd}
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      <Text style={styles.helper}>
        Add ingredients you currently have.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: SPACING.sm,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    paddingLeft: SPACING.md,
    paddingRight: SPACING.sm,
    minHeight: 56,
  },

  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
  },

  addButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  pressed: {
    opacity: 0.7,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "500",
    lineHeight: 26,
  },

  helper: {
    color: COLORS.mutedText,
    fontSize: 12,
  },
});