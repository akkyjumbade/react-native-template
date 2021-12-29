import { server } from "@/utils/http"

const { useMutation, useQueryClient } = require("react-query")

export default function useProfilePhotoQuery(_payload) {
   const queryClient = useQueryClient()
   return useMutation(async (payload = _payload) => {
      let url = `/api/me`
      return await server({ }).post(url, {
         ...payload
      }, {
         onSuccess: (res) => {
            queryClient.invalidateQueries()
         },
         onError: (res) => {
            queryClient.invalidateQueries()
         },
      })
   })
}
