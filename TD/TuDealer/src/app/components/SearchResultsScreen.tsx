import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const products = [
  { id: "1", name: "Producto 1", img: "https://picsum.photos/200/200?1" },
  { id: "2", name: "Producto 2", img: "https://picsum.photos/200/200?2" },
  { id: "3", name: "Producto 3", img: "https://picsum.photos/200/200?3" },
  { id: "4", name: "Producto 4", img: "https://picsum.photos/200/200?4" },
];

const SearchResultsScreen = ({ navigation }) => {
  const [tab, setTab] = useState("productos");

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      {/* <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#333" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar comercios y farmacias"
          placeholderTextColor="#999"
        />
      </View> */}

      {/* Tabs */}
      <View style={styles.tabRow}>
        {["productos", "tiendas"].map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t)}
            style={[
              styles.tabButton,
              tab === t && styles.tabButtonActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                tab === t && styles.tabTextActive,
              ]}
            >
              {t === "productos" ? "Productos" : "Tiendas"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Grid de productos */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardRating}>⭐ 4.5</Text>
            <Text style={styles.verMas}>Ver más</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginTop: 8,
  },
  tabButton: { paddingVertical: 10 },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderColor: "#00A86B",
  },
  tabText: { color: "#777", fontWeight: "500" },
  tabTextActive: { color: "#00A86B", fontWeight: "700" },
  card: {
    backgroundColor: "#fff",
    flex: 1,
    margin: 6,
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  cardTitle: { fontWeight: "600", marginTop: 6 },
  cardRating: { fontSize: 12, color: "#888", marginBottom: 4 },
  verMas: { color: "#00A86B", fontSize: 13, fontWeight: "600" },
});

export default SearchResultsScreen;
