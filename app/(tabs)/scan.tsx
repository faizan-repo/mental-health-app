import { useState, useRef } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<any>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>No camera access!</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const captured = await cameraRef.current.takePictureAsync();
      setPhoto(captured.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!photo ? (
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing="front"
        />
      ) : (
        <Image source={{ uri: photo }} style={{ flex: 1 }} />
      )}

      <View style={styles.buttons}>
        {!photo ? (
          <Button title="Capture" onPress={takePicture} />
        ) : (
          <>
            <Button title="Retake" onPress={() => setPhoto(null)} />
            <Button title="Analyze Mood" onPress={() => {}} />
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
  },
});