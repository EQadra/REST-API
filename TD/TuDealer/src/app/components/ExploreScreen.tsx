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

const ExploreScreen = () => {
    const router = useRouter();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("productos"); // "productos" o "farmacias"

  const productos = [
    { id: "1", nombre: "Aceite CBD 10ml", categoria: "Aceites", precio: "S/60", img: "https://picsum.photos/300/200?1" },
    { id: "2", nombre: "Crema relajante", categoria: "Tópicos", precio: "S/45", img: "https://picsum.photos/300/200?2" },
    { id: "3", nombre: "Gomitas CBD", categoria: "Comestibles", precio: "S/30", img: "https://picsum.photos/300/200?3" },
    { id: "4", nombre: "Tintura de cáñamo", categoria: "Aceites", precio: "S/80", img: "https://picsum.photos/300/200?4" },
  ];

  const farmacias = [
    { id: "a", nombre: "Mifarma", direccion: "Av. Primavera 120", rating: 4.6, img: "https://picsum.photos/300/200?5" },
    { id: "b", nombre: "Inkafarma", direccion: "Av. Brasil 520", rating: 4.8, img: "https://picsum.photos/300/200?6" },
    { id: "c", nombre: "Botica Natural", direccion: "Calle Los Sauces 300", rating: 4.5, img: "https://picsum.photos/300/200?7" },
  ];

  const data = useMemo(() => {
    const list = searchType === "productos" ? productos : farmacias;
    return list.filter((item) =>
      item.nombre.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, searchType]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.resultCard}>
      <Image source={{ uri: item.img }} style={styles.resultImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.resultName}>{item.nombre}</Text>
        {searchType === "productos" ? (
          <>
            <Text style={styles.resultSub}>{item.categoria}</Text>
            <Text style={styles.resultPrice}>{item.precio}</Text>
          </>
        ) : (
          <>
            <Text style={styles.resultSub}>{item.direccion}</Text>
            <Text style={styles.resultRating}>⭐ {item.rating}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Encabezado */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Explorar</Text>
            <Text style={styles.subtitle}>Hola Camilo</Text>
          </View>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
        </View>

        {/* Barra de búsqueda */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.searchContainer}
          onPress={() => setSearchVisible(true)}
        >
          <Ionicons name="search" size={20} color="#777" />
          <Text style={styles.placeholderText}>
            Buscar productos o farmacias...
          </Text>
          <Ionicons name="options-outline" size={20} color="#777" />
        </TouchableOpacity>

        {/* Comercio destacado */}
        <Text style={styles.sectionTitle}>Comercio de la semana</Text>
        <TouchableOpacity style={styles.featuredCard}                
        onPress={() => router.push('/detail/asociation')}
          >
      <Image
        source={{ uri: 'https://picsum.photos/600/300?1' }}
        style={styles.featuredImage}
        resizeMode="cover"
      />
          <View style={styles.featuredInfo}>
            <Text style={styles.storeName}>Casita 420</Text>
            <Text style={styles.rating}>⭐ 4.5</Text>
          </View>
        </TouchableOpacity>

        {/* Tiendas cerca */}
        <Text style={styles.sectionTitle}>Tiendas cerca a ti</Text>
        <View style={styles.storesRow}>
          {[
            { id: 1, name: "Mifarma", img: "https://picsum.photos/400/200?2" },
            { id: 2, name: "Inkafarma", img: "https://picsum.photos/400/200?3" },
          ].map((store) => (
            <TouchableOpacity key={store.id} style={styles.storeCard}>
              <Image source={{ uri: store.img }} style={styles.storeImage} />
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.verMas}>Ver más</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* 🔍 MODAL DE BÚSQUEDA */}
      <Modal visible={searchVisible} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.modalContainer}>
          {/* Header del modal */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSearchVisible(false)}>
              <Ionicons name="arrow-back" size={24} color="#222" />
            </TouchableOpacity>
            <View style={styles.inputWrapper}>
              <Ionicons name="search" size={20} color="#777" />
              <TextInput
                autoFocus
                placeholder={`Buscar ${searchType}`}
                placeholderTextColor="#aaa"
                style={styles.modalInput}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          </View>

          {/* Selector tipo de búsqueda */}
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                searchType === "productos" && styles.activeToggle,
              ]}
              onPress={() => setSearchType("productos")}
            >
              <Ionicons
                name="cube-outline"
                size={18}
                color={searchType === "productos" ? "#fff" : "#00B272"}
              />
              <Text
                style={[
                  styles.toggleText,
                  searchType === "productos" && styles.activeToggleText,
                ]}
              >
                Productos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleButton,
                searchType === "farmacias" && styles.activeToggle,
              ]}
              onPress={() => setSearchType("farmacias")}
            >
              <Ionicons
                name="medkit-outline"
                size={18}
                color={searchType === "farmacias" ? "#fff" : "#00B272"}
              />
              <Text
                style={[
                  styles.toggleText,
                  searchType === "farmacias" && styles.activeToggleText,
                ]}
              >
                Farmacias
              </Text>
            </TouchableOpacity>
          </View>

          {/* Resultados */}
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 40 }}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No se encontraron resultados</Text>
            }
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  title: { fontSize: 28, fontWeight: "700", color: "#124E2C" },
  subtitle: { color: "#1BB273", fontWeight: "600" },
  avatar: { width: 40, height: 40, borderRadius: 20 },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 16,
  },
  placeholderText: { flex: 1, marginLeft: 8, color: "#777" },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginTop: 24,
    marginBottom: 8,
  },
  featuredCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  featuredImage: { width: "100%", height: 180 },
  featuredInfo: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  storeName: { fontWeight: "600", fontSize: 15 },
  rating: { color: "#666" },
  storesRow: { flexDirection: "row", justifyContent: "space-between" },
  storeCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  storeImage: { width: "100%", height: 120, borderRadius: 10 },
  verMas: { color: "#777", fontSize: 12, textAlign: "center", marginTop: 6 },

  // Modal styles
  modalContainer: { flex: 1, backgroundColor: "#fff", padding: 16 },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  modalInput: { flex: 1, paddingVertical: 8, color: "#222", marginLeft: 6 },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 16,
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00B272",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  activeToggle: { backgroundColor: "#00B272" },
  toggleText: {
    marginLeft: 6,
    color: "#00B272",
    fontWeight: "600",
  },
  activeToggleText: { color: "#fff" },

  resultCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  resultImage: { width: 70, height: 70, borderRadius: 10, marginRight: 12 },
  resultName: { fontWeight: "700", fontSize: 15, color: "#222" },
  resultSub: { fontSize: 13, color: "#666" },
  resultPrice: { fontSize: 13, color: "#00B272", fontWeight: "600" },
  resultRating: { fontSize: 13, color: "#777" },
  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 40,
    fontSize: 14,
  },
  featuredImageContainer: {
  marginHorizontal: 16,
  marginVertical: 12,
  borderRadius: 16,
  overflow: 'hidden',
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
},

});

export default ExploreScreen;
