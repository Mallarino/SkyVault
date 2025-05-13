import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export default function BottomTabs() {

  const navigation = useNavigation();

  return (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate("Registration")} style={styles.iconButton}>
      <Feather name="book-open" size={30} color="white" />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate("")} style={[styles.iconButton, styles.plusButton]}>
      <Entypo name="circle-with-plus" size={30} color="white" />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate("User")} style={styles.iconButton}>
      <Feather name="user" size={30} color="white" />
    </TouchableOpacity>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#11131A',
    zIndex: 10,
  },
  iconButton: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 50
  },
  plusButton: {
    marginBottom: 20, 
  }
});