import React, { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const GeoLocationContext = createContext({})

const GeoLocationProvider = ({ children }) => {
   const dispatch = useDispatch()
   const [ coordinates, setCoordinates ] = useState({})
   const [ location, setLocation ] = useState({})
   useEffect(() => {
      // dispatch
   }, [])

   const values = {
      coordinates,
      location,
      setCoordinates,
      setLocation,
   }

   return (
      <GeoLocationContext.Provider value={values}>
         {children}
      </GeoLocationContext.Provider>
   )
}

export const useGeoLocation = () => {
   const context = useContext(GeoLocationContext)
   function askLocation() {

   }
   return context
}

export default GeoLocationProvider
