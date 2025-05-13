import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
const VideoGrapherImg = require("../assets/images/videographer.png")
import colors from '../assets/const/colors';
import BackButton from '../components/BackButton';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.replace('Gallery'); // reemplaza para que no pueda volver atrás con "back"
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
                    />
                    <TextInput
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        placeholderTextColor={"gray"}
                        style={{ borderWidth: 1, borderColor: '#969191', padding: 10, color: 'gray', borderRadius: 8 }}
                    />
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

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