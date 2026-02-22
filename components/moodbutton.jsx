//reusable button component for moods
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function MoodButton({ mood, onClick }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onClick(mood)}>
      <Text style={styles.text}>{mood}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#6c5ce7",
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
