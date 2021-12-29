import useApiQuery from "@/hooks/useApiQuery"
import { server } from "@/utils/http"
import { useMutation } from "react-query"
import { useSelector } from "react-redux"

export default function usePreferencesQuery() {
   const token = useSelector(state => state.auth.token)
   const { data, isLoading, error, } = useApiQuery(`/api/v1/app_options`)
   const { mutateAsync: updatePreferencesAsync, isLoading: isUpdating } = useMutation(async payload => {
      return await server({ token: token, }).post(`/api/me/preferences`, {
         ...payload
      })
   })
   return {
      data,
      error,
      isLoading,
      updatePreferencesAsync,
      isUpdating,
   }
}
