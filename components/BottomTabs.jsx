import { Animated, View, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native';
import {  useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useTab } from '../context/TabContext';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import colors from '../assets/const/colors';
import PhotoOptionModal from './modals/PhotoOptionModal';

export default function BottomTabs() {
  const navigation = useNavigation();
  const { activeTab, setActiveTab } = useTab();
  const [modalVisible, setModalVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(100)).current;


const handlePress = (navigateTo) => {
    setActiveTab(navigateTo);
    navigation.replace(navigateTo);
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
        <TouchableOpacity onPress={() => handlePress( "Registration")}>
          <Animated.View style={[styles.iconButton, activeTab === "Registration" && styles.activeButton]}>
            <Feather name="book-open" size={30} color="white" />
          </Animated.View>
        </TouchableOpacity>


        {activeTab ?
          <TouchableOpacity
            onPress={() => {
              navigation.replace("Gallery");
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


        <TouchableOpacity onPress={() => handlePress( "User")}>
          <Animated.View style={[styles.iconButton, activeTab === "User" && styles.activeButton]}>
            <Feather name="user" size={30} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <PhotoOptionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCameraPress={() => {
          setModalVisible(false);
          console.log("Abrir cámara");
        }}
        onGalleryPress={() => {
          setModalVisible(false);
          console.log("Abrir galería");
        }}
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
    backgroundColor: '#6c63ff',
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