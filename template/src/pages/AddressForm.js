import { Left, List, ListItem, Right } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import useLocationComplete from '../hooks/useLocationComplete'
import { Text, TextInput} from 'uikit'
import { T_SET_LOCATION_QUERY } from '../store/location/location_reducer'
import { Loading } from 'uikit'
import { Icon } from 'uikit'
import { set_location_action, set_location_query_action } from '../store/location/location_actions'
import { useQuery } from 'react-query'
import http, { server } from '../utils/http'
import { useDispatch, useSelector } from 'react-redux'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import { Button } from 'uikit'
import { Container } from 'uikit'
import MapWidget from '../components/molecules/MapWidget'
import ErrorBoundary from '../components/ErrorBoundary'
import { FlatList, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/core'
import { FormControl, Page } from 'uikit'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Modal_Header } from 'uikit/src/organisms/ModalInterface'
import { Fragment } from 'react'
import { Formik } from 'formik'


const LocationItem = ({ item, onPress, seperator }) => {
   return (
      <ListItem noIndent noBorder={seperator} onPress={() => onPress && onPress(item)} >
         <Left>
            <Icon name="map-marker" lib="feather" />
            <Text>{item.title}</Text>
            {/* <Text>{JSON.stringify({seperator})}</Text> */}
         </Left>
         <Right>
            <Icon name="arrow-top" />
         </Right>
      </ListItem>
   )
}

const HeaderNavigation = ({ navigation }) => {
   const searchModal = useRef(null)
   const location = useSelector(state => state.location)
   const [address, setAddress] = useState({})
   const dispatch = useDispatch()
   const { data: sugggestions, status: suggestionsStatus } = useQuery('location_prefills', async () => {
      const { data: res } = await http.get(`/api/locations?q=nearby`)
      return res
   })
   const [ result, setResult ] = useState(null)
   async function fetchQueryLocation(params = {}) {
      let str = new URLSearchParams(params)
      try {
         const { data } = await http.get(`/api/locations?${str.toString()}`)
         return data
      } catch (error) {
         console.warn(JSON.stringify(error))
      }
   }
   function openModalSearch() {
      searchModal.current?.open()
   }
   function onOptionClick(addr) {
      dispatch(set_location_action({
         selected: addr,
      }))
      searchModal.current?.close()
   }
   function handleChange(ev) {
      fetchQueryLocation({ q: ev }).then(res => {
         setResult(res)
      })
      console.log({ ev })
   }
   return (
      <View style={{ height: 70, alignItems: 'center', justifyContent: 'center' }}>
         <View style={{ paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <View style={{ marginRight: 15, }}>
               <Icon onPress={() => navigation.goBack()} name="x" lib="feather"  size={18} style={{ borderRadius: 100, padding: 8, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }} />
               {/* <Text>Close</Text> */}
            </View>
            <View style={{ flex: 1 }}>
               <TouchableOpacity onPress={() => openModalSearch()}>
                  <FormControl style={{ marginBottom: 0, }}>
                     <Text>Your location</Text>
                  </FormControl>
               </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 15, }}>
               <Icon onPress={() => navigation.goBack()} name="check" lib="feather"  size={18} style={{ borderRadius: 100, padding: 8, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }} />
               {/* <Text>Close</Text> */}
            </View>
         </View>
         <Portal>
            <Modalize ref={searchModal} HeaderComponent={() => (
               <Modal_Header title={'Search location'} />
            )}>
               <List>
                  <ListItem noIndent noBorder>
                     <TextInput onChangeText={handleChange} placeholder={'Enter your location'} prepend={() => (
                        <Icon name="search" size={20} />
                     )} append={() => (
                        <SearchLoading loading={suggestionsStatus} />
                     )} />
                  </ListItem>
                  {suggestionsStatus === 'loading' && (
                  <ListItem noIndent>
                     <Text>{suggestionsStatus === 'loading' ? 'Loading' : 'Popular locations'}: {location.q}</Text>
                  </ListItem>
                  )}
                  {sugggestions && sugggestions.popular?.map((row, rowk) => (
                     <ListItem key={rowk} noIndent>
                        <Text>{row.title}</Text>
                     </ListItem>
                  ))}
                  {result && result.data ? (
                     <FlatList data={result.data} keyExtractor={row => row.id} renderItem={(row_props) => (
                        <LocationItem {...row_props} onPress={onOptionClick} />
                     )} />
                  ) : null}
               </List>
            </Modalize>
         </Portal>
      </View>
   )
}

