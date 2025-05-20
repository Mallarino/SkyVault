import React, { useState } from 'react';
import { View, Text, Button, Platform, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function FechaSelector({ value, onChange }) {
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0].replace(/-/g, '/');
  };

  const handleChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      onChange(selectedDate); // << Comunica la nueva fecha al padre
    }
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ color: 'gray' }}>Fecha:</Text>
      <Pressable
        onPress={() => setShowPicker(true)}
        style={{
          borderWidth: 1,
          borderColor: '#969191',
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'gray' }}>{formatDate(value)}</Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
        />
      )}
    </View>
  );
}
