import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

// Icono de hoja de cannabis (usa un SVG o imagen local). Aquí uso require para una imagen local.
// Descarga una imagen de hoja verde y guárdala en assets/logo.png
const cannabisLeaf = require('../../../../assets/logo.png'); // Ajusta la ruta

const historyData = [
  {
    id: '1',
    date: '15 Feb 2025',
    title: 'Dr. Luis Medina',
    description: 'Consulta medicina online\n+ receta digital',
    amount: '/120',
  },
  {
    id: '2',
    date: '02 Feb 2025',
    title: 'LegalGreen Abogados',
    description: 'Asesoría legal sobre cultivo personal',
    amount: '/250',
  },
  {
    id: '3',
    date: '22 Ene 2025',
    title: 'Asociación Raíces Libres',
    description: 'Inscripción a Taller de Cultivo Básico',
    amount: '/40',
  },
  {
    id: '4',
    date: '10 Ene 2025',
    title: 'NaturalMed Farmacia',
    description: 'Cápsulas de CBD - 30 unidades',
    amount: '/110',
  },
];

const HistoryItem = ({ item }: { item: typeof historyData[0] }) => (
  <TouchableOpacity className="bg-green-100 rounded-2xl p-4 mb-4 flex-row justify-between items-start">
    <View className="flex-1">
      <Text className="text-gray-600 text-sm">{item.date}</Text>
      <Text className="text-gray-900 font-semibold mt-1">{item.title}</Text>
      <Text className="text-gray-700 text-sm mt-2 whitespace-pre-line">
        {item.description}
      </Text>
    </View>
    <View className="items-end">
      <Text className="text-green-600 font-bold text-lg">{item.amount}</Text>
    </View>
  </TouchableOpacity>
);

export default function HistoryScreen() {
  return (
    <View className="flex-1 bg-white pt-12 px-4">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity>
          <Text className="text-2xl">{'<'}</Text> {/* Icono de back simple */}
        </TouchableOpacity>
        <Text className="text-xl font-bold flex-1 text-center mr-8">
          Mi historial
        </Text>
      </View>

      {/* Lista de items */}
      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryItem item={item} />}
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