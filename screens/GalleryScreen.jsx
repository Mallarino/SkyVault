import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { GalleryImage } from '../components/GalleryImage';
import BottomTabs from '../components/BottomTabs';
import { useNavigation } from '@react-navigation/native';
import colors from '../assets/const/colors';
import LottieView from 'lottie-react-native';


import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../credentials';



export default function GalleryScreen() {

    const navigation = useNavigation();

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "cards"));
                const fetchedCards = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCards(fetchedCards);
            } catch (error) {
                console.error("Error fetching cards: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);


    const handlePress = (item) => {
        navigation.navigate("CardView", { item: item })
    }


    return (
        <>
            <View style={styles.container}>
                {loading ? (
                    <LottieView
                        source={require('../assets/images/LoadAnimation.json')}
                        autoPlay
                        loop
                        style={{ width: 150, height: 150 }}
                    />
                ) : cards.length > 0 ? (
                    <FlatList
                        data={cards}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    handlePress(item);
                                }}
                            >
                                <GalleryImage item={item} />
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <Text style={styles.text}>Parece que aun no tienes nada en tu galeria</Text>
                )}

                <BottomTabs />
            </View>

        </>
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
    }, modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '85%',
        alignItems: 'center'
    },
    modalImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 10
    },
    modalText: {
        fontSize: 16,
        marginVertical: 2
    }
});