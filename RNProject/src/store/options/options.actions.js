import { actionTypes } from "./options.reducer"

function getConfigFromCacheOrApi(api) {
   return new Promise(async (resolve, reject) => {
      try {
         const { data } = await api().get(`/api/v1`)
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
      } catch (error) {
         dispatch({ type: actionTypes.T_LOAD_CONFIG, payload: { error: error.message, } })
         console.warn('EXHR1: ' + error.message)
      } finally {
         dispatch({ type: 'APP_STATUS', payload: 'READY', })
      }

   }
}

function updateCountryAction(country) {
   return async (dispatch, getState, { server }) => {
      try {
         dispatch({ type: actionTypes.T_UPDATE_CONFIG, payload: {country} })
      } catch (error) {
         // alert()
         dispatch({ type: actionTypes.T_UPDATE_CONFIG, payload: {country} })
      }
   }
}
function updateCurrencyAction(currency) {
   return async (dispatch, getState, { server }) => {
      try {
         dispatch({ type: actionTypes.T_UPDATE_CONFIG, payload: {currency} })
      } catch (error) {
         // alert()
         dispatch({ type: actionTypes.T_UPDATE_CONFIG, payload: {currency} })
      }
   }
}

const setPreferredChoice = payload => (async (dispatch, getState, { server }) => {
   try {
      dispatch({ type: actionTypes.T_SET_CHOICES, payload })
   } catch (error) {
      dispatch({ type: actionTypes.T_SET_CHOICES, payload })
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
