import React from "react"
import { useState } from "react"
import { Alert } from "react-native"

export const AlertContext = React.createContext()

export const AlertContextProvider = () => (
   <AlertContext.Provider />
)

export function alert(msg) {
   if (__DEV__) {
      Alert.alert(msg)
   }
   console.log({ msg })
}

export default function useAlert() {
   const [ state, setState ] = useState({})
   function fire(msg) {
      setState(prevState => ({
         ...prevState,
         [msg.title]: {
            ...msg
         }
      }))
   }
   return {
      state,
      fire
   }
}
