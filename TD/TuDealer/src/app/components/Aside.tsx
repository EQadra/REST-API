// components/CustomDrawerContent.js
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons'; // O el pack que prefieras
import Ionicons from 'react-native-vector-icons/Ionicons';

const Aside = (props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {/* Header personalizado */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://example.com/tu-foto.jpg' }} // Reemplaza con tu foto o require local
              style={styles.avatar}
            />
            <Image
              source={{ uri: 'https://example.com/tu-foto-pequena.jpg' }}
              style={styles.smallAvatar}
            />
          </View>
          <Text style={styles.name}>Camilo Tevez</Text>
          <TouchableOpacity>
            <Text style={styles.editProfile}>Editar mi perfil →</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de items estándar */}
        <DrawerItemList {...props} />

        {/* Item personalizado al final (Cerrar sesión) */}
        <TouchableOpacity style={styles.logoutItem}>
          <View style={styles.logoutIcon}>
            {/* Icono de cannabis personalizado, puedes usar una imagen o SVG */}
            <Text style={{ fontSize: 30 }}>🌿</Text>
          </View>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  editProfile: {
    color: '#075E54', // Verde WhatsApp
    marginTop: 5,
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
  },
  logoutIcon: {
    marginRight: 15,
    backgroundColor: '#e0f2e9',
    padding: 10,
    borderRadius: 25,
  },
  logoutText: {
    fontSize: 16,
    color: '#075E54',
  },
});

export default Aside;