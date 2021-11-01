import { useFocusEffect } from '@react-navigation/core'
import { Left, List, ListItem, Right } from 'native-base'
import React, { useReducer } from 'react'
import { View } from 'react-native'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { Loading } from 'uikit'
import { Container, Text, Page, } from 'uikit'
import { Button } from 'uikit'
import { alert } from 'uikit/src/utils/alert'
import MapWidget from '../../../../src/components/molecules/MapWidget'
import { server } from '../../../../src/utils/http'
import { colors } from '../../style/style'


const OrderTrackingScreen = ({ navigation, route, }) => {
   const orderParam = route.params?.order

   const { data: order, status: orderLoadingStatus, refetch } = useQuery(`order_info_${orderParam.id}`, async () => {
      return await server().get(`/api/v1/orders/${orderParam.id}`)
   })

   useFocusEffect(() => {
      navigation.setOptions({
         title: '#' + orderParam?.code,
      })
   })
   async function cancelOrder() {
      try {
         // dispatch()
      } catch (error) {
         alert(error.message)
      }
   }

   return (
      <Page title={'Order'}>
         <View padding={0}>
            {/* <Text>{JSON.stringify({ orderParam })}</Text> */}
            <MapWidget />
            {orderLoadingStatus === 'loading' && (
               <Loading />
            )}
            <Text>{JSON.stringify({ order, orderLoadingStatus,  })}</Text>
         </View>
      </Page>
   )
}
export default OrderTrackingScreen
