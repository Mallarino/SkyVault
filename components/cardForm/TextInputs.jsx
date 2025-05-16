import { View, Text, TextInput, StyleSheet } from 'react-native'


export default function TextInputs({ value, onChange }) {

    return (
        <>
            <View style={styles.inputGroup}>
                <Text>Modelo:</Text>
                <TextInput
                    placeholderTextColor={"gray"}
                    style={styles.input}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text>Matricula:</Text>
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


            <Text style={{ marginRight: 180 }}>Descripcion:</Text>
            <TextInput
                placeholderTextColor={"gray"}
                scrollEnabled={true}
                multiline={true}
                maxLength={150}
                style={{ borderWidth: 1, borderColor: '#969191', padding: 10, width: '100%', color: 'gray', borderRadius: 8 }}
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
        color: 'gray',
        borderRadius: 8,
        marginTop: 10,
        fontSize: 13,
        height: 36,
    }

});