import { Link } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Svg, Path, Defs, Rect, ClipPath } from 'react-native-svg';

const { width } = Dimensions.get("window");


const Star = ({ filled = true, half = false, size = 20, color = '#facc15' }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      {/* Estrella de fondo (vacía) */}
      <Path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 
           5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
        fill="none"
        stroke={color}
        strokeWidth={2}
      />

      {filled && !half && (
        // Estrella completamente llena
        <Path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 
             5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
          fill={color}
        />
      )}

      {half && (
        <>
          <Defs>
            <ClipPath id="halfClip">
              <Rect x="0" y="0" width="12" height="24" />
            </ClipPath>
          </Defs>
          <Path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 
               5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
            fill={color}
            clipPath="url(#halfClip)"
          />
        </>
      )}
    </Svg>
  );
};
const doctors = [
  {
    id: 1,
    name: "Dra. Ana López",
    age: 45,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Dr. Carlos Pérez",
    age: 50,
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Dra. María Ruiz",
    age: 38,
    avatar: "https://randomuser.me/api/portraits/women/46.jpg",
  },
];

const products = [
  {
    id: 1,
    name: "Auriculares Bluetooth",
    image: "https://picsum.photos/id/1005/800/600",
  },
  {
    id: 2,
    name: "Cámara Digital",
    image: "https://picsum.photos/id/1011/800/600",
  },
  {
    id: 3,
    name: "Reloj Inteligente",
    image: "https://picsum.photos/id/1025/800/600",
  },
  {
    id: 4,
    name: "Laptop Gamer",
    image: "https://picsum.photos/id/1043/800/600",
  },
];

export default function Doctor(): JSX.Element {
  const { top, bottom } = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const [selectedTab, setSelectedTab] = useState("Productos");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openDoctorModal = (doctor) => {
    setSelectedDoctor(doctor);
    setModalVisible(true);
  };

  const closeDoctorModal = () => {
    setSelectedDoctor(null);
    setModalVisible(false);
  };

  const scrollToIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    }
  };

  const handleNext = () => {
    if (currentIndex < products.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: (currentIndex + 1) % 6, // Hacerlo ciclar
          animated: true,
        });
      }
    }, 2000); // Cambio de imagen cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  const tabs = ["Servicios", "Productos", "Promos"];
  const tabContent = {
    Servicios: [
      {
        id: 1,
        name: "Consulta Médica",
        description: "Atención médica personalizada con profesionales.",
        image: "https://picsum.photos/200/200?random=1",
      },
      {
        id: 2,
        name: "Exámenes Clínicos",
        description: "Amplia gama de estudios y análisis de laboratorio.",
        image: "https://picsum.photos/200/200?random=2",
      },
    ],
    
    Productos: [
      {
        id: 1,
        name: "Kit de Salud",
        description: "Incluye tensiómetro, termómetro digital y oxímetro.",
        image: "https://picsum.photos/200/200?random=5",
      },
      {
        id: 2,
        name: "Kit de Salud",
        description: "Incluye tensiómetro, termómetro digital y oxímetro.",
        image: "https://picsum.photos/200/200?random=6",
      },
    ],
    Promos: [
      {
        id: 1,
        name: "Consulta 2x1",
        description: "Lleva a un acompañante sin costo adicional.",
        image: "https://picsum.photos/200/200?random=10",
      },
      {
        id: 2,
        name: "Consulta 2x1",
        description: "Lleva a un acompañante sin costo adicional.",
        image: "https://picsum.photos/200/200?random=11",
      },
    ],
  };

  return (
    <ScrollView className="flex-1 bg-green-200" contentContainerStyle={{ paddingBottom: bottom }}>
      {/* Header de navegación */}
    

      {/* Perfil */}
     {/* Perfil */}
      <View className="flex-row items-center p-4 bg-green-50 border-b border-green-200">
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
          className="w-20 h-20 rounded-full border-2 border-green-300"
        />
        <View className="ml-4">
          <Text className="text-lg font-semibold text-green-800">Eduardo Cuadra</Text>
          <View className="flex-row items-center space-x-1">
            <Star filled color="#16a34a" />
            <Star color="#16a34a" />
            <Star filled color="#16a34a" />
            <Star half color="#16a34a" />
            <Star filled={false} color="#16a34a" />
          </View>
          <Text className="text-sm text-green-700">Frontend Dev en NetForemost</Text>
        </View>
      </View>


      {/* Doctores */}
     {/* Doctores */}
<Text className="text-xl font-bold mt-6 mb-4 px-4 text-green-800">Doctores disponibles</Text>
<FlatList
  data={doctors}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View className="flex-row items-center bg-green-100 rounded-lg mb-3 p-3 shadow-md">
      <Image source={{ uri: item.avatar }} className="w-16 h-16 rounded-full border-2 border-green-300" />
      <View className="ml-3 flex-1">
        <Text className="text-base font-semibold text-green-800">{item.name}</Text>
        <Text className="text-sm text-green-700">Edad: {item.age}</Text>
      </View>
      <TouchableOpacity
        className="bg-green-600 px-3 py-1 rounded-lg"
        onPress={() => openDoctorModal(item)}
      >
        <Text className="text-green-800 text-sm">Ver más</Text>
      </TouchableOpacity>
    </View>
  )}
