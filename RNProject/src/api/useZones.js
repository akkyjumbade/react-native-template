import store from "@/store"
import { auth_login_action } from "@/store/auth/auth.actions"
import http, { server } from "@/utils/http"

import { useMutation, useQuery, useQueryClient } from "react-query"
import { useSelector } from "react-redux"

export function useZonesStore() {
   const queryClient = useQueryClient()
   const token = useSelector(state => state.auth.token)
   // if (!token) {
   //    return null
   // }
   return useMutation(async (payload) => {
      let url = `/api/me/zones`
      return await server({ token: token }).post(url, {
         ...payload
      })
   }, {
      onSuccess: ({ data, }) => {
         queryClient.invalidateQueries()
      },
      onError: (error) => {
         // queryClient.invalidateQueries()
      },
   })
}

export function useMyZones({ searchQuery = '' } = { searchQuery: '' }) {
   const queryClient = useQueryClient()
   return useQuery(`/api/me/zones`, {
      onSuccess: ({ data, }) => {
         // queryClient.invalidateQueries()
      },
      onError: (error) => {
         queryClient.invalidateQueries()
      },
   })
}

export function useAvailableZones({ searchQuery = '' }) {
   const queryClient = useQueryClient()
   return useQuery(`/api/geo/locations?type=zone&q=${searchQuery}`, {
      onSuccess: ({ data, }) => {
         // queryClient.invalidateQueries()
      },
      onError: (error) => {
         queryClient.invalidateQueries()
      },
   })
}
