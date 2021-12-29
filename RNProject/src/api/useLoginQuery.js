import store from "@/store"
import { auth_login_action } from "@/store/auth/auth.actions"
import http, { server } from "@/utils/http"

import { useMutation, useQueryClient } from "react-query"

export default function useLoginQuery() {
   const queryClient = useQueryClient()
   return useMutation(async (payload) => {
      let url = `/api/login`
      console.info({ url, payload})
      return await http().post(url, {
         ...payload
      })
   }, {
      onSuccess: ({ data, }) => {
         queryClient.invalidateQueries()
         const { ok, token } = data
         if(data && ok) {
            store.dispatch(auth_login_action(token))
         }
         // console.info({ data })
      },
      onError: (error) => {
         console.warn(error.response)
         queryClient.invalidateQueries()
      },
   })
}
