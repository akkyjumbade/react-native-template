import { Left, List, ListItem, Right, Title } from 'native-base'
import React, { useEffect } from 'react'
import { Button, View, } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome5'
import useCheckout from '../hooks/useCheckout'
import { Text, Flex, Page, Container} from 'uikit'

export default function CheckoutGateway({ navigation }) {
   const { state, paymentData, setBillingInfo, setDeliveryInfo, setPaymentMethod, payment_methods } = useCheckout()

   // useEffect(() => {

   // }, )

   return (
      <Page>
         <Container>
            <Text>{JSON.stringify({ paymentData })}</Text>
         </Container>
         <View style={{ width: '100%', marginBottom: 15 }}>
            <List >
               <Title style={{ marginBottom: 10, marginTop: 15, }}>Order summary</Title>
               <ListItem noIndent>
                  <Left>
                     <View style={{ flex: 1,  }}>
                        <Text>Delivery</Text>
                     </View>
                     <View>
                        <Text style={{ whiteSpace: 'nowrap' }}>
                           {JSON.stringify({ billing: state.billing })}
                        </Text>
                     </View>
                  </Left>

               </ListItem>
               <ListItem noIndent>
                  <Left>
                     <Text>Subtotal</Text>
                  </Left>
                  <Right>
                     <Text>{state.subtotal}</Text>
                  </Right>
               </ListItem>
               <ListItem noIndent >
                  <Left>
                     <Text>Tax</Text>
                  </Left>
                  <Right>
                     <Text>{state.tax}</Text>
                  </Right>
               </ListItem>
               <ListItem noIndent>
                  <Left>
                     <Text>Total</Text>
                  </Left>
                  <Right>
                     <Text>{state.total}</Text>
                  </Right>
               </ListItem>
            </List>
         </View>
         <Title style={{ marginBottom: 10, marginTop: 0, }}>Payment mode</Title>
         <View>
            <List>
               <ListItem noIndent onPress={() => setPaymentMethod('online')}>
                  <Left>
                     <Text>Pay online</Text>
                  </Left>
               </ListItem>
               <ListItem noIndent onPress={() => setPaymentMethod('cod')}>
                  <Left>
                     <Text>Cash on delivery</Text>
                  </Left>
               </ListItem>
            </List>
         </View>
         <Container style={{ marginTop: 15 }}>
            {/* <Text>Click here</Text> */}
            {state.payment_mode === 'cod' ? (
               <Button title={'Place order'} onPress={() => navigation.navigate('CheckoutPayment')} />
            ) : (
               <Button title={'Pay now'} onPress={() => navigation.navigate('CheckoutPayment')} />
            )}

         </Container>
      </Page>
   )
}
