import React, { memo, useEffect, useState } from 'react'
import {  StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Overlay, PROVIDER_GOOGLE } from 'react-native-maps';
import { SCREEN } from '../../config';
import PropTypes from 'prop-types'
import { Text } from 'uikit';
import { Icon } from 'uikit';
import { useDispatch } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import google_maps_theme from './google_maps_theme'
import google_maps_theme_dark from './google_maps_theme_dark'
import { SafeAreaView } from 'react-native-safe-area-context';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import MapHeaderNavigation from '../../navigation/MapHeaderNavigation';

const lat = 41.3809462
const lon = 2.1633538

const initialRegionCoords = {
   latitude: lat,
   longitude: lon,
   latitudeDelta: 0.020,
   longitudeDelta: 0.020,
}

const MapScreen = memo((props) => {
   const { onConnect } = props
   const [ initialRegion, setInitialRegion] = useState(initialRegionCoords)
   const [ userCoords, setUserCoords ] = useState(initialRegionCoords)
   const { navigation } = props
   const isDarkMode = useColorScheme() === 'dark';

   const mapStyle = google_maps_theme

   function handleChange(ev) {
      if (props.onChange) {
         props.onChange(ev)
      }
   }
   useEffect(() => {
      const didBlurSubscription = navigation?.addListener(
         'didBlur',
         payload => {
           console.debug('didBlur', payload);
         }
      );

      return () => {
         didBlurSubscription.remove()
      }

   }, [ navigation ])
   useEffect(() => {
      if (onConnect) {
         onConnect(userCoords)
      }
   }, [userCoords, onConnect])

   function askUserLocation() {
      try {
         Geolocation.getCurrentPosition(info => {
            console.log({ info })
            if (info.coords) {
               setUserCoords(prev => ({...prev, ...info.coords}))
               setInitialRegion(prev => ({...prev, ...info.coords}))
            }
         });
      } catch (error) {
         alert(error.message)
      }
   }
   useEffect(() => {
      // handleChange(initialRegion)
   }, [ initialRegion ])

   useEffect(() => {
      // ask user location
      askUserLocation()
   }, [])

   return (
      <SafeAreaView edges={['bottom', 'left', 'right', 'top']}>
         <StatusBar barStyle="dark-content" translucent={true} hidden={true} />
         <MapView
            provider={PROVIDER_GOOGLE}
            region={initialRegion}
            style={styles.mapView}
            zoomControlEnabled={true}
            zoomEnabled={true}
            {...props}
            >
            {props.mapChildren && props.mapChildren()}
         </MapView>
         <Overlay>
            <MapHeaderNavigation navigation={navigation} />
         </Overlay>
         {props.children}
      </SafeAreaView>
   )
})

MapScreen.propTypes = {
   onChange: PropTypes.func,
   enableSearch: PropTypes.bool,
   cooards: PropTypes.object,
}

const styles = StyleSheet.create({
   mapView: { backgroundColor: 'gray', height: SCREEN.height, width: SCREEN.height,  },
   container: {
      // position: 'relative',
      flex: 1,
      // height: SCREEN.height
   },
   header: {
      position: 'absolute',
      zIndex: 99,
      left: 0,
      top: 6,
      width: '100%',
      // backgroundColor: 'red',
      alignItems: 'center',
      padding: 15,
   },
   searchField: {
      backgroundColor: 'white',
      width: '100%',
      borderRadius: 10,
      padding: 15,
   }

})
export default MapScreen
