import React from 'react';
import { View, Text, TouchableOpacity, Image, Switch, useColorScheme } from 'react-native';
import Slider from '@react-native-community/slider';

// Icono de hoja de cannabis
const cannabisLeaf = require('../../../../assets/logo.png'); // Ajusta la ruta

// Imágenes de preview (descarga o usa placeholders). Aquí uso require locales.
// Crea dos imágenes: light-preview.png y dark-preview.png basadas en la captura.
const lightPreview = require('./assets/light-preview.png');
const darkPreview = require('./assets/dark-preview.png');

export default function AppearanceScreen() {
  const colorScheme = useColorScheme(); // 'light' | 'dark' | null
  const isDark = colorScheme === 'dark';

  // Estado para tema manual (light/dark) y automático
  const [isAuto, setIsAuto] = React.useState(true);
  const [manualTheme, setManualTheme] = React.useState<'light' | 'dark'>('light');
  const [brightness, setBrightness] = React.useState(0.8);

  // Tema efectivo: si automático, usa el del sistema; si no, el manual
  const effectiveTheme = isAuto ? colorScheme : manualTheme;

  return (
    <View className={`flex-1 ${effectiveTheme === 'dark' ? 'bg-gray-900' : 'bg-white'} pt-12 px-4`}>
      {/* Header */}
      <View className="flex-row items-center mb-8">
        <TouchableOpacity>
          <Text className={`text-2xl font-light ${effectiveTheme === 'dark' ? 'text-white' : 'text-black'}`}>
            {'<'}
          </Text>
        </TouchableOpacity>
        <Text className={`text-xl font-bold flex-1 text-center mr-8 ${effectiveTheme === 'dark' ? 'text-white' : 'text-black'}`}>
          Apariencia
        </Text>
      </View>

      {/* Sección Apariencia */}
      <Text className={`text-lg font-semibold mb-4 ${effectiveTheme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
        Apariencia
      </Text>

      <View className="flex-row justify-around mb-8">
        {/* Light */}
        <TouchableOpacity
          onPress={() => {
            setIsAuto(false);
            setManualTheme('light');
          }}
          className="items-center"
        >
          <Image source={lightPreview} className="w-32 h-48 rounded-2xl mb-2" resizeMode="cover" />
          <Text className={`text-base ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Light
          </Text>
          <View className="mt-2">
            {(!isAuto && manualTheme === 'light') || (isAuto && effectiveTheme === 'light') ? (
              <Text className="text-2xl text-blue-500">✓</Text>
            ) : (
              <View className="w-6 h-6 rounded-full border-2 border-gray-400" />
            )}
          </View>
        </TouchableOpacity>

        {/* Dark */}
        <TouchableOpacity
          onPress={() => {
            setIsAuto(false);
            setManualTheme('dark');
          }}
          className="items-center"
          >
          <Image source={darkPreview} className="w-32 h-48 rounded-2xl mb-2" resizeMode="cover" />
          <Text className={`text-base ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Dark
          </Text>
          <View className="mt-2">
            {(!isAuto && manualTheme === 'dark') || (isAuto && effectiveTheme === 'dark') ? (
              <Text className="text-2xl text-blue-500">✓</Text>
            ) : (
              <View className="w-6 h-6 rounded-full border-2 border-gray-400" />
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Automático */}
      <View className="flex-row justify-between items-center mb-8">
        <Text className={`text-base ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Automático
        </Text>
        <Switch
          value={isAuto}
          onValueChange={setIsAuto}
          trackColor={{ false: '#767577', true: '#10b981' }}
          thumbColor={isAuto ? '#fff' : '#f4f3f4'}
        />
      </View>

      {/* Brillo */}
      <Text className={`text-base mb-3 ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        Brillo
      </Text>
      <View className="flex-row items-center">
        <Text className="text-2xl mr-4">☀️</Text>
        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={1}
          value={brightness}
          onValueChange={setBrightness}
          minimumTrackTintColor="#10b981"
          maximumTrackTintColor="#d1d5db"
          thumbTintColor="#10b981"
        />
        <Text className="text-2xl ml-4">☀️</Text>
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