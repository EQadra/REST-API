import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

export default function ProductsCatalogScreen() {
  const [activeTab, setActiveTab] = useState('productos');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar asociaciones y farmacias"
          placeholderTextColor="#A0A0A0"
          style={styles.searchInput}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'productos' && styles.tabActive]}
          onPress={() => setActiveTab('productos')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'productos' && styles.tabTextActive,
            ]}
          >
            Productos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'asociaciones' && styles.tabActive]}
          onPress={() => setActiveTab('asociaciones')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'asociaciones' && styles.tabTextActive,
            ]}
          >
            Asociaciones/Farmacias
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.title}>Catálogo de <Text style={{fontWeight: 'bold'}}>Productos</Text></Text>

        {/* Tarjeta 1 */}
        <View style={[styles.card, { backgroundColor: '#F6E8DA' }]}>
          <Image
            source={{ uri: 'https://picsum.photos/400/200?random=11' }}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Asociación 1</Text>
            <Text style={styles.rating}>⭐ 4.5</Text>
          </View>
        </View>

        {/* Tarjeta 2 */}
        <View style={[styles.card, { backgroundColor: '#E5E7FA' }]}>
          <Image
            source={{ uri: 'https://picsum.photos/400/200?random=12' }}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Asociación 2</Text>
            <Text style={styles.rating}>⭐ 4.5</Text>
          </View>
        </View>

        {/* Tarjeta 3 */}
        <View style={[styles.card, { backgroundColor: '#D6F2F0' }]}>
          <Image
            source={{ uri: 'https://picsum.photos/400/200?random=13' }}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Asociación 3</Text>
            <Text style={styles.rating}>⭐ 4.5</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#F3F3F3',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 14,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  tabButton: {
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#1C7C54',
  },
  tabText: {
    color: '#808080',
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#1C7C54',
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1C1C1C',
    marginBottom: 15,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 130,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1C',
  },
  rating: {
    fontSize: 13,
    color: '#FF9900',
    marginTop: 3,
  },
});
