import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";

const API_KEY = "h8iUo6POywKS3dCpXrM5p3WDBaMNDjxh";
const API_SECRET = "r6tdaapY9ndWD4i8KV1Oi50J7VPX6yG9";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [cameraKey, setCameraKey] = useState(0);
  const cameraRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  if (!permission) return <View><Text>Loading camera…</Text></View>;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>No camera access</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  // ---------------- CAPTURE IMAGE ----------------
  const takePicture = async () => {
    if (!cameraRef.current) return;

    const captured = await cameraRef.current.takePictureAsync({
      base64: true,
      quality: 0.3,  // << IMPORTANT FIX
    });

    setPhoto(captured.uri);
    setBase64Image(captured.base64); // << IMPORTANT FIX
  };

  // ---------------- ANALYZE MOOD ----------------
  const analyzeMood = async () => {
    if (!base64Image) {
      Alert.alert("No photo", "Please capture a photo first.");
      return;
    }

    try {
      setLoading(true);

      // USE EU SERVER (BEST FOR INDIA)
      const url =
        `https://api-eu.faceplusplus.com/facepp/v3/detect?api_key=${API_KEY}&api_secret=${API_SECRET}&return_attributes=emotion`;

      // try sending as multipart/form-data (safer than huge base64 in body)
      const form = new FormData();
      form.append("api_key", API_KEY);
      form.append("api_secret", API_SECRET);
      form.append("return_attributes", "emotion");
      form.append("image_file", {
        uri: photo,
        name: "photo.jpg",
        type: "image/jpeg",
      } as any);

      // use the constructed url and fall back to other region hosts if 404
      const endpoints = [
        `https://api-eu.faceplusplus.com/facepp/v3/detect`,
        `https://api-us.faceplusplus.com/facepp/v3/detect`,
        `https://api-cn.faceplusplus.com/facepp/v3/detect`,
      ];
      let resp: Response | null = null;
      let textResponse = "";
      for (const endpoint of endpoints) {
        resp = await fetch(endpoint, {
          method: "POST",
          body: form,
          headers: { Accept: "application/json" },
        });
        textResponse = await resp.text();
        console.log("Tried", endpoint, "status:", resp.status, resp.statusText);
        console.log("raw response:", textResponse);
        if (resp.status !== 404) break; // try next only on 404
      }

      if (!resp) {
        Alert.alert("API Error", "No response from Face++ endpoints.");
        return;
      }
      if (!resp.ok) {
        Alert.alert("API Error", `Face++ returned ${resp.status}`);
        return;
      }

      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (e) {
        console.log("Invalid JSON:", textResponse);
        Alert.alert("API Error", "Face++ sent invalid response.");
        return;
      }

      console.log("Face++ response:", data);

      if (!data.faces || data.faces.length === 0) {
        Alert.alert("No face detected", "Try again.");
        return;
      }

      const emotions: Record<string, number> =
        data.faces[0].attributes.emotion;

      const sorted = Object.entries(emotions).sort((a, b) => b[1] - a[1]);

      // build readable top-3 with percentages
      const top3 = sorted.slice(0, 3).map(([k, v]) => `${k}: ${v.toFixed(1)}%`).join("\n");

      // optional: only show single label if very confident
      const topScore = sorted[0][1];
      if (topScore >= 50) {
        Alert.alert("Mood Result", `You seem: ${sorted[0][0]}\n\nTop emotions:\n${top3}`);
      } else {
        Alert.alert("Mood Result (ambiguous)", `Top emotions:\n${top3}`);
      }

    } catch (err) {
      console.log("Mood API Error:", err);
      Alert.alert("Error", "Something went wrong during mood analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!photo ? (
        // force remount when cameraKey changes to avoid stale native camera instance
        <CameraView key={cameraKey} style={{ flex: 1 }} ref={cameraRef} facing="front" />
      ) : (
        <Image source={{ uri: photo }} style={{ flex: 1 }} />
      )}

      <View style={styles.buttons}>
        {!photo ? (
          <Button title="Capture" onPress={takePicture} />
        ) : (
          <>
            <Button
              title="Retake"
              onPress={() => {
                // clear photo/base64 and force camera remount
                setPhoto(null);
                setBase64Image(null);
                setLoading(false);
                // clear ref and bump key to remount CameraView
                try { cameraRef.current = null; } catch { }
                setCameraKey((k) => k + 1);
              }}
            />
            <Button
              title={loading ? "Analyzing…" : "Analyze Mood"}
              onPress={analyzeMood}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  buttons: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    gap: 10,
  },
});