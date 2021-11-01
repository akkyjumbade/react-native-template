import http from "../../utils/http"
import { T_SET_SERVICE_UPDATE } from "./service_reducer"


export const load_services_action = action => {
   return async (dispatch, getState, { api, }) => {
      dispatch({ type: 'SET_SERVICE_STATUS', payload: 'LOADING' })
      try {
         const { data } = await api.get(`/api/v1/app_service_providers`)
         dispatch({ type: T_SET_SERVICE_UPDATE, payload: data })
         dispatch({ type: 'SET_SERVICE_STATUS', payload: 'READY' })
      } catch (error) {
         const { data } = await http.get(`/api/v1/app_service_providers`)
         dispatch({ type: T_SET_SERVICE_UPDATE, payload: data })
         dispatch({ type: 'SET_SERVICES', payload: { error } })
         dispatch({ type: 'SET_SERVICE_STATUS', payload: 'ERROR' })
      } finally {

      }
   }
}
