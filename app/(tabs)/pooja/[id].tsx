import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../../../contexts/LanguageContext";

type Language = "en" | "te";

type LocalizedContent = {
  description: string;
  mantra: string;
  poojaSteps: string[];
};

type DeityInfo = {
  image: ImageSourcePropType;
  title: string;
  en: LocalizedContent;
  te: LocalizedContent;
};

const deityData: Record<string, DeityInfo> = {
  Lakshmi: {
    image: require("../../assets/images/lakshmi.png"),
    title: "Lakshmi",
    en: {
      description: "Goddess Lakshmi blesses wealth, prosperity, and abundance.",
      mantra: "Om Shreem Mahalakshmiyei Namah",
      poojaSteps: [
        "Clean the pooja place and light a lamp.",
        "Offer flowers to Goddess Lakshmi.",
        "Offer turmeric, kumkum, and akshata.",
        "Offer prasadam and pray with devotion.",
        "Chant the mantra 11 or 21 times.",
        "Perform aarti and share prasadam.",
      ],
    },
    te: {
      description: "శ్రీ లక్ష్మీదేవి ఐశ్వర్యం, సంపద, సౌభాగ్యం ప్రసాదించే దేవి.",
      mantra: "ఓం శ్రీం మహాలక్ష్మ్యై నమః",
      poojaSteps: [
        "పూజా స్థలాన్ని శుభ్రపరచి దీపం వెలిగించండి.",
        "లక్ష్మీదేవి చిత్రానికి పుష్పాలు సమర్పించండి.",
        "కుంకుమ, పసుపు, అక్షతలు సమర్పించండి.",
        "నైవేద్యం సమర్పించి ప్రార్థన చేయండి.",
        "మంత్రాన్ని 11 లేదా 21 సార్లు జపించండి.",
        "ఆరతి చేసి ప్రసాదం పంచండి.",
      ],
    },
  },
  Ganesh: {
    image: require("../../assets/images/ganesh.png"),
    title: "Ganesh",
    en: {
      description: "Lord Ganesh removes obstacles and grants wisdom and success.",
      mantra: "Om Gam Ganapataye Namah",
      poojaSteps: [
        "Light a lamp and bow before Lord Ganesh.",
        "Offer durva grass and flowers.",
        "Offer modak or laddu as prasadam.",
        "Chant the mantra at least 11 times.",
        "Perform aarti and conclude the prayer.",
      ],
    },
    te: {
      description: "శ్రీ గణేశుడు విఘ్నాలను తొలగించి జ్ఞానం మరియు విజయాన్ని ప్రసాదిస్తాడు.",
      mantra: "ఓం గం గణపతయే నమః",
      poojaSteps: [
        "దీపం వెలిగించి గణపతి ముందు నమస్కరించండి.",
        "దుర్వా, పుష్పాలు సమర్పించండి.",
        "మోదకం లేదా లడ్డూ నైవేద్యంగా పెట్టండి.",
        "మంత్రాన్ని కనీసం 11 సార్లు జపించండి.",
        "ఆరతి చేసి ప్రార్థన ముగించండి.",
      ],
    },
  },
  Shiva: {
    image: require("../../assets/images/shiva.png"),
    title: "Shiva",
    en: {
      description: "Lord Shiva represents inner peace, power, and transformation.",
      mantra: "Om Namah Shivaya",
      poojaSteps: [
        "Offer water or milk abhishekam to Shiva.",
        "Offer bilva leaves and flowers.",
        "Offer sandalwood and akshata.",
        "Chant the mantra 11 or 108 times.",
        "Perform deeparadhana and pray.",
      ],
    },
    te: {
      description: "పరమశివుడు శాంతి, శక్తి, ఆత్మజ్ఞానం ప్రసాదించే దేవుడు.",
      mantra: "ఓం నమః శివాయ",
      poojaSteps: [
        "శివలింగానికి నీరు లేదా పాలు అభిషేకం చేయండి.",
        "బిల్వ దళాలు, పుష్పాలు సమర్పించండి.",
        "చందనం, అక్షతలు అర్పించండి.",
        "మంత్రాన్ని 11 లేదా 108 సార్లు జపించండి.",
        "దీపారాధన చేసి నమస్కారం చేయండి.",
      ],
    },
  },
  Hanuman: {
    image: require("../../assets/images/hanuman.png"),
    title: "Hanuman",
    en: {
      description: "Lord Hanuman grants strength, courage, and devotion.",
      mantra: "Om Hanumate Namah",
      poojaSteps: [
        "Light a lamp and offer sindoor to Hanuman.",
        "Offer fruits or vada as prasadam.",
        "Recite Hanuman Chalisa or chant the mantra.",
        "Perform aarti and seek protection.",
      ],
    },
    te: {
      description: "శ్రీ హనుమంతుడు బలం, ధైర్యం, భక్తి ప్రసాదించే దేవుడు.",
      mantra: "ఓం హనుమతే నమః",
      poojaSteps: [
        "దీపం వెలిగించి హనుమాన్ చిత్రానికి సింధూరం అర్పించండి.",
        "వడలు లేదా పండ్లు నైవేద్యంగా సమర్పించండి.",
        "హనుమాన్ చాలీసా లేదా మంత్రం జపించండి.",
        "ఆరతి చేసి రక్షణ కోసం ప్రార్థించండి.",
      ],
    },
  },
  Saraswati: {
    image: require("../../assets/images/saraswati.png"),
    title: "Saraswati",
    en: {
      description: "Goddess Saraswati blesses knowledge, learning, and arts.",
      mantra: "Om Aim Saraswatyai Namah",
      poojaSteps: [
        "Light a lamp near books or musical instruments.",
        "Offer white flowers.",
        "Chant the mantra 11 or 21 times.",
        "Offer prasadam and perform aarti.",
        "Pray for wisdom and clarity.",
      ],
    },
    te: {
      description: "శ్రీ సరస్వతి దేవి విద్య, జ్ఞానం, కళలను ప్రసాదించే దేవి.",
      mantra: "ఓం ఐం సరస్వత్యై నమః",
      poojaSteps: [
        "పుస్తకాలు లేదా వాద్యాల దగ్గర దీపం వెలిగించండి.",
        "తెల్ల పుష్పాలు సమర్పించండి.",
        "మంత్రాన్ని 11 లేదా 21 సార్లు జపించండి.",
        "నైవేద్యం సమర్పించి ఆరతి చేయండి.",
        "విద్యలో విజయానికి ప్రార్థించండి.",
      ],
    },
  },
};

