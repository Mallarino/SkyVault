import { View, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

export default function TypeSelection({ value, onChange }) {
  return (
    <>
      <Text style={{ color: 'gray' }}>Tipo:</Text>
          <View style={{
            borderWidth: 1,
            borderColor: '#BDB7EA',
            borderRadius: 8,
            backgroundColor: '#1A1A2E',
            marginTop: 4,
            width: '60%'
          }}>
            <RNPickerSelect
              placeholder={{
                label: 'Selecciona el tipo...',
                value: null, 
                color: 'gray',
              }}
              onValueChange={(value) => onChange(value)}
              items={[
                { label: 'Militar', value: 'Militar' },
                { label: 'Comercial', value: 'Comercial' },
                { label: 'Carga', value: 'Carga' },
                { label: 'Privado', value: 'Privado' },
                { label: 'Desconocido', value: 'Desconocido' },
              ]}
              value={value}
              style={{
                inputAndroid: {
                  color: "white",
                  fontSize: 13,
                  width: '100%'
                },
                placeholder: {
                  color: 'white',
                },
              }}
            />
          </View>
    </>
  )
}