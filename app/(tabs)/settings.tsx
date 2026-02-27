import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings ⚙</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/language")}
      >
        <Text style={styles.buttonText}>Change Language</Text>
      </TouchableOpacity>

      <Text style={styles.info}>Mana Pooja App v1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#F4A261",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  info: {
    fontSize: 14,
    color: "#777",
  },
});
