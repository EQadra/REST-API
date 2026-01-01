import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

const PromoCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Wear Smart in this season</Text>
        <Text style={styles.subtitle}>Adi, Rebo, Lees and more...</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Show Now</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: 'https://picsum.photos/100/140?random=7' }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#e6f0de',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#7da97a',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#f0f8f0',
    fontWeight: '600',
    fontSize: 14,
  },
  image: {
    width: 100,
    height: 140,
    borderRadius: 12,
  },
})

export default PromoCard
