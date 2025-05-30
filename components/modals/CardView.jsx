import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native';
import ZoomableImage from '../ZoomableImage'
import BackButton from '../../components/BackButton'
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext, useEffect } from 'react';
import ConfirmModal from './ConfirModal';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../credentials'
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import { useTab } from '../../context/TabContext';
import * as FileSystem from 'expo-file-system';
import Entypo from '@expo/vector-icons/Entypo';
import LottieView from 'lottie-react-native';
import { CardContext, useRefreshCard } from '../../context/CardContext';
import colors from '../../assets/const/colors';
import { isOnline } from '../../utils/isOnline';
import OfflineMessage from '../OfflineMessage';

export default function CardView() {

  const navigation = useNavigation();
  const route = useRoute();
  const { setActiveTab } = useTab();
  const { setShouldRefresh } = useRefreshCard();

  const [loading, setLoading] = useState(false);
  const [isConnected, setisConnected] = useState(true);
  const [show, setShow] = useState(false);
  const { item } = route.params;
  const formattedDate = new Date(item.fecha).toISOString().slice(0, 10);

  const handleMoreData = () => {
    navigation.navigate("Registration", { registrationOnCard: item.matricula })
    setActiveTab("Registration")
  };

  const handleUpdate = () => {
    navigation.navigate("CardModal", { uri: null, item: item })
  };

  const handleDelete = () => {
    setShow(true)
  };

  const handleConfirmDelete = async () => {
    try {
      setShow(false);
      setLoading(true)
      if (item?.imagenPath) {
        await FileSystem.deleteAsync(item.imagenPath, { idempotent: true });
      }

      await deleteDoc(doc(db, "cards", item.id));
      setShouldRefresh(true)
      showSuccessToast("Carta eliminada", "Carta eliminada con exito");
      setLoading(false);
      navigation.navigate("Gallery")
    } catch (error) {
      console.error("Error eliminando carta:", error);
      showErrorToast("Error", "No se pudo eliminar la carta")
    }
    setShow(false);
  };

  return (
    <>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20, }}
        showsVerticalScrollIndicator={false}
      >

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', top: 33 }}>

          <OfflineMessage wifiStatus={setisConnected}/>

        </View>

        <BackButton />

        <LinearGradient
          colors={['#BDB7EA', '#E6E6FA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBorder}
        >
          <View style={styles.card}>

            {loading ? (<LottieView
              source={require('../../assets/images/LoadAnimation.json')}
              autoPlay
              loop
              style={{ width: 150, height: 150 }}
            />)
              :
              (<>
                <Animated.View entering={FadeInUp.duration(400).delay(500)} style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.modelo}</Text>
                </Animated.View>

                <ZoomableImage uri={item.imagenPath} />

                <Animated.View entering={FadeInUp.duration(400).delay(500)} style={styles.cardBody}>
                  <InfoRow label="Tipo:" value={item.tipo} />
                  <InfoRow label="Fecha:" value={formattedDate} />
                  <InfoRow label="Matrícula:" value={item.matricula} />

                  <View style={styles.descriptionBox}>
                    <Text style={styles.labelText}>Descripción:</Text>
                    <Text style={styles.text}>{item.descripcion}</Text>
                  </View>

                  <View style={{ marginBlock: 10 }}>
                    <ActionButton isDisabled={!isConnected} textColor={isConnected ? "#1A1A2E" : "gray"} label="Ver detalles del avion" onPress={handleMoreData} colors={isConnected ? ['#667EEA', '#764BA2'] : ['#1A1A2E', '#1A1A2E']} />
                    <ActionButton isDisabled={!isConnected} textColor={isConnected ? "#1A1A2E" : "gray"} label="Actualizar carta" onPress={handleUpdate} colors={isConnected ? ['#667EEA', '#764BA2'] : ['#1A1A2E', '#1A1A2E']} />
                    <ActionButton isDisabled={!isConnected} textColor={isConnected ? "#1A1A2E" : "gray"} label="Eliminar carta" onPress={handleDelete} colors={isConnected ? ['#FF6B6B', '#C0392B'] : ['#1A1A2E', '#1A1A2E']} />
                  </View>
                </Animated.View>
              </>)}



          </View>
        </LinearGradient>
      </ScrollView>

      <ConfirmModal
        isVisible={show}
        onCancel={() => setShow(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

const ActionButton = ({ isDisabled, label, onPress, colors, textColor }) => (
  <LinearGradient
    colors={colors}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.gradientButtons}
  >
    <TouchableOpacity disabled={isDisabled} onPress={onPress} style={[styles.actionButton]}>
      <Text style={[styles.actionButtonText, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  </LinearGradient>
);

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.labelText}>{label}</Text>
    <Text style={styles.text}>{value}</Text>
  </View>
);


const styles = StyleSheet.create({
  gradientBorder: {
    padding: 2,
    borderRadius: 22,
    marginTop: 30,
    marginHorizontal: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#4285F4',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 20, // para Android
  },
  gradientButtons: {
    padding: 2,
    borderRadius: 22,
    marginTop: 30,
    marginHorizontal: 20,
    width: '90%',
    maxWidth: 400,
    elevation: 20, // para Android
  },
  gradientDescription: {
    padding: 1,
    borderRadius: 22,
    marginTop: 30,
    marginHorizontal: 20,
    width: '90%',
    maxWidth: 400,
    elevation: 20, // para Android
  },

  card: {
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    paddingBottom: 20,
    flex: 1,
    alignItems: 'center',
  },
  cardHeader: {
    backgroundColor: '#1A1A2E',
    flexDirection: 'row',
    width: '100%',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#BDB7EA',
  },

  cardTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    flex: 1, // para que ocupe todo el espacio restante
  },
  cardBody: {
    width: '90%',
    marginTop: 16,
    gap: 14,
  },
  infoRow: {
    backgroundColor: "#1A1A2E",
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#BDB7EA',
    marginTop: 20,
    marginHorizontal: 20,
    width: '90%',
    maxWidth: 400,
    elevation: 20,
  },
  labelText: {
    color: 'white',
    fontSize: 12,
    marginBottom: 4,
  },
  text: {
    color: '#BDB7EA',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionBox: {
    backgroundColor: '#1A1A2E',
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#BDB7EA',
    marginTop: 30,
    marginHorizontal: 20,
    width: '90%',
    maxWidth: 400,
    elevation: 20,
  },
  actionButton: {
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  actionButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

