import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

// Icono de hoja de cannabis (mismo que usamos antes)
const cannabisLeaf = require('../../../../assets/logo.png'); // Ajusta la ruta

const favoritesData = [
  {
    id: '1',
    title: 'GreenLeaf Shop',
    rating: '4.9 ★ (1.2km)',
    description: 'Tratamientos para dolor crónico y ansiedad • +120 pacientes atendidos',
  },
  {
    id: '2',
    title: 'LegalGreen Abogados',
    rating: 'Lima (2km)',
    description: 'Asesoría en licencias de cultivo y defensa legal en procesos vinculados al cannabis',
  },
  {
    id: '3',
    title: 'Asociación Raíces Libres',
    rating: 'Cusco (3km)',
    description: 'Organizo talleres presenciales y ofrece apoyo a pacientes con epilepsia',
  },
  {
    id: '4',
    title: 'Cápsulas CBD Full Spectrum 10% - 30 unidades',
    rating: 'Lima (1km)',
    description: 'Uso nocturno para mejorar el sueño. Disponible para entrega local',
  },
];

const FavoriteItem = ({ item }: { item: typeof favoritesData[0] }) => (
  <TouchableOpacity className="bg-green-100 rounded-2xl p-4 mb-4 flex-row items-start">
    {/* Corazón verde */}
    <View className="mr-4 mt-1">
      <Text className="text-2xl">💚</Text>
    </View>

    <View className="flex-1">
      <Text className="text-gray-900 font-semibold text-base">{item.title}</Text>
      <Text className="text-green-600 text-sm mt-1">{item.rating}</Text>
      <Text className="text-gray-700 text-sm mt-2 leading-5">
        {item.description}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function FavoritesScreen() {
  return (
    <View className="flex-1 bg-white pt-12 px-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity>
          <Text className="text-2xl font-light">{`<`}</Text>
        </TouchableOpacity>

        <Text className="text-xl font-bold">Favoritos</Text>

        <TouchableOpacity>
          <Text className="text-3xl font-light leading-none">...</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de favoritos */}
      <FlatList
        data={favoritesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FavoriteItem item={item} />}
        showsVerticalScrollIndicator={false}
      />

      {/* Logo fijo al final */}
      <View className="items-center py-8">
        <Image
          source={cannabisLeaf}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </View>
    </View>
  );
}