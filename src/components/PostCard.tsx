import {Box, Text, PressableAnimated, Image} from '@shopify/shop-minis-platform-sdk'
import {shareScreenStyles as styles} from '../screens/styles/share-screen.styles'
import {useState} from 'react'
import {TradeModal} from './TradeModal'

interface PostCardProps {
    username: string
    message: string
    cardImage: string
    cardName: string
    onPress: () => void
}

export function PostCard({username, message, cardImage, cardName, onPress}: PostCardProps) {
    const [isTradeModalVisible, setIsTradeModalVisible] = useState(false)

    const handleTradeSubmit = (message: string) => {
        setIsTradeModalVisible(false)
    }

    return (
        <Box style={styles.container}>
            <Box flexDirection="row" alignItems="center" marginBottom="xs">
                <Text variant="bodyLargeBold">{username}</Text>
            </Box>

            <Text variant='bodySmall' marginBottom="xs">{message}</Text>

            <Box flexDirection = "row" alignItems="center" justifyContent="space-between">
                <Box>
                    <Image 
                        source={{uri: cardImage}} 
                        style={styles.cardImage} 
                        resizeMode="cover"
                    />
                </Box>

                <PressableAnimated
                    onPress={() => setIsTradeModalVisible(true)}
                    hapticOnPress
                    bounceOnPress
                    style={styles.tradeButton}
                >
                    <Text variant="bodySmallBold" color="badge-text-light">Trade</Text>
                </PressableAnimated>

                <TradeModal
                    isVisible={isTradeModalVisible}
                    onClose={() => setIsTradeModalVisible(false)}
                    onSubmit={handleTradeSubmit}
                    theirProduct={{
                        name: cardName,
                        image: cardImage,
                    }}
                />
            </Box>
        </Box>
    )
}