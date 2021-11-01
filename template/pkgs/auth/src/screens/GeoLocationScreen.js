import React, { useEffect, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { connect, useDispatch } from 'react-redux'
import { FormControl } from 'uikit'
import { TextInput } from 'uikit'
import { Container } from 'uikit'
import { Text } from 'uikit'
import { Page } from 'uikit'
import { Modal_Header } from 'uikit/src/organisms/ModalInterface'
import ErrorBoundary from '../../../../src/components/ErrorBoundary'
import MapWidget from '../../../../src/components/molecules/MapWidget'
import { T_SET_LOCATION } from '../../../../src/store/location/location_reducer'
import LocationForm from '../components/LocationForm'
import SearchLocationAutoComplete from '../components/SearchLocationAutoComplete'
import {SCREEN} from "../../../../src/config";


const GeoLocationScreen = props => {
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
            <MapWidget cooards={cooards} onChange={onMapChange} onSearchClick={onSearchClick} />
         </ErrorBoundary>
         {/* <Text>{JSON.stringify({location})}</Text> */}
         {/* <Text>{JSON.stringify({geoLocation})}</Text> */}
         <Portal>
            <Modalize alwaysOpen={SCREEN.height / 2.5} modalStyle={{ margin: 0, }} >
               <Container style={{ marginTop: 15, }}>
                  <LocationForm initialValues={location.selected} />
               </Container>
            </Modalize>
            <Modalize ref={queryModal} HeaderComponent={() => (
               <Modal_Header title="Search location" />
            )}>
               <SearchLocationAutoComplete onSelect={onLocationSelect} />
            </Modalize>
         </Portal>
      </Page>
   )
}
export default connect(state => ({
   location: state.location
}))(GeoLocationScreen)
