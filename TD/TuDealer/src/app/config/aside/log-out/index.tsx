import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';

// Icono de la hoja de cannabis dentro del modal
const cannabisLeafModal = require('./assets/cannabis-leaf-modal.png'); // Usa una versión más grande o la misma

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View className="flex-1 bg-white">
      {/* Contenido principal de la pantalla de perfil (simplificado) */}
      <View className="pt-12 px-4">
        {/* Header con nombre y foto */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden">
            <Image
              source={{ uri: 'https://example.com/user-photo.jpg' }} // Reemplaza con foto real
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-xl font-bold">Camilo Tervez</Text>
          <Text className="text-gray-600">Editar perfil</Text>
        </View>

        {/* Opciones del menú */}
        <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-200">
          <Text className="ml-3 text-base">Cuenta y seguridad</Text>
        </TouchableOpacity>

        {/* Opción Cerrar sesión (al tocar abre el modal) */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="flex-row items-center py-4"
        >
          <Text className="ml-3 text-base text-red-600">Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de confirmación */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-8">
          <View className="bg-green-800 rounded-3xl p-8 items-center w-full max-w-md">
            {/* Icono grande */}
            <Image
              source={cannabisLeafModal}
              className="w-24 h-24 mb-6"
              resizeMode="contain"
            />

            {/* Título */}
            <Text className="text-white text-xl font-bold mb-4">
              Cerrar sesión
            </Text>

            {/* Mensaje */}
            <Text className="text-white text-center text-base mb-8">
              ¿Estás seguro de cerrar sesión?
            </Text>

            {/* Botones */}
            <View className="flex-row justify-between w-full">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-white/20 rounded-full px-8 py-3 mr-4 flex-1 items-center"
              >
                <Text className="text-white font-medium">Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  // Aquí iría la lógica real de logout
                  console.log('Sesión cerrada');
                }}
                className="bg-white rounded-full px-8 py-3 ml-4 flex-1 items-center"
              >
                <Text className="text-green-800 font-medium">Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}