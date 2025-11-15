import React from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Explore() {
  const openLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert("Cannot open link", "No app can handle this URL.");
        return;
      }
      await Linking.openURL(url);
    } catch (e) {
      console.log("Link open error:", e);
      Alert.alert("Error", "Unable to open link.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Explore Wellness</Text>
      <Text style={styles.subtitle}>
        Learn helpful techniques to improve your mental well-being.
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          // curated relaxing music channel (YouTube)
          openLink("https://www.youtube.com/c/YellowBrickCinema")
        }
      >
        <Text style={styles.cardTitle}>🎶 Relaxing Music</Text>
        <Text style={styles.cardDesc}>
          Soothing playlists and long-play music for relaxation and sleep.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          // guided breathing exercises (search results / many good videos)
          openLink(
            "https://www.youtube.com/results?search_query=guided+breathing+exercises+for+anxiety"
          )
        }
      >
        <Text style={styles.cardTitle}>🌿 Breathing Exercises</Text>
        <Text style={styles.cardDesc}>
          Short guided breathing practices to reduce stress and ground yourself.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          // authoritative mindfulness resources
          openLink("https://www.mindful.org/")
        }
      >
        <Text style={styles.cardTitle}>🧘 Mindfulness Tips</Text>
        <Text style={styles.cardDesc}>
          Articles, guided meditations and daily practices to improve focus and calm.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          // curated talks and expert discussions on mental health
          openLink("https://www.ted.com/topics/mental+health")
        }
      >
        <Text style={styles.cardTitle}>📘 Mental Health Talks</Text>
        <Text style={styles.cardDesc}>
          Expert-backed talks, personal stories and podcasts about mental wellbeing.
        </Text>
      </TouchableOpacity>

      <View style={{ height: 60 }} />
    </ScrollView>
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
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 18,
    borderRadius: 12,
    marginTop: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#38bdf8",
  },
  cardDesc: {
    fontSize: 14,
    color: "#cbd5e1",
    marginTop: 6,
  },
});