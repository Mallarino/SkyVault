import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import BackButton from '../components/BackButton'
import colors from '../assets/const/colors';
import PlaneImg from '../assets/images/mock.jpeg'
import { useState } from 'react';
import BottomTabs from '../components/BottomTabs';
import { useNavigation } from '@react-navigation/native';
import CardView from '../components/modals/CardView';

export default function UserScreen() {

  const navigation = useNavigation();


  return (
    <>
      
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },

});