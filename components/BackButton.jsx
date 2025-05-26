import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTab } from '../context/TabContext';

export default function BackButton() {

  const navigation = useNavigation();

  const { activeTab, setActiveTab } = useTab();

  const handleBack = () => {
    setActiveTab("")
    console.log(activeTab);
    
    navigation.goBack();
  }

  return (
    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
      <Ionicons name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  backButton: {
    top: 30,
    left: 20,
    zIndex: 10,
  }
});