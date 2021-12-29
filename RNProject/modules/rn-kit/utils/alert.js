import React from "react"
import { useState } from "react"

export const AlertContext = React.createContext()

export const AlertContextProvider = () => (
   <AlertContext.Provider />
)

export function alert(msg) {
   if (__DEV__) {
      alert(msg)
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
