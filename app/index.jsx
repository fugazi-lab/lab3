import axios from "axios";
import { useState } from "react";
import { ActivityIndicator, Button, Image, Platform, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const STABILITY_API_KEY = "sk-OPDmXYRev2pJhSTEaapA1wYbimjmWCFaRdNDfxWoaSnEyl6w";

  const generateImage = async () => {
    if (!prompt.trim()) return;

    if (Platform.OS === "web") {
      alert("Image generation only works on mobile apps");
      return;
    }

    setLoading(true);
    setImageUri(null);

    try {
      const payload = {
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 1024, 
        width: 1024,  
      };

      const response = await axios.post(
        "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
        payload,
        {
          headers: {
            Authorization: `Bearer ${STABILITY_API_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          responseType: "json",
        }
      );

      const base64Img = response.data.artifacts?.[0]?.base64;

      if (base64Img) {
        setImageUri(`data:image/png;base64,${base64Img}`);
      } else {
        console.log("Image generation error:", response.data);
        alert("No image returned. Check your API key or prompt.");
      }
    } catch (err) {
      console.log("Image generation error:", err.response?.data || err.message);
      alert("Failed to generate image. See console for details.");
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Enter your prompt..."
        value={prompt}
        onChangeText={setPrompt}
        style={{
          borderWidth: 1,
          padding: 12,
          marginVertical: 20,
          borderRadius: 8,
        }}
      />

      <Button title="Generate Image" onPress={generateImage} disabled={loading} />

      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" />
          <Text style={{ textAlign: "center", marginTop: 10 }}>Generating...</Text>
        </View>
      )}

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: "100%", height: 350, marginTop: 20 }}
          resizeMode="contain"
        />
      )}
    </SafeAreaView>
  );
}
