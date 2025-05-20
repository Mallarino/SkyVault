import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native';
import PlaneImg from '../../assets/images/mock.jpeg'
import ZoomableImage from '../ZoomableImage'
import colors from '../../assets/const/colors';
import BackButton from '../../components/BackButton'

export default function CardView() {

  const route = useRoute();
  const { item } = route.params;


  return (

    <>
      <BackButton />
      <View style={styles.container}>

        {/* Icono para deplegar opciones (Editar, Borrar) */}

        <ZoomableImage uri={item.imagenPath} />

        <Text style={styles.model} numberOfLines={2}>{item.modelo}</Text>

        <View style={styles.gridContainer}>

          <View style={styles.inputGroup}>
            <Text style={styles.labelText}>Tipo:</Text>
            <Text style={styles.text}>{item.tipo}</Text>

            <Text style={styles.labelText}>Fecha:</Text>
            <Text style={styles.text}>{new Date(item.fecha).toISOString().slice(0, 10)}</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.labelText}>Detalles:</Text>
            <TouchableOpacity>
              <Text style={styles.button}>Datos del avion</Text>
            </TouchableOpacity>


            <Text style={styles.labelText}>Matricula:</Text>
            <TouchableOpacity>
              <Text style={styles.button}>{item.matricula}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.descriptionView}>
            <Text style={styles.labelText}>Descripcion:</Text>
            <Text style={styles.text}>{item.descripcion}</Text>
          </View>

        </View>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    width: '90%',
    height: '90%',
    backgroundColor: colors.background,
  },
  labelText: {
    color: '#B0BEC5'
  },
  text: {
    color: '#4FC3F7'
  },
  descriptionView: {
    alignItems: 'center',
    backgroundColor: '',
    width: 300,
    gap: 20
  },
  button: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: '#4FC3F7',
    padding: 5,
    color: '#4FC3F7'
  },
  model: {
    color: '#00BFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    margin: 20
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
  gridContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '',
    justifyContent: 'center',
  },
  inputGroup: {
    width: '48%',
    marginBottom: 50,
    marginLeft: 7,
    gap: 20,
    alignItems: 'center'
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


});