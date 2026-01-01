import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRouter } from "expo-router";

export default function Category() {
  const router = useRouter();
  const [form, setForm] = useState({
    doctor_id: "",
    user_id: "",
    notes: "",
    expires_at: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleConfirm = (date: Date) => {
    setForm({ ...form, expires_at: date });
    setShowDatePicker(false);
  };

  const handleSubmit = () => {
    if (!form.doctor_id || !form.user_id || !form.notes) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos.");
      return;
    }

    const dataToSend = { ...form, expires_at: form.expires_at.toISOString() };
    console.log("Receta médica enviada:", dataToSend);
    Alert.alert("Éxito", "Receta médica guardada correctamente.");
    setForm({ doctor_id: "", user_id: "", notes: "", expires_at: new Date() });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Receta Médica</Text>
      <TextInput
        style={styles.input}
        placeholder="ID del Doctor"
        keyboardType="numeric"
        value={form.doctor_id}
        onChangeText={(text) => setForm({ ...form, doctor_id: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="ID del Paciente"
        keyboardType="numeric"
        value={form.user_id}
        onChangeText={(text) => setForm({ ...form, user_id: text })}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Notas de la receta"
        value={form.notes}
        onChangeText={(text) => setForm({ ...form, notes: text })}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>Fecha de Vencimiento: {form.expires_at.toLocaleDateString()}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setShowDatePicker(false)}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Guardar Receta</Text>
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
    dateButton: {
      backgroundColor: "#e0f2f1",
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
    },
    dateText: {
      color: "#333",
      fontSize: 16,
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
  