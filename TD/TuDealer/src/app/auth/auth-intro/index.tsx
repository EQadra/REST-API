import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function LoginStartScreen(): JSX.Element {
  const router = useRouter();
  const { selectedCountry } = useLocalSearchParams();
  const [loadingButton, setLoadingButton] = useState<"login" | "signup" | null>(null);

  const startLoadingAndNavigate = (button: "login" | "signup", path: string, params?: object) => {
    setLoadingButton(button);
    setTimeout(() => {
      router.push({ pathname: path, params });
    }, 2000);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      {/* Logo */}
      <View className="items-center mb-6">
        <Image
          source={require("../../../../assets/logo.png")}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
      </View>

      {/* Bienvenida */}
      <View className="flex-row justify-center items-center mb-2">
        <Text className="text-2xl font-extrabold text-[#004d32] ml-2 mt-5 mb-5">
          Bienvenido!
        </Text>
      </View>

      {/* Botón Ingresar */}
      <TouchableOpacity
        className="w-60 rounded-full py-4 mb-3 bg-emerald-900"
        onPress={() =>
          startLoadingAndNavigate("login", "/aplication/countrys", { selectedCountry })
        }
        disabled={!!loadingButton}
      >
        <Text className="text-center font-bold text-lg text-white">
          {loadingButton === "login" ? "Cargando..." : "Ingresar"}
        </Text>
      </TouchableOpacity>

      {/* Botón Registrarse */}
      <TouchableOpacity
        className="w-60 bg-white border border-[#004d32] rounded-full py-4 mb-4"
        onPress={() => startLoadingAndNavigate("signup", "/auth/signup")}
        disabled={!!loadingButton}
      >
        <Text
          className={`text-center font-bold text-lg ${
            loadingButton === "signup" ? "text-gray-400" : "text-[#004d32]"
          }`}
        >
          {loadingButton === "signup" ? "Cargando..." : "Registrarse"}
        </Text>
      </TouchableOpacity>

      {/* País seleccionado */}
      {selectedCountry && (
        <Text className="text-center text-[#004d32] mt-6 text-base">
          País seleccionado: {selectedCountry}
        </Text>
      )}
    </View>
  );
}
