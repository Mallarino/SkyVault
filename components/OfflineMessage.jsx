import { View, Text } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import { useEffect, useState } from 'react';
import { isOnline } from '../utils/isOnline';

export default function OfflineMessage({ wifiStatus }) {

    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const init = async () => {
            const isConnected = await isOnline();
            setIsConnected(isConnected);
        }


        init();
    }, []);

    useEffect(() => {
        //Le pasamos al prop "WifiStatus" el valor del estado que queremos pasar, en este caso "isConnected"
        if (wifiStatus) {
            wifiStatus(isConnected)
        }
    }, [isConnected])

    return (
        <>
            {!isConnected &&
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <Entypo name="info-with-circle" size={20} color="gray" />
                    <Text style={{ color: 'gray' }}>Estás en modo offline</Text>
                </View>}
        </>

    )
}