import { T_SET_LOCATION_QUERY, T_SET_LOCATION, T_SET_LOCATION_SUGGESTIONS, T_SET_LOCATION_RESULT } from './location_reducer'

export function set_location_query_action(query) {
   return async (dispatch, getState, { api }) => {
      try {
         dispatch({ type: T_SET_LOCATION_QUERY, payload: query })

         const { data } = await api.get(`/api/locations?q=${query}`)

         dispatch({ type: T_SET_LOCATION_SUGGESTIONS, payload: data })

         if (data) {

         }

         dispatch({ type: T_SET_LOCATION_RESULT, payload: data })
      } catch (error) {
         console.error({ error })
      }
   }
}
export function set_location_action(payload) {
   return async (dispatch, getState, { api }) => {
      try {
         dispatch({ type: T_SET_LOCATION, payload: payload })

      } catch (error) {
         console.error({ error })
      }
   }
}
