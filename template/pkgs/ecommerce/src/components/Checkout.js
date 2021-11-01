/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from '@react-navigation/core'
import { CheckBox, Left, List, ListItem, Radio, Right } from 'native-base'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { useMutation } from 'react-query'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Container } from 'uikit'
import { FormControl } from 'uikit'
import { TextInput } from 'uikit'
import { Icon } from 'uikit'
import { Section } from 'uikit'
import { Button } from 'uikit'
import { Text, DisplayText } from 'uikit'
import { Modal_Header } from 'uikit/src/organisms/ModalInterface'
import { SCREEN } from '../../../../src/config'
import { server } from '../../../../src/utils/http'
import { setDeliveryAction, setItemsAction, setPaymentModeAction, useFromWalletAction, } from '../store/checkout/checkout_reducer'
import AddressItem from './AddressItem'
import EmptyAddressAction from './EmptyAddressAction'

const Checkout = (props) => {
   const nav = useNavigation()
   const { paymentMethods, user, items, } = props
   const location = useSelector(state => state.location)

   const deliveryAddressPickerModal = useRef()
   const state = useSelector(_state => _state.checkout)
   const billing = state.billing_address
   const orderUpdate = useMutation(payload => {
      return server().post(`/api/v1/checkout`, {
         ...payload,
      })
   })

   const hasAddressSelected = useMemo(() => {
      return billing && Object.values(billing).length
   }, [location.selected, state])

   const [errors, setErrors] = useState(null)

   const userAddresses = props.savedAddresses
   const dispatch = useDispatch()
   useEffect(() => {
      console.log(state)
   })
   function onMethodSelect(val) {
      dispatch(setPaymentModeAction(val))
   }
   function _useFromWalletAction() {
      const checked = !state.use_wallet_balance
      dispatch(useFromWalletAction(checked))
   }
   useEffect(() => {
      if (location.selected) {
         dispatch(setDeliveryAction(location.selected))
      }
   }, [ location.selected ])

   useEffect(() => {
      const orderData = orderUpdate.data?.data
      console.log({ orderData })
      // return
      if (orderData?.ok) {
         if (orderData.order?.payment_mode === 'COD') {
            nav.navigate('Order', {
               paymentData: orderData.payment_data,
               order: orderData.order,
            })
         } else {
            nav.navigate('PaymentGateway', {
               paymentData: orderData.payment_data,
               order: orderData.order,
            })
         }
      }
   }, [ orderUpdate.data ])

   useEffect(() => {
      dispatch(setItemsAction(items))
   }, [ items ])
   function onDeliveryClick() {
      deliveryAddressPickerModal.current?.open()
      // () => nav.navigate('AddressForm', {
      //    addresses: []
      // })
   }
   function onCheckoutClick() {
      console.log({ state: state })
      const orderPayload = {
         ...state,
         user_id: user?.id
      }
      orderUpdate.mutate(orderPayload)
      // mutate.mutate(state)
   }
   function addNewDeliveryAddress() {
      deliveryAddressPickerModal.current?.close()
      nav.navigate('AddressForm', {
         action: 'CREATE'
      })
   }
   function selectDeliveryAddress(_addr) {
      dispatch(setDeliveryAction(_addr))
      deliveryAddressPickerModal.current?.close()
   }

   return (
      <View style={styles.container}>
         {/* <Text>{JSON.stringify({
            payment: state.payment_mode,
            subtotal: state.subtotal,
            user_id: state.user_id,
            total: state.total,
            use_wallet_balance: state.use_wallet_balance,
            billing: state.billing_address,
         })}</Text> */}
         <Section title={'Delivery'}>
            {/* <Text>{JSON.stringify(state.)}</Text> */}
            <TouchableOpacity onPress={onDeliveryClick}>
               {hasAddressSelected ? (
                  <View>
                     <View>
                        <View style={{ marginBottom: -15, flexDirection: 'row', justifyContent: 'flex-end' }}>
                           <Button intent={'default'} title={'Change'} size={"sm"} />
                        </View>
                        <View style={{ marginTop: 0, marginBottom: 15, borderRadius: 15, }}>
                           <Text>{[billing.name, ].join(', ')}</Text>
                           <Text>{[billing.phone, ].join(', ')}</Text>
                           <Text>{[billing.address_line, billing.address_line_2].join(', ')}</Text>
                           <Text>{[billing.city, billing.state, billing.postal_code, billing.country].join(', ')}</Text>
                           {/* <Text>{[].join(', ')}</Text> */}
                        </View>
                     </View>
                  </View>
               ) : (
                  <View style={{ marginTop: 0, marginBottom: 15, borderRadius: 15, borderWidth: 1,  }}>
                     <Text size={16} style={{ padding: 15,  alignSelf: 'center' }}>
                        Select delivery address
                     </Text>
                  </View>
               )}

               {state.status === 'error' && (
                  <View>
                     {/* <Text>{JSON.stringify(state.error?.response?.data)}</Text> */}
                  </View>
               )}
               {errors && (
                  <Text>{JSON.stringify(errors)}</Text>
               )}
               {/* <Text>{JSON.stringify(orderUpdate.data?.data)}</Text> */}

            </TouchableOpacity>
            <View style={{ marginTop: 10, flexDirection: 'column', justifyContent: 'flex-end' }}>
               <FormControl label="Order note">
                  <TextInput placeholder="Leave note (Optional)" />
               </FormControl>
               {/* <Button title="Note" size="sm" intent="info" /> */}
            </View>
         </Section>

         <Section title={'Order summary'}>
            <List style={{ marginHorizontal: -15 }}>
               <ListItem noIndent>
                  <Left>
                     <Text>Items total ({Object.values(items).length})</Text>
                  </Left>
                  <Right>
                     <DisplayText format="bucks" value={state.subtotal} />
                  </Right>
               </ListItem>
               {state.shipping_charges ? (
               <ListItem noIndent>
                  <Left>
                     <Text>Delivery charges</Text>
                  </Left>
                  <Right>
                     <DisplayText format="bucks" value={state.shipping_charges} />
                  </Right>
               </ListItem>
               ) : null}
               {state.tax ? (
               <ListItem noIndent>
                  <Left>
                     <Text>Tax</Text>
                  </Left>
                  <Right>
                     <DisplayText format="bucks" value={state.tax} />
                  </Right>
               </ListItem>
               ) : null}
               {state.coupon ? (
               <ListItem noIndent>
                  <Left>
                     <Text>Coupon</Text>
                  </Left>
                  <Right>
                     <Text>{state.coupon}</Text>
                     <DisplayText format="bucks" value={state.coupon} />
                  </Right>
               </ListItem>
               ) : null}
               <ListItem noIndent>
                  <Left>
                     <Text size={18} weight="bold">Total</Text>
                  </Left>
                  <Right>
                     <DisplayText size={18} format="bucks" value={state.total} />
                  </Right>
               </ListItem>
            </List>
         </Section>
         <Section title={'Payment mode'}>
            <List style={{ marginHorizontal: -15 }}>
               {paymentMethods && paymentMethods.map((pm, pmi) => (
               <ListItem noIndent onPress={() => onMethodSelect(pm.value)} noBorder={(paymentMethods.length - 1) === pmi} key={pm.value}>
                  <Radio selected={state.payment_mode === pm.value} style={{ marginRight: 8, }} />
                  <Text>{pm.label}</Text>
               </ListItem>
               ))}
            </List>
         </Section>

         {user.custom_attrs?.wallet_balance && (
         <List style={{ marginHorizontal: -10 }}>
            <ListItem noIndent>
               <Left style={{ paddingLeft: 10, }}>
                  <Text weight="bold" style={{  }}>Use from wallet</Text>
               </Left>
            </ListItem>
            <ListItem noBorder noIndent onPress={_useFromWalletAction} >
               <Left>
                  <CheckBox checked={state.use_wallet_balance === true} style={{ marginRight: 20, }} />
                  <Text>Use wallet balance</Text>
               </Left>
               <Right style={{ paddingRight: 20, }}>
                  <DisplayText format="bucks" value={user.custom_attrs?.wallet_balance} />
               </Right>
            </ListItem>
         </List>
         )}

         <View style={{ padding: 15, }}>
            {state.payment_mode === 'online' ? (
               <Button disabled={orderUpdate.status === 'loading'} size={'lg'} intent="primary" onPress={onCheckoutClick} title="Pay Now" />
            ) : (
               <Button disabled={orderUpdate.status === 'loading'} size={'lg'} intent="primary" onPress={onCheckoutClick} title="Place Order" />
            )}

         </View>

         <Portal>
            <Modalize ref={deliveryAddressPickerModal} HeaderComponent={() => (
               <Modal_Header title={'Select delivery address'} />
            )} flatListProps={{
               data: userAddresses,
               keyExtractor: row => row.id,
               renderItem: (row) => (
                  <ListItem noIndent onPress={_ => selectDeliveryAddress(row.item)}>
                     <Left style={{ alignSelf: 'flex-start', marginLeft: -20 }}>
                        <AddressItem style={{ marginLeft: -30 }} {...row} prepend={() => (
                           <View style={{ marginRight: 25 }}>
                              <CheckBox />
                              <Text>{JSON.stringify()}</Text>
                           </View>
                        )} />
                     </Left>
                  </ListItem>
               ),
               ListFooterComponent: () => (
                  <View>
                     <TouchableOpacity onPress={addNewDeliveryAddress} style={{ flexDirection: 'row', padding: 15, marginLeft: 10, alignItems: 'center', }}>
                        <Icon size={26} name="plus-circle" />
                        <Text style={{ marginTop: 0, marginLeft: 15 }}>
                           Add new address
                        </Text>
                     </TouchableOpacity>
                  </View>
               )
            }}>
               {/* no child */}
            </Modalize>
         </Portal>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      minHeight: SCREEN.height,
      flex: 1,
      // ...StyleSheet.absoluteFillObject,
      // position: 'absolute'
   }
})

export default connect(state => ({
   user: state.auth?.user,
   savedAddresses: state.auth?.savedAddresses,
   cart: state.cart,
}))(Checkout)
