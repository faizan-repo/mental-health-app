import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // expo vector icons

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563eb", // active color (blue)
        tabBarInactiveTintColor: "#94a3b8", // inactive color (gray)
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size ?? 20} color={color} />,
        }}
      />

      <Tabs.Screen
        name="mood"
        options={{
          title: "Mood Tracker",
          tabBarIcon: ({ color, size }) => <Ionicons name="happy" size={size ?? 20} color={color} />,
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan Face",
          tabBarIcon: ({ color, size }) => <Ionicons name="camera" size={size ?? 20} color={color} />,
        }}
      />

      {/* keep the existing explore tab if you have one */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => <Ionicons name="compass" size={size ?? 20} color={color} />,
        }}
      />
    </Tabs>
  );
}