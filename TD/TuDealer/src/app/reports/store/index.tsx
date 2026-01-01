import React from "react";
import { View, FlatList, StyleSheet,} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import HeroSlider from "../../components/HeroSlider";
import LatestNews from "../../components/LatestNews";
import Carousel from "../../components/Carousel";
import Grid from "../../components/Grid";
import Tabs from "../../components/Tabs";
import GridCarousel from "../../components/GridTab";
import ProfessionalsTab from '../../components/ProfessionalsTab';

// Imagen local de prueba
const testImage = { uri: "https://picsum.photos/409/200" };

const sampleNews = [
  {
    image: "https://picsum.photos/409/200",
    date: "04 Abril 2025",
    title: "Noticia 1",
    description: "Descripción breve de la noticia número uno.",
  },
  {
    image: "https://picsum.photos/404/200",
    date: "03 Abril 2025",
    title: "Noticia 2",
    description: "Un pequeño resumen de la noticia dos.",
  },
];

const productData = {
  Promos: [
    {
      id: 1,
      image: "https://picsum.photos/404/200",
      name: "Promo A",
      description: "Producto en promoción A",
    },
    {
      id: 2,
      image: "https://picsum.photos/405/200",
      name: "Promo B",
      description: "Producto en promoción B",
    },
    {
      id: 3,
      image: "https://picsum.photos/406/200",
      name: "Promo C",
      description: "Producto en promoción C",
    },
    {
      id: 4,
      image: "https://picsum.photos/407/200",
      name: "Promo D",
      description: "Producto en promoción D",
    },
  ],
  Ofertas: [
    {
      id: 5,
      image: "https://picsum.photos/408/200",
      name: "Oferta A",
      description: "Producto en oferta A",
    },
    {
      id: 6,
      image: "https://picsum.photos/409/200",
      name: "Oferta B",
      description: "Producto en oferta B",
    },
    {
      id: 7,
      image: "https://picsum.photos/410/200",
      name: "Oferta C",
      description: "Producto en oferta C",
    },
    {
      id: 8,
      image: "https://picsum.photos/411/200",
      name: "Oferta D",
      description: "Producto en oferta D",
    },
  ],
  Recomendados: [
    {
      id: 9,
      image: "https://picsum.photos/412/200",
      name: "Recomendado A",
      description: "Producto recomendado A",
    },
    {
      id: 10,
      image: "https://picsum.photos/413/200",
      name: "Recomendado B",
      description: "Producto recomendado B",
    },
    {
      id: 11,
      image: "https://picsum.photos/414/200",
      name: "Recomendado C",
      description: "Producto recomendado C",
    },
    {
      id: 12,
      image: "https://picsum.photos/415/200",
      name: "Recomendado D",
      description: "Producto recomendado D",
    },
  ],
};

const sampleGridItems = [
  { image: "https://picsum.photos/400/200", title: "Item 1" },
  { image: "https://picsum.photos/402/200", title: "Item 2" },
  { image: "https://picsum.photos/403/200", title: "Item 3" },
  { image: "https://picsum.photos/404/200", title: "Item 4" },
];

const sampleTabs = ["Promos", "Ofertas", "Recomendados"];

const sampleProducts = {
  Promos: [
    {
      id: 1,
      image: "https://picsum.photos/404/200",
      name: "Promo A",
      description: "Producto en promoción A",
    },
    {
      id: 2,
      image: "https://picsum.photos/404/200",
      name: "Promo D",
      description: "Producto en promoción A",
    },
    {
      id: 3,
      image: "https://picsum.photos/404/200",
      name: "Promo E",
      description: "Producto en promoción A",
    },
  ],
  Ofertas: [
    {
      id: 2,
      image: "https://picsum.photos/404/200",
      name: "Oferta B",
      description: "Producto en oferta B",
    },
  ],
  Recomendados: [
    {
      id: 3,
      image: "https://picsum.photos/404/200",
      name: "Recomendado C",
      description: "Producto recomendado C",
    },
  ],
};

const StoreScreen: React.FC = () => {
  const sections = [
    {
      id: "heroSlider",
      component: <HeroSlider images={[testImage, testImage, testImage]} />,
    },
    {
      id: "carousel",
      component: (
        <Carousel
          images={[
            "https://picsum.photos/404/200",
            "https://picsum.photos/402/200",
            "https://picsum.photos/403/200",
            "https://picsum.photos/405/200",
            "https://picsum.photos/406/200",
            "https://picsum.photos/407/200",
            "https://picsum.photos/399/200",
            "https://picsum.photos/408/200",
            "https://picsum.photos/409/200",
          ]}
        />
      ),
    },
    {
      id: "gridItems",
      component: <Grid items={sampleGridItems} />,
    },
    {
      id: "tabs",
      component: <Tabs tabs={sampleTabs} tabContent={sampleProducts} />,
    },
    {
      id: "gridTabs",
      component: (
        <GridCarousel
          tabs={["Promos", "Ofertas", "Recomendados"]}
          tabContent={productData}
        />
      ),
    },
    {
      id: "professionals",
      component: <ProfessionalsTab />,
    },
    {
      id: "latestNews",
      component: <LatestNews news={sampleNews} />,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sections}
        renderItem={({ item }) => (
          <View style={styles.section}>{item.component}</View>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFF5E3", // Fondo pastel verde menta
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#E3F9E5", // Fondo pastel para cada sección
    borderRadius: 12,
    padding: 10,
  },
});

export default StoreScreen;
