import {useEffect, useState} from "react";
import {useMutation} from "react-query";
import {server} from "../../utils/http";

const guestUser = {

}
const paymentModes = [
   { label: 'Cash on delivery', value: 'cod', },
   { label: 'Pay online', value: 'online', },
]
async function prepareCheckout() {

}
export default function useCheckout({ user = guestUser, }) {
   const [ errors, setErrors ] = useState()
   const [ status, setStatus ] = useState('idle')
   const [ billing, setBilling ] = useState({})
   const [ delivery, setDelivery ] = useState({})
   const [ coupon, setCoupon ] = useState({ code: null, value: 0 })

   const { mutate: requestCheckout, status: requestStatus, data: response } = useMutation(payload => {
      return server().post(`/api/v1/checkout`, {
         ...payload,
         user
      })
   })

   useEffect(() => {
      // get from initial values from cache
      prepareCheckout().then(() => {

      }).catch(er => {
         setErrors(er)
      })
   }, [])

   return {
      errors,
      actions: {
         setBilling,
         setDelivery,
         requestCheckout,
      },
      status,
      billing,
      coupon,
      delivery,
      requestStatus,
      paymentModes,
      response,
   }
}
