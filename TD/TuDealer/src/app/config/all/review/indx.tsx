import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

const entidadesFake = {
  product: [
    { id: 1, nombre: "Producto 1" },
    { id: 2, nombre: "Producto 2" },
  ],
  vendor: [
    { id: 3, nombre: "Tienda A" },
    { id: 4, nombre: "Tienda B" },
  ],
  doctor: [
    { id: 5, nombre: "Dr. Carlos Gómez" },
    { id: 6, nombre: "Dra. Luisa Ramos" },
  ],
  lawyer: [
    { id: 7, nombre: "Abg. Marta Pérez" },
    { id: 8, nombre: "Abg. Luis Sánchez" },
  ],
};

export default function NuevaResena() {
  const router = useRouter();
  const [form, setForm] = useState({
    user_id: 1,
    entity_type: "",
    entity_id: "",
    rating_product: "",
    rating_association: "",
    comment: "",
  });

  const [entidadesDisponibles, setEntidadesDisponibles] = useState([]);

  const handleEntityTypeChange = (value: string) => {
    setForm({ ...form, entity_type: value, entity_id: "" });
    setEntidadesDisponibles(entidadesFake[value] || []);
  };

  const handleSubmit = () => {
    if (!form.entity_type || !form.entity_id || !form.rating_product || !form.rating_association) {
      Alert.alert("Campos requeridos", "Selecciona entidad, ID de entidad y ambas calificaciones.");
      return;
    }

    const dataToSend = {
      ...form,
      rating_product: parseInt(form.rating_product),
      rating_association: parseInt(form.rating_association),
      created_at: new Date().toISOString(),
    };

    console.log("Reseña enviada:", dataToSend);
    Alert.alert("Éxito", "Reseña creada correctamente.");

    setForm({ user_id: 1, entity_type: "", entity_id: "", rating_product: "", rating_association: "", comment: "" });
    setEntidadesDisponibles([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Reseña</Text>

      <Text style={styles.label}>Tipo de Entidad:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.entity_type}
          onValueChange={(value) => handleEntityTypeChange(value)}
        >
          <Picker.Item label="Selecciona tipo" value="" />
          <Picker.Item label="Producto" value="product" />
          <Picker.Item label="Vendedor" value="vendor" />
          <Picker.Item label="Doctor" value="doctor" />
          <Picker.Item label="Abogado" value="lawyer" />
        </Picker>
      </View>

      {form.entity_type ? (
        <>
          <Text style={styles.label}>Selecciona la Entidad:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form.entity_id}
              onValueChange={(value) => setForm({ ...form, entity_id: value })}
            >
              <Picker.Item label="Selecciona entidad" value="" />
              {entidadesDisponibles.map((item) => (
                <Picker.Item key={item.id} label={item.nombre} value={item.id} />
              ))}
            </Picker>
          </View>
        </>
      ) : null}

      <Text style={styles.label}>Calificación Producto:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.rating_product}
          onValueChange={(value) => setForm({ ...form, rating_product: value })}
        >
          <Picker.Item label="Selecciona calificación" value="" />
          {[1, 2, 3, 4, 5].map((num) => (
            <Picker.Item key={num} label={`${num} estrellas`} value={num.toString()} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Calificación Asociación:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.rating_association}
          onValueChange={(value) => setForm({ ...form, rating_association: value })}
        >
          <Picker.Item label="Selecciona calificación" value="" />
          {[1, 2, 3, 4, 5].map((num) => (
            <Picker.Item key={num} label={`${num} estrellas`} value={num.toString()} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Comentario (opcional)"
        value={form.comment}
        onChangeText={(text) => setForm({ ...form, comment: text })}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Guardar Reseña</Text>
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
    backgroundColor: "#fff",
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
