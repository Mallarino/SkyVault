import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import colors from '../../assets/const/colors'
import FechaSelector from '../cardForm/FechaSelector';
import TextInputs from '../cardForm/TextInputs';
import TypeSelection from '../cardForm/TypeSelection';
import { useEffect } from 'react'
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import * as FileSystem from "expo-file-system";
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import { db } from '../../credentials';
import ZoomableImage from '../ZoomableImage';
import { useRefreshCard } from '../../context/CardContext';


export default function CardModal({ route }) {

  const { setShouldRefresh } = useRefreshCard();

  const navigation = useNavigation();

  const { item, uri } = route.params || {};

  const isEditMode = item && true;


  const [loading, setLoading] = useState();
  const [imageUri, setImageUri] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [fecha, setFecha] = useState(new Date());
  const [inputs, setInputs] = useState({
    modelo: "",
    matricula: "",
    descripcion: ""
  });

  useEffect(() => {

    if (item) {
      setInputs({
        modelo: item.modelo || "",
        matricula: item.matricula || "",
        descripcion: item.descripcion || ""
      });
      setSelectedType(item.tipo || null);
      setFecha(item.fecha ? new Date(item.fecha) : new Date());
      setImageUri(item.imagenPath);
    } else {
      setInputs({
        modelo: "",
        matricula: "",
        descripcion: ""
      });
      setSelectedType(null);
      setFecha(new Date());
      setImageUri(uri);
    }

  }, [item, uri]);

  const handleCreate = async () => {

    setLoading(true)

    if (!uri) {
      showErrorToast("Error", "Debes seleccionar una imagen.");
      return;
    }

    try {

      const filename = `${Date.now()}.jpg`;
      const localUri = FileSystem.documentDirectory + filename;

      await FileSystem.copyAsync({
        from: uri,
        to: localUri
      });

      await addDoc(collection(db, "cards"), {
        modelo: inputs.modelo || "Desconocido",
        matricula: inputs.matricula || "Desconocida",
        descripcion: inputs.descripcion || "Sin descripción",
        tipo: selectedType || "Desconocido",
        fecha: fecha.toISOString(),
        imagenPath: localUri,
        createdAt: new Date()
      });


      setShouldRefresh(true);
      showSuccessToast("Carta creada exitosamente", "¡Otra más para la colección!");
      setLoading(false)
    } catch (error) {
      console.error(error);
      showErrorToast("Ups...", "Hubo un error al crear la carta");
    } finally {
      navigation.navigate("Gallery");
    }
  };

  const handleUpdate = async () => {

    setLoading(true)

    if (!item || !item.id) {
      Alert.alert("Error", "Falta el ID del documento.");
      return;
    }

    try {
      const docRef = doc(db, "cards", item.id);

      await updateDoc(docRef, {
        modelo: inputs.modelo || "Unknow",
        matricula: inputs.matricula || "Unknow",
        descripcion: inputs.descripcion || "Sin descripción",
        tipo: selectedType,
        fecha: fecha.toISOString(),
        imagenPath: item.imagenPath,
        updatedAt: new Date()
      });

      setShouldRefresh(true);
      showSuccessToast("Carta actualizada exitosamente");
      setLoading(false)
    } catch (error) {
      console.error(error);
      showErrorToast("Error", "No se pudo actualizar la carta");
    } finally {
      navigation.navigate("Gallery");
    }
  };


  return (

    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode='on-drag'
      extraScrollHeight={Platform.select({ ios: 0, android: 250 })}
      enableOnAndroid={true}
    >
      <LinearGradient
        colors={['#BDB7EA', '#E6E6FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorder}
      >


        <View style={styles.card}>

          <ZoomableImage uri={imageUri} />

          <View style={styles.gridContainer}>

            {loading &&
              <View style={styles.loadingOverlay}>
                <LottieView
                  source={require('../../assets/images/LoadAnimation.json')}
                  autoPlay
                  loop
                  style={{ width: 150, height: 150 }}
                />
              </View>
            }

            <TypeSelection value={selectedType} onChange={setSelectedType} />
            <FechaSelector value={fecha} onChange={setFecha} />

            <TextInputs value={inputs} onChange={setInputs} />

          </View>

          <View style={styles.containerButtons}>

            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createButton}
              onPress={isEditMode ? handleUpdate : handleCreate}
            >
              <Text style={styles.createButtonText}>
                {isEditMode ? "Actualizar" : "Crear"}
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>


  )
}

const styles = StyleSheet.create({
  gradientBorder: {
    padding: 2,
    borderRadius: 22,
    marginTop: 40,
    marginHorizontal: 20,
    shadowColor: '#4285F4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 20,
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    paddingBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  image: {
    resizeMode: 'contain',
    borderRadius: 20,
    maxWidth: '90%',
    maxHeight: 200,
    aspectRatio: 1,
    marginVertical: 10,
  },
  gridContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  inputGroup: {
    width: '100%',
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
  containerButtons: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  cancelButton: {
    padding: 12,
    borderRadius: 10,
    borderColor: '#969191',
    backgroundColor: colors.background,
    width: '45%',
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
    backgroundColor: '#9370DB',
    width: '45%',
    alignItems: 'center',
    borderWidth: 1,
  },
  createButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
