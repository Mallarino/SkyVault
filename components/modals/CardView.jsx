import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native';
import PlaneImg from '../../assets/images/mock.jpeg'
import ZoomableImage from '../ZoomableImage'
import colors from '../../assets/const/colors';
import BackButton from '../../components/BackButton'
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function CardView() {
  const route = useRoute();
  const { item } = route.params;
  const formattedDate = new Date(item.fecha).toISOString().slice(0, 10);

  return (
    <>
      <BackButton />
      <View style={styles.card}>
        <Animated.View entering={FadeInDown.duration(400).delay(500)} style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.modelo}</Text>
        </Animated.View>

        <ZoomableImage uri={item.imagenPath} />

       <Animated.View entering={FadeInDown.duration(400).delay(500)}style={styles.cardBody}>
          <InfoRow label="Tipo:" value={item.tipo} />
          <InfoRow label="Fecha:" value={formattedDate} />
          <InfoRow label="Matrícula:" value={item.matricula} />

          <TouchableOpacity>
            <Text style={styles.button}>Ver Detalles del Avión</Text>
          </TouchableOpacity>

          <View style={styles.descriptionBox}>
            <Text style={styles.labelText}>Descripción</Text>
            <Text style={styles.text}>{item.descripcion}</Text>
          </View>
        </Animated.View>
      </View>
    </>
  );
}

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.labelText}>{label}</Text>
    <Text style={styles.text}>{value}</Text>
  </View>
);


const styles = StyleSheet.create({
  card: {
    marginTop: 80,
    marginHorizontal: 20,
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFD700', // Borde dorado
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
    paddingBottom: 20,
    alignItems: 'center',
  },
  cardHeader: {
    backgroundColor: '#16213E',
    width: '100%',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
  },
  cardTitle: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  cardBody: {
    width: '90%',
    marginTop: 16,
    gap: 14,
  },
  infoRow: {
    backgroundColor: '#0F3460',
    padding: 10,
    borderRadius: 10,
  },
  labelText: {
    color: '#B0BEC5',
    fontSize: 12,
    marginBottom: 4,
  },
  text: {
    color: '#4FC3F7',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionBox: {
    marginTop: 16,
    backgroundColor: '#1F4068',
    padding: 10,
    borderRadius: 12,
  },
  button: {
    marginTop: 12,
    paddingVertical: 8,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    overflow: 'hidden',
  },
});

