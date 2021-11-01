import React, { useMemo, Fragment, useState, useEffect } from 'react'
import { View, Alert, Image, ScrollView } from 'react-native'
import { connect, useDispatch, useSelector } from 'react-redux'
import useCart from '../../../../src/hooks/useCart'
import Container from 'uikit/src/atoms/Container'
import { Text, Flex, Page, Button, Icon, DisplayText } from 'uikit'
import { sumBy } from 'lodash-es'
import HTMLView from 'react-native-htmlview'
import { colors } from '../../../../src/style/style'
import { cart_item_decrement_qty_action, cart_item_increment_qty_action, T_CART_REMOVE, T_CART_UPDATE } from '../../../../src/store/shop/cart_reducer'
import { Portal } from 'react-native-portalize'
import CheckoutService from '../../../checkout/src/services/CheckoutService'
// import Checkout from './Checkout'

const CartItem = ({ item, index, isLast }) => {
   const dispatch = useDispatch()
   function removeItem() {
      // if (!Alert.alert('Are you sure want to remove?')) {
      //    return
      // }
      dispatch({ type: T_CART_REMOVE, payload: item })
   }
   function inCrement() {
      // dispatch({ type: 'CART_REMOVE', payload: item })
      dispatch(cart_item_increment_qty_action(item))
   }
   function deCrement() {
      // dispatch({ type: 'CART_REMOVE', payload: item })
      if (item.qty === 1) {
         return
      }
      dispatch(cart_item_decrement_qty_action(item))
   }
   if (!item) {
     return null;
   }
   return (
      <View style={{ flexDirection: 'row', borderBottomWidth: isLast ? 0 : 1, borderBottomColor: '#ccc', alignItems: 'flex-start', paddingVertical: 15 }}>
         <View style={{ marginRight: 15, }}>
            <Image source={{ uri: item.thumbnail }} style={{ borderRadius: 10, width: 65, height: 65 }} />
         </View>
         <View style={{ flex: 1, }}>
            <Text weight="bold">{item.name}</Text>
            <DisplayText format="bucks" value={item.price} />
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, }}>
               <Flex style={{ marginRight: 30, flex: 1 }} alignItems="center">
                  <Icon name="plus-circle" size={22} onPress={inCrement} style={{marginRight: 15}} />
                  <Text size={20} style={{marginRight: 15}} >{item.qty}</Text>
                  <Icon disabled={item.qty === 1} name="minus-circle" size={22} onPress={deCrement} />
               </Flex>
               <View>
                  <Icon name="trash" color={colors.danger} size={22} onPress={removeItem} />
               </View>

            </View>
         </View>
      </View>
   )
}

const EmptyComponent = props => {
   return (
      <View style={{ padding: 30, alignSelf: 'center' }}>
         <View>
            <Text size={20}>No items in cart</Text>
         </View>
         {props.primaryAction && (
         <View style={{ marginVertical: 15, }}>
            <Button intent="primary" {...props.primaryAction} />
         </View>
         )}

         {props.children}
      </View>
   )
}

const CartScreen = ({ navigation, cart, user }) => {
   const dispatch = useDispatch()
   const { items } = cart

   const [checkout, setCheckoutField] = useState({})

   const itemsCount = useMemo(() => {
      return Object.values(items).length
   }, [items])
   const subtotal = useMemo(() => {
      const items_arr = Object.values(items)
      if (items_arr > 0) {
         return sumBy(items_arr, row => row?.qty * Number(row?.price))
      }
      return 0
   }, [ items, ])

   useEffect(() => {
      if (subtotal) {
         dispatch({ type: T_CART_UPDATE, payload: {
            subtotal
         } })
      }
      const order = new CheckoutService(user)
      order.setItems(Object.values(items))
      order.save().then(console.log).catch(console.warn)
   }, [ subtotal, dispatch, items, user ])

   useEffect(() => {
      setCheckoutField(prev => ({
         ...prev,
         subtotal,
         tax: 0,
         delivery_charges: 0,
         coupon_code: null,
         total: subtotal
      }))
   }, [subtotal])
   // if (!Object.values(cart.items).length) {
   //    return null
   // }
   return (
      <Page scroll={false} style={{ flex: 1, }}>
         {/* <Text>{JSON.stringify(cart)}</Text> */}
         <Container style={{ marginTop: 15, flex: 1, flexDirection: 'column',  }}>
            <ScrollView>
            {Object.keys(items).map((ok, oki) => (
               <View key={oki}>
                  {items[ok] && (
                     <CartItem isLast={(Object.values(items).length - 1) === oki} item={items[ok]} />
                  )}
               </View>
            ))}
            </ScrollView>
            {/* <Text>{JSON.stringify({
               cart,
            })}</Text> */}
            {!itemsCount  ? (
               <EmptyComponent primaryAction={{ title: 'Browse more', onPress: () => navigation.navigate('Home') }} />
            ) : (
               <Fragment>
                  <View style={{ marginTop: 50, }}>
                     <Flex justifyContent="space-between" style={{ marginBottom: 6, }}>
                        <View>
                           <Text>Subotal</Text>
                        </View>
                        <View>
                           <DisplayText value={subtotal} format={'bucks'} />
                           {/* <HTMLView value={`<h4>subtotal</h4>`} /> */}
                        </View>
                     </Flex>
                     <Flex justifyContent="space-between" style={{ marginBottom: 6, }}>
                        <View>
                           <Text>Delivery charges</Text>
                        </View>
                        <View>
                           <DisplayText value={checkout.delivery_charges} format={'bucks'} />
                        </View>
                     </Flex>
                     <Flex justifyContent="space-between" style={{ marginBottom: 6, }}>
                        <View>
                           <Text>Tax</Text>
                        </View>
                        <View>
                           <DisplayText value={checkout.tax} format={'bucks'} />
                        </View>
                     </Flex>
                     <Flex justifyContent="space-between" style={{ marginBottom: 6, }}>
                        <View>
                           <Text size={20} weight="bold">Total</Text>
                        </View>
                        <View>
                           <DisplayText value={checkout.total} size={20} format={'bucks'} />
                        </View>
                     </Flex>
                  </View>

               </Fragment>
            )}
         </Container>
         <View style={{ marginTop: 0, paddingVertical: 15, bottom: 0, width: '100%', }}>
            <Container>
               <Button size={'lg'} intent="primary" title={'CONTINUE TO CHECKOUT'} onPress={() => navigation.navigate('Checkout')} />
            </Container>
         </View>

      </Page>
   )
}

export default connect(state => ({
   cart: state.cart,
   user: state.auth.user,
}))(CartScreen)
