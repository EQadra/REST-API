import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const isFormValid = email.trim().length > 0;

  const handlePasswordRecovery = async (): Promise<void> => {
    try {
      if (!email) {
        Alert.alert("Error", "Por favor, ingresa tu correo.");
        return;
      }

      Alert.alert("Éxito", `Se ha enviado un enlace de recuperación a ${email}.`);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error al enviar correo:", error);
      Alert.alert("Error", "Ocurrió un problema al enviar el correo.");
    }
  };

  return (
    <View className="flex-1 justify-center p-5 bg-white">
      {/* Logo */}
      <View className="items-center mb-6">
        <Image
          source={require("../../../../assets/logo.png")}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
      </View>

      {/* Título */}
      <Text className="text-xl font-extrabold text-center text-[#004d32] mb-4">
        Recuperar Contraseña
      </Text>

      {/* Input */}
      <TextInput
        className="h-12 border mb-4 px-4 py-2 rounded-full"
        style={{
          backgroundColor: "#f2fdf6",
          borderColor: "#cce3d2",
          color: "#004d32",
        }}
        placeholder="Ingresa tu correo"
        placeholderTextColor="#9aa5a0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Botón */}
      <View className="mb-4">
        <TouchableOpacity
          disabled={!isFormValid}
          onPress={handlePasswordRecovery}
          className={`h-12 rounded-full justify-center items-center ${
            isFormValid ? "bg-[#004d32]" : "bg-gray-300"
          }`}
        >
          <Text className="text-white font-semibold text-base">
            Enviar correo de recuperación
          </Text>
        </TouchableOpacity>
      </View>

      {/* Enlace */}
      <Text
        className="text-center text-sm underline"
        style={{ color: "#004d32" }}
        onPress={() => router.push("/auth/login")}
      >
        Volver al inicio de sesión
      </Text>
    </View>
  );
}
