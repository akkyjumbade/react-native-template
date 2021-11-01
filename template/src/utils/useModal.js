import React, { useContext } from "react";

const defaultOptions = {
   fire: function() {

   },
}
export const ModalContext = React.createContext(defaultOptions)

export default function useModal() {
   const context = useContext(ModalContext)
   function fire() {

   }
   return {
      ...context,
      fire,
   }
}
