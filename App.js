import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import colors from './assets/const/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabProvider } from './context/TabContext';
import Toast from 'react-native-toast-message';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TabProvider>
        <AppNavigator />
      </TabProvider>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
