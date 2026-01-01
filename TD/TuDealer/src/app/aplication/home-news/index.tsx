import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeNewsScreen = () => {
  const newsList = [
    {
      id: '1',
      name: 'María López',
      avatar: 'https://i.pravatar.cc/100?img=5',
      title: 'Actualización importante',
      description: 'La aplicación ahora permite sincronizar tus datos con la nube y acceder desde cualquier dispositivo.',
      image: 'https://picsum.photos/400/250?1',
    },
    {
      id: '2',
      name: 'Carlos Pérez',
      avatar: 'https://i.pravatar.cc/100?img=6',
      title: 'Evento de la comunidad',
      description: 'Este fin de semana realizaremos un encuentro en línea con charlas sobre desarrollo móvil.',
      image: 'https://picsum.photos/400/250?2',
    },
    {
      id: '3',
      name: 'Lucía García',
      avatar: 'https://i.pravatar.cc/100?img=7',
      title: 'Tips de productividad',
      description: 'Aprende a mejorar tu enfoque diario con técnicas simples y efectivas.',
      image: 'https://picsum.photos/400/250?3',
    },
    {
      id: '4',
      name: 'José Ramírez',
      avatar: 'https://i.pravatar.cc/100?img=8',
      title: 'Nuevas funciones del dashboard',
      description: 'La sección de estadísticas fue rediseñada con gráficos más detallados y personalizables.',
      image: 'https://picsum.photos/400/250?4',
    },
    {
      id: '5',
      name: 'Ana Torres',
      avatar: 'https://i.pravatar.cc/100?img=9',
      title: 'Lanzamiento de versión 2.0',
      description: 'La nueva versión trae mejoras de rendimiento y una interfaz más moderna.',
      image: 'https://picsum.photos/400/250?5',
    },
    {
      id: '6',
      name: 'Pedro Sánchez',
      avatar: 'https://i.pravatar.cc/100?img=10',
      title: 'Consejos para nuevos usuarios',
      description: 'Te mostramos las funciones clave que debes conocer al empezar a usar nuestra app.',
      image: 'https://picsum.photos/400/250?6',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Noticias</Text>
        <View style={{ width: 24 }} /> {/* Espaciador simétrico */}
      </View>

      {/* Lista de noticias */}
      {newsList.map((item) => (
        <View key={item.id} style={styles.newsCard}>
          {/* Cabecera con avatar y nombre */}
          <View style={styles.newsHeader}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
          </View>

          {/* Imagen principal */}
          <Image source={{ uri: item.image }} style={styles.newsImage} />

          {/* Contenido */}
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDescription}>{item.description}</Text>
          </View>

          {/* Botones */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-social-outline" size={20} color="#333" />
              <Text style={styles.actionText}>Compartir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={20} color="#333" />
              <Text style={styles.actionText}>Comentar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={20} color="#333" />
              <Text style={styles.actionText}>Me gusta</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  newsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  newsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  newsContent: {
    padding: 12,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#222',
  },
  newsDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#333',
  },
});

export default HomeNewsScreen;