const normalizedKeyMap = Object.keys(deityData).reduce<Record<string, string>>(
  (acc, key) => {
    acc[key.toLowerCase()] = key;
    return acc;
  },
  {}
);

export default function PoojaDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const { language } = useLanguage();
  const [count, setCount] = useState(0);

  const deity = useMemo(() => {
    const slug = Array.isArray(id) ? id[0] : id;
    if (!slug) return null;

    const canonicalKey = normalizedKeyMap[slug.toLowerCase()];
    return canonicalKey ? deityData[canonicalKey] : null;
  }, [id]);

  const safeLanguage: Language = language === "te" ? "te" : "en";
  const content = deity?.[safeLanguage] ?? deity?.en ?? deity?.te;
  const chantKey = deity ? `chant_${deity.title}` : null;

  useEffect(() => {
    const loadCount = async () => {
      if (!chantKey) {
        setCount(0);
        return;
      }

      const saved = await AsyncStorage.getItem(chantKey);
      const parsed = saved ? Number(saved) : 0;
      setCount(Number.isFinite(parsed) ? parsed : 0);
    };

    loadCount();
  }, [chantKey]);

  const onChant = async () => {
    if (!chantKey) return;
    const next = count + 1;
    setCount(next);
    await AsyncStorage.setItem(chantKey, String(next));
  };

  const onReset = async () => {
    if (!chantKey) return;
    setCount(0);
    await AsyncStorage.setItem(chantKey, "0");
  };

  if (!deity || !content) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>Not Found</Text>
        <Text style={styles.notFoundText}>Requested deity page is unavailable.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Image source={deity.image} style={styles.image} />

        <Text style={styles.title}>{deity.title}</Text>

        <Text style={styles.sectionTitle}>{safeLanguage === "te" ? "వివరణ" : "Description"}</Text>
        <Text style={styles.description}>{content.description}</Text>

        <Text style={styles.sectionTitle}>{safeLanguage === "te" ? "మంత్రం" : "Mantra"}</Text>
        <Text style={styles.mantra}>{content.mantra}</Text>

        <Text style={styles.countLabel}>
          {safeLanguage === "te" ? `జప లెక్క: ${count}` : `Chant Count: ${count}`}
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.chantButton} onPress={onChant}>
            <Text style={styles.chantButtonText}>?? Chant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton} onPress={onReset}>
            <Text style={styles.resetButtonText}>?? Reset</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>{safeLanguage === "te" ? "పూజా క్రమం" : "Pooja Steps"}</Text>
        <FlatList
          data={content.poojaSteps}
          keyExtractor={(_, index) => `${deity.title}-step-${index}`}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <Text style={styles.step}>
              {index + 1}. {item}
            </Text>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF8E1",
    paddingHorizontal: 14,
    paddingVertical: 20,
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 450,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 18,
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  image: {
    width: 220,
    height: 220,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 14,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 14,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    color: "#374151",
  },
  mantra: {
    fontSize: 22,
    lineHeight: 32,
    color: "#C2410C",
    fontWeight: "700",
  },
  countLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
    marginBottom: 6,
  },
  chantButton: {
    backgroundColor: "#F59E0B",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  chantButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  resetButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  resetButtonText: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "700",
  },
  step: {
    fontSize: 16,
    lineHeight: 25,
    color: "#374151",
    marginBottom: 6,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FFF8E1",
  },
  notFoundTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  notFoundText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
});
