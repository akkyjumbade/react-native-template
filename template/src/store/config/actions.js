import { T_SET_RESOURCES } from "../global/resources_reducer"
import { T_SET_POSTS } from "../posts/posts_reducer"
import { actionTypes, T_LOAD_CONFIG, T_SET_CHOICES, T_UPDATE_CONFIG } from "./reducer"

function getConfigFromCacheOrApi(api) {
   return new Promise(async (resolve, reject) => {
      try {
         const { data } = await api.get(`/api/v1`)
         resolve(data)
      } catch (error) {
         reject(error)
         throw error
      }
   })
}

export const perform_api_calls_action = props => {
   return async (dispatch, getState, { api }) => {
      try {
         // load config first
         const res = await getConfigFromCacheOrApi(api)
         dispatch({ type: actionTypes.SET_APP_SETTINGS, payload: res?.appSettings })
         dispatch({ type: T_SET_RESOURCES, payload: {
            categories: res.categories
         } })
      } catch (error) {
         dispatch({ type: T_LOAD_CONFIG, payload: { error: error.message, } })
         console.warn('EXHR1: ' + error.message)
      } finally {
         dispatch({ type: 'APP_STATUS', payload: 'READY', })
      }

   }
}

function updateCountryAction(country) {
   return async (dispatch, getState, { server }) => {
      try {
         dispatch({ type: T_UPDATE_CONFIG, payload: {country} })
      } catch (error) {
         // alert()
         dispatch({ type: T_UPDATE_CONFIG, payload: {country} })
      }
   }
}
function updateCurrencyAction(currency) {
   return async (dispatch, getState, { server }) => {
      try {
         dispatch({ type: T_UPDATE_CONFIG, payload: {currency} })
      } catch (error) {
         // alert()
         dispatch({ type: T_UPDATE_CONFIG, payload: {currency} })
      }
   }
}

const setPreferredChoice = payload => (async (dispatch, getState, { server }) => {
   try {
      dispatch({ type: T_SET_CHOICES, payload })
   } catch (error) {
      dispatch({ type: T_SET_CHOICES, payload })
   }
})
function setDisplayLanguage(payload) {
   return async (dispatch, getState, { server }) => {
      try {
         dispatch({ type: actionTypes.SET_DISPLAY_LANG, payload })
      } catch (error) {
         dispatch({ type: actionTypes.SET_DISPLAY_LANG, payload })
      }
   }
}

export default {
   updateCountryAction,
   updateCurrencyAction,
   setPreferredChoice,
   setDisplayLanguage
}
