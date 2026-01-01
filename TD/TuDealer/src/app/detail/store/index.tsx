import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";

export default function StorenDetailScreen() {
  const [activeTab, setActiveTab] = useState("sobre");
  const [modalVisible, setModalVisible] = useState(false);

  // 🔸 Imágenes locales de servicios
  const servicios = [
    {
      id: "1",
      title: "Asesoría legal integral",
      price: "S/ 250",
      description: "Consulta completa sobre procesos legales cannábicos.",
      image: require("../../../../assets/store/1.jpg"),
    },
    {
      id: "2",
      title: "Gestión de licencias",
      price: "S/ 480",
      description: "Acompañamiento en la obtención de permisos y licencias.",
      image: require("../../../../assets/store/2.webp"),
    },
    {
      id: "3",
      title: "Defensa legal",
      price: "S/ 750",
      description: "Representación en casos relacionados al uso del cannabis.",
      image: require("../../../../assets/store/3.webp"),
    },
    {
      id: "4",
      title: "Gestión de licencias",
      price: "S/ 480",
      description: "Acompañamiento en la obtención de permisos y licencias.",
      image: require("../../../../assets/store/4.webp"),
    },
    {
      id: "5",
      title: "Defensa legal",
      price: "S/ 750",
      description: "Representación en casos relacionados al uso del cannabis.",
      image: require("../../../../assets/store/5.webp"),
    },
     {
      id: "6",
      title: "Defensa legal",
      price: "S/ 750",
      description: "Representación en casos relacionados al uso del cannabis.",
      image: require("../../../../assets/store/6.jpg"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../../../../assets/asociation/asociacion.jpg")}
            style={{ width: 400, height: 300 }}
          />
          <Text style={styles.name}>Asociación Cannábica del Perú</Text>
          <Text style={styles.specialty}>
            Promoviendo la regulación y el uso responsable del cannabis
          </Text>
          <Text style={styles.subInfo}>Fundada en 2015</Text>
          <Text style={styles.location}>Lima, Perú</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {["sobre", "posts", "feedbacks"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && styles.tabButtonActive,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab === "sobre"
                  ? "Sobre la Asociación"
                  : tab === "posts"
                  ? "Posts"
                  : "Feedbacks"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contenido de tabs */}
        {activeTab === "sobre" && (
          <View style={styles.tabContent}>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>⭐ 4.8</Text>
              <Text style={styles.schedule}>🕓 9:00 AM – 6:00 PM</Text>
            </View>

            <Text style={styles.sectionTitle}>Sobre Nosotros</Text>
            <Text style={styles.description}>
              Somos una organización sin fines de lucro dedicada a la educación,
              asesoría y defensa del derecho al uso del cannabis medicinal y
              recreativo en el Perú. Nuestro equipo multidisciplinario trabaja
              para crear un entorno regulado y seguro.
            </Text>

            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
              Servicios y programas
            </Text>
            <View style={styles.servicesRow}>
              {servicios.slice(0, 2).map((item) => (
                <View key={item.id} style={styles.serviceCard}>
                  <Image source={item.image} style={styles.serviceImage} />
                  <Text style={styles.serviceText}>{item.title}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.viewMoreButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.viewMoreText}>Ver más</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === "posts" && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Publicaciones recientes</Text>
            <Text style={styles.description}>
              🌱 “Seguimos impulsando el marco legal que permita a los pacientes
              acceder a tratamientos seguros y de calidad.”
            </Text>
          </View>
        )}

        {activeTab === "feedbacks" && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Testimonios</Text>
            <View style={styles.feedbackCard}>
              <Text style={styles.feedbackUser}>María López ⭐⭐⭐⭐⭐</Text>
              <Text style={styles.feedbackText}>
                Gracias a la asociación pude obtener mi licencia medicinal sin
                problemas. Excelente acompañamiento.
              </Text>
            </View>
            <View style={styles.feedbackCard}>
              <Text style={styles.feedbackUser}>José Ramos ⭐⭐⭐⭐</Text>
              <Text style={styles.feedbackText}>
                Muy buena atención y conocimiento. Realmente aportan a la
                comunidad.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Modal productos */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Todos los servicios</Text>
            <FlatList
              data={servicios}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.modalItem}>
                  <Image source={item.image} style={styles.modalItemImage} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalItemTitle}>{item.title}</Text>
                    <Text style={styles.modalItemPrice}>{item.price}</Text>
                    <Text style={styles.modalItemDescription}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: { alignItems: "center", marginTop: 20 },
  name: { fontSize: 20, fontWeight: "bold", marginTop: 10, color: "#1C1C1C" },
  specialty: { fontSize: 14, color: "#1C7C54", marginTop: 5, textAlign: "center" },
  subInfo: { fontSize: 12, color: "#808080" },
  location: { fontSize: 13, color: "#808080", marginBottom: 10 },
  tabs: { flexDirection: "row", justifyContent: "center", marginVertical: 15 },
  tabButton: {
    borderWidth: 1,
    borderColor: "#1C7C54",
    borderRadius: 25,
    paddingVertical: 6,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  tabButtonActive: { backgroundColor: "#1C7C54" },
  tabText: { color: "#1C7C54", fontWeight: "500" },
  tabTextActive: { color: "#FFF", fontWeight: "500" },
  tabContent: { paddingHorizontal: 20, paddingBottom: 40 },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 10,
  },
  rating: { color: "#FF9900", fontWeight: "bold" },
  schedule: { color: "#808080" },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  description: { fontSize: 13, color: "#555", lineHeight: 18 },
  servicesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  serviceCard: {
    width: "48%",
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },
  serviceImage: { width: "100%", height: 100 },
  serviceText: { padding: 8, fontSize: 13, fontWeight: "500", color: "#1C1C1C" },
  viewMoreButton: {
    alignSelf: "center",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#1C7C54",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  viewMoreText: { color: "#1C7C54", fontWeight: "500" },
  feedbackCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  feedbackUser: { fontWeight: "bold", color: "#1C7C54" },
  feedbackText: { color: "#555", marginTop: 5, fontSize: 13 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C7C54",
    marginBottom: 10,
    textAlign: "center",
  },
  modalItem: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 8,
  },
  modalItemImage: { width: 70, height: 70, borderRadius: 10, marginRight: 10 },
  modalItemTitle: { fontWeight: "600", color: "#1C1C1C" },
  modalItemPrice: { color: "#1C7C54", fontWeight: "500" },
  modalItemDescription: { fontSize: 12, color: "#666" },
  closeButton: {
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "#1C7C54",
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 20,
  },
  closeButtonText: { color: "#FFF", fontWeight: "500" },
});
