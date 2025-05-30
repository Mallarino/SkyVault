import NetInfo from '@react-native-community/netinfo';

export const isOnline = async () => {
  try {
    const netState = await NetInfo.fetch();
    return netState.isConnected;
  } catch (error) {
    console.error('Error checking network status:', error);
    return false;
  }
};