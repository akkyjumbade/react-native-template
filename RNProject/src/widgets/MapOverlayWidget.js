import { Text } from '@modules/rn-kit/atoms';
import { HStack, View, VStack } from 'native-base';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Overlay } from 'react-native-maps';
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { ButtonPrimary, Button } from '@modules/rn-kit/atoms'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { FormControl, TextInput } from '@modules/rn-kit/molecules';
import Collapsable from '@modules/rn-kit/molecules/Collapsable';
import icons from '@/icons';
import { useGeoLocation } from '@/providers/GeoLocationProvider';
import * as yup from 'yup'
import useTranslation from '@/hooks/useTranslation';

const validationSchema = yup.object().shape({
   address_line: yup.string().required(),
   address_line_2: yup.string().required(),
   city: yup.string().required(),
   state: yup.string().required(),
   postal_code: yup.string().required(),
   latitude: yup.string().required(),
   longitude: yup.string().required(),
})

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
   },
   overlayStyle: {
      backgroundColor: 'transparent',
   },
   header: {
      padding: 15,
      paddingBottom: 0
   },
   body: {
      padding: 15,
   },
   footer: {
      padding: 15,
      paddingBottom: 40,
   },
   selectedText: {
      marginBottom: 15,
      fontSize: 17
   }
});

const SearchLocationDialogue = React.forwardRef((props,ref) => {
   const { height } = useWindowDimensions()
   return (
      <Modalize alwaysOpen={true} modalHeight={height} {...props}>
         <Text>sdfkjsdf</Text>
         <Text>sdfkjsdf</Text>
         <Text>sdfkjsdf</Text>
         <Text>sdfkjsdf</Text>
         <Text>sdfkjsdf</Text>
         <Text>sdfkjsdf</Text>
         <Text>sdfkjsdf</Text>
         <Text>sdfkjsdf</Text>
         <Text>sdfkjsdf</Text>
         <Text>sdfkjsdf</Text>
         <Text>sdfkjsdf</Text>
         <Text>sdfkjsdf</Text>
         <Text>sdfkjsdf</Text>
      </Modalize>
   )
})

const LocationForm = ({ onChange, value = {} }) => {
   const [ address, setAddress ] = useState(() => value)
   const __ = useTranslation()
   let errors = {}
   useEffect(( ) => {
      onChange && onChange(address)
      validationSchema.validate(address).catch(e => {
         errors = e.errors
      })
   }, [ address, ])

   return (
      <View>
         <Text>{JSON.stringify({errors})}</Text>
         <FormControl label={__('address_line')}>
            <TextInput value={address.address_line} onChangeText={val => setAddress(prev => ({ ...prev, address_line: val }))} placeholder={'Flat/House'} />
         </FormControl>
         <FormControl label={__('address_line_2')}>
            <TextInput value={address.address_line_2} onChangeText={val => setAddress(prev => ({ ...prev, address_line_2: val }))} placeholder={'Landmark'} />
         </FormControl>
         <FormControl label={__('city')}>
            <TextInput value={address.city} onChangeText={val => setAddress(prev => ({ ...prev, city: val }))} placeholder={'City'} />
         </FormControl>
         <FormControl label={__('state')}>
            <TextInput value={address.state} onChangeText={val => setAddress(prev => ({ ...prev, state: val }))} placeholder={'State/Province'} />
         </FormControl>
         <FormControl label={__('postal_code')}>
            <TextInput value={address.postal_code} onChangeText={val => setAddress(prev => ({ ...prev, postal_code: val }))} placeholder={'Postal code'} />
         </FormControl>

      </View>
   )
}

const MapOverlayWidget = React.forwardRef((props, ref) => {
   const { currentCoordinates } = props
   const nav = useNavigation()
   const searchRef = useRef()
   const { location, setLocation } = useGeoLocation()
   function onLocationClick() {
      // nav.navigate('search')
      searchRef.current?.open()
   }
   function setNewLocation(_values) {
      setLocation(prev => ({
         ...prev,
         ..._values
      }))
   }
   useEffect(() => {

   }, [ currentCoordinates ])
   return (
      <Overlay>
         <Portal>
            <Modalize ref={ref}
               adjustToContentHeight={true}
               withHandle={false} withOverlay={false}
               HeaderComponent={() => (
                  <View style={styles.header}>
                     <Text bold>DELIVERY LOCATION</Text>
                     {/* <Text bold>{JSON.stringify({ location })}</Text> */}
                  </View>
               )}
               FooterComponent={() => (
                  <View style={styles.footer}>
                     <HStack space={2}>
                        <View style={{ flex: 1 }}>
                           <Button title={'Cancel'} />
                        </View>
                        <View style={{ flex: 1 }}>
                           <ButtonPrimary title={'Confirm'} />
                        </View>
                     </HStack>
                  </View>
               )}

               >
               <View style={styles.body}>
                  {/* <TouchableOpacity style={styles.selectedText} onPress={onLocationClick}>
                     <Text>{location.address_line ? location.address_line : 'Choose location'}</Text>
                  </TouchableOpacity> */}
                  <Collapsable  header={(_props) => (
                     <HStack space={2} alignItems={'center'}>
                        <View style={{ flex:  1}}>
                           <Text>{location.address_line ? location.address_line : 'Choose location'}</Text>
                           <Text>{JSON.stringify(location)}</Text>
                        </View>
                        <icons.edit {..._props} />
                     </HStack>
                     )}>
                     <LocationForm value={location} onChange={setNewLocation} />
                  </Collapsable>
                  {props.children}
               </View>
            </Modalize>
            <SearchLocationDialogue ref={searchRef} />
         </Portal>
      </Overlay>
   )
})

export default MapOverlayWidget
