import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import Svg, { Path, Circle } from "react-native-svg";

export default function LoginScreen(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const { login } = useAuth();
  const { selectedCountry } = useLocalSearchParams<{ selectedCountry?: string }>();

  // Validación de email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar formulario completo
  const isFormValid = isValidEmail(email) && password.length >= 3;

  const handleLogin = async (): Promise<void> => {
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Ingresa un correo electrónico válido.");
      return;
    }

    if (password.length < 3) {
      Alert.alert("Error", "La contraseña debe tener al menos 3 caracteres.");
      return;
    }

    try {
      await login(email, password);
      router.push("/aplication/home-app");
    } catch (error) {
      console.error("Error en login:", error);
      Alert.alert("Error", "No se pudo iniciar sesión. Verifica tus datos.");
    }
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert("Login Social", `Intentando iniciar sesión con ${provider}`);
  };

  // Iconos SVG (Google, Facebook, Instagram, User)
  const GoogleIcon = () => (
    <Svg width={16} height={16} viewBox="0 0 48 48">
      <Path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.3 9.18 3.42l6.84-6.84C35.44 2.24 30.04 0 24 0 14.62 0 6.61 5.64 2.7 13.56l8.33 6.49C13.13 13.09 18.17 9.5 24 9.5z" />
      <Path fill="#34A853" d="M24 48c6.04 0 11.44-2.24 15.68-5.89l-7.27-5.94C29.97 37.7 27.05 38.5 24 38.5c-5.83 0-10.87-3.59-13-8.55l-8.33 6.49C6.61 42.36 14.62 48 24 48z" />
      <Path fill="#4A90E2" d="M46.5 24c0-1.36-.12-2.68-.34-3.95H24v9h12.65c-.59 3-2.38 5.52-5.04 7.13l7.27 5.94C43.89 38.28 46.5 31.69 46.5 24z" />
      <Path fill="#FBBC05" d="M11 29.95c-1.11-3.06-1.11-6.4 0-9.45l-8.33-6.49C-.88 20.5-.88 27.5 2.7 34.44L11 29.95z" />
    </Svg>
  );

  const FacebookIcon = () => (
    <Svg width={16} height={16} viewBox="0 0 48 48">
      <Path fill="#1877F2" d="M24 0C10.74 0 0 10.74 0 24c0 11.95 8.75 21.86 20.19 23.7V30.98h-6.07v-6.98h6.07v-5.32c0-6 3.57-9.3 9.04-9.3 2.61 0 5.35.47 5.35.47v5.87h-3.01c-2.97 0-3.9 1.85-3.9 3.75v4.53h6.64l-1.06 6.98h-5.58v16.72C39.25 45.86 48 35.95 48 24 48 10.74 37.26 0 24 0z" />
    </Svg>
  );

  const InstagramIcon = () => (
    <Svg width={16} height={16} viewBox="0 0 512 512">
      <Path fill="#E1306C" d="M349.33 69.33H162.67C112.59 69.33 69.33 112.59 69.33 162.67v186.66c0 50.08 43.26 93.34 93.34 93.34h186.66c50.08 0 93.34-43.26 93.34-93.34V162.67c0-50.08-43.26-93.34-93.34-93.34zm61.34 280c0 33.87-27.47 61.34-61.34 61.34H162.67c-33.87 0-61.34-27.47-61.34-61.34V162.67c0-33.87 27.47-61.34 61.34-61.34h186.66c33.87 0 61.34 27.47 61.34 61.34v186.66z" />
      <Path fill="#E1306C" d="M256 149.33c-58.86 0-106.67 47.81-106.67 106.67S197.14 362.67 256 362.67 362.67 314.86 362.67 256 314.86 149.33 256 149.33zm0 170.67c-35.27 0-64-28.73-64-64s28.73-64 64-64 64 28.73 64 64-28.73 64-64 64z" />
      <Circle cx="393.6" cy="118.4" r="17.07" fill="#E1306C" />
    </Svg>
  );

  return (
    <View className="flex-1 justify-center p-5 bg-white">
      {/* LOGO */}
      <View className="items-center mb-6">
        <Image
          source={require("../../../../assets/logo.png")}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
      </View>

      {/* TÍTULO */}
      <View className="flex-row justify-center items-center mb-2">
        <Text className="text-xl font-extrabold text-[#004d32] ml-2">
          Ingresar
        </Text>
      </View>

      <Text className="text-center text-[#5c7a70] text-base mb-6">
        Accede a tu cuenta para continuar
      </Text>

      {/* CAMPOS */}
      <TextInput
        className="h-12 border mb-4 px-4 py-2 rounded-full"
        style={{
          backgroundColor: "#f2fdf6",
          borderColor: "#cce3d2",
          color: "#004d32",
        }}
        placeholder="Correo electrónico"
        placeholderTextColor="#9aa5a0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="h-12 border mb-4 px-4 py-2 rounded-full"
        style={{
          backgroundColor: "#f2fdf6",
          borderColor: "#cce3d2",
          color: "#004d32",
        }}
        placeholder="Contraseña"
        placeholderTextColor="#9aa5a0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* BOTÓN INGRESAR */}
      <TouchableOpacity
        disabled={!isFormValid}
        onPress={handleLogin}
        className={`h-12 rounded-full justify-center items-center mb-4 ${
          isFormValid ? "bg-[#004d32]" : "bg-gray-300"
        }`}
      >
        <Text className="text-white font-semibold text-base">Ingresar</Text>
      </TouchableOpacity>

      {/* País seleccionado */}
      {selectedCountry && (
        <Text className="text-center mt-2 text-[#004d32] font-medium">
          País seleccionado: {selectedCountry}
        </Text>
      )}

      {/* Login Social */}
      <Text className="text-center text-[#004d32] mt-6 mb-3 font-bold">
        O inicia sesión con:
      </Text>
      <View className="flex-row justify-around mb-6">
        <TouchableOpacity
          className="items-center justify-center w-14 h-14 rounded-full bg-white shadow"
          onPress={() => handleSocialLogin("Google")}
        >
          <GoogleIcon />
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center justify-center w-14 h-14 rounded-full bg-white shadow"
          onPress={() => handleSocialLogin("Facebook")}
        >
          <FacebookIcon />
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center justify-center w-14 h-14 rounded-full bg-white shadow"
          onPress={() => handleSocialLogin("Instagram")}
        >
          <InstagramIcon />
        </TouchableOpacity>
      </View>

      {/* Links */}
      <View className="mt-5">
        <Text
          className="text-center text-xs underline"
          style={{ color: "#004d32" }}
          onPress={() => router.push("/auth/forgot-password")}
        >
          ¿Olvidaste tu contraseña?
        </Text>
        <Text
          className="text-center text-xs underline mt-2"
          style={{ color: "#004d32" }}
          onPress={() => router.push("/auth/signup")}
        >
          ¿No tienes cuenta? Regístrate
        </Text>
      </View>
    </View>
  );
}
