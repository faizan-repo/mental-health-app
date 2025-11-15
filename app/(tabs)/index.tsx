import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MindScan</Text>
      <Text style={styles.subtitle}>Your AI-powered mental wellness companion</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Welcome 👋</Text>
        <Text style={styles.cardText}>
          Track your emotions, analyze your mood, and explore helpful resources.
        </Text>
      </View>

      <View style={styles.section}>
        <Pressable style={styles.button} onPress={() => router.push("/(tabs)/scan")}>
          <Text style={styles.buttonText}>Start Mood Scan</Text>
        </Pressable>

        <Pressable style={styles.buttonSecondary} onPress={() => router.push("/mood-history")}>
          <Text style={styles.buttonSecondaryText}>View Mood History</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1720",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    marginTop: 4,
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
  cardText: {
    color: "#cbd5e1",
    marginTop: 6,
    lineHeight: 20,
  },
  section: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#06b6d4",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    textAlign: "center",
    color: "#00171f",
    fontWeight: "700",
  },
  buttonSecondary: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#38bdf8",
  },
  buttonSecondaryText: {
    textAlign: "center",
    color: "#38bdf8",
    fontWeight: "700",
  },
});