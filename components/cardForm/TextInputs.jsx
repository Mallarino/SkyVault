import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'


export default function TextInputs({ value, onChange }) {

    return (
        <KeyboardAvoidingView behavior='height'>

                <Text style={styles.text}>Modelo:</Text>
                <TextInput
                    placeholderTextColor={"gray"}
                    style={styles.input}
                    value={value.modelo}
                    onChangeText={(text) => onChange({ ...value, modelo: text })}
                />


                <Text style={styles.text}>Matricula:</Text>
                <TextInput
                    placeholderTextColor={"gray"}
                    autoCapitalize='characters'
                    style={styles.input}
                    value={value.matricula}
                    onChangeText={(text) =>
                        onChange({ ...value, matricula: text.toUpperCase() })
                    }
                />



            <Text style={{ marginRight: 180, marginBottom: 10, marginTop: 10, color: 'gray' }}>Descripcion:</Text>
            <TextInput
                scrollEnabled={true}
                multiline={true}
                maxLength={150}
                style={{ borderWidth: 1, borderColor: '#BDB7EA', backgroundColor: '#1A1A2E', padding: 10, width: '100%', color: 'white', borderRadius: 8 }}
                value={value.descripcion}
                onChangeText={(text) => onChange({ ...value, descripcion: text })}

            />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        width: '60%',
        borderColor: '#BDB7EA',
        backgroundColor: '#1A1A2E',
        color: 'white',
        borderRadius: 8,
        marginTop: 10,
        fontSize: 13,
        height: 36,
    },
    text: {
        color: 'gray',
        marginTop: 10,
    }

});