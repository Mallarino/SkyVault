import { View, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

export default function TypeSelection({ value, onChange }) {
  return (
    <>
      <Text>Tipo:</Text>
          <View style={{
            borderWidth: 1,
            borderColor: '#969191',
            borderRadius: 8,
            marginTop: 4,
            width: 180,
          }}>
            <RNPickerSelect
              placeholder={{
                label: 'Selecciona el tipo...',
                value: null, 
                color: 'gray',
              }}
              onValueChange={(value) => onChange(value)}
              items={[
                { label: 'Militar', value: 'militar' },
                { label: 'Comercial', value: 'comercial' },
                { label: 'Carga', value: 'carga' },
                { label: 'Privado', value: 'privado' },
              ]}
              value={value}
              style={{
                inputAndroid: {
                  color: "gray",
                  fontSize: 13,
                },
                placeholder: {
                  color: 'gray',
                },
              }}
            />
          </View>
    </>
  )
}