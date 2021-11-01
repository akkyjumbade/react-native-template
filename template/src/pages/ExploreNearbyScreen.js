import LocationForm from 'auth/src/components/LocationForm'
import SearchLocationAutoComplete from 'auth/src/components/SearchLocationAutoComplete'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, View, Image } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { connect, useDispatch } from 'react-redux'
import { FormControl } from 'uikit'
import { TextInput } from 'uikit'
import { Container } from 'uikit'
import { Text } from 'uikit'
import { Page } from 'uikit'
import { Modal_Header } from 'uikit/src/organisms/ModalInterface'
import ErrorBoundary from '../components/ErrorBoundary'
import MapWidget from '../components/molecules/MapWidget'
import { SCREEN } from '../config'
import { sampleCoordinates } from './data'
import { Marker } from 'react-native-maps'

const styles = {
   img: {
      width: 60,
      height: 60,
      borderRadius: 10,
   }
}
const RenderNearbyCard = ({ item, index }) => {
   return (
      <View style={{ padding: 10, flexDirection: 'row' }}>
         <View>
            <Image source={{ uri: item.thumbnail }} style={styles.img}  />
         </View>
         <View style={{ paddingLeft: 15 }}>
            <Text size={16}>{item.name}</Text>
            <Text>0.2k away</Text>
         </View>
      </View>
   )
}
const markerImg = require('../../assets/map_marker.png')

const ExploreNearbyScreen = props => {
   const queryModal = useRef()
   const location = props.location
   const [geoLocation, setGeoLocation] = useState({})
   const [ searchResult, setSearchResult ] = useState(null)
   const [ cooards, setCoords ] = useState({})

   const dispatch = useDispatch()
   function onMapChange(ev) {
      const nativeEvent = ev?.nativeEvent || {}
      console.log({ nativeEvent })
      // dispatch({
      //    type: T_SET_LOCATION,
      //    payload: ev
      // })
   }
   function onLocationSelect(selectedLocation) {
      console.log({ selectedLocation })
      setCoords(selectedLocation)
      // dispatch({
      //    type: T_SET_LOCATION,
      //    payload: {
      //       selected: selectedLocation
      //    }
      // })
      queryModal.current?.close()
   }

   useEffect(() => {
      setTimeout(() => {
         onSearchClick()
      }, 400);
   }, [])
   function onSearchClick() {
      queryModal.current?.open()
   }
   return (
      <Page>
         <ErrorBoundary>
            <MapWidget onChange={onMapChange} onSearchClick={onSearchClick} >
               {sampleCoordinates.map((smp, index) => (
                  <Marker
                     {...smp}
                     image={markerImg}
                     key={index}
                  />
               ))}
            </MapWidget>
         </ErrorBoundary>
         {/* <Text>{JSON.stringify({location})}</Text> */}
         {/* <Text>{JSON.stringify({geoLocation})}</Text> */}
         <Portal>
            <Modalize
               ref={queryModal}
               modalHeight={SCREEN.height / 2.5}
               HeaderComponent={() => (
                  <Modal_Header title="Nearby" />
               )}
               flatListProps={{
                  data: sampleCoordinates,
                  keyExtractor: row => row.id,
                  renderItem: RenderNearbyCard
               }}
               />
         </Portal>
      </Page>
   )
}
export default connect(state => ({
   location: state.location
}))(ExploreNearbyScreen)
