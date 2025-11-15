import { View, Text, StyleSheet, FlatList } from "react-native";

export default function MoodTracker() {
  // Dummy mood history — looks real for hackathon
  const moodData = [
    { id: "1", date: "Today", mood: "Neutral" },
    { id: "2", date: "Yesterday", mood: "Happy" },
    { id: "3", date: "2 days ago", mood: "Sad" },
    { id: "4", date: "3 days ago", mood: "Stressed" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood History</Text>
      <Text style={styles.subtitle}>
        Track how your emotional state changed over time
      </Text>

      <FlatList
        data={moodData}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardDate}>{item.date}</Text>
            <Text style={styles.cardMood}>{item.mood}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  cardDate: {
    fontSize: 16,
    color: "#cbd5e1",
  },
  cardMood: {
    fontSize: 20,
    marginTop: 4,
    fontWeight: "700",
    color: "#38bdf8",
  },
});