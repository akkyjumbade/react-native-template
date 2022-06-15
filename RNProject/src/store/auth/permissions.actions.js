import { Alert } from "react-native"
import { checkNotifications, openSettings } from "react-native-permissions"
import { ACTION_TYPES } from "./permissions.reducer"

function askForPushNotification() {
   return dispatch => {
      checkNotifications().then(response => {
         if (response.status !== 'granted') {
            Alert.alert(`Permission: ${response.status}. Go to settings and enable.`, null, [
               {
                  text: 'Cancel',
                  style: 'default',
               },
               {
                  text: 'Open settings',
                  onPress: () => openSettings(),
                  style: 'destructive'
               }
            ])
         }
         dispatch({ type: ACTION_TYPES.T_GRANT_PERMISSION, payload: { push_notifications: response.status === 'granted' } })
      }).catch(error => {
         alert(JSON.stringify({ error }))
         dispatch({ type: ACTION_TYPES.T_GRANT_PERMISSION, payload: { push_notifications: false } })
      })
   }
}

export default {
   askForPushNotification,
}
