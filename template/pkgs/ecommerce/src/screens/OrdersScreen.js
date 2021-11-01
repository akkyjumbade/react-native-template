import { useFocusEffect } from '@react-navigation/core'
import { Card, CardItem, Left, List, ListItem, Right } from 'native-base'
import React, { useReducer } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { Loading } from 'uikit'
import { Container, Text, Page, } from 'uikit'
import { Button } from 'uikit'
import DisplayText from 'uikit/src/molecules/DisplayText'
import ErrorMessage from 'uikit/src/molecules/ErrorMessage'
import { alert } from 'uikit/src/utils/alert'
import { colors } from '../../../../src/style/style'
import http, { server } from '../../../../src/utils/http'

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

const OrderItem = ({ item, onPress }) => {
   return (
      <TouchableOpacity onPress={() => onPress(item)}>
         <Container>
            <View>
               <Text weight="bold">#{item.code}</Text>
               <Text>Ordered on: <DisplayText value={item.created_at} format={'datetime'} /></Text>

            </View>
         </Container>
      </TouchableOpacity>
   )
}

const OrdersScreen = ({ navigation, route, }) => {
   const { data: orders, status, error } = useQuery('orders', async () => {
      let {data: res} = await server().get(`/api/v1/my_orders?page=1`)
      return res
   })

   useFocusEffect(() => {
      // navigation.setOptions({
      //    title: order?.title,
      // })
   })

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
      <Page loading={status === 'loading'} title={'Order'}>
         <View padding={0}>
            {/* <Text>{JSON.stringify({ orders })}</Text> */}
            <FlatList
               ListHeaderComponent={() => (
                  <View>
                     <Container>
                        <Text size={20} style={{ marginBottom: 20, }} >Order history</Text>
                     </Container>
                  </View>
               )}
               data={orders?.data}
               keyExtractor={row => row.id}
               renderItem={(row) => (
                  <OrderItem {...row} onPress={(order) => navigation.navigate('Order', {order})} />
               )}
             />
         </View>
      </Page>
   )
}
export default OrdersScreen
