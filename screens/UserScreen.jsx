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
      <BackButton isLogued={true} />
      <View style={styles.container}>

        <View style={styles.container}>

          <Text style={styles.title}>Mallarino</Text>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>

          <BottomTabs />
        </View>

      </View>
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
  title: {
    color: colors.primary,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 100,
  },
  secondaryButton: {
    padding: 12,
    borderRadius: 10,
    borderColor: '#969191',
    width: 200,
    marginTop: 100,
    alignItems: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
  },

});