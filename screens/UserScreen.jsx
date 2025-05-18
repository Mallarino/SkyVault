import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import BackButton from '../components/BackButton'
import colors from '../assets/const/colors';
import { useState } from 'react';
import BottomTabs from '../components/BottomTabs';
import { useNavigation } from '@react-navigation/native';

import { signOut } from 'firebase/auth'
import { auth } from '../credentials';
import { showErrorToast, showSuccessToast } from '../utils/toast';

export default function UserScreen() {

  const navigation = useNavigation();

  const handleLogout = async() => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }], // Reinicia navegación para evitar volver atrás con el botón
      });
      showSuccessToast("Sesión cerrada", "Nos vemos 🛫")
    } catch (error) {
      showErrorToast("Error al cerrar sesión", "intentalo mas tarde")
      console.error("Error al cerrar sesión:", error);
    }
  }

  return (
    <>
      <BackButton isLogued={true} />
      <View style={styles.container}>

        <View style={styles.container}>

          <Text style={styles.title}>Mallarino</Text>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleLogout}>
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