/>


      {/* Slider de Productos */}
     {/* Slider de Productos */}
<View className="relative px-4 mb-6 bg-green-50 py-4 rounded-xl">
  <Text className="text-xl font-bold mb-4 text-green-800">Productos Destacados</Text>
  <View className="relative">
    <FlatList
      ref={flatListRef}
      data={products}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View className="w-60 mr-4">
          <Image
            source={{ uri: item.image }}
            className="w-full h-40 rounded-lg border border-green-200"
          />
          <Text className="text-sm font-bold mt-2 text-green-800">{item.name}</Text>
        </View>
      )}
    />
    {/* Botones de navegación */}
    <TouchableOpacity
      className="absolute top-1/2 left-2 transform -translate-y-1/2 p-1 bg-green-600 bg-opacity-80 rounded-full"
      onPress={handlePrev}
    >
      <Text className="text-green-800 text-xl">{"<"}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      className="absolute top-1/2 right-2 transform -translate-y-1/2 p-1 bg-green-600 bg-opacity-80 rounded-full"
      onPress={handleNext}
    >
      <Text className="text-green-800 text-xl">{">"}</Text>
    </TouchableOpacity>
  </View>
</View>


      {/* Tabs y contenido */}
      <Text className="text-xl font-bold text-green-700 mt-6 mb-4 px-4">Servicios, Productos y Promos</Text>

<View className="flex-row justify-around bg-green-50 border-2 border-green-200 rounded-lg py-2 mb-4 mx-4">
  {tabs.map((tab) => (
    <TouchableOpacity
      key={tab}
      className={`px-4 py-2 rounded-md ${
        selectedTab === tab ? "bg-green-600" : "bg-green-100"
      }`}
      onPress={() => setSelectedTab(tab)}
    >
      <Text
        className={`text-xs ${
          selectedTab === tab ? "text-green-800 font-semibold" : "text-green-800"
        }`}
      >
        {tab}
      </Text>
    </TouchableOpacity>
  ))}
</View>

<FlatList
  data={tabContent[selectedTab] || []}
  keyExtractor={(item) => item.id.toString()}
  horizontal
  showsHorizontalScrollIndicator={false}
  renderItem={({ item }) => (
    <View className="w-40 m-2 bg-green-50 rounded-xl p-3 shadow-sm border border-green-100">
      <Image source={{ uri: item.image }} className="w-full h-24 rounded-md" />
      <Text className="text-sm font-bold mt-2 text-green-800">{item.name}</Text>
      <Text className="text-xs text-green-700 mt-1">{item.description}</Text>
      <TouchableOpacity
        className="bg-green-600 p-2 rounded-full mt-2"
        onPress={() => setSelectedProduct(item)}
      >
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            d="M15 15L21 21"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  )}
/>