const SearchLoading = ({ loading }) => {
   if (loading) {
      return (
         <Loading />
      )
   }
   return (
      <Icon name="x" size={20} />
   )
}

const AddressFormFields = props => {
   return (
      <></>
   )
}


export default function AddressForm(props) {
   const params = props.route?.params
   const action = params

   const navigation = props.navigation
   const addrFormModal = useRef()
   const location = useSelector(state => state.location)
   const [address, setAddress] = useState({})
   const dispatch = useDispatch()
   const { data: sugggestions, status: suggestionsStatus } = useQuery('location_prefills', async () => {
      const { data: res } = await http.get(`/api/locations?q=nearby`)
      return res
   })

   useEffect(() => {
      // navigation?.setOptions({
      //    // header: null
      // })
      if (action?.action === 'UPDATE_ADDRESS') {
         setAddress(action.payload)
      }
   }, [action, navigation])
   function handleChange(ev) {
      dispatch(set_location_query_action(ev))
   }
   function openEditModal() {
      addrFormModal.current?.open()
   }
   return (
      <Page scroll={true}>
         {/* <HeaderNavigation navigation={navigation} /> */}
         {/* <ErrorBoundary>
            <MapWidget />
         </ErrorBoundary> */}
         <View style={{ alignItems: 'flex-start', padding: 0, }}>
            {/* <Text>{JSON.stringify(location)}</Text> */}
            <AddressFormik address={address} onEdit={openEditModal} />
            {/* <Button onPress={openEditModal} title="Update" size="sm" intent="default" /> */}
         </View>
         <Portal>
            <Modalize ref={addrFormModal} HeaderComponent={() => (
               <Modal_Header title={'Address form'} />
            )}>
               <AddressFormik address={address} />
            </Modalize>
         </Portal>
      </Page>
   )
}


export const AddressFormik = props => {
   const adddress = props.address
   async function onSubmit(values, action) {
      action.setSubmitting(true)
      try {
         const { data: res } = await server().post(`/api/v1/my_addr?action=UPDATE`, {
            ...values,
            // _method: ''
         })
         if (res.ok) {
            props.onSuccess && props.onSuccess(res)
         }
      } catch (error) {
         if (error?.response?.data?.errors) {
            action.setErrors(error?.response?.data?.errors)
         }
         props.onError && props.onError(error)
      } finally {
         action.setSubmitting(false)
      }
   }
   return (
      <View style={{ padding: 15, }}>
         {/* <Text>{JSON.stringify(props)}</Text> */}
         <Formik initialValues={adddress} onSubmit={onSubmit} >
            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
               <Fragment>
                  <FormControl error={errors.address_line} label="Address line">
                     <TextInput value={values.address_line} onChangeText={handleChange('address_line')} />
                  </FormControl>
                  <FormControl label={'Address line 2'} error={errors.address_line_2}>
                     <TextInput value={values.address_line_2} onChangeText={handleChange('address_line_2')} />
                  </FormControl>
                  <FormControl label={'City'} error={errors.city}>
                     <TextInput value={values.city} onChangeText={handleChange('city')} />
                  </FormControl>
                  <FormControl label={'State'} error={errors.state}>
                     <TextInput value={values.state} onChangeText={handleChange('state')} />
                  </FormControl>
                  <FormControl label={'PIN Code'} error={errors.postal_code}>
                     <TextInput value={values.postal_code} onChangeText={handleChange('postal_code')} />
                  </FormControl>
                  <FormControl label={'Country'} error={errors.country}>
                     <TextInput value={values.country} onChangeText={handleChange('country')} />
                  </FormControl>
                  <View style={{ marginBottom: 15, }}>
                     <Button disabled={isSubmitting} title="Done" onPress={handleSubmit} intent="primary" size="lg" />
                  </View>
               </Fragment>
            )}
         </Formik>
      </View>
   )
}
