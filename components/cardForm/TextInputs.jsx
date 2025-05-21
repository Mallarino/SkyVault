import { View, Text, TextInput, StyleSheet } from 'react-native'


export default function TextInputs({ value, onChange }) {

    return (
        <>
            <View style={styles.inputGroup}>
                <Text style={styles.textColor}>Modelo:</Text>
                <TextInput
                    placeholderTextColor={"gray"}
                    style={styles.input}
                    value={value.modelo}
                    onChangeText={(text) => onChange({ ...value, modelo: text })}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.textColor}>Matricula:</Text>
                <TextInput
                    placeholderTextColor={"gray"}
                    autoCapitalize='characters'
                    style={styles.input}
                    value={value.matricula}
                    onChangeText={(text) =>
                        onChange({ ...value, matricula: text.toUpperCase() })
                    }
                />
            </View>


            <Text style={{ marginRight: 180, marginBottom: 10, color: 'gray' }}>Descripcion:</Text>
            <TextInput
                scrollEnabled={true}
                multiline={true}
                maxLength={150}
                style={{ borderWidth: 1, borderColor: '#969191', backgroundColor: '#1F4068', padding: 10, width: '100%', color: 'white', borderRadius: 8 }}
                value={value.descripcion}
                onChangeText={(text) => onChange({ ...value, descripcion: text })}

            />
        </>
    )
}

const styles = StyleSheet.create({
    inputGroup: {
        width: '48%',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        width: '100%',
        borderColor: '#969191',
        backgroundColor: '#1F4068',
        color: 'white',
        borderRadius: 8,
        marginTop: 10,
        fontSize: 13,
        height: 36,
    },
    textColor : {
        color: 'gray'
    }

});