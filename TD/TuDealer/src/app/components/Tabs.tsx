import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProductTabs from "./ProductTabs";

export default function Page() {
  return (
    <View className="flex flex-1 bg-white">
      <Content />
      <Footer />
    </View>
  );
}

function Content() {
  const tabs = ["Servicios", "Productos", "Promociones"];
  const tabContent = {
    Servicios: [
      {
        id: 1,
        name: "Consulta Médica",
        description:
          "Atención médica personalizada con profesionales certificados.",
        image: "https://picsum.photos/300/300?random=1",
      },
      {
        id: 2,
        name: "Exámenes Clínicos",
        description: "Amplia gama de estudios y análisis de laboratorio.",
        image: "https://picsum.photos/300/300?random=2",
      },
    ],
    Productos: [
      {
        id: 3,
        name: "Kit de Salud",
        description: "Incluye tensiómetro, termómetro digital y oxímetro.",
        image: "https://picsum.photos/300/300?random=3",
      },
    ],
    Promociones: [
      {
        id: 4,
        name: "Consulta 2x1",
        description: "Lleva a un acompañante sin costo adicional.",
        image: "https://picsum.photos/300/300?random=4",
      },
    ],
  };

  return (
    <View className="flex-1 px-4">
      <View className="py-12">
        <ProductTabs tabs={tabs} tabContent={tabContent} />
      </View>
    </View>
  );
}

function Header() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <View className="px-4 lg:px-6 h-14 flex items-center flex-row justify-between ">
        <Link className="font-bold flex-1 items-center justify-center" href="/">
          ACME
        </Link>
        <View className="flex flex-row gap-4 sm:gap-6">
          <Link
            className="text-md font-medium hover:underline web:underline-offset-4"
            href="/"
          >
            About
          </Link>
          <Link
            className="text-md font-medium hover:underline web:underline-offset-4"
            href="/"
          >
            Product
          </Link>
          <Link
            className="text-md font-medium hover:underline web:underline-offset-4"
            href="/"
          >
            Pricing
          </Link>
        </View>
      </View>
    </View>
  );
}

function Footer() {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      className="flex shrink-0 bg-green-100 native:hidden"
      style={{ paddingBottom: bottom }}
    >
      <View className="py-6 flex-1 items-start px-4 md:px-6 ">
        <Text className={"text-center text-gray-700"}>
          © {new Date().getFullYear()} Me
        </Text>
      </View>
    </View>
  );
}
