import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { actionTypes } from "../store/options/options.reducer"
import http from "../utils/http"

const download_assets_async = params => {
   return new Promise(async (resolve, reject) => {
      try {
         const { data } = await http().get(`/api/v1`)
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

   useEffect(() => {
      setStatus('LOADING')
      download_assets_async().then(res => {
         dispatch({
            type: actionTypes.T_UPDATE_CONFIG,
            payload: res
         })
         setMode('online')
      }).catch(error => {
         setStatus('FAILED')
         console.info({ error })
      }).finally(_ => {
         setTimeout(() => {
            setMode('online')
         }, 0);
         setStatus('READY')
      })
   }, [dispatch])

   return {
      status,
      mode,
      setOfflineMode
   }
}
