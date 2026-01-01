import React from "react";
import { View, Text, Image, FlatList } from "react-native";

const Grid = ({ items }) => {
  const renderItem = ({ item }) => (
    <View className="w-[48%] mb-4 bg-[#A7F3D0] rounded-lg shadow items-center mx-1">
      <Image
        source={{ uri: item.image }}
        className="w-full h-24 rounded-t-lg"
        resizeMode="cover"
      />
      <Text className="text-base mt-2 text-center text-[#064E3B]">{item.title}</Text>
    </View>
  );

  return (
    <View className="w-full items-center mt-5 mb-5">
      <View className="w-11/12 p-4 bg-[#D1FAE5] rounded-lg shadow">
        <Text className="text-lg font-bold text-center mb-4 text-[#065F46]">
          Grid de Items
        </Text>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      </View>
    </View>
  );
};

export default Grid;
