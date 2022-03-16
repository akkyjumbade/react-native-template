import store from "@/store"
import { auth_login_action } from "@/store/auth/auth.actions"
import http, { server } from "@/utils/http"

const { useMutation, useQueryClient } = require("react-query")

export function useAddressQuery({ onSuccess, onError, initialValues = {} }) {
   const queryClient = useQueryClient()
   const toast = useToast()

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
   const form = useFormik({
      initialValues,
      async onSubmit(values, action) {
         try {

         }
      }
   })
}
