import React, { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const initialCoordinates = {
   latitude: 37.78825,
   longitude: -122.4324,
   latitudeDelta: 0.015,
   longitudeDelta: 0.0121,
}


const GeoLocationContext = createContext({
   coordinates: initialCoordinates
})

const GeoLocationProvider = ({ children }) => {
   const dispatch = useDispatch()
   const [ coordinates, setCoordinates ] = useState(initialCoordinates)
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
