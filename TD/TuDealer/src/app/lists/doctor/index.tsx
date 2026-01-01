import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function DoctoresScreen() {
  const router = useRouter();

  const [searchModal, setSearchModal] = useState(false);
  const [query, setQuery] = useState("");

  // ❤️ Modal de comentarios
  const [commentModal, setCommentModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [commentText, setCommentText] = useState("");

  // ❤️ Likes de noticias
  const [likes, setLikes] = useState({});

  // 📝 Comentarios por noticia
  const [comments, setComments] = useState({});

  const doctores = [
    {
      id: "1",
      nombre: "Jorge Casas",
      especialidad: "Medicina general",
      ciudad: "Lima",
      rating: 4.5,
      foto: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: "2",
      nombre: "Miguel Miranda",
      especialidad: "Oncólogo",
      ciudad: "Arequipa",
      rating: 4.8,
      foto: "https://i.pravatar.cc/150?img=15",
    },
    {
      id: "3",
      nombre: "Diana Salas",
      especialidad: "Cardióloga",
      ciudad: "Lima",
      rating: 4.9,
      foto: "https://i.pravatar.cc/150?img=20",
    },
  ];

  const filtrados = doctores.filter(
    (d) =>
      d.nombre.toLowerCase().includes(query.toLowerCase()) ||
      d.especialidad.toLowerCase().includes(query.toLowerCase())
  );

  const noticias = [
    {
      id: "n1",
      titulo: "Nuevo avance en cardiología",
      descripcion:
        "Un estudio reciente revela mejoras significativas en tratamientos cardíacos.",
      imagen: "https://picsum.photos/400/200?random=11",
      likes: 25,
      comentarios: 10,
    },
    {
      id: "n2",
      titulo: "Guía para mejorar tu salud",
      descripcion:
        "Recomendaciones sencillas para llevar una vida más saludable.",
      imagen: "https://picsum.photos/400/200?random=12",
      likes: 41,
      comentarios: 8,
    },
    {
      id: "n3",
      titulo: "Vacunas 2025",
      descripcion:
        "Todo lo que debes saber sobre el calendario de vacunas actualizado.",
      imagen: "https://picsum.photos/400/200?random=13",
      likes: 13,
      comentarios: 3,
    },
  ];

  const toggleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openCommentModal = (newsId) => {
    setSelectedNews(newsId);
    setCommentModal(true);
  };

  const sendComment = () => {
    if (!commentText.trim()) return;

    setComments((prev) => ({
      ...prev,
      [selectedNews]: [
        ...(prev[selectedNews] || []),
        { id: Date.now(), text: commentText },
      ],
    }));

    setCommentText("");
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.hola}>Hola Camilo</Text>
            <Text style={styles.titulo}>Busquemos{"\n"}un Doctor</Text>
          </View>
          <Image
            source={{ uri: "https://i.pravatar.cc/100?img=68" }}
            style={styles.avatar}
          />
        </View>

        {/* Buscador */}
        <TouchableOpacity
          onPress={() => setSearchModal(true)}
          style={styles.searchContainer}
          activeOpacity={0.8}
        >
          <Ionicons name="search-outline" size={20} color="#999" />
          <Text style={{ color: "#999", marginLeft: 6 }}>
            Buscar Doctores...
          </Text>
        </TouchableOpacity>

        {/* Doctores */}
        <Text style={styles.sectionTitle}>Doctores Populares</Text>

        {doctores.map((doctor) => (
          <TouchableOpacity
            key={doctor.id}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => router.push(`/detail/doctor`)}
          >
            <Image source={{ uri: doctor.foto }} style={styles.doctorImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.doctorName}>{doctor.nombre}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.especialidad}</Text>
              <Text style={styles.doctorCity}>{doctor.ciudad}</Text>
            </View>
            <View style={styles.rating}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{doctor.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Noticias */}
        <Text style={styles.sectionTitle}>Noticias Recientes</Text>

        {noticias.map((n) => (
          <View key={n.id} style={styles.newsCard}>
            <Image source={{ uri: n.imagen }} style={styles.newsImage} />

            <Text style={styles.newsTitle}>{n.titulo}</Text>
            <Text style={styles.newsDesc}>{n.descripcion}</Text>

            <View style={styles.newsActions}>
              {/* LIKE */}
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => toggleLike(n.id)}
              >
                <Ionicons
                  name={likes[n.id] ? "heart" : "heart-outline"}
                  size={20}
                  color={likes[n.id] ? "red" : "#555"}
                />
                <Text style={styles.actionText}>
                  {likes[n.id] ? n.likes + 1 : n.likes}
                </Text>
              </TouchableOpacity>

              {/* COMENTAR */}
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => openCommentModal(n.id)}
              >
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={20}
                  color="#555"
                />
                <Text style={styles.actionText}>
                  {(comments[n.id] || []).length + n.comentarios}
                </Text>
              </TouchableOpacity>

              {/* COMPARTIR */}
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="share-social-outline" size={20} color="#555" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal BUSQUEDA */}
      <Modal visible={searchModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSearchModal(false)}>
              <Ionicons name="arrow-back" size={26} color="#333" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Buscar Doctor</Text>
          </View>

          <View style={styles.modalSearchBox}>
            <Ionicons name="search-outline" size={20} color="#777" />
            <TextInput
              placeholder="Buscar por nombre o especialidad"
              value={query}
              onChangeText={setQuery}
              style={styles.modalInput}
            />
          </View>

          <ScrollView style={{ marginTop: 20 }}>
            {filtrados.map((d) => (
              <TouchableOpacity
                key={d.id}
                style={styles.resultCard}
                onPress={() => {
                  setSearchModal(false);
                  router.push(`/detail/doctor`);
                }}
              >
                <Image source={{ uri: d.foto }} style={styles.resultImage} />

                <View>
                  <Text style={styles.resultName}>{d.nombre}</Text>
                  <Text style={styles.resultSpec}>{d.especialidad}</Text>
                  <Text style={styles.resultCity}>{d.ciudad}</Text>
                </View>

                <View style={styles.resultRating}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text>{d.rating}</Text>
                </View>
              </TouchableOpacity>
            ))}

            {filtrados.length === 0 && (
              <Text style={styles.noResult}>No se encontraron resultados</Text>
            )}
          </ScrollView>
        </View>
      </Modal>

      {/* ============================== */}
      {/* Modal de Comentarios de Noticias */}
      {/* ============================== */}
      <Modal visible={commentModal} animationType="slide" transparent>
        <View style={styles.commentOverlay}>
          <View style={styles.commentModal}>
            <Text style={styles.commentTitle}>Escribe un comentario</Text>

            <TextInput
              placeholder="Tu comentario..."
              value={commentText}
              onChangeText={setCommentText}
              style={styles.commentInput}
              multiline
            />

            <View style={styles.commentButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setCommentModal(false)}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sendBtn} onPress={sendComment}>
                <Text style={styles.sendText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f8fdfb",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  hola: { color: "#00896f", fontSize: 18, fontWeight: "600" },
  titulo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a3d2f",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 12,
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    color: "#333",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 16,
    marginBottom: 14,
    borderColor: "#eaeaea",
    borderWidth: 1,
  },
  doctorImage: { width: 70, height: 70, borderRadius: 14, marginRight: 12 },
  cardInfo: { flex: 1 },
  doctorName: { fontSize: 16, fontWeight: "700" },
  doctorSpecialty: { color: "#555" },
  doctorCity: { color: "#777" },

  rating: { flexDirection: "row", alignItems: "center" },
  ratingText: { marginLeft: 4 },

  // NEWS
  newsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  newsImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    color: "#1a3d2f",
  },
  newsDesc: {
    color: "#555",
    marginBottom: 12,
  },
  newsActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    color: "#444",
  },

  // MODAL BUSQUEDA
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  modalSearchBox: {
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  modalInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },

  resultCard: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 10,
  },
  resultName: { fontSize: 16, fontWeight: "700" },
  resultSpec: { color: "#555" },
  resultCity: { color: "#777" },
  resultRating: { marginLeft: "auto", flexDirection: "row", gap: 4 },

  noResult: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 16,
    color: "#777",
  },

  // MODAL COMENTARIOS
  commentOverlay: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    padding: 20,
  },
  commentModal: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  commentInput: {
    height: 100,
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 12,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  commentButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  cancelText: { color: "#000" },

  sendBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#00896f",
    borderRadius: 10,
  },
  sendText: { color: "#fff", fontWeight: "700" },
});
