import configOptions from '../../config/options'

const initialState = {
   app_status: 'INIT',
   currency: 'EUR',
   display_language: 'en',
   dateFormat: 'Y-m-d',
   timeFormat: 'H:i A',
   appearance_theme: 'system',
   alert_types: configOptions.alertTypes,
   languages: configOptions.languages,
   countryCode: 'INR',
   countryPhoneCode: '+91',
};

export const actionTypes = {
   SET_DISPLAY_LANG: 'SET_DISPLAY_LANG',
   SET_APP_SETTINGS: 'SET_APP_SETTINGS',
   T_LOAD_CONFIG: 'PERFORM_API_CALLS',
   T_DARK_MODE: 'SET_DARK_MODE',
   T_UPDATE_CONFIG: 'UPDATE_CONFIG',
   T_SET_CHOICE: 'SET_CHOICE',
}

export default function optionsReducer(state = initialState, action) {
   switch (action.type) {
      case actionTypes.T_LOAD_CONFIG:
      case actionTypes.T_UPDATE_CONFIG:
         state = {
            ...state,
            ...action.payload
         }
         break;
      case 'APP_STATUS':
         state = {
            ...state,
            app_status: action.payload,
         }
         break;
      case actionTypes.T_DARK_MODE:
         state = {
            ...state,
            appearance_theme: action.payload,
         }
         break;
      case actionTypes.T_SET_CHOICE:
         state = {
            ...state,
            preferred_choice: action.payload,
         }
         break;
      case actionTypes.SET_DISPLAY_LANG:
         state = {
            ...state,
            display_language: action.payload,
         }
         break;
      default:
         break;
   }
   return state;
};
