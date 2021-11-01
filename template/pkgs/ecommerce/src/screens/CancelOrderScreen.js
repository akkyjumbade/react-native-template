import { useFocusEffect } from '@react-navigation/core'
import { Left, List, ListItem, Right } from 'native-base'
import React, { Fragment, useEffect, useMemo, useReducer, useRef } from 'react'
import { FlatList, Image, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { useMutation, useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { Loading } from 'uikit'
import { Section } from 'uikit'
import { Container, Text, Page, } from 'uikit'
import { Flex } from 'uikit'
import { Icon } from 'uikit'
import { Button } from 'uikit'
import { Modal_Header } from 'uikit/src/organisms/ModalInterface'
import { alert } from 'uikit/src/utils/alert'
import { colors } from '../../../../src/style/style'
import { server } from '../../../../src/utils/http'
import __ from '../../../../src/utils/locale'
import CancelOrderForm from '../components/CancelOrderForm'
import OrderFeedbackForm from '../components/OrderFeedbackForm'
import OrderTrackingIndicator from '../components/OrderTrackingIndicator'

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

const renderOrderItem = ({ item = {}, ...rest }) => {
   return (
      <View style={{ flexDirection: 'row',   paddingHorizontal: 15, marginBottom: 15, }}>
         {/* <Text>{JSON.stringify(rest)}</Text> */}
         <Image source={{ uri: item.thumbnail }} style={{ width: 64, height: 64, borderRadius: 10, }} />
         <View style={{ marginLeft: 15, flexDirection: 'row', justifyContent: 'space-between', flex: 1, }}>
            <View>
               <Text >
                  {item.name}
               </Text>
               <View>
                  <Text >
                     Price: {item.price}
                  </Text>
                  <Text >
                     Qty: {item.qty}
                  </Text>
               </View>
            </View>
            <View>
               {/* <Text>Rs.321</Text> */}
            </View>
         </View>

      </View>
   )
}

const OrderFailedResponse = props => {
   const { order } = props
   const { status } = order
   return (
      <View>
         <Flex alignItems={'center'} style={{ marginBottom: 15, }}>
            <View style={{ marginRight: 15, }}>

               {status === 'PENDING' ? (
                  <Icon style={{ borderRadius: 10000, backgroundColor: colors.warning, padding: 10, }} lib={'feather'} name={'clock'} color={'white'} size={22} />
               ) : (
                  <Icon style={{ borderRadius: 10000, backgroundColor: colors.danger, padding: 10, }} lib={'feather'} name={'alert-circle'} color={'white'} size={22} />
               )}
            </View>
            <View>
               {status === 'PENDING' ? (
                  <Fragment>
                     <Text size={22} style={{ marginBottom: 3, }}>
                        Order pending
                     </Text>
                     <Text size={13} style={{ marginBottom: 6 }}>Your order #{order.code} is pending.</Text>
                  </Fragment>
               ) : (
                  <Fragment>
                     <Text size={22} style={{ marginBottom: 3, }}>
                        Order failed
                     </Text>
                     <Text size={13} style={{ marginBottom: 6 }}>Your order #{order.code} is failed.</Text>
                  </Fragment>
               )}
               <Text marginBottom={0}>
                  <Text weight="bold">{order.status}</Text>
               </Text>
            </View>
         </Flex>

         {/* <Text>{JSON.stringify(order)}</Text> */}
      </View>
   )
}

const OrderSuccessResponse = props => {
   const { order } = props
   return (
      <View>
         <Flex alignItems={'center'} style={{ marginBottom: 15, }}>
            <View style={{ marginRight: 15, }}>
               <Icon style={{ borderRadius: 1000, backgroundColor: colors.success, padding: 10, }} lib={'feather'} name={'check-circle'} color={'white'} size={22} />
            </View>
            <View>
               <Text size={22} style={{ marginBottom: 3, }}>Thank you</Text>
               <Text size={13} style={{  }}>Your order #{order.code} has been placed.</Text>
            </View>
         </Flex>
         <Text marginBottom={20}>
            We sent an email to {order.customer_email} with your order confirmation and bill.
         </Text>
      </View>
   )
}

const AddressInfo = ({ address, title }) => {
   return (
      <Section title={title}>
         <View style={{  }}>
            <Text style={{ justifyContent: 'flex-start' }}>{address.name}</Text>
            <Text style={{ justifyContent: 'flex-start' }}>{address.phone}</Text>
            {/* <Text style={{ justifyContent: 'flex-start' }}>+49 179 111 1010</Text> */}
            <Text style={{ justifyContent: 'flex-start' }}>
               {[address.address_line, address.address_line_2,].join()}
            </Text>
            <Text style={{ justifyContent: 'flex-start' }}>
               {[address.city, address.state, address.postal_code, address.country,].join()}
            </Text>
         </View>
      </Section>
   )
}

const CancelOrderScreen = ({ navigation, route, }) => {
   let orderParam = route.params?.order
   const { data: order, status: orderQueryStatus, refetch, error } = useQuery(`order_${orderParam.id}`, async () => {
      const { data: res } = await server().get(`/api/v1/my_orders/${orderParam.id}`)
      return res
   })
   const { mutate: cancelOrderAction, status: cancelStatus } = useMutation(payload => {
      return server().post(`/api/v1/my_orders/${order.id}?action=update`, {
         ...payload
      })
   })
   const orderFeedbackModal = useRef()
   useEffect(() => {
      refetch()
   }, [cancelStatus, refetch])
   const orderItems = useMemo(() => {
      return order?.items
   }, [ order ])
   function onFeedbackClick() {
      orderFeedbackModal.current?.open()
   }
   function onFeedbackCancel() {
      orderFeedbackModal.current?.close()
   }
   async function cancelOrder() {
      try {
         cancelOrderAction({
            order_id: order.id,
            status: 'cancel'
         })
      } catch (_error) {
         alert(_error.message)
      }
   }
   if (orderQueryStatus === 'loading') {
      return (
         <Loading />
      )
   }

   if (!order) {
      return (
         <Page>
            <Text>{JSON.stringify({order, error, orderQueryStatus})}</Text>
         </Page>
      )
   }
   return (
      <Page title={'Order'}>
         <View padding={0}>
            <Container style={{ marginBottom: 0, }}>

            </Container>

            <Section title={'Summary'}>
               <View style={{ marginHorizontal: -15 }}>
                  <ListItem noIndent>
                     <Left>
                        <Text>
                           Cart Total:
                        </Text>
                     </Left>
                     <Right style={{ flex: 1}}>
                        <Text>
                           Rs. {order.subtotal}
                        </Text>
                     </Right>
                  </ListItem>
                  {order.shipping_charges ? (
                  <ListItem noIndent>
                     <Left>
                        <Text>
                           Shipping charges:
                        </Text>
                     </Left>
                     <Right style={{ flex: 1}}>
                        <Text>
                           Rs. {order.shipping_charges}
                        </Text>
                     </Right>
                  </ListItem>
                  ) : (null)}
                  {order.tax ? (
                  <ListItem noIndent>
                     <Left>
                        <Text>
                           Tax:
                        </Text>
                     </Left>
                     <Right style={{ flex: 1}}>
                        <Text>
                           Rs. {order.tax}
                        </Text>
                     </Right>
                  </ListItem>
                  ) : (null)}

                  <ListItem noIndent>
                     <Left>
                        <Text size={20} weight={'bold'}>
                           Total:
                        </Text>
                     </Left>
                     <Right style={{ flex: 1}}>
                        <Text size={20} weight={'bold'}>
                           Rs. {order.total}
                        </Text>
                     </Right>
                  </ListItem>
               </View>
            </Section>

            <CancelOrderForm values={order} />
            <Container style={{ marginTop: 15, }}>
               <Text>{__('Refund for pre-paid orders will be initiated instantly and will reflect within a maximum of 5-7 nusiness days')}</Text>
            </Container>
         </View>

      </Page>
   )
}
export default CancelOrderScreen
