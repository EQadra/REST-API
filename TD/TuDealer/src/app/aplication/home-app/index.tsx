import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Pressable,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
    const router = useRouter();
  
  // Datos base
  const carouselItems = [
    { id: "1", title: "Doctor", image: require("../../../../assets/home/doctor.png"), href: "/lists/doctor" },
    { id: "2", title: "Tienda", image: require("../../../../assets/home/store.png"), href: "/lists/store" },
    { id: "3", title: "Asociación", image: require("../../../../assets/home/asociation.png"), href: "/lists/asociation" },
    { id: "4", title: "Abogado", image: require("../../../../assets/home/lawyer.png"), href: "/lists/lawyer" },
  ];

const initialNews = [
  {
    id: "1",
    name: "María López",
    avatar: "https://i.pravatar.cc/100?img=5",
    image: "https://picsum.photos/seed/medicina/800/400",
    description: "Se agregaron nuevas funciones a la app. ¡Descúbrelas ahora!",
  },
  {
    id: "2",
    name: "Carlos Pérez",
    avatar: "https://i.pravatar.cc/100?img=6",
    image: "https://picsum.photos/seed/doctores/800/400",
    description: "Este fin de semana habrá un evento especial en la comunidad.",
  },
  {
    id: "3",
    name: "Lucía García",
    avatar: "https://i.pravatar.cc/100?img=7",
    image: "https://picsum.photos/seed/doctores/800/400",
    description: "Consejos para mejorar tu productividad en el trabajo.",
  },
];


  // Estados
  const [news] = useState(initialNews);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeNewsId, setActiveNewsId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [commentsMap, setCommentsMap] = useState({});
  const [likedNews, setLikedNews] = useState({});
  const [showProfile, setShowProfile] = useState(false);

  // Cargar persistencia
  useEffect(() => {
    (async () => {
      const savedComments = await AsyncStorage.getItem("commentsMap");
      const savedLikes = await AsyncStorage.getItem("likedNews");
      if (savedComments) setCommentsMap(JSON.parse(savedComments));
      if (savedLikes) setLikedNews(JSON.parse(savedLikes));
    })();
  }, []);

  // Guardar persistencia
  useEffect(() => {
    AsyncStorage.setItem("commentsMap", JSON.stringify(commentsMap));
  }, [commentsMap]);

  useEffect(() => {
    AsyncStorage.setItem("likedNews", JSON.stringify(likedNews));
  }, [likedNews]);

  // Comentarios
  const openComments = (id) => {
    setActiveNewsId(id);
    setModalVisible(true);
  };

  const closeComments = () => {
    setCommentText("");
    setActiveNewsId(null);
    setModalVisible(false);
  };

  const addComment = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: `${activeNewsId}-${Date.now()}`,
      text: commentText.trim(),
      date: new Date().toLocaleString(),
    };
    setCommentsMap((prev) => ({
      ...prev,
      [activeNewsId]: [newComment, ...(prev[activeNewsId] ?? [])],
    }));
    setCommentText("");
  };

  const renderComment = useCallback(({ item }) => (
    <View style={styles.commentBubble}>
      <Text style={styles.commentText}>{item.text}</Text>
      <Text style={styles.commentDate}>{item.date}</Text>
    </View>
  ), []);

  // Likes
  const toggleLike = (id) => {
    setLikedNews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={styles.outerContainer}>
      {/* HEADER */}
      <LinearGradient colors={["#00B272", "#00994C"]} start={[0, 0]} end={[1, 1]} style={styles.header}>
        <View>
          <Text style={styles.title}>Hola, Eduardo 👋</Text>
          <Text style={styles.subtitle}>Bienvenido de nuevo</Text>
        </View>
        <TouchableOpacity onPress={() => setShowProfile(true)}>
          <Image source={{ uri: "https://i.pravatar.cc/100?img=6" }} style={styles.avatar} />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* CARRUSEL */}
        <Text style={styles.sectionTitle}>¿A quién desea visitar hoy?</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
          {carouselItems.map((item) => (
            <AnimatedCard key={item.id} item={item} />
          ))}
        </ScrollView>

        {/* NOTICIAS */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Noticias</Text>
          <TouchableOpacity style={styles.seeMoreButton}>
            <Ionicons name="newspaper-outline" size={16} color="#fff" />
            {/* <Text style={styles.seeMoreText}>Ver más</Text> */}
            <TouchableOpacity
              style={styles.viewMoreButton}
              onPress={() => router.push("/aplication/home-news")}
            >
              <Text style={styles.viewMoreText}>Ver más</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {news.map((item) => (
          <View key={item.id} style={styles.newsItem}>
            <Image source={{ uri: item.image }} style={styles.newsImage} />
            <View style={styles.newsHeader}>
              <Image source={{ uri: item.avatar }} style={styles.newsAvatar} />
              <Text style={styles.newsName}>{item.name}</Text>
            </View>
            <Text style={styles.newsDescription}>{item.description}</Text>

            <View style={styles.newsActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="share-social-outline" size={20} color="#00B272" />
                <Text style={styles.actionText}>Compartir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => openComments(item.id)}>
                <Ionicons name="chatbubble-outline" size={20} color="#00B272" />
                <Text style={styles.actionText}>Comentar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => toggleLike(item.id)}>
                <Ionicons
                  name={likedNews[item.id] ? "heart" : "heart-outline"}
                  size={20}
                  color={likedNews[item.id] ? "red" : "#00B272"}
                />
                <Text style={styles.actionText}>Me gusta</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* MODAL COMENTARIOS */}
      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={closeComments}>
        <View style={styles.modalBackdrop}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Comentarios</Text>
              <TouchableOpacity onPress={closeComments} style={styles.modalClose}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContent}>
              {!commentsMap[activeNewsId]?.length ? (
                <View style={styles.noComments}>
                  <Text style={{ color: "#666" }}>Sé el primero en comentar</Text>
                </View>
              ) : (
                <FlatList data={commentsMap[activeNewsId]} keyExtractor={(c) => c.id} renderItem={renderComment} />
              )}
            </View>

            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Escribe un comentario..."
                value={commentText}
                onChangeText={setCommentText}
                multiline
              />
              <TouchableOpacity style={styles.sendButton} onPress={addComment}>
                <Ionicons name="send" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* MODAL PERFIL */}
      <Modal visible={showProfile} animationType="fade" transparent onRequestClose={() => setShowProfile(false)}>
        <View style={styles.profileModalBackdrop}>
          <View style={styles.profileModal}>
            <Image source={{ uri: "https://i.pravatar.cc/150" }} style={styles.profileAvatar} />
            <Text style={styles.profileName}>Eduardo Salas</Text>
            <Text style={styles.profileSubtitle}>Usuario Premium 🌿</Text>

            <TouchableOpacity style={styles.logoutButton} onPress={() => setShowProfile(false)}>
              <Ionicons name="log-out-outline" size={18} color="#fff" />
              <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ✅ Componente animado separado
