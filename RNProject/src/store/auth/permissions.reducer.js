const defaultState = {
   granted: [],
   token: null,
}

export const ACTION_TYPES = {
   T_GRANT_PERMISSION: 'T_GRANT_PERMISSION',
}

export default function permissionsReducer(state = defaultState, action) {
   switch (action) {
      case ACTION_TYPES.T_GRANT_PERMISSION:
         state = {
            ...state,
            granted: [...state.granted, action.payload]
         }
         break;

      default:
         break;
   }
   return state;
}
