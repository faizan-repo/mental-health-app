import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";

export default function ScanScreen() {
  const cameraRef = useRef(null);

  const [facing, setFacing] = useState<CameraType>("front");
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  async function capturePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,       // required for emotion detection API
        quality: 0.5,       // reduce size for faster upload
      });

      console.log("Captured:", photo.uri);
      console.log("base64 length:", photo.base64?.length);

      alert("Photo captured! (Now we will add emotion detection next)");
    }
  }

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Checking camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>No camera permission</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.btn}>
          <Text style={{ color: "#fff" }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing} />

      <View style={styles.captureContainer}>
        <TouchableOpacity style={styles.captureBtn} onPress={capturePhoto}>
          <Text style={styles.captureText}>Capture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  captureContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  captureBtn: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: "#2563eb",
    borderRadius: 10,
  },
  captureText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});