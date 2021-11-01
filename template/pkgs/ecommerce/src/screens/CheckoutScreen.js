import { Left, List, ListItem, Right, } from 'native-base'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
// import Icon from 'react-native-vector-icons/FontAwesome5'
import { Text, Button, Flex, Page } from 'uikit'
import { connect, useSelector } from 'react-redux'
import { sumBy } from 'lodash-es'
import Checkout from '../components/Checkout'

const CheckoutScreen = ({ navigation, user, cart }) => {
   const paymentMethods = useMemo(() => {
      return [
         {
            label: 'Pay online',
            value: 'online'
         },
         {
            label: 'Pay on delivery',
            value: 'COD'
         },
      ]
   }, [])

   return (
      <Page scroll={true}>
         <Checkout user={user} items={cart.items} paymentMethods={paymentMethods} />
      </Page>
   )
}

export default connect(state => ({
   user: state.auth.user,
   cart: state.cart,
}))(CheckoutScreen)
