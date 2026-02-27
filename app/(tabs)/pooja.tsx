import { useRouter } from "expo-router";
import { useLanguage } from "../../contexts/LanguageContext";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

type PoojaItem = {
  id: number;
  key: string;
  en: string;
  te: string;
};

const poojaList: PoojaItem[] = [
  { id: 1, key: "Ganesh", en: "Ganesh", te: "గణేశుడు" },
  { id: 2, key: "Lakshmi", en: "Lakshmi", te: "లక్ష్మీదేవి" },
  { id: 3, key: "Shiva", en: "Shiva", te: "శివుడు" },
  { id: 4, key: "Hanuman", en: "Hanuman", te: "హనుమంతుడు" },
  { id: 5, key: "Saraswati", en: "Saraswati", te: "సరస్వతి" },
];

export default function PoojaScreen() {
  const router = useRouter();
  const { language } = useLanguage();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{language === "te" ? "పూజల జాబితా" : "Pooja List"}</Text>

      {poojaList.map((pooja) => (
        <TouchableOpacity
          key={pooja.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/pooja/[id]",
              params: { id: pooja.key },
            })
          }
        >
          <Text style={styles.cardText}>{language === "te" ? pooja.te : pooja.en}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#F4A261",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
  },
  cardText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
