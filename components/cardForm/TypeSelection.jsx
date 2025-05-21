import { View, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

export default function TypeSelection({ value, onChange }) {
  return (
    <>
      <Text style={{ color: 'gray' }}>Tipo:</Text>
          <View style={{
            borderWidth: 1,
            borderColor: '#969191',
            borderRadius: 8,
            marginTop: 4,
            width: 230,
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
              ]}
              value={value}
              style={{
                inputAndroid: {
                  color: "gray",
                  fontSize: 13,
                  width: '100%'
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