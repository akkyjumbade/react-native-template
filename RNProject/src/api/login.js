import store from "@/store"
import { auth_login_action } from "@/store/auth/auth.actions"
import http, { server } from "@/utils/http"
import { useFormik } from "formik"
import { useToast } from 'native-base'

import { useMutation, useQueryClient } from "react-query"

export function useLoginQuery({ initialValues = {} } = {}) {
   const queryClient = useQueryClient()
   const toast = useToast()
   // TODO: get push notification token stored and send to every login request

   let url = `/api/login`
   const { mutateAsync, } = useMutation(async (payload) => {
      console.info({ url, payload})
      return await http().post(url, {
         ...payload,
      })
   }, {
      onSuccess: ({ data, }) => {
         queryClient.invalidateQueries()
         const { ok, token } = data
         if (data && ok) {
            store.dispatch(auth_login_action(token))
         }
         // console.info({ data })
      },
      onError: (error) => {
         console.warn(error.response)
         queryClient.invalidateQueries()
         // toast.show({
         //    title: error.message
         // })
      },
   })

   const formik = useFormik({
      initialValues,
      async onSubmit(values, action) {
         action.setSubmitting(true)
         try {
            const { message, ok } = await mutateAsync(values)
            toast.show({
               title: message,
            })
         } catch (error) {
            toast.show({
               title: error.message
            })
         } finally {
            action.setSubmitting(false)
         }
      }
   })
   return formik
}


export default function useLogin({  initialValues = {} }) {
   const { mutateAsync, } = useMutation(async payload => {
      return await server().post(`/api/login`, payload)
   })
   const formik = useFormik({
      initialValues,
      async onSubmit(values, action) {
         action.setSubmitting(true)
         try {
            await mutateAsync(values)
         } catch (error) {

         } finally {
            action.setSubmitting(false)
         }
      }
   })
   return formik
}
