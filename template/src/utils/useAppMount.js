/* eslint-disable react-hooks/exhaustive-deps */
import { auth_check_action, load_addresses_action } from "auth/src/store/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { store } from "../store";
// import { auth_check_action, load_addresses_action } from "../store/auth/actions";
import { load_notifications_action } from "auth/src/store/notifications_reducer";
import { perform_api_calls_action } from "../store/config/actions";
import { T_SET_POSTS } from "../store/posts/posts_reducer";
import { load_services_action, load_service_providers_action } from "../store/services/service_actions";
import http from "./http";
import useNotification from "./useNotification";
// import * as Font from 'expo-font'

const download_assets_async = params => {
   return new Promise(async (resolve, reject) => {
      try {
         const { data } = await http.get(`/api/v1`)
         resolve(data)
      } catch (error) {
         reject(error)
      }
   })
}

export default function useAppMount() {
   const [ status, setStatus, ] = useState('INIT')
   const [ mode, setMode, ] = useState('offline')
   const dispatch = useDispatch()

   function setOfflineMode() {
      setMode('offline')
      setStatus('READY')
   }
   function load_assets() {
      dispatch(auth_check_action())
      dispatch(load_addresses_action())
      dispatch(perform_api_calls_action())
      dispatch(load_notifications_action())
   }
   useEffect(() => {
      setStatus('LOADING')
      // dispatch(download_assets_async())
      download_assets_async().then(res => {
         dispatch({
            type: T_SET_POSTS,
            payload: res.posts
         })
         load_assets()
      }).catch(error => {
         load_assets()
      }).finally(_ => {
         setTimeout(() => {
         }, 0);
      })
      setStatus('READY')

   }, [])

   return {
      status,
      setOfflineMode
   }
}
