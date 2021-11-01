import { useEffect, useState } from "react"

export default function useGeoLocation() {
   const [ coordiate, setCoordiate ] = useState({
      latitude: null,
      longitude: null,
   })
   useEffect(() => {
      // setCoordiate()
      return () => {
         // clear
      }
   }, [])
   return {
      coordiate
   }
}
