import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Recipe() {
  const { id } = useLocalSearchParams();
  console.log("id", id);
  return (
    <View>
      <Text>Recipe: {id}</Text>
    </View>
  );
}
