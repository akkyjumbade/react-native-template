import React, { createContext, useContext, useState } from 'react'
import { checkNotifications } from 'react-native-permissions'

const DevicePermissionsContext = createContext()

const DevicePermissionsProvider = ({ children }) => {
   const [ permissionsEnabled, setPermissionsEnabled] = useState({})
   async function askForNotification() {
      try {
         let result = await checkNotifications()
         // alert(JSON.stringify({ result }))
         return result.status
      } catch (error) {
         throw error
      }
   }
   const value = {
      permissionsEnabled,
      askForNotification
   }
   return (
      <DevicePermissionsContext.Provider value={value}>
         {children}
      </DevicePermissionsContext.Provider>
   )
}

export const useDevicePermissions = () => {
   return useContext(DevicePermissionsContext)
}

export default DevicePermissionsProvider
