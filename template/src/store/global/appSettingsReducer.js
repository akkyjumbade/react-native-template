export const appSettingsActionTypes = {
   SET_APP_SETTINGS: 'SET_APP_SETTINGS'
}

const initialState = {
   countryCode: 'INR',
   countryPhoneCode: '+91',
}

export default function appSettingsReducer(state = initialState, action) {
   switch (action.type) {
      case appSettingsActionTypes.SET_APP_SETTINGS:
         state = {
            ...state,
            ...action.payload
         }
         break;
      default:
         break;
   }
   return state
}


export const preloadResourcesAction = async (dispatch, getState, { server }) => {
   try {
      const { data } = await server().get(`/api/v1`);
      dispatch({
         type: appSettingsActionTypes.SET_APP_SETTINGS,
         payload: data
      })
   } catch (error) {
      console.warn({ error })
   }
}
