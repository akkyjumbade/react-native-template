import React, { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const GeoLocationContext = createContext({})

const GeoLocationProvider = ({ children }) => {
   const dispatch = useDispatch()
   const [ currentCoordinates, setCurrentCoordinates ] = useState({})
   useEffect(() => {
      // dispatch
   }, [])

   const values = {
      currentCoordinates,
      setCurrentCoordinates
   }

   return (
      <GeoLocationContext.Provider value={values}>
         {children}
      </GeoLocationContext.Provider>
   )
}

export const useGeoLocation = () => {
   const context = useContext(GeoLocationContext)
   function getCoordinates() {

   }
   return {
      ...context,
      getCoordinates,
   }
}

export default GeoLocationProvider