function AnimatedCard({ item }) {
  const scale = new Animated.Value(1);
  const onPressIn = () => Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }).start();

  return (
    <Link href={item.href} asChild>
      <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
        <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
          <Image source={item.image} style={styles.cardImage} />
          <LinearGradient colors={["rgba(0,0,0,0.25)", "rgba(0,0,0,0.6)"]} style={styles.overlay}>
            <Text style={styles.overlayText}>{item.title}</Text>
            <Ionicons name="arrow-forward-circle" size={24} color="#fff" />
          </LinearGradient>
        </Animated.View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: "#f0f9f4" },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "700" },
  subtitle: { color: "#e6f9ef", fontSize: 14, marginTop: 2 },
  avatar: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: "#fff" },

  sectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 16, alignItems: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#222", marginVertical: 10, marginLeft: 20 },

  seeMoreButton: {
    flexDirection: "row",
    backgroundColor: "#00B272",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  seeMoreText: { color: "#fff", marginLeft: 5, fontSize: 13, fontWeight: "600" },

  card: {
    width: width * 0.45,
    height: 190,
    borderRadius: 18,
    marginRight: 18,
    marginTop: 8,
    marginBottom: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#e6f3ed",
  },
  cardImage: { width: "100%", height: "100%" },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  overlayText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  container: { flex: 1 },
  newsItem: {
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  newsImage: { width: "100%", height: 140, borderRadius: 10, marginBottom: 10 },
  newsHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  newsAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  newsName: { fontWeight: "700", fontSize: 16 },
  newsDescription: { fontSize: 14, color: "#555", marginBottom: 10 },
  newsActions: { flexDirection: "row", justifyContent: "space-around", borderTopWidth: 1, borderTopColor: "#eee", paddingTop: 8 },
  actionButton: { flexDirection: "row", alignItems: "center" },
  actionText: { marginLeft: 4, color: "#00B272", fontWeight: "500" },

  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  modalContainer: { backgroundColor: "#fff", maxHeight: "80%", borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  modalTitle: { fontSize: 18, fontWeight: "700" },
  modalClose: { padding: 4 },
  modalContent: { flex: 1, marginBottom: 12 },
  noComments: { alignItems: "center", justifyContent: "center", flex: 1 },
  inputRow: { flexDirection: "row", alignItems: "center" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ddd", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8 },
  sendButton: { backgroundColor: "#00B272", padding: 10, borderRadius: 20 },
  commentBubble: { padding: 8, borderRadius: 12, backgroundColor: "#f1f1f1", marginBottom: 6 },
  commentText: { fontSize: 14, color: "#333" },
  commentDate: { fontSize: 10, color: "#888", marginTop: 2 },

  profileModalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  profileModal: { backgroundColor: "#fff", width: "80%", borderRadius: 16, padding: 20, alignItems: "center" },
  profileAvatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  profileName: { fontSize: 18, fontWeight: "700", color: "#222" },
  profileSubtitle: { color: "#777", marginBottom: 20 },
  logoutButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#00B272", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  logoutText: { color: "#fff", marginLeft: 6, fontWeight: "600" },
});
