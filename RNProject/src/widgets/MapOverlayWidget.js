import { Text } from '@modules/rn-kit/atoms';
import { HStack, View, VStack } from 'native-base';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Overlay } from 'react-native-maps';
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { ButtonPrimary, Button } from '@modules/rn-kit/atoms'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { FormControl, NumberInput, TextInput } from '@modules/rn-kit/molecules';
import Collapsable from '@modules/rn-kit/molecules/Collapsable';
import icons from '@/icons';
import { useGeoLocation } from '@/providers/GeoLocationProvider';
import * as yup from 'yup'
import useTranslation from '@/hooks/useTranslation';
import { useFormik } from 'formik';

const validationSchema = yup.object().shape({
   address_line: yup.string().required(),
   address_line_2: yup.string().required(),
   city: yup.string().required(),
   state: yup.string().required(),
   postal_code: yup.number().required(),
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
      paddingBottom: 20,
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
   const formik = useFormik({
      initialValues: value,
      validationSchema,
      validateOnBlur: true
   })
   useEffect(( ) => {
      onChange && onChange(address)

   }, [ address, ])

   return (
      <View>
         <FormControl label={__('address_line')} error={formik.errors?.address_line}>
            <TextInput value={formik.values.address_line} onChangeText={formik.handleChange('address_line')} placeholder={'Flat/House'} />
         </FormControl>
         <FormControl label={__('address_line_2')} error={formik.errors?.address_line_2}>
            <TextInput value={formik.values.address_line_2} onChangeText={formik.handleChange('address_line_2')} placeholder={'Landmark'} />
         </FormControl>
         <FormControl label={__('city')} error={formik.errors?.city}>
            <TextInput value={formik.values.city} onChangeText={formik.handleChange('city')} placeholder={'City'} />
         </FormControl>
         <HStack>
            <View style={{ width: '60%', marginRight: 15 }}>
               <FormControl label={__('state')} error={formik.errors?.state}>
                  <TextInput value={formik.values.state} onChangeText={formik.handleChange('state')} placeholder={'State/Province'} />
               </FormControl>
            </View>
            <FormControl label={__('postal_code')} error={formik.errors?.postal_code}>
               <NumberInput value={formik.values.postal_code} onChangeText={formik.handleChange('postal_code')} placeholder={'Postal code'} />
            </FormControl>
         </HStack>
         <FormControl label={__('type')} error={formik.errors?.type}>
            <HStack space={3}>
               <Button active={formik.values.type === 'home'} title={'Home'} small onPress={() => formik.setFieldValue('type', 'home')} />
               <Button active={formik.values.type === 'work'} title={'Work'} small onPress={() => formik.setFieldValue('type', 'work')} />
               <Button active={formik.values.type === 'other'} title={'Other'} small onPress={() => formik.setFieldValue('type', 'other')} />
            </HStack>
         </FormControl>

      </View>
   )
}

const MapOverlayWidget = React.forwardRef((props, ref) => {
   const { currentCoordinates, onCancel, onConfirm } = props
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
               modalStyle={{ minHeight: 200 }}
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
                           <Button title={'Cancel'} onPress={onCancel} />
                        </View>
                        <View style={{ flex: 1 }}>
                           <ButtonPrimary title={'Confirm'} onPress={onConfirm} />
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
                           {/* <Text>{JSON.stringify(location)}</Text> */}
                        </View>
                        <icons.edit {..._props} />
                     </HStack>
                     )}>
                     <ScrollView>
                        <LocationForm value={location} onChange={setNewLocation} />
                     </ScrollView>
                  </Collapsable>
                  {props.children}
               </View>
            </Modalize>
            {/* <SearchLocationDialogue ref={searchRef} /> */}
         </Portal>
      </Overlay>
   )
})
MapOverlayWidget.defaultProps = {
   onCancel: () => alert('go back'),
   onConfirm: () => alert('go back'),
}
export default MapOverlayWidget
