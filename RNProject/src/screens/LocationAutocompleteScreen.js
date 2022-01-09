import ErrorBoundary from '@/components/errors/ErrorBoundary';
import { useGeoLocation } from '@/providers/GeoLocationProvider';
import MapOverlayWidget from '@/widgets/MapOverlayWidget';
import { Text } from 'native-base';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import MapView, { Circle, Marker, Overlay, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import Map from '@/components/Map/Map';
// import googleMapsCustomTheme from '@/style/google_maps_theme_dark.json'

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
   },
   overlayStyle: {
      backgroundColor: 'transparent',
   }
});

export default ({ navigation }) => {
   const modalref = useRef()
   const { height } = useWindowDimensions()
   const { setLocation } = useGeoLocation()
   const [ currentCoordinates, setCurrentCoordinates ] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
   })
   const markerCoordinates = currentCoordinates

   function onCoordinatesChange(ev) {
      console.info({ ev })
      // setCurrentCoordinates(prev => ({ ...prev, ...ev}))
   }
   useEffect(() => {
      setTimeout(() => {
         modalref.current?.open()
      }, 100);
      console.info({ modalref })

   }, [ modalref ])

   return (
      <Fragment>
         <Map
         />
         <MapOverlayWidget ref={modalref} />
      </Fragment>
   )
};

