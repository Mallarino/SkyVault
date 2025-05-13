import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BackButton({ isLogued }) {

    const navigation = useNavigation();

    const handleBack = () => {
      if (isLogued) {
        navigation.navigate("Gallery")
      } else {
        navigation.navigate("Welcome")
      }
    }

  return (
    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40, 
    left: 20,
    zIndex: 10, 
  }
});