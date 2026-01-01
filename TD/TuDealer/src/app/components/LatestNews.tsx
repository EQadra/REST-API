import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

const LatestNews = ({ news }) => {
  return (
    <View style={styles.latestNewsContainer}>
      <Text style={styles.latestNewsTitle}>Últimas Noticias</Text>
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.newsCard}>
            <Image source={{ uri: item.image }} style={styles.newsImage} />
            <View style={styles.overlay}>
              <Text style={styles.newsDate}>{item.date}</Text>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDescription}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  latestNewsContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#E6F4EA", // verde pastel claro
    borderRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
  },
  latestNewsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
    color: "#2F4F3E", // verde oscuro para títulos
  },
  newsCard: {
    marginBottom: 15,
    borderRadius: 0,
    overflow: "hidden",
  },
  newsImage: {
    width: "100%",
    height: 200,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(46, 125, 50, 0.7)", // verde oscuro semi-transparente
    padding: 10,
  },
  newsDate: {
    fontSize: 12,
    color: "#DFF5E1", // verde pastel muy claro
    marginBottom: 5,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E8F5E9", // verde claro casi blanco
  },
  newsDescription: {
    fontSize: 14,
    color: "#CDE5D4", // verde grisáceo pastel
  },
});

export default LatestNews;
