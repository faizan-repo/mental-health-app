import { View, Text } from "react-native";

export default function MoodScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Mood Tracker</Text>
    </View>
  );
}