import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

const roles = [
  { label: "Usuario", value: "usuario", icon: require("../../../../assets/7.png") },
  { label: "Abogado", value: "abogado", icon: require("../../../../assets/8.png") },
  { label: "Doctor", value: "doctor", icon: require("../../../../assets/6.png") },
  { label: "Asociación", value: "asociacion", icon: require("../../../../assets/10.png") },
  { label: "Tienda", value: "tienda", icon: require("../../../../assets/9.png") },
];

const SignupScreen = () => {
  const router = useRouter();
  const [selectedForm, setSelectedForm] = useState("usuario");
  const [showModal, setShowModal] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    usuario: { name: "", email: "", password: "", repeatPassword: "", dni: "" },
    abogado: { name: "", email: "", password: "", repeatPassword: "", correo: "", codigoAbogado: "" },
    doctor: { name: "", email: "", password: "", repeatPassword: "", correo: "", codigoDoctor: "" },
    asociacion: { name: "", email: "", password: "", repeatPassword: "", correo: "", ruc: "", codigoAsociacion: "" },
    tienda: { name: "", email: "", password: "", repeatPassword: "", correo: "", ruc: "" },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [selectedForm]: { ...prev[selectedForm], [field]: value },
    }));
  };

  const handleSignup = () => {
    const data = formData[selectedForm];
    if (!data.email || !data.password || !data.repeatPassword) {
      alert("Por favor completa todos los campos.");
      return;
    }
    if (data.password !== data.repeatPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    router.push({ pathname: "/login", params: { email: data.email } });
  };

  const selectedRole = roles.find((role) => role.value === selectedForm);

  const inputStyle = (field: string) => ({
    ...styles.input,
    borderColor: focusedField === field ? "#004d32" : "#b4dccf",
  });

  const isFormValid = () => {
    const data = formData[selectedForm];
    const requiredFields = Object.keys(data);
    const allFilled = requiredFields.every((field) => data[field].trim() !== "");
    const passwordsMatch = data.password === data.repeatPassword;
    return allFilled && passwordsMatch;
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={60}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../../assets/logo.png")}
            style={{ width: 100, height: 100, resizeMode: "contain" }}
          />
        </View>

        <Text style={styles.title}>Crea Tu Cuenta</Text>

        <TouchableOpacity style={styles.selector} onPress={() => setShowModal(true)}>
          <Image source={selectedRole?.icon} style={styles.selectorIcon} />
          <Text style={styles.selectorText}>{selectedRole?.label}</Text>
        </TouchableOpacity>

        <Modal visible={showModal} transparent animationType="fade">
          <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowModal(false)}>
            <View style={styles.modalContainer}>
              {roles.map((role) => (
                <TouchableOpacity
                  key={role.value}
                  style={styles.modalOption}
                  onPress={() => {
                    setSelectedForm(role.value);
                    setShowModal(false);
                  }}
                >
                  <Image source={role.icon} style={styles.modalIcon} />
                  <Text style={styles.modalLabel}>{role.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        {Object.keys(formData[selectedForm]).map((field) => (
          <TextInput
            key={field}
            style={inputStyle(field)}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[selectedForm][field]}
            onChangeText={(value) => handleInputChange(field, value)}
            onFocus={() => setFocusedField(field)}
            onBlur={() => setFocusedField(null)}
            secureTextEntry={field === "password" || field === "repeatPassword"}
            placeholderTextColor="#7CA290"
          />
        ))}

        <TouchableOpacity
          style={[
            styles.registerButton,
            { backgroundColor: isFormValid() ? "#004d32" : "#b4dccf" },
          ]}
          onPress={handleSignup}
          disabled={!isFormValid()}
        >
          <Text style={styles.registerText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("auth/login")}>
          <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#004d32",
    textAlign: "center",
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4fdf9",
    borderColor: "#b4dccf",
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    width: "100%",
  },
  selectorIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  selectorText: {
    fontSize: 16,
    color: "#004d32",
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: "#b4dccf",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#f4fdf9",
    color: "#004d32",
    fontSize: 14,
  },
  registerButton: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 60,
    marginTop: 10,
    alignSelf: "center",
  },
  registerText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  link: {
    color: "#004d32",
    textAlign: "center",
    marginTop: 12,
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 40,
    borderRadius: 10,
    padding: 20,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  modalIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  modalLabel: {
    fontSize: 16,
    color: "#004d32",
  },
});

export default SignupScreen;
