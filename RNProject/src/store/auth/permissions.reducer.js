const defaultState = {
   granted: [],
   token: null,
}

export const T_GRANT_PERMISSION = 'GRANT_PERMISSION'

export default function permissionsReducer(state = defaultState, action) {
   switch (action) {
      case T_GRANT_PERMISSION:
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
