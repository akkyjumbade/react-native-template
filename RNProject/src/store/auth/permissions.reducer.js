export const permissionTypes = {
   pushNotifications: 'pushNotifications',
   geoLocation: 'geoLocation',
   contacts: 'contacts',
   sms: 'sms',
   internalStorage: 'internalStorage',
   externalStorage: 'externalStorage',
}

const defaultState = {
   enabled: {},
   token: null,
}

export const ACTION_TYPES = {
   T_GRANT_PERMISSION: 'permissions:set',
}

export default function permissionsReducer(state = defaultState, action) {
   switch (action.type) {
      case ACTION_TYPES.T_GRANT_PERMISSION:
         state = {
            ...state,
            enabled: {...state.enabled, ...action.payload}
         }
         console.log({ state })
         break;

      default:
         break;
   }
   return state;
}
