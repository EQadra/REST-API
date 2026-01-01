import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; // Para el icono de regreso

export default function SoporteScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <Ionicons name="chevron-back" size={24} color="black" />
        <Text className="text-lg font-semibold ml-2">Soporte</Text>
      </View>

      {/* Título */}
      <Text className="text-xl font-bold mb-6">Centro de contacto</Text>

      {/* Opción WhatsApp */}
      <TouchableOpacity className="flex-row items-center bg-gray-100 p-4 rounded-xl mb-4">
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" }}
          style={{ width: 40, height: 40 }}
        />
        <View className="ml-4 flex-1">
          <Text className="text-lg font-semibold">WhatsApp</Text>
          <Text className="text-gray-500">
            Conéctate de forma rápida con nuestro equipo a través de WhatsApp. Obtén soporte personalizado y resuelve tus dudas en tiempo real.
          </Text>
        </View>
      </TouchableOpacity>

      {/* Opción Correo */}
      <TouchableOpacity className="flex-row items-center bg-gray-100 p-4 rounded-xl mb-4">
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.svg" }}
          style={{ width: 40, height: 40 }}
        />
        <View className="ml-4 flex-1">
          <Text className="text-lg font-semibold">Correo</Text>
          <Text className="text-gray-500">
            Si prefieres el correo electrónico, envíanos tu consulta o comentario. Nuestro equipo de soporte te responderá lo antes posible.
          </Text>
        </View>
      </TouchableOpacity>

      {/* Opción Reportar un problema */}
      <TouchableOpacity className="flex-row items-center bg-gray-100 p-4 rounded-xl">
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/OOjs_UI_icon_alert-destructive.svg/1024px-OOjs_UI_icon_alert-destructive.svg.png" }}
          style={{ width: 40, height: 40 }}
        />
        <View className="ml-4 flex-1">
          <Text className="text-lg font-semibold">Reportar un problema</Text>
          <Text className="text-gray-500">
            ¿Algo no funciona bien en TueDealer? Completa un breve formulario y cuéntanos qué ocurrió. Revisaremos tu caso y te daremos una solución.
          </Text>
        </View>
      </TouchableOpacity>

      {/* Footer icon */}
      <View className="absolute bottom-4 w-full items-center">
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/4/46/Leaf_icon.png" }}
          style={{ width: 50, height: 50 }}
        />
      </View>
    </SafeAreaView>
  );
}
