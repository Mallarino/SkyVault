import { View, Dimensions, Text, FlatList, StyleSheet, Image } from 'react-native'
import React from 'react'
import { cards } from '../data/cardTest'
import { GalleryImage } from '../components/GalleryImage';
import BottomTabs from '../components/BottomTabs';
import colors from '../assets/const/colors';

export default function GalleryScreen() {

    return (
        <View style={styles.container}>
            { cards.length > 0 ? <FlatList
                data={cards}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <GalleryImage Imageuri={item.img} ImageModel={item.model} />
                )}
            /> : <Text style={styles.text}>Parece que aun no tienes nada en tu galeria</Text> }
            
            <BottomTabs />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        color: colors.text,
        width: 150
    }
});