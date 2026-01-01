import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

export default function ProductRegister() {
  const router = useRouter();
  
  const categorias = ["Electrónica", "Ropa", "Comida", "Juguetes", "Hogar"];

  const [producto, setProducto] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: categorias[0],
    image: null as string | null,
  });

  const handleAddImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se necesitan permisos para acceder a la galería!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProducto({ ...producto, image: result.assets[0].uri });
    }
  };

  const handleSubmit = () => {
    const productoFinal = {
      ...producto,
      price: parseFloat(producto.price),
      stock: parseInt(producto.stock),
    };

    console.log("Producto a enviar:", productoFinal);

    // Aquí podrías hacer la petición POST a tu API
    // fetch('https://tuapi.com/products', { method: 'POST', body: JSON.stringify(productoFinal) })

    alert("Producto registrado exitosamente!");
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Producto</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={producto.name}
        onChangeText={(text) => setProducto({ ...producto, name: text })}
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Descripción"
        multiline
        value={producto.description}
        onChangeText={(text) => setProducto({ ...producto, description: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={producto.price}
        onChangeText={(text) => setProducto({ ...producto, price: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Stock"
        keyboardType="numeric"
        value={producto.stock}
        onChangeText={(text) => setProducto({ ...producto, stock: text })}
      />

      <Text style={styles.categoryLabel}>Categoría</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={producto.category}
          onValueChange={(itemValue) => setProducto({ ...producto, category: itemValue })}
        >
          {categorias.map((cat, index) => (
            <Picker.Item key={index} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Agregar Imagen" onPress={handleAddImagen} />
      </View>

      {producto.image && (
        <Image source={{ uri: producto.image }} style={styles.productoImage} />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Guardar Producto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
  },
  pickerWrapper: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    overflow: "hidden",
  },
  categoryLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  productoImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 15,
  },
  buttonContainer: {
    marginVertical: 10,
    width: "60%",
    alignSelf: "center",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
  },
});
