import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../assets/const/colors';

const screenWidth = Dimensions.get('window').width;
const imageSize = (screenWidth - 140) / 2;

export const GalleryImage = ({ Imageuri, ImageModel }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: Imageuri }}
                style={[styles.image, { width: imageSize }]}
                resizeMode="contain"
            />
            <Text style={styles.text} numberOfLines={1} ellipsizeMode='tail'>{ImageModel}</Text>
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
        color: colors.text
    },

    image: {
        height: 85,
        borderRadius: 15,
        margin: 0
    },
});