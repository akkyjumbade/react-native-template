import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { server } from "../utils/http"

/*
export default function useCheckout(initialValues) {
   const addresses = useQuery('user_addrs', async () => {
      const { data: res } = await server().get(`/api/v1/my_addr`)
      return res?.data ?? res
   })
   const state = useQuery(`checkout_order`, async () => {
      const payload = initialValues
      console.log({ ['checkout-payload']: payload})
      const { data: res } = await server().post(`/api/v1/checkout`, {
         ...payload,
      })
      console.log({ res })
      return res
   })
   const mutate = useMutation(payload => server().post(`/api/v1/checkout`, payload))

   return {
      state,
      addresses,
      mutate
   }
}
*/
export const T_CHECKOUT_SET_ADDRESS = 'CHECKOUT_SET_ADDRESS'
export const T_CHECKOUT_SET_PAYMENT_MODE = 'CHECKOUT_SET_PAYMENT_MODE'

export const checkoutReducer = (state, action) => {
   switch (action.type) {
      case T_CHECKOUT_SET_ADDRESS:
         return {
            ...state,
            billing_address: action.payload
         }
      case T_CHECKOUT_SET_PAYMENT_MODE:
         return {
            ...state,
            payment_mode: action.payload
         }
      default:
         break;
   }
   return state
}

export default function useCheckout(initialValues) {

}
