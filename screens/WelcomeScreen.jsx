import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
const aircraftImg = require("../assets/images/aircraft.png");
import colors from '../assets/const/colors';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image source={aircraftImg} style={styles.image} />

            <Text style={styles.title}>PlaneGallery</Text>
            <Text style={styles.subtitle}>
                Captura tus avistamientos, registra los detalles y crea tu galería del cielo.
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.secondaryButtonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        color: colors.primary,
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        color: 'gray',
        textAlign: 'center',
        fontFamily: '',
        fontSize: 12,
        marginBottom: 40,
        maxWidth: 300,
    },
    buttonContainer: {
        gap: 30,
    },
    primaryButton: {
        backgroundColor: '#6c63ff',
        borderColor: '#969191',
        marginTop: 40,
        padding: 12,
        borderRadius: 10,
        width: 200,
        alignItems: 'center',
        borderWidth: 1,
    },
    primaryButtonText: {
        color: colors.primary,
        fontSize: 16,
    },
    secondaryButton: {
        padding: 12,
        borderRadius: 10,
        borderColor: '#969191',
        width: 200,
        alignItems: 'center',
        borderWidth: 1,
    },
    secondaryButtonText: {
        color: colors.primary,
        fontSize: 16,
    },
});