import { useFocusEffect, useNavigation } from '@react-navigation/core'
import { Left, List, ListItem, Right } from 'native-base'
import React, { useReducer, useState } from 'react'
import { Fragment } from 'react'
import { FlatList, View } from 'react-native'
import { useMutation, useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { Flex } from 'uikit'
import { Loading } from 'uikit'
import { Container, Text, Page, } from 'uikit'
import { Button } from 'uikit'
import ErrorMessage from 'uikit/src/molecules/ErrorMessage'
import { alert } from 'uikit/src/utils/alert'
import { colors } from '../../style/style'
import http, { server } from '../../utils/http'

const order_reducer = (state, action) => {
   switch (action.type) {
      case 'CANCEL_ORDER':
         state = {
            ...state,
         }
         break;

      default:
         break;

   }
   return state
}

const AddressCard = props => {
   const { item } = props
   const nav = useNavigation()
   // const [status, setStatus] = useState('idle')

   function onEditClick() {
      nav.navigate('AddressForm', {
         action: 'UPDATE_ADDRESS',
         payload: item
      })
   }
   function onRemoveClick() {
      // if (!confirm('Are you sure want to remove this address?')) {
      //    props.onDelete(item)
      // }
      props.onDelete(item)
   }
   return (
      <View style={{ marginBottom: 15, paddingHorizontal: 15, }}>
         {/* <Text>{JSON.stringify(props)}</Text> */}
         <View>
            <View>
               <Text weight="bold">{item.name}</Text>
               <Text>{item.phone}</Text>
               <View>
                  <Text>{[item.address_line, item.address_line_2].join(',')}</Text>
                  <Text>{[item.city, item.state, item.postal_code].join(', ')}</Text>
               </View>
            </View>
            <Flex style={{ marginTop: 10, }}>
               <Button title="Edit" onPress={onEditClick} size="sm" intent="default" />
               <Button title="Remove" style={{ marginLeft: 10, }} onPress={onRemoveClick} size="sm" intent="danger" />
            </Flex>
         </View>
      </View>
   )
}

const My_Addresses = ({ navigation, route, }) => {
   const { data: addresses, status, error } = useQuery('my_addrs', async () => {
      return await server().get(`/api/v1/my_addr?page=1`)
   })
   const { mutate: deleteAddress, status: deleteStatus } = useMutation(address => server().post(`/api/v1/my_addr?action=remove`, {
         id: address.id
      })
   )
   useFocusEffect(() => {
      // navigation.setOptions({
      //    title: order?.title,
      // })
   })
   function addNewAddress() {
      navigation.navigate('AddressForm', {
         action: 'CREATE',
         payload: {}
      })
   }
   if (status === 'loading') {
      return (
         <Page>
            <Loading />
         </Page>
      )
   }
   if (status === 'error') {
      return (
         <Page>
            {error && (
               <ErrorMessage error={error} />
            )}
         </Page>
      )
   }
   return (
      <Page title={'Addresses'}>
         {addresses?.data && (
            <FlatList ListHeaderComponent={() => (
               <Container>
                  <Text size={30} weight="bold" style={{ marginBottom: 15, }}>Saved Addresses</Text>

                  {deleteStatus === 'loading' && (
                     <Loading />
                  )}

               </Container>
            )} data={addresses?.data?.data} keyExtractor={row => row.id} renderItem={(_row) => (
               <Fragment>
                  {/* <Text>{JSON.stringify(item)}</Text> */}
                  <AddressCard {..._row} onDelete={deleteAddress} />
               </Fragment>
            )} />
         )}
         <View style={{ padding: 15, }}>
            <Button title="Add New address" onPress={addNewAddress} intent="info" size="lg" />
         </View>
      </Page>
   )
}
export default My_Addresses
