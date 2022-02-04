import React, { createContext, useContext, useEffect, useState } from 'react'
import http from "@/utils/http";
import {useMutation, useQuery} from "react-query";
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'native-base';
import { auth_logout_action } from '@/store/auth/auth.actions';
import LoadingScreen from '@/screens/LoadingScreen';
const AuthContext = createContext(null)

export default function AuthenticationContextProvider ({ children }) {
   const token = useSelector(state => state.auth.token)
   const toast = useToast()
   const dispatch = useDispatch()
   const { data: user, } = useQuery(`/api/me?token=${token}`, {
      cacheTime: 3000,
      refetchOnReconnect: true,
      onError({ response: { data } = {}, message }) {
         // alert(data?.message)
         toast.show({
            title: data?.message,
         })
         // signOut()
      }
   })


   useEffect(() => {

   }, [ ])

   function signIn(_payload) {
      // dispatch(auth_logout_action())
   }

   function signOut() {
      dispatch(auth_logout_action())
      return Promise.resolve()
   }

   const values = {
      user,
      token,
      signIn,
      signOut,
   }

   // if (isLoading) {
   //    return (
   //       <LoadingScreen />
   //    )
   // }
   return (
      <AuthContext.Provider value={values}>
         {children}
      </AuthContext.Provider>
   )
}


export const useAuthentication = () => {
   return useContext(AuthContext)
}
