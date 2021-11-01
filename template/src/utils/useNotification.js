
import { useEffect, useState } from 'react';
import { FIREBASE_CONFIG } from '../config';

async function requestUserPermission() {
   try {
      // const authStatus = await messaging().requestPermission();
      // const enabled =
      //    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      //    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      // if (enabled) {
      //    console.log('Authorization status:', authStatus);
      //    return authStatus
      // }
      // return 1;

   } catch (error) {
      alert(error.message)
   }
}

export default function useNotification() {
   const [ status, setStatus ] = useState('idle')
   useEffect(() => {
      requestUserPermission().then(enabled => {
         setStatus(enabled)
      }).catch(e => {
         console.log({ e })
         alert(e.message)
         setStatus(e.message)
      })
   }, [  ])
   return {
      requestUserPermission,
      status,
   }
}
