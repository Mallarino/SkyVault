import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import colors from '../assets/const/colors';
import imageNotFound from  '../assets/images/imageNotFound.jpg'

const screenWidth = Dimensions.get('window').width;
const imageSize = (screenWidth - 140) / 2;

export const GalleryImage = ({ item }) => {
    
    return (
        <View style={styles.container}>
            <Image
                source={{  uri: item.imagenPath ||  imageNotFound}}
                style={[styles.image, { width: imageSize }]}
                resizeMode="contain"
            />
            <Text style={styles.text} numberOfLines={1} ellipsizeMode='tail'>{item.modelo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 130,
        margin: 20,
        color: colors.primary,
    },

    text: {
        color: "#97979b",
        marginTop: 8,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },

    image: {
        height: 85,
        borderRadius: 15,
        margin: 0,
        shadowColor: '#97979b', // en iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});