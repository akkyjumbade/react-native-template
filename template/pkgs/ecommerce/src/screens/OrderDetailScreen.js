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

const OrderDetailScreen = ({ navigation, route, }) => {
   let orderParam = route.params?.order
   const { data: order, status: orderQueryStatus, refetch, error } = useQuery(`order_${orderParam.id}`, async () => {
      const { data: res } = await server().get(`/api/v1/my_orders/${orderParam.id}`)
      return res
   })

   const orderFeedbackModal = useRef()
   const orderItems = useMemo(() => {
      return order?.items
   }, [ order ])
   useFocusEffect(() => {
      navigation.setOptions({
         title: order?.title,
      })
   })
   function onFeedbackClick() {
      orderFeedbackModal.current?.open()
   }
   function onFeedbackCancel() {
      orderFeedbackModal.current?.close()
   }
   async function cancelOrder() {
      navigation.navigate('CancelOrder', {
         order
      })
      return
   }

   if (!order) {
      return (
         <Page>
            {/* <Text>{JSON.stringify({order, error, orderQueryStatus})}</Text> */}
         </Page>
      )
   }
   return (
      <Page loading={orderQueryStatus === 'loading'} title={'Order'}>
         <View padding={0}>
            <Container style={{ marginBottom: 0, }}>
               {(
                  order.status === 'SUCCESS' ||
                  order.status === 'CONFIRM'
               ) ? (
                  <OrderSuccessResponse order={order} />
               ) : (
                  <OrderFailedResponse order={order} />
               )}
               <Text>
                  Time placed: <Text weight="bold">{order.created_at}</Text>
               </Text>
               <Text>
                  Payment mode: <Text weight="bold">{order.payment_mode}</Text>
               </Text>
               <Text>
                  {order.note}
               </Text>
            </Container>
            {order.billing_address && (
               <AddressInfo title={'Delivery'} />
            )}
            {order.logs && order.logs > 0 ? (
               <OrderTrackingIndicator order={order} />
            ) : null}

            {/* <Text>
               {JSON.stringify({ order })}
            </Text> */}
            {order.type === 'order' && (
            <View>
               <Button onPress={() => navigation.navigate('TrackOrder', {
                  order
               })} title="Track order" intent="default" />
            </View>
            )}


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
            {orderItems && (
            <Section title={'Order Items'}>
               <View style={{ backgroundColor: '#FFF9DB', padding: 15, borderRadius: 15, marginVertical: 10, }}>
                  <Flex justifyContent={'center'}>
                     <View>
                        <Text>
                           Expected delivery
                        </Text>
                     </View>
                  </Flex>
               </View>
               <View style={{ marginHorizontal: -15 }}>
                  <FlatList data={orderItems} keyExtractor={row => row.id} renderItem={renderOrderItem} />
               </View>
            </Section>
            )}

            <Container style={{ marginTop: 15, }}>
               <Button title="Cancel order" size="lg" intent="default" onPress={cancelOrder} />
            </Container>
            {order.type === 'order' && (
            <Container style={{ marginTop: 15, }}>
               <Button title="Give feedback" size="lg" intent="default" onPress={onFeedbackClick} />
            </Container>
            )}

         </View>

         <Portal>
            <Modalize ref={orderFeedbackModal} adjustToContentHeight HeaderComponent={() => (
               <Modal_Header title="Feedback" />
            )}>
               <OrderFeedbackForm order={order} onCancel={onFeedbackCancel} />
            </Modalize>
         </Portal>

      </Page>
   )
}
export default OrderDetailScreen
