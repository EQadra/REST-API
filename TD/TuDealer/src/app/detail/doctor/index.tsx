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

export default function DoctorDetailScreen() {
  const [activeTab, setActiveTab] = useState("sobre");
  const [modalVisible, setModalVisible] = useState(false);

  const servicios = [
    {
      id: "1",
      title: "Asesoría legal integral",
      price: "S/ 250",
      description: "Consulta completa sobre procesos legales cannábicos.",
      image: require("../../../../assets/doctor/services/1.png"),
    },
    {
      id: "2",
      title: "Gestión de licencias",
      price: "S/ 480",
      description: "Acompañamiento en la obtención de permisos y licencias.",
      image: require("../../../../assets/doctor/services/2.png"),
    },
    {
      id: "3",
      title: "Defensa legal",
      price: "S/ 750",
      description: "Representación en casos relacionados al uso del cannabis.",
      image: require("../../../../assets/doctor/services/3.jpg"),
    },
     {
      id: "4",
      title: "Defensa legal",
      price: "S/ 950",
      description: "Representación en casos relacionados al uso del cannabis.",
      image: require("../../../../assets/doctor/services/4.jpg"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../../../../assets/doctor/profile.jpg")}
            style={{ width: '80%', height: 300 }}
          />
          <Text style={styles.name}>Lic. Carlos Herrera</Text>
          <Text style={styles.specialty}>
            Abogado especializado en derecho cannábico
          </Text>
          <Text style={styles.subInfo}>C.A.L. 100470</Text>
          <Text style={styles.location}>Lima</Text>
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
                  ? "Sobre el Lic."
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
              <Text style={styles.rating}>⭐ 4.5</Text>
              <Text style={styles.schedule}>🕓 10:00 AM – 5:00 PM</Text>
            </View>

            <Text style={styles.sectionTitle}>Experiencia</Text>
            <Text style={styles.description}>
              Con más de 10 años de experiencia, he acompañado a pacientes,
              asociaciones y emprendedores del sector cannábico en todo tipo de
              procesos legales: desde la obtención de permisos y licencias,
              hasta la defensa en derechos relacionados con el uso medicinal y
              recreativo del cannabis.
            </Text>

            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
              Servicios y productos
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
              📢 “El cannabis avanza cada día más en el ámbito legal. Mi
              objetivo es ayudarte a comprender la normativa y usarla a tu
              favor.”
            </Text>
          </View>
        )}

        {activeTab === "feedbacks" && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Opiniones de clientes</Text>
            <View style={styles.feedbackCard}>
              <Text style={styles.feedbackUser}>Pedro Gómez ⭐⭐⭐⭐⭐</Text>
              <Text style={styles.feedbackText}>
                El mejor asesor que pude encontrar. Explicó todo con palabras
                simples y me dio la seguridad que necesitaba para arrancar mi
                proyecto.
              </Text>
            </View>
            <View style={styles.feedbackCard}>
              <Text style={styles.feedbackUser}>Carla Tello ⭐⭐⭐⭐</Text>
              <Text style={styles.feedbackText}>
                Excelente trato humano y mucho conocimiento. Se nota que
                realmente le importa apoyar el movimiento cannábico desde lo
                legal.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Modal productos */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Todos los productos</Text>
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
  profileImage: { width: 180, height: 180, borderRadius: 20 },
  name: { fontSize: 20, fontWeight: "bold", marginTop: 10, color: "#1C1C1C" },
  specialty: { fontSize: 14, color: "#1C7C54", marginTop: 5 },
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
