import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { GalleryImage } from '../components/GalleryImage';
import BottomTabs from '../components/BottomTabs';
import { useNavigation } from '@react-navigation/native';
import colors from '../assets/const/colors';
import LottieView from 'lottie-react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as FileSystem from "expo-file-system";
import { useContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../credentials';
import { CardContext, useRefreshCard } from '../context/CardContext';
import { isOnline } from '../utils/isOnline';
import { showInfoToast } from '../utils/toast';
import OfflineMessage from '../components/OfflineMessage';


export default function GalleryScreen() {

    const navigation = useNavigation();

    const { alreadyRun, setAlreadyRun, shouldRefresh, setShouldRefresh, cards, setCards } = useRefreshCard();

    const [loading, setLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(true);

    console.log(isConnected);
    

    // //Verificar si hay internet
    // useEffect(() => {
    //     const init = async () => {
    //         const isConnected = await isOnline();
    //         setIsConnected(isConnected);
    //     }
    //     init();
    // }, [])

    //Mostrar mensaje solo una vez
    useEffect(() => {
        if (!alreadyRun && !isConnected) {
            showInfoToast("Estas en modo sin internet", "Muchas funciones estarán deshabilitadas");
            setAlreadyRun(true)
        }
    }, [isConnected])

    //Usamos shouldRefresh para no hacer llamados innecesarios a la Api
    //Verificamos si hay internet para llamar una u otra
    useEffect(() => {
        const init = async () => {

            if (isConnected && shouldRefresh) {
                await fetchCards();
                setShouldRefresh(false)
            }

            if (!isConnected && shouldRefresh) {
                loadLocalCards();
                setShouldRefresh(false);
            }

        };

        init();
    }, [shouldRefresh]);


    //Hacer 'backup' cada vez que se refresquen las cartas
    useEffect(() => {
        const syncLocalCards = async () => {
            if (cards.length === 0) return;
            if (!shouldRefresh) return;


            const dir = FileSystem.documentDirectory + 'cards/';
            await FileSystem.makeDirectoryAsync(dir, { intermediates: true });

            const existingFiles = await FileSystem.readDirectoryAsync(dir);
            for (const file of existingFiles) {
                await FileSystem.deleteAsync(dir + file);
                console.log('carta eliminada');

            }

            for (const card of cards) {
                const filePath = dir + `${card.id || Date.now()}.json`;
                await FileSystem.writeAsStringAsync(filePath, JSON.stringify(card), {
                    encoding: FileSystem.EncodingType.UTF8,
                });
            }

            console.log("Cartas guardadas localmente");
        };

        syncLocalCards();
    }, [shouldRefresh]);


    //Llmar carta desde firebase
    const fetchCards = async () => {
        try {
            setLoading(true)
            const querySnapshot = await getDocs(collection(db, "cards"));
            const fetchedCards = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCards(fetchedCards);
        } catch (error) {
            console.error("Error fetching cards:", error);
        } finally {
            setLoading(false);
        }
    };

    //Llamar cartas desde el Local
    const loadLocalCards = async () => {
        try {
            setLoading(true)
            const dir = FileSystem.documentDirectory + 'cards/';
            const exists = await FileSystem.getInfoAsync(dir);
            if (!exists.exists) return [];

            const files = await FileSystem.readDirectoryAsync(dir);
            const cards = await Promise.all(
                files.map(async (file) => {
                    const content = await FileSystem.readAsStringAsync(dir + file);
                    return JSON.parse(content);
                })
            );

            setCards(cards);
            console.log("Se cargaron las cartas del local");

        } catch (error) {
            console.error('Error al cargar cartas del local: ' + error);

        } finally {
            setLoading(false);
        }

    };


    const handlePress = (item) => {
        navigation.navigate("CardView", { item: item })
    }


    return (
        <>
            <View style={styles.container}>

                <OfflineMessage wifiStatus={setIsConnected}/>

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
                                activeOpacity={0.8}
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