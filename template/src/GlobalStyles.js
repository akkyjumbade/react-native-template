import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
   droidSafeArea: {
      flex: 1,
      backgroundColor: 'transparent',
      paddingTop: Platform.OS === 'android' ? 0 : 0
   },
});
