import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

// Icono de hoja de cannabis al final
const cannabisLeaf = require('../../../../assets/logo.png'); // Ajusta la ruta

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-white pt-12 px-4">
      {/* Header */}
      <View className="flex-row items-center mb-8">
        <TouchableOpacity>
          <Text className="text-2xl font-light">{'<'}</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold flex-1 text-center mr-8">
          Configuración
        </Text>
      </View>

      {/* Sección General */}
      <Text className="text-green-600 text-lg font-semibold mb-4">
        General
      </Text>

      <View className="bg-white rounded-2xl shadow-sm">
        <TouchableOpacity className="flex-row justify-between items-center py-4 px-4 border-b border-gray-200">
          <Text className="text-base text-gray-900">Lenguaje</Text>
          <Text className="text-xl text-gray-400">{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row justify-between items-center py-4 px-4 border-b border-gray-200">
          <Text className="text-base text-gray-900">Términos de uso</Text>
          <Text className="text-xl text-gray-400">{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row justify-between items-center py-4 px-4 border-b border-gray-200">
          <Text className="text-base text-gray-900">Política de privacidad</Text>
          <Text className="text-xl text-gray-400">{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row justify-between items-center py-4 px-4">
          <Text className="text-base text-gray-900">Cuentas asociadas</Text>
          <Text className="text-xl text-gray-400">{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Opciones destructivas */}
      <View className="mt-8">
        <TouchableOpacity className="flex-row items-center py-4">
          <Text className="text-base text-red-600 ml-2">Cerrar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-4">
          <Text className="text-base text-red-600 ml-2">Eliminar cuenta</Text>
        </TouchableOpacity>
      </View>

      {/* Logo al final */}
      <View className="flex-1 justify-end items-center pb-8">
        <Image
          source={cannabisLeaf}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </View>
    </View>
  );
}