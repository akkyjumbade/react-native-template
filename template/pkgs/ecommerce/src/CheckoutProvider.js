import React, { useContext, useEffect, useState } from 'react'
import { Loading } from 'uikit'
import http from '../../../src/utils/http'

const userState = {
   user: {
      username: '',
      email: '',
      phone: '',
      name: '',
   },
   billing: {

   }
}

const Checkout = React.createContext(userState)

const prepareCheckoutOptions = (params = {}) => new Promise(async (resolve, reject) => {
   try {
      const queryParams = new URLSearchParams(params)
      const { data } = await http.post(`/api/v1/checkout_options?${queryParams}`)
      resolve(data)
   } catch (error) {
      reject(error)
   }
})

export default function CheckoutProvider(props) {
   const [status, setStatus] = useState('init')
   const [checkoutOptions, setCheckoutOptions] = useState({})
   useEffect(() => {
      if (props.prefill) {
         setCheckoutOptions(prev => ({
            ...prev,
            ...props.prefill
         }))
      }
   }, [props.prefill])
   useEffect(() => {
      prepareCheckoutOptions(props.prefill).then(res => {
         setCheckoutOptions(prev => ({
            ...prev,
            ...res
         }))
      }).catch(e => {

      }).finally(() => {
         setStatus('ready')
      })
   }, [props.prefill])

   if (status !== 'ready') {
      return (
         <Loading />
      )
   }
   return (
      <Checkout.Provider value={checkoutOptions}>
         {props.children}
      </Checkout.Provider>
   )
}


export const useCheckout = () => {
   const context = useContext(Checkout)
   return {
      ...context,
   }
}
