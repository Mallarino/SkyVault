import { View, Text, StyleSheet, TextInput } from 'react-native'
import BackButton from '../components/BackButton'
import colors from '../assets/const/colors';
import { useState } from 'react';
import BottomTabs from '../components/BottomTabs';

export default function RegistrationScreen() {
  return (
    <>
      <BackButton isLogued={true} />
      <View style={styles.container}>

        <Text style={styles.title}>Consultar Matricula</Text>
        <Text style={styles.subtitle}>Escribe la matricula de tu aeronave y mira mas detalles acerca de ella.</Text>

        <TextInput
          placeholder="ej: N959AV"
          placeholderTextColor={"gray"}
          autoCapitalize='characters'
          autoCorrect={false}
          style={styles.input}
        />

      </View>
      <BottomTabs />
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    alignItems: 'start',
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  title: {
    color: colors.primary,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 40,
    marginRight: 50
  },
  input: {
    borderWidth: 1,
    borderColor: '#969191',
    width: 200,
    padding: 10,
    marginTop: 50,
    color: 'gray',
    borderRadius: 8
  },
  subtitle: {
    color: 'gray',
    textAlign: 'start',
    fontSize: 12,
    marginTop: 10,
    marginRight: 30,
    maxWidth: 240,
  },

});