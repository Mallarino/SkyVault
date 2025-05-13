import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
const PhotoGrapherImg = require("../assets/images/photographer.png")
import colors from '../assets/const/colors';
import BackButton from '../components/BackButton';


export default function RegisterScreen() {
    return (
        <>
            <BackButton />
            <View style={styles.container}>

                <Image source={PhotoGrapherImg} style={styles.image} />
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Registrarse</Text>
                    <TextInput
                        placeholder="Nombre de usuario"
                        placeholderTextColor={"gray"}
                        style={{ borderWidth: 1, borderColor: '#969191', padding: 10, color: 'gray', borderRadius: 8 }}
                    />
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

                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Registrarse</Text>
                </TouchableOpacity>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
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