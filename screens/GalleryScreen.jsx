import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import { cards } from '../data/cardTest'
import { GalleryImage } from '../components/GalleryImage';
import BottomTabs from '../components/BottomTabs';
import colors from '../assets/const/colors';
import { auth } from "../credentials"
import { useEffect } from 'react';


export default function GalleryScreen() {

    useEffect(() => {
        console.log(auth.currentUser?.email); // correo del usuario actual
        console.log(auth.currentUser?.uid);   // uid del usuario
    }, [])

    return (
        <View style={styles.container}>
            {cards.length > 0 ? <FlatList
                data={cards}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <GalleryImage Imageuri={item.img} ImageModel={item.model} />
                )}
            /> : <Text style={styles.text}>Parece que aun no tienes nada en tu galeria</Text>}

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