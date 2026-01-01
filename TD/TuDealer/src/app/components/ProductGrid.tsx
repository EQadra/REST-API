// components/ProductGrid.js
import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native'

const products = [
  {
    id: '1',
    name: 'Black two strap sandals',
    price: 65.0,
    image: 'https://picsum.photos/150/150?random=2',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Shine Nails High Gloss',
    price: 65.0,
    image: 'https://picsum.photos/150/150?random=3',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Casual Sneakers',
    price: 80.0,
    image: 'https://picsum.photos/150/150?random=4',
    rating: 4.5,
  },
  {
    id: '4',
    name: 'Elegant Watch',
    price: 120.0,
    image: 'https://picsum.photos/150/150?random=5',
    rating: 4.9,
  },
  // Puedes agregar más productos si lo necesitas
]

const numColumns = 2
const screenWidth = Dimensions.get('window').width
const itemWidth = (screenWidth - 16 * 2 - 12 * (numColumns - 1)) / numColumns

const ProductGrid = () => {
  const renderItem = ({ item }) => (
    <View style={styles.cardBox}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardName}>{item.name}</Text>
      <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
      <Text style={styles.cardOffer}>10% OFF</Text>
      <Text style={styles.cardRating}>⭐ {item.rating}</Text>
      <View style={styles.cardActions}>
        <Text style={styles.heart}>♡</Text>
        <View style={styles.qtyBox}>
          <Text style={styles.qtyButton}>-</Text>
          <Text style={styles.qtyNumber}>1</Text>
          <Text style={styles.qtyButton}>+</Text>
        </View>
      </View>
    </View>
  )

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    width: itemWidth,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardImage: { width: '100%', height: 100, borderRadius: 8 },
  cardName: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  cardPrice: { fontSize: 13, color: '#333' },
  cardOffer: { fontSize: 12, color: 'green' },
  cardRating: { fontSize: 12, color: '#999', marginBottom: 4 },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heart: { fontSize: 18, color: '#f66' },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 6,
  },
  qtyButton: { fontSize: 16, paddingHorizontal: 4 },
  qtyNumber: { fontSize: 14, marginHorizontal: 4 },
})

export default ProductGrid
