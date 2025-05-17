import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
const VideoGrapherImg = require("../assets/images/videographer.png")
import colors from '../assets/const/colors';
import BackButton from '../components/BackButton';
import { useNavigation } from '@react-navigation/native';


import appFirebase from '../credentials'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { showErrorToast, showInfoToast, showSuccessToast } from '../utils/toast';

const auth = getAuth(appFirebase)


export default function LoginScreen() {

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            showErrorToast('Error', 'Ambos campos son requeridos !')
            return;
        }

        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            showSuccessToast('Sesión iniciada','Bienvenido de nuevo ✈️!')
            navigation.navigate('Gallery');
        } catch (error) {
            console.error(error);
            showErrorToast('Ups!', 'Correo o contraseña incorrectos.')
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <BackButton />
            <View style={styles.container}>

                <Image source={VideoGrapherImg} style={styles.image} />
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Iniciar Sesión</Text>
                    <TextInput
                        placeholder="Correo electrónico"
                        keyboardType="email-address"
                        placeholderTextColor={"gray"}
                        style={{ borderWidth: 1, borderColor: '#969191', padding: 10, color: 'gray', borderRadius: 8 }}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        placeholderTextColor={"gray"}
                        style={{ borderWidth: 1, borderColor: '#969191', padding: 10, color: 'gray', borderRadius: 8 }}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>


                {loading ? (
                    <ActivityIndicator color="#fff" style={{ marginTop: 10}} />
                ) : (
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                )}

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    title: {
        color: colors.primary,
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 40,
        marginRight: 150
    },
    inputContainer: {
        gap: 40
    },
    loginButton: {
        padding: 12,
        borderRadius: 10,
        borderColor: '#969191',
        width: 200,
        marginTop: 50,
        alignItems: 'center',
        borderWidth: 1,
    },
    loginButtonText: {
        color: colors.primary,
        fontSize: 16,
    },

});