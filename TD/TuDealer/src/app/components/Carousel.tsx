import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import { Svg, Path } from "react-native-svg";

const products = [
  {
    id: 1,
    name: "Auriculares Bluetooth",
    image: "https://picsum.photos/id/1010/400/400",
  },
  {
    id: 2,
    name: "Cámara Digital",
    image: "https://picsum.photos/id/1011/400/400",
  },
  {
    id: 3,
    name: "Reloj Inteligente",
    image: "https://picsum.photos/id/1012/400/400",
  },
  {
    id: 4,
    name: "Laptop Gamer",
    image: "https://picsum.photos/id/1013/400/400",
  },
];

export default function Carousel() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const renderItem = ({ item }) => (
    <View className="w-[220px] mr-4 bg-green-100 rounded-xl p-2 justify-between items-center shadow">
      <Image
        source={{ uri: item.image }}
        className="w-full h-[140px] rounded-lg"
        resizeMode="cover"
      />
      <Text className="text-center font-bold text-base mt-2 text-green-900">
        {item.name}
      </Text>
      <View className="flex-row space-x-4 mt-2">
        <TouchableOpacity
          className="bg-green-200 p-2 rounded-md"
          onPress={() => openModal(item)}
        >
          <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#065F46"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <Path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity className="bg-green-200 mx-2 p-2 rounded-md">
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7.5M17 13l1.5 7.5M6 21a1 1 0 100-2 1 1 0 000 2zm12 0a1 1 0 100-2 1 1 0 000 2z"
              stroke="#065F46"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <View className="bg-green-50 p-4 rounded-xl mt-5">
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View className="flex-1 bg-green-200/50 justify-center items-center">
          <View className="bg-green-100 w-[80%] p-5 rounded-2xl items-center">
            {selectedProduct && (
              <>
                <Image
                  source={{ uri: selectedProduct.image }}
                  className="w-[200px] h-[200px] rounded-xl mb-4"
                />
                <Text className="text-xl font-bold mb-4 text-green-900">
                  {selectedProduct.name}
                </Text>
                <Pressable
                  className="bg-green-200 px-4 py-2 rounded-md"
                  onPress={closeModal}
                >
                  <Text className="font-bold text-green-800 text-base">
                    Cerrar
                  </Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
