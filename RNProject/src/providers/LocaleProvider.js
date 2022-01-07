import React, { createContext, useContext, useEffect, useState } from 'react'
import * as RNLocalize from "react-native-localize";
import { useDispatch } from 'react-redux';

console.log(RNLocalize.getLocales());
console.log(RNLocalize.getCurrencies());



const LocaleContext = createContext({})

export const useLocale = () => {
   return useContext(LocaleContext)
}

export default function LocaleContextProvider({ children }) {
   const getLocales = () => {
      return RNLocalize.getLocales()
   }
   const getCurrencies = () => {
      return RNLocalize.getCurrencies
   }
   const [value, setValue] = useState({ getLocales, getCurrencies })
   const dispatch = useDispatch()
   useEffect(() => {
      RNLocalize.addEventListener("change", () => {
         // do localization related stuff…
      });
      try {
         let languageCode = getLocales()[0].languageCode
         let numberFormat = RNLocalize.getNumberFormatSettings()
         let country = RNLocalize.getCountry()
         let timezone = RNLocalize.getTimeZone()
         let currencies = RNLocalize.getCurrencies()
         setValue(prev => ({
            ...prev,
            country,
            countryCode: country,
            timezone,
            languageCode,
            display_language: languageCode,
            numberFormat,
            currencies,
            currency: currencies[0] ?? currencies,
         }))
      } catch (error) {

      }
      // clear the listeners
      return () => {
         RNLocalize.removeEventListener('change')
      }
   }, [])

   useEffect(() => {
      if (value) {
         dispatch({ type: 'UPDATE_CONFIG', payload: value })
      }
   }, [ value ])


   return (
      <LocaleContext.Provider value={value} >
         {children}
      </LocaleContext.Provider>
   )
}
