import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

// Logo al final
const cannabisLeaf = require('../../../../assets/logo.png');

const notificationsData = [
  {
    id: '1',
    title: 'Nueva respuesta del Dr. Luis Medina',
    time: 'Hace 3 min',
    message: 'Hola, con gusto puedo ayudarte.\n¿Podrías contarme tus síntomas?',
  },
  {
    id: '2',
    title: 'Tu conexión fue aprobada',
    time: 'Hace 12 min',
    message: 'La abogada Carla Herrera aceptó tu solicitud.\nAhora puedes chatear directamente con ella.',
  },
  {
    id: '3',
    title: 'Nuevo producto en tu zona',
    time: 'Hace 1 hor',
    message: 'GreenLeaf Shop acaba de publicar\n"Tintura CBD Full Spectrum 10%".',
  },
  {
    id: '4',
    title: 'Evento este fin de semana',
    time: 'Hace 2 hor',
    message: 'La Asociación Cannábica realizará un taller de cultivo básico este sábado. Cupos limitados.',
  },
];

const NotificationItem = ({ item }: { item: typeof notificationsData[0] }) => (
  <TouchableOpacity className="bg-green-100 rounded-3xl p-5 mb-4">
    <View className="flex-row justify-between items-start mb-2">
      <Text className="text-gray-900 font-semibold text-base flex-1 mr-4">
        {item.title}
      </Text>
      <Text className="text-gray-500 text-sm">{item.time}</Text>
    </View>
    <Text className="text-gray-700 text-base leading-6 whitespace-pre-line">
      {item.message}
    </Text>
  </TouchableOpacity>
);

export default function NotificationsScreen() {
  return (
    <View className="flex-1 bg-white pt-12 px-4">
      {/* Header */}
      <View className="flex-row items-center mb-8">
        <TouchableOpacity>
          <Text className="text-2xl font-light">{'<'}</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold flex-1 text-center mr-8">
          Notificaciones
        </Text>
      </View>

      {/* Lista de notificaciones */}
      <FlatList
        data={notificationsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Logo al final */}
      <View className="absolute bottom-8 left-0 right-0 items-center">
        <Image
          source={cannabisLeaf}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </View>
    </View>
  );
}