import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function Doctor() {
  const router = useRouter();
  const [form, setForm] = useState({
    user_id: "",
    license_number: "",
    dni: "",
    doctor_code: "",
    specialization: "",
  });

  const handleSubmit = () => {
    if (!form.user_id || !form.license_number || !form.dni || !form.doctor_code || !form.specialization) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos.");
      return;
    }

    const dataToSend = {
      ...form,
      verified_at: null,
    };

    console.log("Doctor enviado:", dataToSend);
    Alert.alert("Éxito", "Doctor creado correctamente.");

    setForm({ user_id: "", license_number: "", dni: "", doctor_code: "", specialization: "" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo Doctor</Text>

      <TextInput
        style={styles.input}
        placeholder="ID del Usuario"
        keyboardType="numeric"
        value={form.user_id}
        onChangeText={(text) => setForm({ ...form, user_id: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Número de licencia"
        value={form.license_number}
        onChangeText={(text) => setForm({ ...form, license_number: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="DNI"
        keyboardType="numeric"
        maxLength={8}
        value={form.dni}
        onChangeText={(text) => setForm({ ...form, dni: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Código de Doctor"
        value={form.doctor_code}
        onChangeText={(text) => setForm({ ...form, doctor_code: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Especialización"
        value={form.specialization}
        onChangeText={(text) => setForm({ ...form, specialization: text })}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Guardar Doctor</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backLink}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f7f9fc",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  ratingButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  ratingSelected: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  ratingText: {
    fontSize: 18,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  backLink: {
    textAlign: "center",
    color: "#0066cc",
    marginTop: 10,
  },
});