{/* Últimas Noticias */}
{/* Últimas Noticias */}
<Text className="text-xl font-bold mt-6 text-green-700 mb-4 bg-green-200 px-4">Últimas Noticias</Text>
<View className="space-y-4 bg-green-200 px-4 mb-6">
  {[
    {
      id: 1,
      title: "Nuevo convenio con hospitales regionales",
      description: "Expansión de nuestros servicios en nuevas regiones.",
      date: "20 Abril 2025",
      image: "https://picsum.photos/400/200?random=13",
    },
    {
      id: 2,
      title: "Actualización en la app móvil",
      description: "Mejoras en experiencia y agendamiento de citas.",
      date: "18 Abril 2025",
      image: "https://picsum.photos/400/200?random=14",
    },
  ].map((news) => (
    <View key={news.id} className="relative h-48 rounded-xl my-2 overflow-hidden">
      <Image
        source={{ uri: news.image }}
        className="absolute w-full h-full"
        resizeMode="cover"
      />
      <View className="absolute inset-0 bg-green-400 bg-opacity-50 p-4 justify-end">
        <Text className="text-green-800 font-bold text-lg">{news.title}</Text>
        <Text className="text-green-800 text-sm">{news.description}</Text>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-green-800 text-xs">{news.date}</Text>
          <TouchableOpacity
            className="bg-green-300 px-3 py-1 rounded-full"
            onPress={() => console.log("Ver detalle:", news.title)}
          >
            <Text className="text-green-800 text-xs font-semibold">Ver detalle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ))}
</View>


{/*  */}

    <View className="px-4 bg-green-200 mb-6">
      <Text className="text-xl text-green-700 font-bold mt-6 mb-4">Marcas Destacadas</Text>
      
      {/* Usamos un FlatList sin envolverlo en un ScrollView */}
      <FlatList
        ref={flatListRef}
        data={[
          { id: '1', image: 'https://picsum.photos/200/200?random=1' },
          { id: '2', image: 'https://picsum.photos/200/200?random=2' },
          { id: '3', image: 'https://picsum.photos/200/200?random=3' },
          { id: '4', image: 'https://picsum.photos/200/200?random=4' },
          { id: '5', image: 'https://picsum.photos/200/200?random=5' },
          { id: '6', image: 'https://picsum.photos/200/200?random=6' },
        ]}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="w-32 mr-4">
            <Image source={{ uri: item.image }} className="w-full h-24 rounded-lg" />
          </View>
        )}
        scrollEventThrottle={16}
        pagingEnabled={true}
      />
    </View>

{/*  */}
      {/* Modal Producto */}
      <Modal visible={!!selectedProduct} animationType="slide" transparent>
        <View className="flex-1 justify-center items-center bg-green-200/50">
          {selectedProduct && (
            <View className="bg-white p-4 rounded-xl w-72">
              <Image
                source={{ uri: selectedProduct.image }}
                className="w-full h-52 rounded-lg"
              />
              <Text className="text-lg font-bold mt-2">{selectedProduct.name}</Text>
              <Text className="text-sm text-gray-600 mt-2">{selectedProduct.description}</Text>
              <Button title="Cerrar" onPress={() => setSelectedProduct(null)} />
            </View>
          )}
        </View>
      </Modal>

      {/* Modal Doctor */}
      <Modal visible={modalVisible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-green-700/10 backdrop-blur-md px-4">
      <View className="bg-green-100 p-6 rounded-xl w-80 max-w-md">
      {selectedDoctor && (
        <>
          <Image
            source={{ uri: selectedDoctor.avatar }}
            className="w-full h-48 rounded-lg mb-4"
            resizeMode="cover"
          />
          <Text className="text-2xl font-bold mb-2">{selectedDoctor.name}</Text>
          <Text className="text-lg mb-4">Edad: {selectedDoctor.age}</Text>

          {/* Botones */}
          <View className="flex-row justify-between mt-4">
            <Pressable
              onPress={closeDoctorModal}
              className="bg-green-300 flex-1 py-3 rounded-lg mr-2"
            >
              <Text className="font-bold text-center text-green-900">Cerrar</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                // Aquí podrías navegar a una pantalla de perfil con Expo Router
                console.log("Ver perfil:", selectedDoctor.name);
              }}
              className="bg-green-200 flex-1 py-3 rounded-lg ml-2"
            >
              <Text className="font-bold text-center text-green-900 ">Ver perfil</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  </View>
</Modal>



    </ScrollView>
  );
}
