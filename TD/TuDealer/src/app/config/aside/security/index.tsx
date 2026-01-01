import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

// Icono de hoja de cannabis
const cannabisLeaf = require('../../../../assets/logo.png'); // Ajusta la ruta

export default function AccountSecurityScreen() {
  // Estados para los campos del formulario
  const [fullName, setFullName] = useState('Camilo Tervez');
  const [username, setUsername] = useState('camilo_tervez');
  const [email, setEmail] = useState('camilo@example.com');
  const [phone, setPhone] = useState('+51 999 888 777');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollView className="flex-1 bg-white pt-12 px-4" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="flex-row items-center mb-8">
        <TouchableOpacity>
          <Text className="text-2xl font-light">{'<'}</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold flex-1 text-center mr-8">
          Cuenta y seguridad
        </Text>
      </View>

      {/* Foto de perfil con cámara */}
      <View className="items-center mb-8">
        <View className="relative">
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face' }} // Foto placeholder
            className="w-32 h-32 rounded-full border-4 border-green-200"
          />
          <TouchableOpacity className="absolute bottom-0 right-0 bg-black/70 rounded-full p-3">
            <Text className="text-white text-2xl">📷</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sección Información personal */}
      <Text className="text-green-600 text-lg font-semibold mb-6">
        Información personal
      </Text>

      <View className="space-y-4 mb-10">
        <View>
          <Text className="text-gray-700 text-sm mb-2">Nombre completo</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-base"
            placeholder="Ingresa tu nombre completo"
          />
        </View>

        <View>
          <Text className="text-gray-700 text-sm mb-2">Usuario</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-base"
            placeholder="Tu nombre de usuario"
          />
        </View>

        <View>
          <Text className="text-gray-700 text-sm mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-base"
            placeholder="tu@email.com"
          />
        </View>

        <View>
          <Text className="text-gray-700 text-sm mb-2">Teléfono</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-base"
            placeholder="+51 ..."
          />
        </View>
      </View>

      {/* Sección Seguridad */}
      <Text className="text-green-600 text-lg font-semibold mb-6">
        Seguridad
      </Text>

      <View className="space-y-4 mb-20">
        <View>
          <Text className="text-gray-700 text-sm mb-2">Contraseña</Text>
          <View className="relative">
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 pr-12 text-base"
              placeholder="Ingresa nueva contraseña"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3"
            >
              <Text className="text-gray-500 text-lg">
                {showPassword ? '🙈' : '👁️'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity className="py-4">
          <Text className="text-base text-gray-900">Dispositivos</Text>
        </TouchableOpacity>
      </View>

      {/* Logo al final (fuera del ScrollView si prefieres fijo) */}
      <View className="items-center py-8 pb-12">
        <Image
          source={cannabisLeaf}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  );
}