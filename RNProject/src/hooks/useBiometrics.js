import TouchID from 'react-native-touch-id';

const config = {
   title: 'Authentication Required', // Android
   imageColor: '#e00606', // Android
   imageErrorColor: '#ff0000', // Android
   sensorDescription: 'Touch sensor', // Android
   sensorErrorDescription: 'Failed', // Android
   cancelText: 'Cancel', // Android
   fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
   unifiedErrors: false, // use unified error messages (default false)
   passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
}

export default function useBiometrics() {

   const msg = "to demo this react-native component"

   async function authenticate() {
      try {
         const biometryType = await TouchID.isSupported()
         if (biometryType === 'TouchID') {

         }
         const response = await TouchID.authenticate(msg, config)
         return response
      } catch (error) {
         throw error
      }
   }
   return {
      authenticate
   }

}
