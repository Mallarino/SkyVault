import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import colors from './assets/const/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabProvider } from './context/TabContext';
import { CardProvider } from './context/CardContext';
import Toast from 'react-native-toast-message';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <CardProvider>
        <TabProvider>
          <AppNavigator />
        </TabProvider>
      </CardProvider>
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
