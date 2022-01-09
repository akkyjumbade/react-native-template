import ErrorBoundary from '@/components/errors/ErrorBoundary';
import GeoLocationProvider from '@/providers/GeoLocationProvider';
import MapOverlayWidget from '@/widgets/MapOverlayWidget';
import { Text } from 'native-base';
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import MapView, { Circle, Marker, Overlay, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

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

export default () => {
   const modalref = useRef()
   const { height } = useWindowDimensions()
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
      }, 1000);
      console.info({ modalref })

   }, [ modalref ])

   return (
      <GeoLocationProvider>
         <View style={styles.container}>
            <MapView
               // followsUserLocation={true}
               provider={PROVIDER_GOOGLE} // remove if not using Google Maps
               style={styles.map}
               region={currentCoordinates}
               onUserLocationChange={onCoordinatesChange}
               // userLocationPriority={'balanced'}
               // onRegionChangeComplete={onCoordinatesChange}
               zoomControlEnabled={true}
            >
               {/* <Marker
                  pinColor={'black'}
                  coordinate={markerCoordinates}
               />
               <Circle
                  center={markerCoordinates}
                  radius={100}
               /> */}
               <MapOverlayWidget ref={modalref} currentCoordinates={currentCoordinates} />
               {/* <ErrorBoundary>
               </ErrorBoundary> */}
            </MapView>
         </View>
      </GeoLocationProvider>
   )
};

