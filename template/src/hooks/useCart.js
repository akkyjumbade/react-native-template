import { useEffect, useState } from "react"
import localStorage from "../localStorage"


export default function useCart() {
   const [ items, setItems ] = useState({})
   function addItem(obj) {
      setItems(prev => ({
         ...prev,
         [obj.id]: obj
      }))
   }
   function removeItem(obj) {
      setItems(prev => ({
         ...prev,
         [obj.id]: null
      }))
   }
   function clearCart() {
      setItems({})
   }

   async function loadCartFromCache() {
      try {
         const data = await localStorage.load({ key: 'cartItems', })
         if (data) {
            setItems(JSON.parse(data))
         }
      } catch (error) {

      }
   }

   useEffect(() => {
      localStorage.save({ key: 'cartItems', data: JSON.stringify(items) })
   }, [items])
   useEffect(() => {
      // load from cache
      loadCartFromCache()
   }, [])
   return {
      items,
      addItem,
      removeItem,
      clearCart
   }
}
