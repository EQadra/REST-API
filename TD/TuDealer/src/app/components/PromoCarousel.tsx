import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

const { width } = Dimensions.get('window')

type PromoItem = {
  id: number
  title: string
  subtitle: string
  image: string
  buttonText: string
}

const promoData: PromoItem[] = [
  {
    id: 1,
    title: "Kid's Collection",
    subtitle: 'Upto 70% off',
    image: 'https://picsum.photos/400/200?random=20',
    buttonText: 'Show Now',
  },
  {
    id: 2,
    title: "Men's Fashion",
    subtitle: 'Flat 40% off',
    image: 'https://picsum.photos/400/200?random=21',
    buttonText: 'Explore',
  },
  {
    id: 3,
    title: "Woman's Trends",
    subtitle: 'Upto 50% off',
    image: 'https://picsum.photos/400/200?random=22',
    buttonText: 'Shop Now',
  },
]

const PromoCarousel = (): JSX.Element => {
  return (
    <View style={{ alignItems: 'center', marginVertical: 16 }}>
      <Carousel
        width={width * 0.8}
        height={180}
        autoPlay
        loop
        data={promoData}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <ImageBackground
            source={{ uri: item.image }}
            style={styles.banner}
            imageStyle={styles.imageStyle}
          >
            <View style={styles.overlay}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{item.buttonText}</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  banner: {
    height: 180,
    justifyContent: 'flex-end',
    padding: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageStyle: {
    borderRadius: 16,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 12,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#f06292',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
  },
})

export default PromoCarousel
