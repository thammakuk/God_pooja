import { useRouter } from "expo-router";
import { useLanguage } from "../contexts/LanguageContext";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function LanguageScreen() {
  const router = useRouter();
  const { setLanguage } = useLanguage();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>భాష ఎంచుకోండి</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={async () => {
            await setLanguage("te");
            router.replace("/home");
          }}
        >
          <Text style={styles.primaryText}>తెలుగు</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={async () => {
            await setLanguage("en");
            router.replace("/home");
          }}
        >
          <Text style={styles.secondaryText}>English</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 40,
    color: "#222",
  },
  primaryButton: {
    backgroundColor: "#F4A261",
    width: "80%",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#F4A261",
    width: "80%",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  secondaryText: {
    color: "#F4A261",
    fontSize: 18,
    fontWeight: "500",
  },
});
