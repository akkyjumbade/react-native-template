import http from '../../../../src/utils/http'
import { T_AUTH_LOGOUT, T_AUTH_SET, T_AUTH_TOKEN, T_LOGIN, T_SET_ADDRESSES} from './reducer'


export const auth_register_action = (token, values) => {
   return async (dispatch, getState, { api, cacheStore }) => {
      try {
         await cacheStore.save({ key: '@token', data: token, })
         dispatch({ type: T_AUTH_SET, payload: values })
      } catch (error) {

      }
   }
}
export const auth_login_action = token => {
   return async (dispatch, getState, params) => {
      try {
         await params.cacheStore.save({
            key: '@token',
            data: token,
         })
         const { data } = await params.api.get(`/api/v1/me?token=${token}`)
         console.info({ data, params })
         dispatch({
            type: T_AUTH_TOKEN,
            payload: token
         })
         dispatch({ type: T_AUTH_SET, payload: data })
         dispatch({ type: T_LOGIN, payload: data })
      } catch (error) {
         if ( error.name === 'TypeError' ) {
            // retry because of redux-thunk extra arg issue
            const { data } = await http.get(`/api/v1/me?token=${token}`)
            console.info({ data, params })
            dispatch({
               type: T_AUTH_TOKEN,
               payload: token
            })
            dispatch({ type: T_AUTH_SET, payload: data })
            dispatch({ type: T_LOGIN, payload: data })
         } else {
            dispatch({ type: T_AUTH_SET, payload: null })
         }
         console.warn({ error, params }, error.response?.data)

      }
   }
}

export const auth_check_action = () => {
   return async (dispatch, getState, { api, cacheStore }) => {
      try {
         const token = await cacheStore.load({ key: '@token', })
         const { data } = await api.get(`/api/v1/me?token=${token}`)
         dispatch({
            type: T_AUTH_TOKEN,
            payload: token
         })
         dispatch({
            type: T_AUTH_SET,
            payload: data
         })
      } catch (error) {
         console.error(JSON.stringify(error))
         if (error.name === 'TypeError') {
            const token = await cacheStore.load({ key: '@token', })
            const { data } = await http.get(`/api/v1/me?token=${token}`)
            dispatch({
               type: T_AUTH_TOKEN,
               payload: token
            })
            dispatch({
               type: T_AUTH_SET,
               payload: data
            })
         } else {
            dispatch({
               type: T_AUTH_SET,
               payload: null
            })
         }

      }
   }
}

export const auth_logout_action = params => {
   return async (dispatch, getState, { api, cacheStore }) => {
      try {
         await cacheStore.remove({ key: '@token', })
         dispatch({
            type: T_AUTH_LOGOUT,
         })
      } catch (error) {
         dispatch({
            type: T_AUTH_LOGOUT,
         })
      }
   }
}
export const load_addresses_action = () => {
   return async (dispatch, getState, { server }) => {
      try {
         // const { user } = getState().auth
         const { data } = await server().get(`/api/v1/my_addr`)
         dispatch({
            type: T_SET_ADDRESSES,
            payload: data?.data
         })
      } catch (error) {
         // dispatch({
         //    type: T_SET_ADDRESSES,
         // })
      }
   }
}

export const update_profile_photo_action = (imgFile) => {
   return async (dispatch, getState, { server }) => {
      try {
         // const { user } = getState().auth
         const { data } = await server().post(`/api/v1/update_profile_photo`, {
            imgFile
         })
         if (data?.ok) {
            auth_check_action()
         }

         // dispatch({
         //    type: T_SET_ADDRESSES,
         //    payload: data?.data
         // })
      } catch (error) {
         // dispatch({
         //    type: T_SET_ADDRESSES,
         // })
      }
   }
}
