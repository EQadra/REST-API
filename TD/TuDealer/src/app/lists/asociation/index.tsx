import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ExploreScreen from "../../components/ExploreScreen";
import SearchResultsScreen from "../../components/SearchResultsScreen";

const AsociationScreen: React.FC = () => {
  const sections = [
    { id: "explore", type: "explore" },
    { id: "divider", type: "divider" },
    { id: "results", type: "results" },
  ];

  const renderItem = ({ item }: { item: { id: string; type: string } }) => {
    switch (item.type) {
      case "explore":
        return (
          <View style={styles.section}>
            <ExploreScreen />
          </View>
        );

      case "divider":
        return (
          <View style={styles.headerDivider}>
            <Ionicons name="leaf-outline" size={20} color="#00B272" />
            <Text style={styles.headerText}>Productos Destacados</Text>
          </View>
        );

      case "results":
        return (
          <View style={styles.section}>
            <SearchResultsScreen />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingBottom: 40,
  },
  section: {
    backgroundColor: "#fff",
  },
  headerDivider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E9F9F1",
    marginVertical: 20,
    marginHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00994C",
    marginLeft: 8,
  },
});

export default AsociationScreen;
