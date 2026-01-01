import React, { useState } from "react";
import { Text, View, Pressable, Image, ScrollView } from "react-native";

export default function ProductTabs({ tabs, tabContent }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <View className="mt-8">
      {/* Tabs */}
      <View className="flex-row justify-center space-x-4 mb-6">
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full mx-3 ${
              activeTab === tab ? "bg-green-400" : "bg-green-100"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                activeTab === tab ? "text-green-800" : "text-green-800"
              }`}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView className="space-y-6">
        {tabContent[activeTab].map((item) => (
          <View
            key={item.id}
            className="bg-white rounded-xl shadow p-4 flex-row items-center space-x-4"
          >
            <Image
              source={{ uri: item.image }}
              className="w-24 h-24 rounded-md mx-2"
            />
            <View className="flex-1">
              <Text className="text-lg mb-4 mt-0 font-semibold text-green-900">{item.name}</Text>
              <Text className="text-sm text-green-700">{item.description}</Text>
              <Text className="text-sm text-green-500 mt-1">ver más ...</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
