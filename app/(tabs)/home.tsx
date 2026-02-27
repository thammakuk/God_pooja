import { useLanguage } from "../../contexts/LanguageContext";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const { language } = useLanguage();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {language === "te" ? (
        <Text style={{ fontSize: 18 }}>మన పూజ కు స్వాగతం 🙏</Text>
      ) : (
        <Text style={{ fontSize: 18 }}>Welcome to Mana Pooja 🙏</Text>
      )}
    </View>
  );
}
