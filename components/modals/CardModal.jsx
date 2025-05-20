import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import planeImg from '../../assets/images/mock.jpeg'
import colors from '../../assets/const/colors'
import FechaSelector from '../cardForm/FechaSelector';
import TextInputs from '../cardForm/TextInputs';
import TypeSelection from '../cardForm/TypeSelection';

import { collection, addDoc } from "firebase/firestore";
import * as FileSystem from "expo-file-system";
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import { db } from '../../credentials';
import ZoomableImage from '../ZoomableImage';


export default function CardModal({ route }) {

  const navigation = useNavigation();

  const { imageUri } = route.params || {};


  const [selectedType, setSelectedType] = useState(null);
  const [fecha, setFecha] = useState(new Date());
  const [inputs, setInputs] = useState({
    modelo: "",
    matricula: "",
    descripcion: ""
  });

  const handleCreate = async () => {
    if (!imageUri) {
      Alert.alert("Error", "Debes seleccionar una imagen.");
      return;
    }

    try {

      // ✅ Guardar la imagen localmente
      const filename = `${Date.now()}.jpg`;
      const localUri = FileSystem.documentDirectory + filename;

      await FileSystem.copyAsync({
        from: imageUri,
        to: localUri
      });

      await addDoc(collection(db, "cards"), {
        modelo: inputs.modelo || "Unknow",
        matricula: inputs.matricula || "Unknow",
        descripcion: inputs.descripcion || "",
        tipo: selectedType,
        fecha: fecha.toISOString(),
        imagenPath: localUri,
        createdAt: new Date()
      });

      showSuccessToast("Carta creada exitosamente", "¡Otra más para la colección!");
      navigation.navigate("Gallery");

    } catch (error) {
      console.error(error);
      showErrorToast("Ups...", "Hubo un error al crear la carta");
    }
  };




  return (
    <View style={styles.container}>

      <Image
        source={imageUri ? { uri: imageUri } : planeImg}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.gridContainer}>

        <View style={styles.inputGroup}>
          <TypeSelection value={selectedType} onChange={setSelectedType} />
          <FechaSelector value={fecha} onChange={setFecha} />
        </View>

        <View style={styles.inputGroup} />

        <TextInputs value={inputs} onChange={setInputs} />

      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate("Gallery")}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreate}
        >
          <Text style={styles.createButtonText}>Crear</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    position: 'absolute',
    width: '90%',
    height: '90%',
    backgroundColor: colors.background,
  },
  gridContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  inputGroup: {
    width: '48%',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    width: '100%',
    borderColor: '#969191',
    color: 'gray',
    borderRadius: 8,
    marginTop: 10,
    fontSize: 13,
    height: 36,
  },
  image: {
    resizeMode: 'contain',
    borderRadius: 20,
    maxWidth: 200,
    maxHeight: 200,
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  containerButtons: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between'
  },
  cancelButton: {
    padding: 12,
    borderRadius: 10,
    borderColor: '#969191',
    backgroundColor: colors.background,
    width: 100,
    alignItems: 'center',
    borderWidth: 1,
  },
  cancelButtonText: {
    color: colors.primary,
    fontSize: 16,
  },
  createButton: {
    padding: 12,
    borderRadius: 10,
    borderColor: '#969191',
    backgroundColor: '#6c63ff',
    width: 100,
    alignItems: 'center',
    borderWidth: 1,
  },
  createButtonText: {
    color: colors.primary,
    fontSize: 16,
  },


});