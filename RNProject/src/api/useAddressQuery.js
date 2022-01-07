import store from "@/store"
import { auth_login_action } from "@/store/auth/auth.actions"
import http, { server } from "@/utils/http"

const { useMutation, useQueryClient } = require("react-query")

export default function useAddressQuery({ onSuccess, onError }) {
   const queryClient = useQueryClient()
   return useMutation(async (payload) => {
      let url = `/api/me/addresses`
      if (payload.id) {
         url = `/api/me/addresses/${payload.id}`
      }
      return await http().post(url, {
         ...payload
      })
   }, {
      onSuccess: ({ data }) => {
         console.info(data)
         if (data?.data?.token) {
            onSuccess && onSuccess(data)
            setTimeout(() => {
               store.dispatch(auth_login_action(data?.data?.token))
            }, 2000);
         }
         queryClient.invalidateQueries()
      },
      onError: (error) => {
         console.info(error)
         queryClient.invalidateQueries()
      },
   })
}
