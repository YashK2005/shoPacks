import {useState, useEffect} from 'react'
import {StyleSheet, View, Dimensions, Image} from 'react-native'
import {
  SafeAreaView,
  Text,
  IconButton
} from '@shopify/shop-minis-platform-sdk'
import {useNavigation, useRoute} from '@react-navigation/native'
import {mockCollectionCards} from '../data/mock-collection'
import {ProductCard as ProductCardType} from '../types/collection'
import Carousel from 'react-native-reanimated-carousel'

export function PackRevealScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const {category, type} = route.params as {category: string; type: string}
  const [revealedCards, setRevealedCards] = useState<ProductCardType[]>([])

  useEffect(() => {
    const categoryCards = mockCollectionCards.filter(card => card.category === category)
    const numCards = type === 'legendary' ? 4 : type === 'rare' ? 3 : 2
    
    // Randomly select cards from the category
    const selectedCards = [...categoryCards]
      .sort(() => Math.random() - 0.5)
      .slice(0, numCards)
    
    setRevealedCards(selectedCards)
  }, [category, type])

  const width = Dimensions.get('window').width

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          name="reverse"
          onPress={() => navigation.goBack()}
          size="m"
          accessibilityLabel="Go back"
        />
        <Text style={styles.headerText}>Your New Cards!</Text>
        <View style={{width: 40}} />
      </View>

      <View style={styles.content}>
        <Carousel
          data={revealedCards}
          renderItem={({item}) => (
            <Image 
              source={item.cardImage as unknown as number}
              style={styles.cardImage}
              resizeMode="contain"
            />
          )}
          width={width}
          height={width * 1.5}
          loop={false}
          autoPlay={false}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  }
}) 