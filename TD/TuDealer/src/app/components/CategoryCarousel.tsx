import React from 'react'
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const categories = [
  { id: '1', name: 'Women', image: 'https://picsum.photos/100/100?random=10' },
  { id: '2', name: 'Kids', image: 'https://picsum.photos/100/100?random=11' },
  { id: '3', name: 'Appliances', image: 'https://picsum.photos/100/100?random=12' },
  { id: '4', name: 'Food', image: 'https://picsum.photos/100/100?random=13' },
  { id: '5', name: 'Shoes', image: 'https://picsum.photos/100/100?random=14' },
]

const CategoryCarousel = () => {
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.categoryContainer}>
          <Image source={{ uri: item.image }} style={styles.categoryImage} />
          <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    width: 70,
    marginRight: 16,
    alignItems: 'center',
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  categoryText: {
    marginTop: 6,
    fontSize: 13,
    color: '#444',
    fontWeight: '600',
  },
})

export default CategoryCarousel
