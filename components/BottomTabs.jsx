import { Animated, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useTab } from '../context/TabContext';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import colors from '../assets/const/colors';
import PhotoOptionModal from './modals/PhotoOptionModal';
import * as ImagePicker from 'expo-image-picker';

export default function BottomTabs() {
  const navigation = useNavigation();
  const { activeTab, setActiveTab } = useTab();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const slideAnim = useRef(new Animated.Value(100)).current;


  const handlePress = (navigateTo) => {
    setActiveTab(navigateTo);
    navigation.navigate(navigateTo);
  };

  const handleCameraPress = async () => {
    setModalVisible(false);

    try {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (!granted) {
        Alert.alert("Permiso requerido", "Se requiere acceso a la cámara.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        console.log("Foto tomada:", uri);
        navigation.navigate("CardModal", { item: uri });
      }
    } catch (error) {
      console.error("Error al abrir cámara:", error);

    }

  };

  const handleGalleryPress = async () => {
  setModalVisible(false);

  try {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert("Permiso requerido", "Se requiere acceso a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      console.log("Imagen seleccionada:", uri);

      navigation.navigate("CardModal", { uri: uri, item: null });
    }
  } catch (error) {
    console.error("Error al abrir galería:", error);
  }
};




  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => handlePress("Registration")}>
          <Animated.View style={[styles.iconButton, activeTab === "Registration" && styles.activeButton]}>
            <Feather name="book-open" size={30} color="white" />
          </Animated.View>
        </TouchableOpacity>


        {activeTab ?
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Gallery');
              setActiveTab("");
            }}
          >
            <Animated.View style={[styles.iconButton]}>
              <Entypo name="image" size={30} color="white" />
            </Animated.View>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Animated.View style={[styles.iconButton]}>
              <Entypo name="circle-with-plus" size={30} color="white" />
            </Animated.View>
          </TouchableOpacity>
        }

      </View>

      <PhotoOptionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCameraPress={handleCameraPress}
        onGalleryPress={handleGalleryPress}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    width: 250,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: colors.background,
    zIndex: 10,
  },
  iconButton: {
    padding: 10,
  },
  activeButton: {
    backgroundColor: '#BDB7EA',
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  option: {
    fontSize: 18,
    paddingVertical: 15,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cancel: {
    fontSize: 18,
    paddingVertical: 15,
    textAlign: 'center',
    color: '#FF3B30',
    marginTop: 10,
  },

});