import { useState } from "react"


export default function useCheckout() {
   const [ state, setState ] = useState({
      name: '',
      payment_mode: 'online',
      subtotal: 0,
      tax: 0,
      shipping_charges: 0,
      discount: 0,
      total: 0,
      coupon_code: '',
      paymentData: {},
   })
   function setBillingInfo(vals) {
      setState({
         ...state,
         ...vals
      })
   }
   function setDeliveryInfo(vals) {
      setState({
         ...state,
         ...vals
      })
   }
   function setPaymentMethod(payment_mode) {
      setState({
         ...state,
         payment_mode: payment_mode
      })
   }
   function handleChange(ev) {
      setState(prev => ({
         ...prev,
         [ev.name]: ev.value,
      }))
   }
   return {
      state,
      handleChange,
      setBillingInfo,
      setDeliveryInfo,
      setPaymentMethod
   }
}
