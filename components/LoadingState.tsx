import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS, SPACING } from "../constants/theme";

export default function LoadingState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🍳</Text>
      </View>

      <ActivityIndicator
        size="large"
        color={COLORS.primary}
        style={styles.spinner}
      />

      <Text style={styles.title}>Finding recipes...</Text>

      <Text style={styles.subtitle}>
        AI is checking what you can cook.
      </Text>
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
    backgroundColor: "#FFF1E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.lg,
  },

  icon: {
    fontSize: 40,
  },

  spinner: {
    marginBottom: SPACING.lg,
  },

  title: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: SPACING.sm,
  },

  subtitle: {
    color: COLORS.mutedText,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
  },
});
