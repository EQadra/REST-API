import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ExploreStoreScreen = () => {
  const router = useRouter();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState<"productos" | "asociaciones">("productos");

  // Datos de ejemplo
  const productos = [
    { id: "1", nombre: "Producto 1", rating: 4.5, img: "https://picsum.photos/300/200?1" },
    { id: "2", nombre: "Producto 2", rating: 4.8, img: "https://picsum.photos/300/200?2" },
  ];

  const asociaciones = [
    { id: "a", nombre: "Asociación 1", rating: 4.6, img: "https://picsum.photos/300/200?5" },
    { id: "b", nombre: "Asociación 2", rating: 4.5, img: "https://picsum.photos/300/200?6" },
  ];

  const data = useMemo(() => {
    const list = searchType === "productos" ? productos : asociaciones;
    return list.filter((item) =>
      item.nombre.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, searchType]);

  const renderResult = ({ item }: { item: typeof productos[0] }) => (
    <TouchableOpacity style={styles.resultCard}>
      <Image source={{ uri: item.img }} style={styles.resultImage} resizeMode="cover" />
      <View style={styles.resultInfo}>
        <Text style={styles.resultName}>{item.nombre}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#f39c12" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <TouchableOpacity style={styles.verMasBtn}>
          <Text style={styles.verMasText}>Ver más</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Explorar</Text>
            <Text style={styles.subtitle}>Hola Camilo</Text>
          </View>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>

        {/* Barra de búsqueda */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => setSearchVisible(true)}
        >
          <Ionicons name="search" size={20} color="#999" />
          <Text style={styles.searchPlaceholder}>Buscar asociaciones y farmacias</Text>
        </TouchableOpacity>

        {/* Asociaciones */}
        <Text style={styles.sectionTitle}>Asociaciones</Text>
        <View style={styles.catalogCard}>
          <View style={styles.catalogText}>
            <Text style={styles.catalogTitle}>Catálogo de Productos</Text>
            <Text style={styles.catalogYear}>2024</Text>
            <Text style={styles.associationName}>El Jardín de María José</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#f39c12" />
              <Text style={styles.catalogRating}>4.5</Text>
            </View>
          </View>
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder} />
          </View>
        </View>

        {/* Productos seleccionados */}
        <Text style={styles.sectionTitle}>Productos seleccionados</Text>
        <View style={styles.productsRow}>
          {productos.map((p) => (
            <View key={p.id} style={styles.productCard}>
              <Image source={{ uri: p.img }} style={styles.productImg} resizeMode="cover" />
              <Text style={styles.productName}>{p.nombre}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#f39c12" />
                <Text style={styles.ratingText}>{p.rating}</Text>
              </View>
              <TouchableOpacity style={styles.verMasBtn}>
                <Text style={styles.verMasText}>Ver más</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* MODAL DE BÚSQUEDA FULLSCREEN */}
      <Modal
        visible={searchVisible}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Header del modal */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSearchVisible(false)}>
              <Ionicons name="arrow-back" size={28} color="#333" />
            </TouchableOpacity>
            <View style={styles.modalSearchInput}>
              <Ionicons name="search" size={20} color="#999" />
              <TextInput
                autoFocus
                placeholder={`Buscar ${searchType === "productos" ? "productos" : "asociaciones y farmacias"}`}
                placeholderTextColor="#aaa"
                style={styles.modalInputText}
                value={searchText}
                onChangeText={setSearchText}
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText("")}>
                  <Ionicons name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {[
              { key: "productos", label: "Productos", icon: "cube-outline" },
              { key: "asociaciones", label: "Asociaciones/Farmacias", icon: "medkit-outline" },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tabButton,
                  searchType === tab.key && styles.activeTab,
                ]}
                onPress={() => setSearchType(tab.key as "productos" | "asociaciones")}
              >
                <Text
                  style={[
                    styles.tabText,
                    searchType === tab.key && styles.activeTabText,
                  ]}
                >
                  {tab.label}
                </Text>
                {searchType === tab.key && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            ))}
          </View>

          {/* Resultados */}
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderResult}
            contentContainerStyle={styles.resultsList}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No se encontraron resultados</Text>
            }
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: { fontSize: 24, fontWeight: "700", color: "#4CAF50" },
  subtitle: { fontSize: 16, color: "#333", fontWeight: "600" },
  avatar: { width: 40, height: 40, borderRadius: 20 },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchPlaceholder: { flex: 1, marginLeft: 12, color: "#999", fontSize: 16 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginLeft: 16,
    marginTop: 20,
  },

  catalogCard: {
    backgroundColor: "#fffbe6",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  catalogText: { flex: 1 },
  catalogTitle: { fontSize: 18, fontWeight: "700", color: "#333" },
  catalogYear: { fontSize: 14, color: "#888", marginTop: 2 },
  associationName: { fontSize: 16, fontWeight: "600", color: "#333", marginTop: 8 },
  catalogRating: { marginLeft: 6, fontSize: 15, color: "#f39c12", fontWeight: "600" },

  logoContainer: { marginLeft: 16 },
  logoPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: "#ffeaa7",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
  },

  productsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 12,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    width: "48%",
    elevation: 2,
    marginBottom: 16,
  },
  productImg: {
    width: "100%",
    height: 90,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: { fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 6 },

  // Modal
  modalContainer: { flex: 1, backgroundColor: "#f8f9fa" },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  modalSearchInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginLeft: 12,
    height: 44,
  },
  modalInputText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },

  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTab: {},
  tabText: {
    fontSize: 15,
    color: "#999",
    fontWeight: "600",
  },
  activeTabText: {
    color: "#4CAF50",
    fontWeight: "700",
  },
  tabIndicator: {
    height: 3,
    width: "70%",
    backgroundColor: "#4CAF50",
    borderRadius: 2,
    marginTop: 6,
  },

  resultsList: { padding: 16 },
  resultCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  resultInfo: { flex: 1, justifyContent: "space-between" },
  resultName: { fontSize: 15, fontWeight: "600", color: "#333" },
  ratingRow: { flexDirection: "row", alignItems: "center" },
  ratingText: { marginLeft: 4, fontSize: 13, color: "#666" },
  verMasBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  verMasText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  emptyText: { textAlign: "center", color: "#999", marginTop: 40, fontSize: 15 },
});

export default ExploreStoreScreen;