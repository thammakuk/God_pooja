import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type DeityItem = {
  id: string;
  image: ImageSourcePropType;
};

const deityList: DeityItem[] = [
  { id: "Lakshmi", image: require("./assets/images/lakshmi.png") },
  { id: "Ganesh", image: require("./assets/images/ganesh.png") },
  { id: "Shiva", image: require("./assets/images/shiva.png") },
  { id: "Hanuman", image: require("./assets/images/hanuman.png") },
  { id: "Saraswati", image: require("./assets/images/saraswati.png") },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose Deity</Text>

      <FlatList
        data={deityList}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/pooja/[id]",
                params: { id: item.id },
              })
            }
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.id}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 14,
  },
  card: {
    width: "48.5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#111827",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  image: {
    width: 110,
    height: 110,
    resizeMode: "contain",
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
});
