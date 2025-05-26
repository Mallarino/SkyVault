import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import colors from '../assets/const/colors';
import { useEffect, useState } from 'react';
import BottomTabs from '../components/BottomTabs';
import DataView from '../components/planeData/DataView';
import ZoomableImage from '../components/ZoomableImage'
import { useRoute } from '@react-navigation/native';
import { planePhotos } from '../data/photoResponse';
import Animated, { FadeInUp } from 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';

import { getAircraftByRegistration } from '../api/aerodataBoxApi';
import { getPlanePhoto } from '../api/planeSpottersApi';
import { showErrorToast } from '../utils/toast';


export default function RegistrationScreen() {

  const route = useRoute();

  const { registrationOnCard } = route.params || {};

  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState(false);

  const [data, setData] = useState({
    modelo: "",
    operador: "",
    edad: 0,
    estado: false,
    numeroAsientos: 0,
    primerVuelo: ""
  });

  const [planePhoto, setPlanePhoto] = useState();

  useEffect(() => {
    if (registrationOnCard) {
      setValue(registrationOnCard)
      fetchPlaneData(registrationOnCard)
    }
  }, [])

  const fetchPlaneData = async (registration) => {

    if (!registration) {
      showErrorToast("Error", "Por favor escribe una matrícula")
      return;
    }

    setLoading(true)
    setShowData(false)

    try {
      const photoResponse = await getPlanePhoto(registration)
      const dataResponse = await getAircraftByRegistration(registration)

      const photo = photoResponse.photos[0].thumbnail_large.src

      setPlanePhoto(photo)
      setData({
        modelo: dataResponse.modelCode || "Desconocido",
        operador: dataResponse.airlineName || "N/A",
        edad: dataResponse.ageYears || "Desconocido",
        estado: dataResponse.active == true ? "Activo" : "Inactivo",
        numeroAsientos: dataResponse.numSeats || "N/A",
        primerVuelo: dataResponse.firstFlightDate || "Desconocido"
      })

      setShowData(true)

    } catch (error) {
      console.error(error)
      showErrorToast("Ups...", "No encontramos esa matricula")
    } finally {
      setLoading(false)
    };

  }



  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>

          <Text style={styles.title}>Consultar Matricula</Text>
          <Text style={styles.subtitle}>Escribe la matricula de tu aeronave y mira mas detalles acerca de ella.</Text>

          <View style={styles.searchContainer}>
            <TextInput
              placeholder="ej: N959AV"
              placeholderTextColor={"gray"}
              autoCapitalize='characters'
              maxLength={15}
              autoCorrect={false}
              style={styles.input}
              value={value}
              onChangeText={(text) => setValue(text.toUpperCase())}
            />

            <TouchableOpacity onPress={() => fetchPlaneData(value)}>
              <FontAwesome name="search" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <Animated.View entering={FadeInUp.duration(400).delay(500)} style={styles.dataContainer}>

            {loading && <LottieView
              source={require('../assets/images/LoadAnimation.json')}
              autoPlay
              loop
              style={{ width: 150, height: 150 }}
            />}

            {showData && !loading && <>
              <ZoomableImage uri={planePhoto} />
              <DataView title={"Modelo"} data={data.modelo} />
              <DataView title={"Operador"} data={data.operador} />
              <DataView title={"Edad"} data={`${data.edad} años`} />
              <DataView title={"Estado"} data={data.estado} />
              <DataView title={"N° de asientos"} data={data.numeroAsientos} />
              <DataView title={"Primer vuelo"} data={data.primerVuelo} />
            </>}

          </Animated.View>

        </View>



      </ScrollView>

      <View style={styles.bottomBar}>
        <BottomTabs />
      </View>

    </>
  )
}



const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    alignItems: 'flex-start',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  bottomBar: {
    alignItems: 'center'
  },
  title: {
    color: colors.primary,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 40,
    marginRight: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#969191',
    width: 200,
    padding: 10,
    color: 'gray',
    borderRadius: 8
  },
  subtitle: {
    color: 'gray',
    textAlign: 'left',
    fontSize: 12,
    marginTop: 10,
    marginRight: 30,
    maxWidth: 240,
  },
  searchContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250,
  },
  dataContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 30,
    width: '100%',
  }

});