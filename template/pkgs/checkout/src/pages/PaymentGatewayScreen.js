import React, { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { Text } from 'uikit'
import { Page, Button, Container } from 'uikit'
// import RazorpayCheckout from 'react-native-razorpay';
import { StyleSheet, View } from 'react-native';
import { Loading } from 'uikit';
import { Icon } from 'uikit';
import { colors } from '../../../../src/style/style';

const styles = StyleSheet.create({
   responseView: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 15,
   },
})
const PaymentResponseMessage = ({ response }) => {
   const { ok, } = response

   if (!ok) {
      return (
         <View style={styles.responseView}>
            <Icon color={colors.danger} name="alert-circle" size={30} style={{ marginBottom: 15, }} />
            <Text size={17}>{response.description}</Text>
            <Text>Retry payment</Text>
         </View>
      )
   }
   return (
      <View style={styles.responseView}>
         <Icon color={colors.success} name="check-circle" size={30} style={{ marginBottom: 15, }} />
         <Text size={17}>{response.description}</Text>
         {/* <Text>Retry payment</Text> */}
      </View>
   )
}

const PaymentGatewayScreen = (props) => {
   const { navigation, route } = props
   const [ orderStatus, setOrderStatus ] = useState('idle')
   const paymentData = route.params.paymentData
   const order = route.params.order
   const [ paymentResponse, setPaymentResponse] = useState(null)

   const options = useMemo(() => {
      // console.log()
      return {
         currency: 'INR',
         key: 'rzp_live_GWfd7m1f3Hj6EM', // Your api key
         amount: paymentData.amount,
         order_id: paymentData?.id,
         prefill: {
            email: order?.customer_email,
            contact: `91${order?.customer_phone}`,
            name: order?.customer_name
         },
      }
   }, [ paymentData, order ])
   async function handleAPICallback(data) {
      try {
         navigation.navigate('Order', {
            data
         })
      } catch (error) {

      }
   }
   async function onPaymentClick() {
      setPaymentResponse(null)
      try {
         // const { data: res } = await RazorpayCheckout.open(options)
         // handleAPICallback(res)
         // setPaymentResponse({
         //    ...res,
         //    ok: true
         // })
         // alert(`Success: ${res.razorpay_payment_id}`);
      } catch (error) {
         console.log(error)
         setPaymentResponse({
            ...error,
            ok: false
         })
         // alert(JSON.stringify(error));
      } finally {

      }
   }
   useEffect(() => {
      console.log({ orderStatus })
   }, [orderStatus])
   useEffect(() => {
      // onPaymentClick()
   }, [])
   return (
      <Page style={{ alignItems: 'center', justifyContent: 'center', }}>
         <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <View>
               <View style={{ marginBottom: 15, marginTop: 100, }}>
                  {/* <Text>
                     {JSON.stringify(paymentResponse)}
                  </Text> */}
                  {paymentResponse && (
                     <PaymentResponseMessage response={paymentResponse} />
                  )}
                  <Loading />
                  <Text style={{ alignSelf: 'center', marginTop: 15, marginBottom: 15 }}>
                     Redirecting to payment gateway...
                  </Text>
                  {paymentResponse ? (
                     <Button onPress={onPaymentClick} size="lg" intent="primary" title={'Pay Now (Retry)'} />
                  ) : (
                     <Button onPress={onPaymentClick} size="lg" intent="primary" title={'Pay Now'} />
                  )}

               </View>
            </View>
         </Container>
         {/* <TouchableHighlight onPress={onPaymentClick} >
            <Text>Pay now</Text>
         </TouchableHighlight> */}
      </Page>
   )
}
export default connect(state => ({
   auth: state.auth,
}))(PaymentGatewayScreen)
