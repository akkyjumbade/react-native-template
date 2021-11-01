import { T_SET_CATEGORIES, T_SET_ITEMS, T_SHOP_STATUS } from "./reducer"

function getConfigFromCacheOrApi(api) {
   return new Promise(async (resolve, reject) => {
      try {
         const data = await api.get(`/api/v1/shop_data?tag=app`)
         resolve(data)
      } catch (error) {
         reject(error)
         throw error
      }
   })
}

export const load_shop_action = props => {
   return async (dispatch, getState, { api }) => {
      try {
         // load config first
         const { data } = await getConfigFromCacheOrApi(api)
         dispatch({ type: T_SET_CATEGORIES, payload: data?.categories })
         dispatch({ type: T_SET_ITEMS, payload: data?.items })
         dispatch({ type: T_SHOP_STATUS, payload: 'READY' })
         // dispatch({ type: 'PERFORM_API_CALLS', payload: data?.categories })
      } catch (error) {
         // dispatch({ type: 'PERFORM_API_CALLS', payload: { error: error.message, } })
         console.warn({ error })
      } finally {

         // dispatch({ type: 'APP_STATUS', payload: 'READY', })
      }

   }
}
