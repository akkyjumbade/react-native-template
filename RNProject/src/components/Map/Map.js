import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import googleMapsCustomTheme from './google_maps_theme.json'
import googleMapsCustomThemeDark from './google_maps_theme_dark.json'
import { useGeoLocation } from '@/providers/GeoLocationProvider'


const styles = StyleSheet.create({
   container: {
      ...StyleSheet.absoluteFillObject,
      // height: 400,
      // width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
   },
   map: {
      ...StyleSheet.absoluteFillObject,
      elevation: 0,
   }
})
const initialCoordinates = {
   latitude: 37.78825,
   longitude: -122.4324,
   latitudeDelta: 0.015,
   longitudeDelta: 0.0121,
}

const Map = ({ ...props }) => {
   const isDarkMode = useSelector(state => state.options.appearance_theme === 'dark')
   const { setCoordinates, coordinates: currentCoordinates } = useGeoLocation()

   useEffect(() => {
      // if (!currentCoordinates) {
      //    setCoordinates(initialCoordinates)
      // }
   }, [ currentCoordinates ])

   function onCoordinatesChange() {

   }

   return (
      <SafeAreaView style={styles.container}>
         {currentCoordinates.latitude && (
         <MapView
               followsUserLocation={false}
               provider={PROVIDER_GOOGLE} // remove if not using Google Maps
               style={styles.map}
               initialRegion={currentCoordinates}
               customMapStyle={isDarkMode ? googleMapsCustomThemeDark : googleMapsCustomTheme}
               onUserLocationChange={onCoordinatesChange}
               // userLocationPriority={'balanced'}
               // onRegionChangeComplete={onCoordinatesChange}
               zoomControlEnabled={true}
               zoomEnabled={true}
               {...props}
            >
            {props.children}
         </MapView>
         )}
      </SafeAreaView>
   )
}

export default Map
